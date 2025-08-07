import { useQuery } from "@apollo/client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { GET_CIRCUIT_BY_ID } from "../graphql/queries";
import NavBar from "@/components/NavBar";
import {
  Clock,
  Compass,
  Loader2,
  MapPin,
  Star,
  Users,
  Calendar,
  Heart,
  Share2,
  Camera,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  ArrowLeft,
  Zap,
  Shield,
  Award,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Circuit } from "@/types";
import { formatPrice } from "@/helper/formatage";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, gql } from "@apollo/client";
import { CREATE_CIRCUIT_RESERVATION } from "@/graphql/mutations";

const CircuitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dateDepart: "",
    dateArrive: "",
    voyageur: 1,
    commentaire: "",
  });

  // Synchronisation avec les données du formulaire
  const [
    circuitReservation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_CIRCUIT_RESERVATION, {
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

  const circuitFromState = location.state?.circuit as Circuit;

  const {
    loading: loadingCircuit,
    error: errorCircuit,
    data: dataCircuit,
  } = useQuery(GET_CIRCUIT_BY_ID, {
    variables: { id },
    skip: !id || !!circuitFromState,
  });

  useEffect(() => {
    if (circuitFromState) {
      console.log("Circuit from state:", circuitFromState);
      setCircuit(circuitFromState);
    } else if (dataCircuit?.circuit) {
      console.log("Circuit from GraphQL:", dataCircuit.circuit);
      setCircuit(dataCircuit.circuit);
    }
  }, [circuitFromState, dataCircuit]);

  // Synchroniser le nombre de voyageurs avec le formulaire
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      voyageur: guestCount,
    }));
  }, [guestCount]);

  // États de chargement et d'erreur
  if (!circuitFromState && loadingCircuit) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Chargement du circuit</h3>
              <p className="text-muted-foreground">Veuillez patienter...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!circuitFromState && errorCircuit) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="bg-red-50 p-4 rounded-full w-fit mx-auto">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600">
                Erreur de chargement
              </h3>
              <p className="text-muted-foreground">
                Impossible de charger les détails du circuit.
              </p>
              <Button onClick={() => navigate(-1)} className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="bg-gray-50 p-4 rounded-full w-fit mx-auto">
              <Info className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Circuit introuvable</h3>
              <p className="text-muted-foreground">
                Le circuit demandé n'existe pas ou n'est plus disponible.
              </p>
              <Button onClick={() => navigate(-1)} className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Gestion des images
  const getCircuitImages = () => {
    if (
      circuit.images &&
      Array.isArray(circuit.images) &&
      circuit.images.length > 0
    ) {
      return circuit.images
        .filter((img) => img && img.image)
        .map((img) => {
          const imagePath = img.image;
          if (imagePath.startsWith("http")) {
            return imagePath;
          } else {
            return `http://localhost:8000/media/${imagePath}`;
          }
        });
    }

    return ["/placeholder.svg"];
  };

  const allCircuitImages = getCircuitImages();

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

  const displayData = {
    id: circuit.id,
    title: circuit.titre,
    location: `${circuit.destination.nom}, ${circuit.destination.region}`,
    duration: `${circuit.duree} jours`,
    price: circuit.prix,
    description: circuit.description,
    rating: 4.5,
    reviews: 24,
    highlights: circuit.pointsInteret,
    itineraires: circuit.itineraires || [],
    included: circuit.inclus,
    notIncluded: circuit.nonInclus,
    gallery: allCircuitImages,
  };

  const totalPrice = displayData.price * guestCount;

  // Fonction pour calculer le nombre de jours
  const calculateDays = (dateDebut: string, dateFin: string): number => {
    if (!dateDebut || !dateFin) return 0;
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays(formData.dateDepart, formData.dateArrive);

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

  // Correction de la fonction de soumission
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
        dateDepart: formData.dateDepart,
        dateFin: formData.dateArrive,
        nombrePersonnes: guestCount,
        commentaire: formData.commentaire || "",
        budget: totalPrice.toString(),
      };

      console.log("Données de réservation:", reservationData);

      await circuitReservation({
        variables: reservationData,
      });
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
      // L'erreur est gérée par onError de la mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour gérer les boutons + et -
  const handleGuestCountChange = (increment: boolean) => {
    if (increment) {
      setGuestCount(Math.min(12, guestCount + 1));
    } else {
      setGuestCount(Math.max(1, guestCount - 1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      {/* Bouton retour */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux circuits
          </Button>
        </div>
      </div>

      <main className="flex-grow">
        {/* Section Hero avec galerie d'images */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image principale */}
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl group">
                  <img
                    src={displayData.gallery[selectedImageIndex]}
                    alt={displayData.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(selectedImageIndex)}
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/40"
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
                      className="bg-white/20 hover:bg-white/40"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Indicateur du nombre d'images */}
                  {displayData.gallery.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {selectedImageIndex + 1} / {displayData.gallery.length}
                    </div>
                  )}
                </div>

                {/* Miniatures */}
                {displayData.gallery.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {displayData.gallery.slice(0, 8).map((img, index) => (
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
                    {displayData.gallery.length > 8 && (
                      <div className="flex-shrink-0 w-20 h-16 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        +{displayData.gallery.length - 8}
                      </div>
                    )}

                    {/* Navigation par flèches */}
                    {displayData.gallery.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === 0
                                ? displayData.gallery.length - 1
                                : prev - 1
                            )
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                          aria-label="Image précédente"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex(
                              (prev) => (prev + 1) % displayData.gallery.length
                            )
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                          aria-label="Image suivante"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Informations du circuit */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Circuit Premium
                      </Badge>
                      <h1 className="text-3xl font-bold font-sans text-gray-900 mb-2">
                        {displayData.title}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-primary" />
                      <span>{displayData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-primary" />
                      <span>{displayData.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-primary" />
                      <span>Groupe de 2-12 personnes</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= displayData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{displayData.rating}</span>
                    <span className="text-gray-600">
                      ({displayData.reviews} avis)
                    </span>
                  </div>
                </div>

                {/* Badges de confiance */}
                <div className="flex gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Annulation gratuite
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Guide certifié
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Confirmation immédiate
                  </Badge>
                </div>

                {/* Formulaire de réservation */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-primary/5 p-6 rounded-xl border border-primary/10"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(displayData.price)}
                    </span>
                    <span className="text-gray-600">/personne</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Tout inclus • Base chambre double
                  </p>

                  {/* Messages d'erreur et de succès */}
                  {errors && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-red-700">{errors}</span>
                      </div>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-700">
                          {successMessage}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date de départ
                        </label>
                        <input
                          type="date"
                          name="dateDepart"
                          value={formData.dateDepart}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date de fin
                        </label>
                        <input
                          type="date"
                          name="dateArrive"
                          value={formData.dateArrive}
                          onChange={handleInputChange}
                          min={
                            formData.dateDepart ||
                            new Date().toISOString().split("T")[0]
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Voyageurs
                      </label>
                      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleGuestCountChange(false)}
                          disabled={guestCount <= 1}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="voyageur"
                          value={guestCount}
                          readOnly
                          className="w-full text-center py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleGuestCountChange(true)}
                          disabled={guestCount >= 12}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum 12 personnes
                      </p>
                    </div>

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
                          <span className="text-gray-600">
                            Prix par personne
                          </span>
                          <span className="font-medium">
                            {formatPrice(displayData.price)}
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

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold"
                        disabled={isSubmitting || mutationLoading}
                      >
                        {isSubmitting || mutationLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Réservation en cours...
                          </>
                        ) : (
                          <>
                            <Calendar className="h-5 w-5 mr-2" />
                            Réserver maintenant
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section contenu avec onglets */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="flex bg-gray-100 rounded-xl p-1 w-fit">
                <TabsTrigger
                  value="overview"
                  className="px-6 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Aperçu
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="px-6 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Itinéraire
                </TabsTrigger>
                <TabsTrigger
                  value="inclusions"
                  className="px-6 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Inclusions
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-6 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Avis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold font-sans mb-4">
                      Description du circuit
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {displayData.description}
                    </p>

                    <h4 className="text-xl font-sans font-bold mb-4">
                      Points forts du voyage
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {displayData.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-primary/5 rounded-lg"
                        >
                          <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                          <span className="text-sm">{highlight.nom}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinéraire */}
              <TabsContent value="itinerary">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold font-sans mb-6">
                      Itinéraire détaillé
                    </h3>
                    <div className="space-y-6">
                      {displayData.itineraires.length > 0 ? (
                        displayData.itineraires.map((day, index) => (
                          <div key={index} className="relative">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                                  {index + 1}
                                </div>
                                {index < displayData.itineraires.length - 1 && (
                                  <div className="w-px h-12 bg-gray-200 mx-auto mt-4" />
                                )}
                              </div>
                              <div className="flex-grow pb-8">
                                <h4 className="text-lg font-semibold font-sans mb-2">
                                  {day.lieuDepart} → {day.lieuArrivee}
                                </h4>
                                <p className="pb-4 text-gray-600">
                                  ⏱️{day.dureeTrajet}H | 🛣️{day.distanceKm} Km
                                </p>
                                <p className="text-gray-600">
                                  {day.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">
                            Itinéraire détaillé bientôt disponible
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inclusions">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-sans font-bold mb-6 text-green-600">
                        Ce qui est inclus
                      </h3>
                      <ul className="space-y-3">
                        {displayData.included.split(",").map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-sans font-bold mb-6 text-red-600">
                        Non inclus
                      </h3>
                      <ul className="space-y-3">
                        {displayData.notIncluded
                          .split(",")
                          .map((item, index) => (
                            <li key={index} className="flex items-start">
                              <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{item.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-sans font-semibold mb-2">
                        Bientôt disponible
                      </h3>
                      <p className="text-gray-500">
                        Les avis clients seront bientôt disponibles
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Section contact/aide */}
        <section className="py-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Une question sur ce circuit ?
              </h3>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                Notre équipe d'experts est disponible pour vous accompagner dans
                votre projet de voyage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +261 34 12 345 67
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center border-white text-white bg-black/20 hover:bg-white hover:text-primary"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  contact@circuits.mg
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CircuitDetail;
