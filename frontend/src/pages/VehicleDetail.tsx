import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_VEHICULE_BY_ID } from "@/graphql/queries";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Car,
  Fuel,
  Shield,
  Settings,
  Check,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";
import { Vehicule } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [dateDebut, setDateDebut] = useState<Date>();
  const [dateFin, setDateFin] = useState<Date>();
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    loading,
    error: queryError,
    data,
  } = useQuery(GET_VEHICULE_BY_ID, {
    variables: { id },
    skip: !id,
  });

  // Mutations temporairement désactivées - à implémenter dans le backend
  const reservationLoading = false;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Détails du Véhicule | Madagascar Voyage";
  }, []);

  // Reset selected image index when data changes
  useEffect(() => {
    if (data?.vehicule) {
      setSelectedImageIndex(0);
    }
  }, [data]);

  const handleReservation = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/location-4x4/${id}` } });
      return;
    }

    if (!dateDebut || !dateFin) {
      setError("Veuillez sélectionner des dates valides");
      return;
    }

    // Simulation de réservation - à remplacer par la vraie mutation
    setError(null);
    alert(
      `Réservation simulée pour le véhicule ${data?.vehicule.marque} ${
        data?.vehicule.modele
      } du ${dateDebut.toLocaleDateString()} au ${dateFin.toLocaleDateString()}`
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Chargement du véhicule...</p>
        </main>
        <Footer />
      </div>
    );

  if (queryError || !data?.vehicule)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Véhicule non trouvé</p>
        </main>
        <Footer />
      </div>
    );

  const vehicle = data.vehicule;

  // Amélioration de la gestion des images
  const getVehicleImages = () => {
    // Si le véhicule a des images
    if (
      vehicle.image &&
      Array.isArray(vehicle.image) &&
      vehicle.image.length > 0
    ) {
      return vehicle.image
        .filter((img) => img && img.image) // Filtrer les images valides
        .map((img) => {
          // Gérer différents formats d'URL
          const imagePath = img.image;
          if (imagePath.startsWith("http")) {
            return imagePath; // URL complète
          } else {
            // URL relative
            return `http://localhost:8000/media/${imagePath}`;
          }
        });
    }

    // Image par défaut si aucune image
    return ["/placeholder.svg"];
  };

  const allVehiculeImages = getVehicleImages();

  // Gestion des erreurs d'images
  const handleImageError = (index: number) => {
    console.warn(
      `Erreur de chargement de l'image ${index}: ${allVehiculeImages[index]}`
    );

    // Si c'est l'image principale qui a échoué, passer à la suivante
    if (index === selectedImageIndex && allVehiculeImages.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % allVehiculeImages.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations du véhicule */}
            <div className="lg:col-span-2">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl group">
                  <img
                    src={allVehiculeImages[selectedImageIndex]}
                    alt={`${vehicle.marque} ${vehicle.modele} - Image ${
                      selectedImageIndex + 1
                    }`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(selectedImageIndex)}
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Indicateur du nombre d'images */}
                  {allVehiculeImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {selectedImageIndex + 1} / {allVehiculeImages.length}
                    </div>
                  )}
                </div>

                {/* Miniatures */}
                {allVehiculeImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {allVehiculeImages.slice(0, 8).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImageIndex === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Vue ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={() =>
                            console.warn(`Erreur miniature ${index}`)
                          }
                          loading="lazy"
                        />
                      </button>
                    ))}
                    {allVehiculeImages.length > 8 && (
                      <div className="flex-shrink-0 w-20 h-16 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        +{allVehiculeImages.length - 8}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation par flèches (optionnel) */}
                {allVehiculeImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? allVehiculeImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Image précédente"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (prev) => (prev + 1) % allVehiculeImages.length
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Image suivante"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">
                  {vehicle.marque} {vehicle.modele} ({vehicle.annee})
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Car className="w-5 h-5 mr-2 text-primary" />
                    <span>{vehicle.type?.libelle || "Non spécifié"}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    <span>
                      {vehicle.capacite?.nombrePlaces || "N/A"} places
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    <span>État: {vehicle.etat || "Non spécifié"}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 mr-2 text-primary" />
                    <span>Immat: {vehicle.immatriculation || "N/A"}</span>
                  </div>
                </div>

                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="caracteristiques">
                      Caractéristiques
                    </TabsTrigger>
                    <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-4">
                    <p className="text-gray-600">
                      {vehicle.description ||
                        `Véhicule ${vehicle.type?.libelle || ""} ${
                          vehicle.marque
                        } ${vehicle.modele} de ${vehicle.annee}. 
                      Idéal pour explorer Madagascar en toute liberté.`}
                    </p>
                  </TabsContent>

                  <TabsContent value="caracteristiques" className="mt-4">
                    <ul className="list-disc list-inside space-y-2">
                      {(
                        vehicle.caracteristiques || [
                          "4x4 permanent",
                          "Climatisation",
                          "GPS",
                          "Kit de secours",
                          "Roues de secours",
                        ]
                      ).map((carac, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 mr-2 text-primary" />
                          {carac}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="conditions" className="mt-4">
                    <ul className="list-disc list-inside space-y-2">
                      {(
                        vehicle.conditions_location || [
                          "Permis B obligatoire",
                          "Assurance tous risques incluse",
                          "Kilométrage illimité",
                          "Franchise : 500€",
                          "Caution : 1000€",
                        ]
                      ).map((condition, index) => (
                        <li key={index} className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-primary" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Réservation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Réserver ce véhicule
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dates de location
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateDebut && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateDebut
                                ? format(dateDebut, "P", { locale: fr })
                                : "Début"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={dateDebut}
                              onSelect={setDateDebut}
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateFin && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateFin
                                ? format(dateFin, "P", { locale: fr })
                                : "Fin"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={dateFin}
                              onSelect={setDateFin}
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {dateDebut && dateFin && (
                      <Alert variant="default">
                        <AlertDescription>
                          Vérification de disponibilité en cours de
                          développement. Vous pouvez procéder à la réservation.
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600">
                          Prix par jour
                        </span>
                        <span className="font-semibold">
                          {vehicle.prix?.toLocaleString("fr-FR") || "N/A"} Ar
                        </span>
                      </div>

                      {dateDebut && dateFin && vehicle.prix && (
                        <>
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-600">
                              Nombre de jours
                            </span>
                            <span className="font-semibold">
                              {Math.ceil(
                                (dateFin.getTime() - dateDebut.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              jours
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-xl font-bold text-primary">
                              {(
                                Math.ceil(
                                  (dateFin.getTime() - dateDebut.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                ) * vehicle.prix
                              ).toLocaleString("fr-FR")}{" "}
                              Ar
                            </span>
                          </div>
                        </>
                      )}

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleReservation}
                        disabled={!dateDebut || !dateFin || reservationLoading}
                      >
                        {reservationLoading
                          ? "Réservation en cours..."
                          : "Réserver maintenant"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
