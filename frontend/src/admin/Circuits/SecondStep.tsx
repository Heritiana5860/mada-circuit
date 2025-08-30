import {
  Calendar,
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

// Types mis à jour
interface ItineraryDay {
  id: string;
  jour: number;
  type: "trajet" | "sejour";

  // Champs pour les trajets
  depart?: string;
  arrivee?: string;
  distance?: number;
  duree?: number;

  // Champs pour les séjours
  lieu?: string;
  nuitees?: number; 

  description: string;
}

interface TwoType {
  days: ItineraryDay[];
  setDays: React.Dispatch<React.SetStateAction<ItineraryDay[]>>;
}

const SecondStep: React.FC<TwoType> = ({ days, setDays }) => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const addDay = (type: "trajet" | "sejour" = "trajet") => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      jour: days.length + 1,
      type,
      description: "",
      // Initialisation conditionnelle selon le type
      ...(type === "trajet"
        ? {
            depart: "",
            arrivee: "",
            distance: 0,
            duree: 0,
          }
        : {
            lieu: "",
            nuitees: 1,
          }),
    };
    setDays([...days, newDay]);

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
      const updatedDays = days
        .filter((day) => day.id !== id)
        .map((day, index) => ({
          ...day,
          jour: index + 1,
        }));
      setDays(updatedDays);
    }
  };

  const updateDay = (
    id: string,
    field: keyof ItineraryDay,
    value: string | number
  ) => {
    setDays(
      days.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const changeType = (id: string, newType: "trajet" | "sejour") => {
    setDays(
      days.map((day) => {
        if (day.id === id) {
          const baseDay = {
            id: day.id,
            jour: day.jour,
            type: newType,
            description: day.description,
          };

          if (newType === "trajet") {
            return {
              ...baseDay,
              depart: "",
              arrivee: "",
              distance: 0,
              duree: 0,
            };
          } else {
            return {
              ...baseDay,
              lieu: "",
              nuitees: 1,
            };
          }
        }
        return day;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      day.type === "trajet" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    <span
                      className={`font-semibold text-sm ${
                        day.type === "trajet"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {day.jour}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Jour {day.jour}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      day.type === "trajet"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {day.type === "trajet" ? "Trajet" : "Séjour"}
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
              {/* Sélecteur de type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Type d'étape
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={day.type === "trajet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeType(day.id, "trajet")}
                    className="flex-1"
                  >
                    <Route className="h-4 w-4 mr-2" />
                    Trajet
                  </Button>
                  <Button
                    type="button"
                    variant={day.type === "sejour" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeType(day.id, "sejour")}
                    className="flex-1"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Séjour
                  </Button>
                </div>
              </div>

              {/* Contenu conditionnel selon le type */}
              {day.type === "trajet" ? (
                <>
                  {/* Trajet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Lieu de départ"
                      id={`depart-${day.id}`}
                      name={`depart-${day.id}`}
                      placeholder="Ex: Antananarivo"
                      type="text"
                      value={day.depart || ""}
                      setValue={(value) => updateDay(day.id, "depart", value)}
                      icon={<PlaneTakeoff className="h-4 w-4" />}
                    />

                    <Field
                      label="Lieu d'arrivée"
                      id={`arrivee-${day.id}`}
                      name={`arrivee-${day.id}`}
                      placeholder="Ex: Tuléar"
                      type="text"
                      value={day.arrivee || ""}
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
                      value={day.distance || 0}
                      setValue={(value) =>
                        updateDay(day.id, "distance", parseInt(value) || 0)
                      }
                      icon={<MapPin className="h-4 w-4" />}
                    />

                    <Field
                      label="Durée estimée (heures)"
                      id={`duree-${day.id}`}
                      name={`duree-${day.id}`}
                      placeholder="8"
                      type="number"
                      value={day.duree || 0}
                      min={1}
                      setValue={(value) =>
                        updateDay(day.id, "duree", parseInt(value) || 0)
                      }
                      icon={<Clock className="h-4 w-4" />}
                    />
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
                </>
              ) : (
                <>
                  {/* Séjour */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Lieu de séjour"
                      id={`lieu-${day.id}`}
                      name={`lieu-${day.id}`}
                      placeholder="Ex: Andasibe-Mantadia"
                      type="text"
                      value={day.lieu || ""}
                      setValue={(value) => updateDay(day.id, "lieu", value)}
                      icon={<MapPin className="h-4 w-4" />}
                    />

                    <Field
                      label="Nombre de nuitées"
                      id={`nuitees-${day.id}`}
                      name={`nuitees-${day.id}`}
                      placeholder="2"
                      type="number"
                      min={1}
                      value={day.nuitees || 1}
                      setValue={(value) =>
                        updateDay(day.id, "nuitees", parseInt(value) || 1)
                      }
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>

                  {/* Indicateur visuel du séjour */}
                  {day.lieu && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center justify-center text-sm text-green-800">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="font-medium">{day.lieu}</span>
                      </div>
                      {day.nuitees && (
                        <div className="flex justify-center mt-2 text-xs text-green-600">
                          <span>
                            {day.nuitees} nuitée{day.nuitees > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description de l'étape
                </Label>
                <div className="relative">
                  <LandPlot className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    placeholder={
                      day.type === "trajet"
                        ? "Décrivez les points d'intérêt sur le trajet, pauses prévues..."
                        : "Décrivez les activités prévues, points d'intérêt, hébergement..."
                    }
                    value={day.description}
                    onChange={(e) =>
                      updateDay(day.id, "description", e.target.value)
                    }
                    className="pl-10 min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Boutons d'ajout */}
      <div className="flex gap-3 justify-center">
        <Button
          type="button"
          onClick={() => addDay("trajet")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Route className="h-4 w-4 mr-2" />
          Ajouter un trajet
        </Button>

        <Button
          type="button"
          onClick={() => addDay("sejour")}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Ajouter un séjour
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;
