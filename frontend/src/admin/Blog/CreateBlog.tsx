import { useState } from "react";
import FirstBlog from "./FirstBlog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ThirdStep from "../Circuits/ThirdStep";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "@/graphql/mutations";

const CreateBlog = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createABlog, { loading, error }] = useMutation(CREATE_BLOG);

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [auteur, setAuteur] = useState("");
  const [tags, setTags] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);

  const [contentType, setContentType] = useState("media"); // "media", "youtube", "mixed"
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const steps = [
    { id: 1, label: "Informations" },
    { id: 2, label: "Média/YouTube" },
    // { id: 3, label: "Confirmation" },
  ];

  // Fonction pour valider une URL YouTube
  const isValidYouTubeUrl = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    return patterns.some((pattern) => pattern.test(url));
  };

  // Fonction pour extraire l'ID YouTube
  const extractYouTubeId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      // Validation de base avant de passer à l'étape suivante
      if (currentStep === 1 && (!titre || !contenu || !auteur || !tags)) {
        setErrorMessage("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      // Validation de l'étape 2
      if (currentStep === 2) {
        if (contentType === "youtube" && !youtubeUrl) {
          setErrorMessage(
            "Veuillez fournir une URL YouTube pour ce type de contenu."
          );
          return;
        }
        if (
          contentType === "youtube" &&
          youtubeUrl &&
          !isValidYouTubeUrl(youtubeUrl)
        ) {
          setErrorMessage("L'URL YouTube fournie n'est pas valide.");
          return;
        }
        if (contentType === "media" && selectedImages.length === 0) {
          setErrorMessage("Veuillez sélectionner au moins un fichier média.");
          return;
        }
        if (
          contentType === "mixed" &&
          !youtubeUrl &&
          selectedImages.length === 0
        ) {
          setErrorMessage(
            "Veuillez fournir soit une URL YouTube, soit des fichiers média."
          );
          return;
        }
      }

      setErrorMessage(null);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrorMessage(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur!</div>;
  }

  const emptyFields = () => {
    setTitre("");
    setContenu("");
    setAuteur("");
    setTags("");
    setSelectedImages([]);
    setContentType("media");
    setYoutubeUrl("");
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des données
    if (!titre || !contenu || !auteur || !tags) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (
      contentType === "youtube" &&
      (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl))
    ) {
      setErrorMessage("URL YouTube invalide ou manquante.");
      return;
    }

    if (contentType === "media" && selectedImages.length === 0) {
      setErrorMessage("Aucun fichier média sélectionné.");
      return;
    }

    const data = {
      titre: titre,
      contenu: contenu,
      auteur: auteur,
      tags: tags,
      contentType: contentType,
      youtubeUrl: contentType === "media" ? null : youtubeUrl,
      files: selectedImages.map((img) => img.file),
    };

    try {
      const result = await createABlog({ variables: data });
      console.log("Resultat de la mutation:", result);
      console.log("Data:", data);

      if (result.data.createBlog.success) {
        emptyFields();
        setCurrentStep(1);
      } else {
        setErrorMessage(result.data.createBlog.errors.join(", "));
      }
    } catch (err) {
      console.error("Erreur:", err);
      setErrorMessage("Une erreur est survenue lors de la création de blog.");
    }
  };

  const ContentTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Type de contenu
        </h3>
        <p className="text-sm text-gray-600">
          Choisissez le type de contenu principal de votre blog
        </p>
      </div>

      {/* Sélecteur de type de contenu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            contentType === "media"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setContentType("media")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              📷
            </div>
            <h4 className="font-medium text-gray-900">Photos/Vidéos</h4>
            <p className="text-sm text-gray-600 mt-1">
              Téléchargez vos propres fichiers
            </p>
          </div>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            contentType === "youtube"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setContentType("youtube")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              📺
            </div>
            <h4 className="font-medium text-gray-900">YouTube</h4>
            <p className="text-sm text-gray-600 mt-1">
              Intégrer une vidéo YouTube
            </p>
          </div>
        </div>

        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            contentType === "mixed"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setContentType("mixed")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              🎬
            </div>
            <h4 className="font-medium text-gray-900">Mixte</h4>
            <p className="text-sm text-gray-600 mt-1">YouTube + vos fichiers</p>
          </div>
        </div>
      </div>

      {/* Section YouTube */}
      {(contentType === "youtube" || contentType === "mixed") && (
        <div className="mt-6">
          <Card className="p-6">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                📺
              </span>
              Vidéo YouTube
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL YouTube
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formats acceptés: youtube.com/watch?v=..., youtu.be/...
                </p>
              </div>

              {/* Aperçu YouTube */}
              {youtubeUrl && isValidYouTubeUrl(youtubeUrl) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aperçu
                  </label>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        youtubeUrl
                      )}`}
                      title="Aperçu YouTube"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Message d'erreur URL */}
              {youtubeUrl && !isValidYouTubeUrl(youtubeUrl) && (
                <div className="text-red-600 text-sm">
                  URL YouTube non valide. Veuillez vérifier le format.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Section Fichiers */}
      {(contentType === "media" || contentType === "mixed") && (
        <div className="mt-6">
          <ThirdStep
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-[80%] mx-auto">
      <Card>
        {/* Barre du Stepper */}
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full border-2 
                ${
                  currentStep >= step.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-500"
                }`}
                >
                  {step.id}
                </div>
                <p className="text-center text-sm mt-2">{step.label}</p>
              </div>
            ))}
          </div>
        </CardHeader>

        {/* Contenu */}
        <CardContent className="space-y-4">
          <div className="p-6 border rounded-lg shadow-md min-h-[200px]">
            {currentStep === 1 && (
              <FirstBlog
                titre={titre}
                contenu={contenu}
                auteur={auteur}
                tags={tags}
                setTitre={setTitre}
                setContenu={setContenu}
                setAuteur={setAuteur}
                setTags={setTags}
              />
            )}

            {currentStep === 2 && <ContentTypeStep />}

            {/* {currentStep === 3 && (
              <ThirdStep
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            )} */}
          </div>
        </CardContent>

        {/* Boutons */}
        <CardFooter className="px-6">
          <div className="flex justify-between mt-6 gap-10">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Terminer
              </button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBlog;
