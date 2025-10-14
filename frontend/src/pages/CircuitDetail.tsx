import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Loader2, Calendar } from "lucide-react";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@apollo/client";
import { CREATE_RESERVATION } from "@/graphql/mutations";
import BoutonRetoureDetail from "@/components/detail/BoutonRetourDetail";
import DetailCarousel from "@/components/detail/DetailCarousel";
import ContenuPrincipal from "@/components/detail/ContenuPrincipal";
import DateDetail from "@/components/detail/DateDetail";
import NombrePersonneDetail from "@/components/detail/NombrePersonneDetail";
import ContactInfoDetail from "@/components/detail/ContactInfoDetail";
import { getCircuitImages } from "@/helper/GestionImages";
import { StatistiqueReservationContext } from "@/provider/DataContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import {
  calculateMapBounds,
  geocodeAllRegions,
  getConnectionCoordinates,
} from "@/helper/FonctionMap";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const CircuitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  const location = useLocation();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dateDepart: "",
    dateArrive: "",
    voyageur: 1,
    commentaire: "",
  });

  // State pour le map
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mapErrors, setMapErrors] = useState([]);
  const [showConnections, setShowConnections] = useState(true);

  // Actualiser l'affichage de la liste reservation
  const { refetchReservations } = useContext(StatistiqueReservationContext);

  const circuitFromState = location.state?.dataState;

  const allCircuitImages = getCircuitImages(circuitFromState.images);

  // Navigation du carousel
  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === allCircuitImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? allCircuitImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setSelectedImageIndex(index);
  };

  // Gestion des erreurs d'images
  const handleImageError = (index: number) => {
    console.warn(
      `Erreur de chargement de l'image ${index}: ${allCircuitImages[index]}`
    );

    // Si c'est l'image principale qui a échoué, passer à la suivante
    if (index === selectedImageIndex && allCircuitImages.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % allCircuitImages.length);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Validation du formulaire améliorée
  const validateForm = (): boolean => {
    if (!formData.dateDepart) {
      setErrors("Veuillez sélectionner une date de début");
      return false;
    }

    if (!formData.dateArrive) {
      setErrors("Veuillez sélectionner une date de fin");
      return false;
    }

    const startDate = new Date(formData.dateDepart);
    const endDate = new Date(formData.dateArrive);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setErrors("La date de début ne peut pas être dans le passé");
      return false;
    }

    if (startDate >= endDate) {
      setErrors("La date de fin doit être postérieure à la date de début");
      return false;
    }

    if (guestCount < 1) {
      setErrors("Le nombre de personnes doit être d'au moins 1");
      return false;
    }

    if (guestCount > 12) {
      setErrors("Le nombre maximum de personnes est de 12");
      return false;
    }

    return true;
  };

  // Synchronisation avec les données du formulaire
  const [
    circuitReservation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_RESERVATION, {
    onCompleted: (data) => {
      setSuccessMessage(
        "Votre réservation a été enregistrée avec succès ! Nous vous contacterons bientôt."
      );
      setErrors(null);

      // Réinitialiser le formulaire après succès
      setFormData({
        dateDepart: "",
        dateArrive: "",
        voyageur: 1,
        commentaire: "",
      });
      setGuestCount(1);
    },
    onError: (error) => {
      console.error("Erreur lors de la réservation:", error);
      setErrors(
        error.message ||
          "Une erreur s'est produite lors de la réservation. Veuillez réessayer."
      );
      setSuccessMessage(null);
    },
  });

  // Fonction de réservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/circuit/${id}` } });
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!user?.id) {
      setErrors("Erreur d'authentification. Veuillez vous reconnecter.");
      return;
    }

    setIsSubmitting(true);
    setErrors(null);
    setSuccessMessage(null);

    try {
      // Données corrigées pour la mutation
      const reservationData = {
        utilisateurId: user.id,
        circuitId: id,
        vehiculeId: null,
        dateDepart: formData.dateDepart,
        dateFin: formData.dateArrive,
        nombrePersonnes: guestCount,
        budget: totalPrice.toString(),
        commentaire: formData.commentaire || "",
      };

      await circuitReservation({
        variables: reservationData,
      });
      await refetchReservations();
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
    } finally {
      setIsSubmitting(false);
    }

    if (mutationLoading) return <ContentLoading />;
    if (mutationError) return <ContentError />;
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

    // Réinitialiser les messages quand l'utilisateur modifie les champs
    if (errors) setErrors(null);
    if (successMessage) setSuccessMessage(null);
  };

  // Fonction pour gérer les boutons + et -
  const handleGuestCountChange = (increment: boolean) => {
    if (increment) {
      setGuestCount(Math.min(1200, guestCount + 1));
    } else {
      setGuestCount(Math.max(1, guestCount - 1));
    }
  };

  // Fonction pour calculer le nombre de jours
  const calculateDays = (dateDebut: string, dateFin: string): number => {
    if (!dateDebut || !dateFin) return 0;
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays(formData.dateDepart, formData.dateArrive);
  const totalPrice = circuitFromState.prix * guestCount;

  const regions = circuitFromState.destination;
  const regionsCircuit = regions.split(",");

  // Géocoder toutes les régions
  useEffect(() => {
    geocodeAllRegions(
      regionsCircuit,
      setLoading,
      setLocations,
      setMapErrors,
      setProgress
    );
  }, []);

  // Créer les coordonnées pour les lignes
  getConnectionCoordinates(locations);
  // Calculer le centre de la carte
  calculateMapBounds(locations);

  //Créer des icônes numérotées pour montrer l'ordre
  const createNumberedIcon = (number) => {
    return L.divIcon({
      html: `<div style="background-color: #3B82F6; color: white; border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${number}</div>`,
      className: "custom-div-icon",
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 z-4">
      <NavBar />

      {/* Bouton retour */}
      <BoutonRetoureDetail />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="grid-cols-1 lg:col-span-2">
              <DetailCarousel
                isImageLoading={isImageLoading}
                allImages={allCircuitImages}
                selectedImageIndex={selectedImageIndex}
                handleImageError={handleImageError}
                handleImageLoad={handleImageLoad}
                prevImage={prevImage}
                nextImage={nextImage}
                goToSlide={goToSlide}
              />
            </div>

            {/* map */}
            <div className="grid-cols-1 mb-3 lg:col-span-1">
              {loading ? (
                <div className="mb-3 p-4 bg-white rounded-lg shadow border border-gray-200 ">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Spinner */}
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    {/* Texte de progression */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {t("common.loading", "Chargement...")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t(
                          "common.please",
                          "Veuillez patienter, traitement des données en cours."
                        )}
                      </span>
                    </div>

                    {/* Pourcentage */}
                    <div className="ml-auto text-sm font-semibold text-blue-600">
                      {progress.toFixed(0)}%
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={
                    locations.length > 0
                      ? calculateMapBounds(locations)
                      : [-18.8792, 47.5079]
                  }
                  zoom={locations.length > 0 ? 6 : 6}
                  scrollWheelZoom={true}
                  className="rounded-lg h-64 md:h-96 lg:h-[500px]"
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* Les lignes de connexion (Polyline) */}
                  {showConnections && locations.length > 1 && (
                    <Polyline
                      positions={getConnectionCoordinates(locations)}
                      pathOptions={{
                        color: "#3B82F6",
                        weight: 3,
                        opacity: 0.8,
                        dashArray: "10, 5",
                      }}
                    />
                  )}

                  {/* Les marqueurs numérotés */}
                  {locations.map((location, index) => (
                    <Marker
                      key={index}
                      position={[location.lat, location.lng]}
                      icon={createNumberedIcon(index + 1)}
                    >
                      <Popup maxWidth={280} className="custom-popup">
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              #{index + 1}
                            </span>
                            {index === 0 && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                🚀 DÉPART
                              </span>
                            )}
                            {index === locations.length - 1 && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                🏁 ARRIVÉE
                              </span>
                            )}
                            {index > 0 && index < locations.length - 1 && (
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                🛑 ÉTAPE
                              </span>
                            )}
                          </div>

                          <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                            {location.name}
                          </h4>

                          {location.fullName && (
                            <p className="text-sm text-gray-600 mb-2">
                              {location.fullName}
                            </p>
                          )}

                          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mt-2">
                            Lat: {location.lat.toFixed(4)}, Lng:{" "}
                            {location.lng.toFixed(4)}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <ContenuPrincipal dataFromState={circuitFromState} />

            {/* Sidebar de réservation */}
            <form className="lg:col-span-1 z-2">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center justify-between">
                    <p className="border-b pb-3">
                      {t("pages.circuits.reservation", "Réservation")}
                    </p>
                    {/* {circuitFromState?.prix && (
                      <p className="text-xl font-bold font-sans pt-3">
                        {formatPrice(circuitFromState.prix)}{" "}
                        <span className="text-sm font-normal text-gray-500">
                          /personne
                        </span>
                      </p>
                    )} */}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date de depart */}
                  <DateDetail
                    label={t("common.StartedDate", "Date de début")}
                    name="dateDepart"
                    value={formData.dateDepart}
                    handleInputChange={handleInputChange}
                    required
                  />

                  {/* Date de fin */}
                  <DateDetail
                    label={t("common.EndDate", "Date de fin")}
                    name="dateArrive"
                    value={formData.dateArrive}
                    handleInputChange={handleInputChange}
                    required
                    min={formData.dateDepart}
                  />

                  {/* Nombre de participants */}
                  <NombrePersonneDetail
                    label={t("common.nbrPerson", "Nombre de personne")}
                    name="voyageur"
                    guestCount={guestCount}
                    handleGuestCountChange={handleGuestCountChange}
                  />

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Message ({t("common.optionnel", "optionnel")})
                    </label>
                    <textarea
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleInputChange}
                      placeholder={t(
                        "pages.circuits.special",
                        "Demandes spéciales, etc..."
                      )}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Récapitulatif */}
                  {days > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {t("pages.circuits.duration", "Durée")}
                        </span>
                        <span className="font-medium">
                          {days}{" "}
                          {days > 1
                            ? `${t("common.days", "Jours")}`
                            : `${t("common.day", "Jour")}`}
                        </span>
                      </div>
                      {/* <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Prix par personne</span>
                        <span className="font-medium">
                          {formatPrice(circuitFromState.prix)}
                        </span>
                      </div> */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {t("common.nbrPerson", "Nombre de personnes")}
                        </span>
                        <span className="font-medium">{guestCount}</span>
                      </div>
                      {/* <div className="border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div> */}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || mutationLoading}
                  >
                    {isAuthenticated ? (
                      isSubmitting || mutationLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          {t("common.loading", "Chargement...")}
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5 mr-2" />
                          {t("pages.circuits.book", "Réserver maintenant")}
                        </>
                      )
                    ) : (
                      t("common.log", "Se connecter pour réserver")
                    )}
                  </Button>

                  {/* Informations de contact */}
                  <ContactInfoDetail />
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CircuitDetail;
