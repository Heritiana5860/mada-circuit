import { Car, Clock, MapPin, Moon, Ship, View, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";

interface Destination {
  nom: string;
}

interface Itineraire {
  lieuDepart: string;
  lieuArrivee: string;
  description: string;
  descriptionEn?: string;
  distanceKm: string;
  dureeTrajet: string;
  lieu: string;
  nuitees: number;
  isTrajet: boolean;
  isSejour: boolean;
}

interface DataProps {
  titre?: string;
  destination?: Destination;
  duree?: number;
  difficulte?: string;
  transport?: string;
  description?: string;
  descriptionEn?: string;
  itineraires?: Itineraire[];
  inclus?: string;
  inclusEn?: string;
  nonInclus?: string;
  nonInclusen?: string;
}

interface ContenuPrincipalProps {
  dataFromState: DataProps;
}

const ContenuPrincipal: React.FC<ContenuPrincipalProps> = ({
  dataFromState,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* En-tête */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-2">
              {dataFromState?.titre || "Circuit Pangalanes"}
            </h1>
            {dataFromState?.destination?.nom && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {dataFromState.destination.nom}
              </div>
            )}
          </div>
        </div>

        {/* Badges informatifs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {dataFromState?.duree && (
            <Badge variant="secondary" className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {dataFromState.duree} {t("common.days", "Jours")}
            </Badge>
          )}
          {dataFromState?.difficulte && (
            <Badge variant="outline">
              {t("common.difficulty", "Difficulty")} :{" "}
              {dataFromState.difficulte}
            </Badge>
          )}
          {dataFromState?.transport && (
            <Badge variant="secondary" className="flex items-center">
              {dataFromState?.transport == "VOITURE" ? (
                <Car className="h-3 w-3 mr-1" />
              ) : (
                <Ship className="h-3 w-3 mr-1" />
              )}
              En {dataFromState.transport.toLowerCase()}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      {dataFromState?.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {lang === "fr"
                ? dataFromState.description
                : dataFromState.descriptionEn}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Itinéraire */}
      {dataFromState?.itineraires && (
        <Card>
          <CardHeader>
            <CardTitle>{t("common.itinerary", "Itinerary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                let currentDay = 1;
                return dataFromState.itineraires?.map((item, index) => {
                  // Déterminer l’affichage des jours
                  let jourTexte = "";
                  if (item.isSejour && item.nuitees > 1) {
                    jourTexte = `${t("common.days", "Jours")} ${currentDay}-${
                      currentDay + item.nuitees - 1
                    }`;
                  } else {
                    jourTexte = `${t("common.day", "Jour")} ${currentDay}`;
                  }

                  // Incrémenter le compteur
                  currentDay +=
                    item.isSejour && item.nuitees > 0 ? item.nuitees : 1;

                  return (
                    <div key={index} className="flex">
                      {/* Affichage du jour */}
                      <div className="flex-shrink-0 h-8 bg-primary text-white rounded px-2 flex items-center justify-center text-sm font-semibold mr-4">
                        {jourTexte}
                      </div>

                      {/* Contenu */}
                      <div>
                        {item.isTrajet ? (
                          <h4 className="font-semibold text-blue-900 flex items-center pb-3">
                            <Car className="h-4 w-4 mr-2 text-blue-600" />
                            {item.lieuDepart} → {item.lieuArrivee}
                          </h4>
                        ) : (
                          <h4 className="font-semibold text-green-900 flex items-center pb-3">
                            <View className="h-4 w-4 mr-2 text-green-600" />
                            {item.lieu}
                          </h4>
                        )}

                        {/* Infos supplémentaires */}
                        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-700">
                          {item.distanceKm && (
                            <span className="flex items-center">
                              <Waves className="h-4 w-4 mr-1" />{" "}
                              {item.distanceKm} Km
                            </span>
                          )}
                          {item.dureeTrajet && (
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />{" "}
                              {item.dureeTrajet} H
                            </span>
                          )}
                          {item.nuitees && item.isSejour && (
                            <span className="flex items-center">
                              <Moon className="h-4 w-4 mr-1" /> {item.nuitees}{" "}
                              {item.nuitees > 1 ? "nuits" : "nuit"}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600">
                          {lang === "fr"
                            ? item.description
                            : item.descriptionEn}
                        </p>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inclus / Non inclus */}
      <div className="grid md:grid-cols-2 gap-4">
        {dataFromState?.inclus && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 border-b pb-3">
                {t("common.include", "Included")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lang === "fr"
                  ? dataFromState?.inclus?.split(";").map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-green-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                        {item.trim()}
                      </li>
                    ))
                  : dataFromState?.inclusEn?.split(";").map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-green-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                        {item.trim()}
                      </li>
                    ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {dataFromState?.nonInclus && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-800 border-b pb-3">
                {t("common.notInclude", "Not Included")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lang === "fr"
                  ? dataFromState?.nonInclus?.split(";").map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-red-700"
                      >
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3" />
                        {item.trim()}
                      </li>
                    ))
                  : dataFromState?.nonInclusen?.split(";").map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-red-700"
                      >
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3" />
                        {item.trim()}
                      </li>
                    ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContenuPrincipal;
