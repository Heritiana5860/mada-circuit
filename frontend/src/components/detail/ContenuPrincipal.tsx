import { Car, Clock, MapPin, Ship, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface Destination {
  nom: string;
}

interface Itineraire {
  lieuDepart: string;
  lieuArrivee: string;
  description: string;
  distanceKm: string;
  dureeTrajet: string;
}

interface DataProps {
  titre?: string;
  destination?: Destination;
  duree?: number;
  difficulte?: string;
  transport?: string;
  description?: string;
  itineraires?: Itineraire[];
  inclus?: string;
  nonInclus?: string;
}

interface ContenuPrincipalProps {
  dataFromState: DataProps;
}

const ContenuPrincipal: React.FC<ContenuPrincipalProps> = ({
  dataFromState,
}) => {
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
              {dataFromState.duree} jours
            </Badge>
          )}
          {dataFromState?.difficulte && (
            <Badge variant="outline">
              Difficulté : {dataFromState.difficulte}
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
              {dataFromState.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Itinéraire */}
      {dataFromState?.itineraires && (
        <Card>
          <CardHeader>
            <CardTitle>Itinéraire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataFromState.itineraires.map((item, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    {item.lieuArrivee ? (
                      <h4 className="font-semibold text-gray-900 font-sans pb-3">
                        {item.lieuDepart} → {item.lieuArrivee}
                      </h4>
                    ) : (
                      <h4 className="font-semibold text-gray-900 font-sans pb-3">
                        {item.lieuDepart}
                      </h4>
                    )}

                    <div className="mb-4">
                      {item.distanceKm && (
                        <span className="inline-flex items-center text-sm">
                          <Waves className="text-gray-600 h-4 w-4 mr-1" />
                          {item.distanceKm} Km
                        </span>
                      )}
                      {item.dureeTrajet && (
                        <span className="inline-flex items-center text-sm ml-3">
                          <Clock className="text-gray-600 h-4 w-4 mr-1" />
                          {item.dureeTrajet} H
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
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
                Inclus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dataFromState.inclus.split(";").map((item, index) => (
                  <li key={index} className="flex items-center text-green-700">
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
                Non inclus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dataFromState.nonInclus.split(";").map((item, index) => (
                  <li key={index} className="flex items-center text-red-700">
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
