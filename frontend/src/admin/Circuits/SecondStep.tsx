import {
  Clock,
  LandPlot,
  MapPin,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  Route,
  Trash2,
} from "lucide-react";
import Field from "../composants/Field";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ItineraryDay } from "./ItineraryDay";

interface TwoType {
  days: ItineraryDay[];
  setDays: React.Dispatch<React.SetStateAction<ItineraryDay[]>>;
}

const SecondStep: React.FC<TwoType> = ({ days, setDays }) => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const addDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      jour: days.length + 1,
      depart: "",
      arrivee: "",
      distance: 0,
      duree: 0,
      description: "",
    };
    setDays([...days, newDay]);

    // Scroll vers la nouvelle card après un délai pour permettre le rendu
    setTimeout(() => {
      const newCardElement = cardRefs.current[newDay.id];
      if (newCardElement) {
        newCardElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const removeDay = (id: string) => {
    if (days.length > 1) {
      setDays(days.filter((day) => day.id !== id));
      // Renuméroter les jours
      const updatedDays = days
        .filter((day) => day.id !== id)
        .map((day, index) => ({
          ...day,
          jour: index + 1,
        }));
      setDays(updatedDays);
    }
  };

  const updateDay = (id: string, field: keyof ItineraryDay, value: string) => {
    setDays(
      days.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Conteneur avec scroll pour les itinéraires */}
      <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {days.map((day, index) => (
          <Card
            key={day.id}
            ref={(el) => (cardRefs.current[day.id] = el)}
            className="shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {day.jour}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Jour {day.jour}
                  </span>
                </div>
                {days.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDay(day.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Trajet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Lieu de départ"
                  id={`depart-${day.id}`}
                  name={`depart-${day.id}`}
                  placeholder="Ex: Antananarivo"
                  type="text"
                  value={day.depart}
                  setValue={(value) => updateDay(day.id, "depart", value)}
                  icon={<PlaneTakeoff className="h-4 w-4" />}
                />

                <Field
                  label="Lieu d'arrivée"
                  id={`arrivee-${day.id}`}
                  name={`arrivee-${day.id}`}
                  placeholder="Ex: Tuléar"
                  type="text"
                  value={day.arrivee}
                  setValue={(value) => updateDay(day.id, "arrivee", value)}
                  icon={<PlaneLanding className="h-4 w-4" />}
                />
              </div>

              {/* Distance et durée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Distance (km)"
                  id={`distance-${day.id}`}
                  name={`distance-${day.id}`}
                  placeholder="420"
                  type="number"
                  min={0}
                  value={day.distance}
                  setValue={(value) => updateDay(day.id, "distance", value)}
                  icon={<MapPin className="h-4 w-4" />}
                />

                <Field
                  label="Durée estimée (heures)"
                  id={`duree-${day.id}`}
                  name={`duree-${day.id}`}
                  placeholder="8"
                  type="number"
                  value={day.duree}
                  min={1}
                  setValue={(value) => updateDay(day.id, "duree", value)}
                  icon={<Clock className="h-4 w-4" />}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description de l'étape
                </Label>
                <div className="relative">
                  <LandPlot className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    placeholder="Décrivez les points d'intérêt, activités prévues, hébergement..."
                    value={day.description}
                    onChange={(e) =>
                      updateDay(day.id, "description", e.target.value)
                    }
                    className="pl-10 min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* Indicateur visuel du trajet */}
              {day.depart && day.arrivee && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between text-sm text-blue-800">
                    <span className="font-medium">{day.depart}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-px bg-blue-300 flex-1 min-w-[40px]"></div>
                      <Route className="h-4 w-4" />
                      <div className="h-px bg-blue-300 flex-1 min-w-[40px]"></div>
                    </div>
                    <span className="font-medium">{day.arrivee}</span>
                  </div>
                  {(day.distance || day.duree) && (
                    <div className="flex justify-center gap-4 mt-2 text-xs text-blue-600">
                      {day.distance && <span>{day.distance} km</span>}
                      {day.duree && <span>{day.duree}h de trajet</span>}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bouton d'ajout */}
      <div className="text-center">
        <Button
          type="button"
          onClick={addDay}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un jour
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;
