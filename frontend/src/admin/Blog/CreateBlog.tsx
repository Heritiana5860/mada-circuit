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

  const steps = [
    { id: 1, label: "Informations" },
    { id: 2, label: "Confirmation" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      // Validation de base avant de passer à l'étape suivante
      if (currentStep === 1 && (!titre || !contenu || !auteur || !tags)) {
        setErrorMessage("Veuillez remplir tous les champs obligatoires.");
        return;
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
    return <div>Erreur lors de la création circuit!</div>;
  }

  const emptyFields = () => {
    setTitre("");
    setContenu("");
    setAuteur("");
    setTags("");
    setSelectedImages(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des données
    if (!titre || !contenu || !auteur || !tags) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const data = {
      titre: titre,
      contenu: contenu,
      auteur: auteur,
      tags: tags,
      images: selectedImages.map((img) => img.file),
    };

    try {
      const result = await createABlog({ variables: data });
      console.log("Resultat de la mutation:", result);
      console.log("Data:", data);

      if (result.data.createBlog.success) {
        emptyFields();
        setCurrentStep(1);
        setErrorMessage("Circuit créé avec succès !");
      } else {
        setErrorMessage(result.data.createBlog.errors.join(", "));
      }
    } catch (err) {
      console.error("Erreur:", err);
      setErrorMessage(
        "Une erreur est survenue lors de la création du circuit."
      );
    }
  };

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

            {currentStep === 2 && (
              <ThirdStep
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            )}
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
