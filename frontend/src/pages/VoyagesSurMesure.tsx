import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Users,
  Clock,
  Compass,
  Send,
  Navigation,
  Route,
  Trash2,
  Plus,
  ArrowDown,
  Plane,
  X,
} from "lucide-react";
import { useMutation } from "@apollo/client";
import NombrePersonneDetail from "@/components/detail/NombrePersonneDetail";
import {
  DataContext,
  FaqContext,
  TestimoniaContext,
} from "@/provider/DataContext";
import { destinations } from "@/helper/AllRegions";
import { CREATE_SUR_MESURE } from "@/graphql/mutations";
import { FaqCard } from "@/components/FaqCard";
import { TestimoniaCarousel } from "@/components/TestimoniaCarousel";
import SEO from "@/SEO";
import { urlMedia } from "@/helper/UrlImage";
import { useTranslation } from "react-i18next";
import ContentLoading from "@/components/Loading";

const VoyagesSurMesure = () => {
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
    activite: [],
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

  const { t } = useTranslation();

  const [
    createSurMesure,
    { loading: surmesureLoading, error: surmesureError },
  ] = useMutation(CREATE_SUR_MESURE, {
    onCompleted: () => {
      setFormData({
        dateDebut: "",
        dateFin: "",
        voyageur: 1,
        duree: "",
        hebergement: "",
        activite: [],
        budget: "",
        nom: "",
        prenom: "",
        email: "",
        contact: "",
        commentaire: "",
      });
      setPointDepart("");
      setPointArrivee("");
    },
    onError: (err) => {
      // Handle errors
      console.error("Erreur lors de la creation du circuit sur mesure:", err);
    },
  });

  // Recuperer l'utilisateur afin d'afficher son image sur testimonia
  const {
    loading: utilisateurLoading,
    error: utilisateurError,
    utilisateur,
  } = useContext(DataContext);

  // Recuperer les FAQ
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);

  // Recuperer les Testimonias
  const { testimoniaData, testimoniaLoading, testimoniaError } =
    useContext(TestimoniaContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Voyages Sur Mesure | Madagascar Voyage";
  }, []);

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const activities = [
    {
      name: t("pages.surmesure.surmesureHiking", "Hiking"),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: t("pages.surmesure.surmesureBeach", "Beach"),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: t("pages.surmesure.surmesureSafari", "Safari"),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: t("pages.surmesure.surmesureScubaDiving", "Scuba Diving"),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: t("pages.surmesure.surmesureCulture", "Culture"),
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: t("pages.surmesure.surmesureGastronomy", "Gastronomy"),
      icon: <Compass className="h-5 w-5" />,
    },
  ];

  if (
    testimoniaLoading ||
    utilisateurLoading ||
    faqLoading ||
    surmesureLoading
  ) {
    return <ContentLoading />;
  }

  if (testimoniaError || utilisateurError || faqError || surmesureError) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur lors du chargement
              </h3>
              <p className="text-red-600">{testimoniaError.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

  // Fonction pour gérer les checkboxes des activités
  const handleActivityChange = (activityName: string, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      activite: isChecked
        ? [...prev.activite, activityName]
        : prev.activite.filter((name) => name !== activityName),
    }));

    // Réinitialiser les messages
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

  const allData = testimoniaData.filter((data) => data.type === "SURMESURE");

  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  for (let i = 0; i < allData.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(allData.slice(i, i + testimonialsPerSlide));
  }

  const utilisateurImage = utilisateur?.image
    ? `${urlMedia}${utilisateur.image}`
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

  // Creation sur mesure
  const handleCreateSurMesure = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const surMesureDatas = {
        activite: formData.activite.map((a) => a),
        budget: formData.budget,
        commentaire: formData.commentaire || "",
        contact: formData.contact,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        duree: days,
        email: formData.email,
        hebergement: formData.hebergement,
        lieuVisiter: lieuxAVisiter.map((lieu) => lieu.name),
        nom: formData.nom,
        nombreDePersonne: guestCount,
        pointArrivee: pointArrivee,
        pointDepart: pointDepart,
        prenom: formData.prenom,
      };
      const res = await createSurMesure({ variables: surMesureDatas });
      if (!res.data.createSurMesure.success) {
        console.error("Erreur GraphQL:", res.data.createSurMesure.errors);
      }
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
    }
  };

  const faqSurMesure = allDataFaq.filter((faq) => faq.faqType === "SURMESURE");

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Tailor-Made Travel to Madagascar | Custom Tours"
        description="Create your tailor-made trip to Madagascar: custom tours, unique experiences, and authentic discovery of the country based on your preferences."
        canonical="https://madagascar-voyagesolidaire.com/voyages-sur-mesure"
        image="https://madagascar-voyagesolidaire.com/images/surmesure-og.webp"
      />

      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <div className="relative p-10 bg-[url('/surmesure.webp')] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Contenu */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="text-white">
                  {t(
                    "pages.surmesure.surmesureCreateYourCustom",
                    "Create your Custom Tour Journey"
                  )}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                {t(
                  "pages.surmesure.surmesureAUnique",
                  "A unique trip, designed according to your preferences, to explore Madagascar at your own pace and on your own terms."
                )}
              </p>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">
                    {t(
                      "pages.surmesure.surmesureYourPersonalized",
                      "Your Personalized Itinerary"
                    )}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {t("pages.surmesure.surmesureStep", "Step")} {step}{" "}
                    {t("pages.surmesure.surmesureTo", "to")} {totalSteps}
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
                        {t(
                          "pages.surmesure.surmesurePlan",
                          "Plan Your Itinerary"
                        )}
                      </h3>
                      <p className="text-gray-600">
                        {t(
                          "pages.surmesure.surmesureSetYourStarting",
                          "Set your starting point, destination, and the places you wish to visit."
                        )}
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
                                {t(
                                  "pages.surmesure.surmesureStartingPoint",
                                  "Starting Point"
                                )}
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
                                  {t(
                                    "pages.surmesure.surmesureDepartureCity",
                                    "Departure City"
                                  )}
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
                                {t(
                                  "pages.surmesure.surmesureSelectTheStartingPoint",
                                  "Select the starting point"
                                )}
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
                              {t(
                                "pages.surmesure.surmesurePlacesToVisit",
                                "Places to Visit"
                              )}
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
                                {t(
                                  "pages.surmesure.surmesureAddAPlaceToVisit",
                                  "Add a Place to Visit"
                                )}
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
                                {t(
                                  "pages.surmesure.surmesureDestinationPoint",
                                  "Destination Point"
                                )}
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
                                  {t(
                                    "pages.surmesure.surmesureArrivalCity",
                                    "Arrival City"
                                  )}
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
                                {t(
                                  "pages.surmesure.surmesureSelect",
                                  "Select the destination point"
                                )}
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
                                {t("pages.surmesure.surmesureChoose", "Choose")}{" "}
                                {activeSelection === "depart"
                                  ? t(
                                      "pages.surmesure.surmesureStarting",
                                      "your starting point"
                                    )
                                  : activeSelection === "arrivee"
                                  ? t(
                                      "pages.surmesure.surmesureDestination",
                                      "your destination point"
                                    )
                                  : t(
                                      "pages.surmesure.surmesurePlace",
                                      "a place to visit"
                                    )}
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
                                        opacity: 0.85,
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
                                          {destination.region} (
                                          {destination.type})
                                        </p>
                                        <div className="text-xs text-white/70 mt-1">
                                          {destination.description}
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
                            {t(
                              "pages.surmesure.surmesureYourItinerarySummary",
                              "Your Itinerary Summary"
                            )}
                          </h4>

                          <div className="space-y-2 text-sm">
                            {pointDepart && (
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-600">
                                  {t(
                                    "pages.surmesure.surmesureDeparture",
                                    "Departure"
                                  )}
                                  :
                                </span>
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
                                    {t(
                                      "pages.surmesure.surmesureVisits",
                                      "Visits"
                                    )}
                                    :
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
                                <span className="text-gray-600">
                                  {t(
                                    "pages.surmesure.surmesureArrival",
                                    "Arrival"
                                  )}
                                  :
                                </span>
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
                      {t(
                        "pages.surmesure.surmesureTripDetails",
                        "Trip Details"
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t(
                        "pages.surmesure.surmesureEnter",
                        "Enter the dates and number of travelers for your stay."
                      )}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t("common.StartedDate", "Started date")}
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
                            {t("common.EndDate", "End date")}
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
                          {t(
                            "pages.surmesure.surmesurePreferred",
                            "Preferred Duration"
                          )}{" "}
                          ({t("common.days", "days")})
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="duree"
                            min="1"
                            max="30"
                            value={days}
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
                      {t(
                        "pages.surmesure.surmesurePreferences",
                        "Preferences and Activities"
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t(
                        "pages.surmesure.surmesureChooseTheType",
                        "Choose the type of accommodation and activities that interest you."
                      )}
                    </p>

                    <div className="space-y-6 mb-6">
                      <div>
                        <h4 className="font-medium mb-3">
                          {t(
                            "pages.surmesure.surmesureTypeOfAccommodation",
                            "Type of Accommodation"
                          )}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["STANDARD", "CONFORT", "LUXE"].map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input
                                type="radio"
                                name="hebergement"
                                value={type}
                                checked={formData.hebergement === type}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    hebergement: e.target.value,
                                  }));

                                  // Réinitialiser les messages
                                  if (errors) setErrors(null);
                                  if (successMessage) setSuccessMessage(null);
                                }}
                                className="mr-2"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          {t(
                            "pages.surmesure.surmesureDesiredActivities",
                            "Desired Activities"
                          )}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {activities.map((activity) => (
                            <label
                              key={activity.name}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input
                                type="checkbox"
                                name="activite"
                                checked={formData.activite.includes(
                                  activity.name
                                )}
                                onChange={(e) =>
                                  handleActivityChange(
                                    activity.name,
                                    e.target.checked
                                  )
                                }
                                className="mr-2"
                              />
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
                          {t(
                            "pages.surmesure.surmesureEstimatedBudgetPerPerson",
                            "Estimated Budget per Person"
                          )}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            t(
                              "pages.surmesure.surmesureLessthan",
                              "Less than €1 100"
                            ),
                            t(
                              "pages.surmesure.surmesureFrom",
                              "From €1,100 to €2 200"
                            ),
                            t(
                              "pages.surmesure.surmesureFromTo",
                              "From €2,200 to €3 300"
                            ),
                            t(
                              "pages.surmesure.surmesureMorethan",
                              "More than €3 300"
                            ),
                          ].map((budget) => (
                            <label
                              key={budget}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition hover:bg-blue-50 hover:border-blue-400
                              ${
                                formData.budget === budget
                                  ? "border-blue-500 bg-blue-100"
                                  : "border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="budget"
                                value={budget}
                                checked={formData.budget === budget}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    budget: e.target.value,
                                  }));
                                  if (errors) setErrors(null);
                                  if (successMessage) setSuccessMessage(null);
                                }}
                                className="mr-2"
                              />
                              <span className="text-gray-800 font-medium">
                                {budget}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {t(
                        "pages.surmesure.surmesureYourContactInformation",
                        "Your Contact Information"
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t(
                        "pages.surmesure.surmesureLeaveUs",
                        "Leave us your contact details to receive your personalized quote."
                      )}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t("common.LastName", "Last Name")}
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={t(
                              "common.LastNamePlaceholder",
                              "Your last name"
                            )}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t("common.LastName", "First Name")}
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={t(
                              "common.LastNamePlaceholder",
                              "Your first name"
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg"
                          placeholder={t(
                            "common.EmailPlaceholder",
                            "your.email@example.com"
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {t("common.Phone", "Phone")}
                        </label>
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg"
                          placeholder="+261 34 12 345 67"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {t(
                            "pages.surmesure.surmesureAdditionalInformation",
                            "Additional Information"
                          )}
                        </label>
                        <textarea
                          rows={4}
                          name="commentaire"
                          value={formData.commentaire}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg"
                          placeholder={t(
                            "pages.surmesure.surmesureAdditionalInformationPlaceholder",
                            "Please specify any special requests or additional information for your trip..."
                          )}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                      {t("pages.surmesure.surmesurePrevious", "Previous")}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < totalSteps ? (
                    <Button onClick={() => setStep(step + 1)}>
                      {t("pages.surmesure.surmesureNext", "Next")}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCreateSurMesure}
                      disabled={surmesureLoading}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <span>
                        {t(
                          "pages.surmesure.surmesureSubmitMyRequest",
                          "Submit my request"
                        )}
                      </span>
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
                {t(
                  "pages.surmesure.surmesureWhyChooseaTailorMadeTrip",
                  "Why Choose a Tailor-Made Trip?"
                )}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "pages.surmesure.surmesureApersonalizedjourney",
                  "A personalized journey offers you a unique experience, tailored to your desires and your own pace."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t(
                      "pages.surmesure.surmesureTotalFreedom",
                      "Total Freedom"
                    )}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "pages.surmesure.surmesureFreely",
                      "Freely choose your destinations, the length of your stay in each place, and the activities that interest you most."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t(
                      "pages.surmesure.surmesureLocalAssistance",
                      "Local Assistance"
                    )}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "pages.surmesure.surmesureOurlocal",
                      "Our local guides accompany you throughout your journey to help you discover Madagascar’s hidden treasures."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t(
                      "pages.surmesure.surmesureAuthenticExperience",
                      "Authentic Experience"
                    )}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "pages.surmesure.surmesureLiveunique",
                      "Live unique experiences off the beaten path and discover Malagasy culture in an authentic way."
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <TestimoniaCarousel
          currentIndex={currentIndex}
          datas={allData}
          groupedTestimonials={groupedTestimonials}
          setCurrentIndex={setCurrentIndex}
          testimonialsPerSlide={testimonialsPerSlide}
        />

        {/* Foire Aux Questions */}
        {faqSurMesure.length > 0 && <FaqCard faq={faqSurMesure} />}
      </main>

      <Footer />
    </div>
  );
};

export default VoyagesSurMesure;
