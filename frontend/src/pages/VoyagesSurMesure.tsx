import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TestimonialCard from "../components/testimonia/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Compass,
  Check,
  Send,
  Quote,
  ChevronRight,
  ChevronLeft,
  Navigation,
  Route,
  Trash2,
  Plus,
  ArrowDown,
  Plane,
  X,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_TESTIMONIA_BY_STATUS } from "@/graphql/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NombrePersonneDetail from "@/components/detail/NombrePersonneDetail";
import { DataContext, FaqContext } from "@/provider/DataContext";
import { destinations } from "@/helper/AllRegions";

const VoyagesSurMesure = () => {
  const { data, loading, error } = useQuery(GET_TESTIMONIA_BY_STATUS, {
    variables: {
      status: true,
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [formData, setFormData] = useState({
    dateDebut: "",
    dateFin: "",
    voyageur: 1,
    duree: "",
    hebergement: "",
    activité: [],
    budget: "",
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    commentaire: "",
  });

  // State pour les destinations
  const [pointDepart, setPointDepart] = useState("");
  const [pointArrivee, setPointArrivee] = useState("");
  const [lieuxAVisiter, setLieuxAVisiter] = useState([]);
  const [showDestinationsList, setShowDestinationsList] = useState(false);
  const [activeSelection, setActiveSelection] = useState("");

  // Recuperer l'utilisateur afin d'afficher son image sur testimonia
  const {
    loading: utilisateurLoading,
    error: utilisateurError,
    utilisateur,
  } = useContext(DataContext);

  // Recuperer les FAQ
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Voyages Sur Mesure | Madagascar Voyage";
  }, []);

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const activities = [
    { name: "Randonnée", icon: <Compass className="h-5 w-5" /> },
    { name: "Plage", icon: <Compass className="h-5 w-5" /> },
    { name: "Safari", icon: <Compass className="h-5 w-5" /> },
    { name: "Plongée", icon: <Compass className="h-5 w-5" /> },
    { name: "Culture", icon: <Compass className="h-5 w-5" /> },
    { name: "Gastronomie", icon: <Compass className="h-5 w-5" /> },
  ];

  if (loading || utilisateurLoading || faqLoading) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">
              Chargement des témoignages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || utilisateurError || faqError) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur lors du chargement
              </h3>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const validateForm = (): boolean => {
    if (!formData.dateDebut) {
      setErrors("Veuillez sélectionner une date de début");
      return false;
    }

    if (!formData.dateFin) {
      setErrors("Veuillez sélectionner une date de fin");
      return false;
    }

    const startDate = new Date(formData.dateDebut);
    const endDate = new Date(formData.dateFin);
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

    return true;
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

  // Fonction pour calculer le nombre de jours
  const calculateDays = (dateDebut: string, dateFin: string): number => {
    if (!dateDebut || !dateFin) return 0;
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Fonction pour gérer les boutons + et -
  const handleGuestCountChange = (increment: boolean) => {
    if (increment) {
      setGuestCount(Math.min(1200, guestCount + 1));
    } else {
      setGuestCount(Math.max(1, guestCount - 1));
    }
  };

  const days = calculateDays(formData.dateDebut, formData.dateFin);

  const allData = data?.allTestimoniaByStatus || [];
  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  for (let i = 0; i < allData.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(allData.slice(i, i + testimonialsPerSlide));
  }

  const utilisateurImage = utilisateur?.image
    ? `http://localhost:8000/media/${utilisateur.image}`
    : null;

  const handleDestinationSelect = (destination) => {
    if (activeSelection === "depart") {
      setPointDepart(destination.name);
    } else if (activeSelection === "arrivee") {
      setPointArrivee(destination.name);
    } else if (activeSelection === "visite") {
      if (!lieuxAVisiter.find((lieu) => lieu.name === destination.name)) {
        setLieuxAVisiter([...lieuxAVisiter, destination]);
      }
    }
    setShowDestinationsList(false);
    setActiveSelection("");
  };

  const openDestinationsList = (type) => {
    setActiveSelection(type);
    setShowDestinationsList(true);
  };

  const removeLieuAVisiter = (indexToRemove) => {
    setLieuxAVisiter(
      lieuxAVisiter.filter((_, index) => index !== indexToRemove)
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "city":
        return <MapPin className="h-4 w-4" />;
      case "island":
        return <Navigation className="h-4 w-4" />;
      case "park":
        return <Route className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "city":
        return "bg-blue-100 text-blue-600";
      case "island":
        return "bg-green-100 text-green-600";
      case "park":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src="/surmesure.jpg"
            alt="Canal des Pangalanes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 flex items-center">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Créez votre Voyage Sur Mesure
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Un voyage unique, conçu selon vos préférences, pour découvrir
                Madagascar à votre rythme et selon vos envies.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">
                    Votre itinéraire personnalisé
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Étape {step} sur {totalSteps}
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Planifiez votre itinéraire
                      </h3>
                      <p className="text-gray-600">
                        Définissez votre point de départ, d'arrivée et les lieux
                        que vous souhaitez visiter
                      </p>
                    </div>

                    {/* Interface principale */}
                    <div className="max-w-2xl mx-auto space-y-6">
                      {/* Point de départ */}
                      <Card className="border-2 border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Plane className="h-4 w-4 text-white rotate-45" />
                              </div>
                              <span className="font-semibold text-green-800">
                                Point de départ
                              </span>
                            </div>
                            {pointDepart && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPointDepart("")}
                                className="text-green-600 hover:text-green-800"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {pointDepart ? (
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                              <div className="w-12 h-8 bg-green-100 rounded flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">
                                  {pointDepart}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Ville de départ
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => openDestinationsList("depart")}
                              className="w-full p-6 border-2 border-dashed border-green-300 hover:border-green-400 hover:bg-green-50"
                            >
                              <Plus className="h-5 w-5 mr-2 text-green-600" />
                              <span className="text-green-700">
                                Sélectionner le point de départ
                              </span>
                            </Button>
                          )}
                        </CardContent>
                      </Card>

                      {/* Flèche vers le bas */}
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>

                      {/* Lieux à visiter */}
                      <Card className="border-2 border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Route className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-blue-800">
                              Lieux à visiter
                            </span>
                            <span className="text-sm text-blue-600">
                              ({lieuxAVisiter.length})
                            </span>
                          </div>

                          <div className="space-y-3">
                            {lieuxAVisiter.map((lieu, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border"
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(
                                      lieu.type
                                    )}`}
                                  >
                                    {getTypeIcon(lieu.type)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800">
                                      {lieu.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {lieu.region}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeLieuAVisiter(index)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}

                            <Button
                              variant="outline"
                              onClick={() => openDestinationsList("visite")}
                              className="w-full p-4 border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50"
                            >
                              <Plus className="h-5 w-5 mr-2 text-blue-600" />
                              <span className="text-blue-700">
                                Ajouter un lieu à visiter
                              </span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Flèche vers le bas */}
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>

                      {/* Point d'arrivée */}
                      <Card className="border-2 border-red-200 bg-red-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                <Plane className="h-4 w-4 text-white -rotate-45" />
                              </div>
                              <span className="font-semibold text-red-800">
                                Point d'arrivée
                              </span>
                            </div>
                            {pointArrivee && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPointArrivee("")}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {pointArrivee ? (
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                              <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">
                                  {pointArrivee}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Ville d'arrivée
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => openDestinationsList("arrivee")}
                              className="w-full p-6 border-2 border-dashed border-red-300 hover:border-red-400 hover:bg-red-50"
                            >
                              <Plus className="h-5 w-5 mr-2 text-red-600" />
                              <span className="text-red-700">
                                Sélectionner le point d'arrivée
                              </span>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Modal de sélection des destinations */}
                    {showDestinationsList && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                          <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold">
                                Choisissez{" "}
                                {activeSelection === "depart"
                                  ? "votre point de départ"
                                  : activeSelection === "arrivee"
                                  ? "votre point d'arrivée"
                                  : "un lieu à visiter"}
                              </h3>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  setShowDestinationsList(false);
                                  setActiveSelection("");
                                }}
                              >
                                <X className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>

                          <div className="p-6 overflow-y-auto max-h-96">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {destinations
                                .filter((dest) => {
                                  // Filtrer les destinations déjà sélectionnées si c'est pour "lieux à visiter"
                                  if (activeSelection === "visite") {
                                    return !lieuxAVisiter.find(
                                      (lieu) => lieu.name === dest.name
                                    );
                                  }
                                  return true;
                                })
                                .map((destination) => (
                                  <div
                                    key={destination.name}
                                    onClick={() =>
                                      handleDestinationSelect(destination)
                                    }
                                    className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
                                  >
                                    <div
                                      className="aspect-video p-4 text-white"
                                      style={{
                                        backgroundImage: `url(${destination.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                    >
                                      <div className="absolute top-2 right-2">
                                        <div
                                          className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(
                                            destination.type
                                          )}`}
                                        >
                                          {getTypeIcon(destination.type)}
                                        </div>
                                      </div>
                                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                        <h4 className="font-bold text-white">
                                          {destination.name}
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                          {destination.region}
                                        </p>
                                        <div className="text-xs text-white/60 mt-1">
                                          {destination.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Résumé de l'itinéraire */}
                    {(pointDepart ||
                      pointArrivee ||
                      lieuxAVisiter.length > 0) && (
                      <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                        <CardContent className="p-6">
                          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Route className="h-5 w-5 mr-2 text-blue-600" />
                            Résumé de votre itinéraire
                          </h4>

                          <div className="space-y-2 text-sm">
                            {pointDepart && (
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-600">Départ:</span>
                                <span className="font-medium text-gray-800">
                                  {pointDepart}
                                </span>
                              </div>
                            )}

                            {lieuxAVisiter.length > 0 && (
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                                <div>
                                  <span className="text-gray-600">
                                    Visites:
                                  </span>
                                  <div className="ml-2">
                                    {lieuxAVisiter.map((lieu, index) => (
                                      <div
                                        key={index}
                                        className="font-medium text-gray-800"
                                      >
                                        {index + 1}. {lieu.name}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {pointArrivee && (
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-gray-600">Arrivée:</span>
                                <span className="font-medium text-gray-800">
                                  {pointArrivee}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Détails du voyage
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Indiquez les dates et le nombre de voyageurs pour votre
                      séjour.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date de début
                          </label>
                          <div className="relative">
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
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date de fin
                          </label>
                          <div className="relative">
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
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Durée préférée (jours)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="duree"
                            min="1"
                            max="30"
                            value={days}
                            defaultValue="1"
                            disabled
                            className="w-full p-2 border rounded-lg"
                          />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </div>

                      <NombrePersonneDetail
                        label="Nombre de personne"
                        name="voyageur"
                        guestCount={guestCount}
                        handleGuestCountChange={handleGuestCountChange}
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Préférences et activités
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Choisissez le type d'hébergement et les activités qui vous
                      intéressent.
                    </p>

                    <div className="space-y-6 mb-6">
                      <div>
                        <h4 className="font-medium mb-3">Type d'hébergement</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["Standard", "Confort", "Luxe"].map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input
                                type="radio"
                                name="accommodation"
                                className="mr-2"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Activités souhaitées
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {activities.map((activity) => (
                            <label
                              key={activity.name}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input type="checkbox" className="mr-2" />
                              <div className="flex items-center">
                                {activity.icon}
                                <span className="ml-2">{activity.name}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Budget estimé par personne
                        </h4>
                        <div className="space-x-4">
                          {[
                            "< 2M Ar",
                            "2M - 5M Ar",
                            "5M - 10M Ar",
                            "> 10M Ar",
                          ].map((budget) => (
                            <label
                              key={budget}
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                name="budget"
                                className="mr-1"
                              />
                              <span>{budget}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Vos coordonnées</h3>
                    <p className="text-muted-foreground mb-6">
                      Laissez-nous vos coordonnées pour recevoir votre devis
                      personnalisé.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Prénom
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Votre prénom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-lg"
                          placeholder="votre.email@exemple.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-lg"
                          placeholder="+261 34 12 345 67"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Informations complémentaires
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Précisez toute demande particulière ou information supplémentaire pour votre voyage..."
                        ></textarea>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-2" />
                        <span className="text-sm text-muted-foreground">
                          J'accepte de recevoir mon devis personnalisé et les
                          communications de Madagascar Voyage concernant mon
                          voyage sur mesure.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                      Précédent
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < totalSteps ? (
                    <Button onClick={() => setStep(step + 1)}>Continuer</Button>
                  ) : (
                    <Button className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      <span>Envoyer ma demande</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi choisir un voyage sur mesure ?
              </h2>
              <p className="text-muted-foreground">
                Un voyage personnalisé vous offre une expérience unique, adaptée
                à vos envies et à votre rythme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Liberté totale</h3>
                  <p className="text-muted-foreground">
                    Choisissez librement vos destinations, la durée de votre
                    séjour dans chaque lieu et les activités qui vous
                    intéressent le plus.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Assistance locale</h3>
                  <p className="text-muted-foreground">
                    Nos guides locaux vous accompagnent tout au long de votre
                    voyage pour vous faire découvrir les trésors cachés de
                    Madagascar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Expérience authentique
                  </h3>
                  <p className="text-muted-foreground">
                    Vivez des expériences uniques, loin des sentiers battus, et
                    découvrez la culture malgache de façon authentique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {allData.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Ce que disent nos voyageurs
                </h2>
                <p className="text-muted-foreground">
                  Découvrez les expériences de ceux qui ont déjà profité de nos
                  services de voyages personnalisés.
                </p>
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Carousel de témoignages */}
                {allData.length > 0 ? (
                  <Carousel
                    className="w-full"
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    setApi={(api) => {
                      api?.on("select", () => {
                        setCurrentIndex(api.selectedScrollSnap());
                      });
                    }}
                  >
                    <CarouselContent>
                      {groupedTestimonials.map((group, index) => (
                        <CarouselItem key={index}>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {group.map((testimonial, i) => (
                              <div
                                key={i}
                                className="transform hover:scale-105 transition-all duration-300"
                                style={{
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              >
                                <TestimonialCard
                                  allData={testimonial}
                                  image={utilisateurImage}
                                />
                              </div>
                            ))}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {/* Navigation */}
                    {allData.length > testimonialsPerSlide && (
                      <div className="flex justify-center items-center gap-4 mt-12">
                        <CarouselPrevious
                          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                          aria-label="Témoignage précédent"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </CarouselPrevious>

                        <div className="flex gap-2">
                          {groupedTestimonials.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentIndex(i)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                i === currentIndex
                                  ? "bg-primary scale-125"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                              aria-label={`Page ${i + 1}`}
                            />
                          ))}
                        </div>

                        <CarouselNext
                          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                          aria-label="Témoignage suivant"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </CarouselNext>
                      </div>
                    )}
                  </Carousel>
                ) : (
                  <div className="text-center py-12">
                    <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Aucun témoignage disponible
                    </h3>
                    <p className="text-gray-500">
                      Les témoignages de nos clients apparaîtront ici
                      prochainement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Foire Aux Questions */}
        {allDataFaq.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Foire Aux Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Retrouvez ci-dessous les réponses aux questions les plus
                fréquemment posées par nos clients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {allDataFaq.map((faq, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.reponse}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default VoyagesSurMesure;
