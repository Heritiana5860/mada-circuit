import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Loader2, Calendar } from "lucide-react";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { formatPrice } from "@/helper/formatage";
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

const CircuitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
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
      console.log("Réservation créée avec succès:", data);
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

    if (mutationLoading) return <p>Loading...</p>;
    if (mutationError) return <p>Error: {mutationError.message}</p>;
  };

  // Gestion des favoris
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Logique pour sauvegarder en favoris
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      {/* Bouton retour */}
      <BoutonRetoureDetail />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Carousel d'images amélioré */}
          <DetailCarousel
            isImageLoading={isImageLoading}
            allImages={allCircuitImages}
            selectedImageIndex={selectedImageIndex}
            handleImageError={handleImageError}
            handleImageLoad={handleImageLoad}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            prevImage={prevImage}
            nextImage={nextImage}
            goToSlide={goToSlide}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <ContenuPrincipal dataFromState={circuitFromState} />

            {/* Sidebar de réservation */}
            <form className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center justify-between">
                    <p className="border-b pb-3">Réservation</p>
                    {circuitFromState?.prix && (
                      <p className="text-xl font-bold font-sans pt-3">
                        {formatPrice(circuitFromState.prix)}{" "}
                        <span className="text-sm font-normal text-gray-500">
                          /personne
                        </span>
                      </p>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date de depart */}
                  <DateDetail
                    label="Date de depart"
                    name="dateDepart"
                    value={formData.dateDepart}
                    handleInputChange={handleInputChange}
                    required
                  />

                  {/* Date de fin */}
                  <DateDetail
                    label="Date de fin"
                    name="dateArrive"
                    value={formData.dateArrive}
                    handleInputChange={handleInputChange}
                    required
                    min={formData.dateDepart}
                  />

                  {/* Nombre de participants */}
                  <NombrePersonneDetail
                    label="Nombre de personne"
                    name="voyageur"
                    guestCount={guestCount}
                    handleGuestCountChange={handleGuestCountChange}
                  />

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleInputChange}
                      placeholder="Demandes spéciales, régimes alimentaires, etc..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Récapitulatif */}
                  {days > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-medium">
                          {days} {days > 1 ? "jours" : "jour"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Prix par personne</span>
                        <span className="font-medium">
                          {formatPrice(circuitFromState.prix)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          Nombre de personnes
                        </span>
                        <span className="font-medium">{guestCount}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
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
                          Réservation en cours...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5 mr-2" />
                          Réserver maintenant
                        </>
                      )
                    ) : (
                      "Se connecter pour réserver"
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
