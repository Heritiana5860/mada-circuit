import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import First from "./First";
import Second from "./Second";
import ThirdStep from "../Circuits/ThirdStep";

const CreateVehicule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [immatriculation, setImmatriculation] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [types, setTypes] = useState("");
  const [annee, setAnnee] = useState(2000);
  const [capacite, setCapacite] = useState(4);
  const [etat, setEtat] = useState("");
  const [prix, setPrix] = useState(0);

  const [selectedImages, setSelectedImages] = useState([]);

  const steps = [
    { id: 1, label: "Informations" },
    { id: 2, label: "Confirmation" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      // Validation de base avant de passer à l'étape suivante
      //   if (
      //     currentStep === 1 &&
      //     (!titre || !description || !destination || !region || !saison)
      //   ) {
      //     setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      //     return;
      //   }
      //   if (currentStep === 2 && days.some((day) => !day.depart || !day.jour)) {
      //     setErrorMessage(
      //       "Veuillez remplir tous les champs obligatoires pour chaque itinéraire."
      //     );
      //     return;
      //   }
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
                <First
                  immatriculation={immatriculation}
                  marque={marque}
                  modele={modele}
                  annee={annee}
                  capacite={capacite}
                  etat={etat}
                  prix={prix}
                  types={types}
                  setAnnee={setAnnee}
                  setCapacite={setCapacite}
                  setEtat={setEtat}
                  setImmatriculation={setImmatriculation}
                  setMarque={setMarque}
                  setModele={setModele}
                  setPrix={setPrix}
                  setTypes={setTypes}
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
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Suivant
                </button>
              ) : (
                <button
                  //   onClick={handleSubmit}
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

export default CreateVehicule;
