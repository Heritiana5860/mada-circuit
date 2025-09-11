import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_VEHICULE_BY_ID, GET_VEHICULE_BY_NODE_ID } from "@/graphql/queries";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Car,
  Hash,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Share2,
  Heart,
} from "lucide-react";
import { useVehicleReservation } from "@/hooks/useVehicleReservation";
import { formatPrice } from "@/helper/formatage";
import { StatistiqueReservationContext } from "@/provider/DataContext";
import { urlMedia } from "@/helper/UrlImage";

// Fonction pour décoder l'ID Relay
const decodeRelayId = (relayId: string): string => {
  try {
    const decoded = atob(relayId);
    const parts = decoded.split(":");
    return parts[1] || relayId;
  } catch {
    return relayId;
  }
};

// Fonction pour obtenir l'icône de l'état
const getEtatIcon = (etat: string) => {
  const etatLower = etat.toLowerCase();
  if (
    etatLower.includes("disponible") ||
    etatLower.includes("bon") ||
    etatLower.includes("excellent")
  ) {
    return <CheckCircle className="w-5 h-5 mr-2 text-green-600" />;
  } else if (
    etatLower.includes("maintenance") ||
    etatLower.includes("réparation") ||
    etatLower.includes("indisponible")
  ) {
    return <XCircle className="w-5 h-5 mr-2 text-red-600" />;
  } else {
    return <CheckCircle className="w-5 h-5 mr-2 text-primary" />;
  }
};

const getCapacite = (vehicle) => {
  // Si capacite est un objet avec nombrePlaces
  if (
    vehicle.capacite &&
    typeof vehicle.capacite === "object" &&
    vehicle.capacite.nombrePlaces
  ) {
    return vehicle.capacite.nombrePlaces;
  }
  // Si capacite est directement un nombre
  if (typeof vehicle.capacite === "number") {
    return vehicle.capacite;
  }
  // Fallback
  return 0;
};

// Fonction pour générer une description enrichie
const generateDescription = (vehicle) => {
  const typeVehicule = vehicle.type.toLowerCase();
  const marque = vehicle.marque;
  const modele = vehicle.modele;
  const annee = vehicle.annee;
  const places = getCapacite(vehicle);

  let description = `Découvrez notre ${typeVehicule} ${marque} ${modele} de ${annee}, `;

  if (typeVehicule.includes("4x4")) {
    description += `parfaitement équipé pour l'aventure malgache. Ce véhicule tout-terrain vous permettra d'explorer les routes les plus difficiles de Madagascar en toute sécurité. `;
  } else if (
    typeVehicule.includes("berline") ||
    typeVehicule.includes("citadine")
  ) {
    description += `idéal pour vos déplacements urbains et périurbains à Madagascar. Confortable et économique, ce véhicule est parfait pour découvrir les villes malgaches. `;
  } else if (typeVehicule.includes("suv")) {
    description += `combinant confort et robustesse pour tous vos trajets à Madagascar. Ce SUV offre une excellente tenue de route sur tous types de terrains. `;
  } else {
    description += `parfaitement adapté à vos besoins de déplacement à Madagascar. `;
  }

  description += `Avec ses ${places} places, il convient parfaitement `;

  if (places <= 2) {
    description += `pour un voyage en couple ou en solo, offrant intimité et agilité sur les routes malgaches.`;
  } else if (places <= 5) {
    description += `pour une famille ou un petit groupe d'amis souhaitant explorer Madagascar ensemble.`;
  } else {
    description += `pour un groupe plus important, idéal pour les excursions familiales ou entre amis à travers l'île.`;
  }

  description += ` Ce véhicule est régulièrement entretenu et vérifié pour garantir votre sécurité et votre confort durant votre séjour à Madagascar.`;

  return description;
};

const VehicleDetailSimple = () => {
  const { id: rawId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Actualiser l'affichage de la liste reservation
  const { refetchReservations } = useContext(StatistiqueReservationContext);

  // Décoder l'ID si c'est un ID Relay
  const id = rawId ? decodeRelayId(rawId) : rawId;
  const [formData, setFormData] = useState({
    dateDebut: "",
    dateFin: "",
    commentaire: "",
    personne: 1,
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { createReservation, loading: reservationLoading } =
    useVehicleReservation();

  // Essayer d'abord avec l'ID décodé
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(GET_VEHICULE_BY_ID, {
    variables: { id },
    skip: !id,
  });

  // Si ça échoue, essayer avec l'ID Relay original
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(GET_VEHICULE_BY_NODE_ID, {
    variables: { id: rawId },
    skip: !rawId || !error1,
  });

  // Utiliser les données de la requête qui a réussi
  const loading = loading1 || loading2;
  const queryError = error1 && error2 ? error1 : null;
  const data = data1?.vehicule
    ? { vehicule: data1.vehicule }
    : data2?.node
    ? { vehicule: data2.node }
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Détails du Véhicule | Madagascar Voyage";
  }, []);

  // Fonction pour calculer le nombre de jours
  const calculateDays = (dateDebut: string, dateFin: string): number => {
    if (!dateDebut || !dateFin) return 0;
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Fonction pour calculer le prix total
  const calculateTotal = (): number => {
    const days = calculateDays(formData.dateDebut, formData.dateFin);
    return days > 0 ? days * (data?.vehicule?.prix || 0) : 0;
  };

  // Gestion des changements dans le formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Réinitialiser l'erreur quand l'utilisateur modifie les champs
    if (error) setError(null);
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    if (!formData.dateDebut) {
      setError("Veuillez sélectionner une date de début");
      return false;
    }

    if (!formData.dateFin) {
      setError("Veuillez sélectionner une date de fin");
      return false;
    }

    if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
      setError("La date de fin doit être postérieure à la date de début");
      return false;
    }

    if (formData.personne < 1) {
      setError("Le nombre de personnes doit être d'au moins 1");
      return false;
    }

    const maxPlaces = getCapacite(data?.vehicule);
    if (formData.personne > maxPlaces) {
      setError(
        `Le nombre de personnes ne peut pas excéder ${maxPlaces} places`
      );
      return false;
    }

    return true;
  };

  // Gestion de la soumission du formulaire
  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/location-4x4/${rawId}` } });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const total = calculateTotal();

      const reservationData = {
        utilisateurId: user?.id || "USER_ID_PLACEHOLDER",
        vehiculeId: id,
        dateDepart: formData.dateDebut,
        dateFin: formData.dateFin,
        nombrePersonnes: parseInt(formData.personne.toString()),
        commentaire: formData.commentaire,
        budget: total.toString(),
      };

      await createReservation(reservationData);
      await refetchReservations();

      // Réinitialiser le formulaire après succès
      setFormData({
        dateDebut: "",
        dateFin: "",
        commentaire: "",
        personne: 1,
      });
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
      setError(
        "Une erreur s'est produite lors de la réservation. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="text-center">
            <p className="text-xl mb-4">Véhicule non trouvé</p>
            <p className="text-gray-600 mb-2">ID original: {rawId}</p>
            <p className="text-gray-600 mb-2">ID décodé: {id}</p>
            <p className="text-gray-600 mb-2">
              Erreur requête 1: {error1?.message}
            </p>
            <p className="text-gray-600 mb-2">
              Erreur requête 2: {error2?.message}
            </p>
            <p className="text-gray-600 mb-4">
              Data1: {data1 ? "Trouvé" : "Non trouvé"}
            </p>
            <p className="text-gray-600 mb-4">
              Data2: {data2 ? "Trouvé" : "Non trouvé"}
            </p>
            <Button onClick={() => navigate("/location-4x4")}>
              Retour à la liste des véhicules
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );

  const vehicle = data.vehicule;
  const days = calculateDays(formData.dateDebut, formData.dateFin);
  const total = calculateTotal();

  // Gestion des images
  const getVehicleImages = () => {
    if (
      vehicle.images &&
      Array.isArray(vehicle.images) &&
      vehicle.images.length > 0
    ) {
      return vehicle.images
        .filter((img) => img && img.image)
        .map((img) => {
          const imagePath = img.image;
          if (imagePath.startsWith("http")) {
            return imagePath;
          } else {
            return `${urlMedia}${imagePath}`;
          }
        });
    }

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
          <div>
            {/* Informations du véhicule */}
            <div>
              <div className="relative mb-10">
                <div className="w-full h-96 relative overflow-hidden rounded-2xl group">
                  <img
                    src={allVehiculeImages[selectedImageIndex]}
                    alt={`${vehicle.marque} ${vehicle.modele} - Image ${
                      selectedImageIndex + 1
                    }`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(selectedImageIndex)}
                    loading="lazy"
                  />

                  {/* Indicateur du nombre d'images */}
                  {allVehiculeImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {selectedImageIndex + 1} / {allVehiculeImages.length}
                    </div>
                  )}
                </div>

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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                  {vehicle.marque} {vehicle.modele} ({vehicle.annee})
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Car className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">Type</span>
                      <span className="font-medium">{vehicle.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Capacité
                      </span>
                      <span className="font-medium">
                        {getCapacite(vehicle)} places
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    {getEtatIcon(vehicle.etat)}
                    <div>
                      <span className="text-sm text-gray-500 block">État</span>
                      <span className="font-medium">{vehicle.etat}</span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Hash className="w-5 h-5 mr-3 text-purple-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">
                        Immatriculation
                      </span>
                      <span className="font-medium font-mono">
                        {vehicle.immatriculation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {generateDescription(vehicle)}
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      <strong>Année de mise en circulation :</strong>{" "}
                      {vehicle.annee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Réservation */}
              <div>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800 border-b pb-3">
                      Réservation
                    </h2>

                    <form onSubmit={handleReservation} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Date de début
                        </label>
                        <input
                          type="date"
                          name="dateDebut"
                          value={formData.dateDebut}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Date de fin
                        </label>
                        <input
                          type="date"
                          name="dateFin"
                          value={formData.dateFin}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min={
                            formData.dateDebut ||
                            new Date().toISOString().split("T")[0]
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Nombre de personnes
                        </label>
                        <input
                          type="number"
                          name="personne"
                          value={formData.personne}
                          onChange={handleInputChange}
                          min="1"
                          max={getCapacite(vehicle)}
                          placeholder="Combien de personnes ?"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Message (optionnel)
                        </label>
                        <textarea
                          name="commentaire"
                          value={formData.commentaire}
                          onChange={handleInputChange}
                          placeholder="Ajouter un message ou une demande spéciale"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <XCircle className="w-4 h-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-600">
                            Prix par jour
                          </span>
                          <span className="font-semibold text-lg">
                            {formatPrice(vehicle.prix)}
                          </span>
                        </div>

                        {days > 0 && (
                          <>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm text-gray-600">
                                Nombre de jours
                              </span>
                              <span className="font-semibold">
                                {days} {days > 1 ? "jours" : "jour"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-6 p-3 bg-blue-50 rounded-lg">
                              <span className="text-lg font-semibold text-gray-800">
                                Total
                              </span>
                              <span className="text-2xl font-bold text-blue-600">
                                {total.toLocaleString("fr-FR")} Ar
                              </span>
                            </div>
                          </>
                        )}

                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                          size="lg"
                          disabled={
                            !isAuthenticated
                              ? false
                              : isSubmitting ||
                                reservationLoading ||
                                !formData.dateDebut ||
                                !formData.dateFin ||
                                formData.personne < 1
                          }
                        >
                          {isSubmitting || reservationLoading
                            ? "Réservation en cours..."
                            : !isAuthenticated
                            ? "Se connecter pour réserver"
                            : "Réserver maintenant"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetailSimple;
