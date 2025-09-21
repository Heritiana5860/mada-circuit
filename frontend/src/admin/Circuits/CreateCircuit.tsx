import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { ItineraryDay } from "./ItineraryDay";
import { useMutation } from "@apollo/client";
import { CREATE_CIRCUIT } from "@/graphql/mutations";

const CreateCircuit = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createACircuit, { loading, error }] = useMutation(CREATE_CIRCUIT, {
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1
  const [titre, setTitre] = useState("");
  const [duree, setDuree] = useState(1);
  const [prix, setPrix] = useState(0);
  const [destination, setDestination] = useState("");
  const [region, setRegion] = useState("");
  const [saison, setSaison] = useState("");
  const [inclus, setInclus] = useState("");
  const [nonInclus, setNonInclus] = useState("");
  const [transport, setTransport] = useState("");
  const [types, setTypes] = useState("");
  const [difficulte, setDifficulte] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 - État initial mis à jour avec le nouveau format
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      id: "1",
      jour: 1,
      type: "trajet",
      depart: "",
      arrivee: "",
      distance: 0,
      duree: 0,
      description: "",
    },
  ]);

  // Step 3
  const [selectedImages, setSelectedImages] = useState([]);

  const steps = [
    { id: 1, label: "Informations" },
    { id: 2, label: "Planification d'itinéraire" },
    { id: 3, label: "Confirmation" },
  ];

  // Fonction de validation mise à jour pour gérer les deux types
  const validateStep2 = () => {
    return days.every((day) => {
      if (day.type === "trajet") {
        // Pour un trajet, on vérifie le départ et l'arrivée
        return day.depart && day.arrivee;
      } else {
        // Pour un séjour, on vérifie le lieu
        return day.lieu;
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      // Validation de base avant de passer à l'étape suivante
      if (currentStep === 1 && (!titre || !destination || !region || !saison)) {
        setErrorMessage("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      // Validation mise à jour pour l'étape 2
      if (currentStep === 2 && !validateStep2()) {
        setErrorMessage(
          "Veuillez remplir tous les champs obligatoires pour chaque étape de l'itinéraire."
        );
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

  // Fonction pour vider tous les champs - mise à jour
  const emptyFields = () => {
    setTitre("");
    setDuree(1);
    setPrix(0);
    setDestination("");
    setRegion("");
    setSaison("");
    setInclus("");
    setNonInclus("");
    setTransport("");
    setTypes("");
    setDifficulte("");
    setDescription("");
    setDays([
      {
        id: "1",
        jour: 1,
        type: "trajet",
        depart: "",
        arrivee: "",
        distance: 0,
        duree: 0,
        description: "",
      },
    ]);
    setSelectedImages([]);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des données de base
    if (!titre || !destination || !region || !saison || days.length === 0) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Validation finale des étapes
    if (!validateStep2()) {
      setErrorMessage(
        "Veuillez remplir tous les champs obligatoires pour chaque étape."
      );
      return;
    }

    // Préparer les données pour la mutation - logique mise à jour
    const itineraires = days.map((day) => {
      const baseItinerary = {
        jour: day.jour,
        typeItineraire: day.type,
        description: day.description || null,
      };

      if (day.type === "trajet") {
        return {
          ...baseItinerary,
          lieuDepart: day.depart,
          lieuArrivee: day.arrivee,
          distanceKm: parseFloat(day.distance?.toString() || "0") || null,
          dureeTrajet: parseFloat(day.duree?.toString() || "0") || null,
        };
      } else {
        return {
          ...baseItinerary,
          lieu: day.lieu,
          nuitees: day.nuitees || 1,
        };
      }
    });

    const data = {
      titre: titre,
      description: description,
      duree: duree,
      prix: parseFloat(prix.toString()),
      typeCircuit: types,
      transport: transport,
      difficulte: difficulte,
      destination: destination,
      region: region,
      saison: saison,
      inclus: inclus,
      nonInclus: nonInclus,
      itineraires: itineraires,
      images: selectedImages.map((img) => img.file),
    };

    try {
      const result = await createACircuit({ variables: data });

      if (result.data.createCircuit.success) {
        emptyFields();
        setCurrentStep(1);
        setErrorMessage("Circuit créé avec succès !");
      } else {
        console.log("Resultat: ", result);
        setErrorMessage(result.data.createCircuit.errors.join(", "));
      }
    } catch (err) {
      console.error("Erreur:", err);
      setErrorMessage(
        "Une erreur est survenue lors de la création du circuit."
      );
    }
  };

  return (
    <div>
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
                <FirstStep
                  titre={titre}
                  duree={duree}
                  prix={prix}
                  destination={destination}
                  region={region}
                  saison={saison}
                  inclus={inclus}
                  non_inclus={nonInclus}
                  transport={transport}
                  types={types}
                  difficulte={difficulte}
                  description={description}
                  setTitre={setTitre}
                  setDuree={setDuree}
                  setPrix={setPrix}
                  setDestination={setDestination}
                  setRegion={setRegion}
                  setSaison={setSaison}
                  setInclus={setInclus}
                  setNonInclus={setNonInclus}
                  setTransport={setTransport}
                  setTypes={setTypes}
                  setDifficulte={setDifficulte}
                  setDescription={setDescription}
                />
              )}
              {currentStep === 2 && (
                <SecondStep days={days} setDays={setDays} />
              )}
              {currentStep === 3 && (
                <ThirdStep
                  setSelectedImages={setSelectedImages}
                  selectedImages={selectedImages}
                />
              )}
            </div>

            {/* Affichage des erreurs */}
            {errorMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  errorMessage.includes("succès")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {errorMessage}
              </div>
            )}
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
    </div>
  );
};

export default CreateCircuit;
