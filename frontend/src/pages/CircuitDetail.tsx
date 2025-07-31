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

const CircuitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState(false);

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
      console.log('Circuit from state:', circuitFromState);
      setCircuit(circuitFromState);
    } else if (dataCircuit?.circuit) {
      console.log('Circuit from GraphQL:', dataCircuit.circuit);
      setCircuit(dataCircuit.circuit);
    }
  }, [circuitFromState, dataCircuit]);

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

  const allImages = circuit.images?.map(
    (img) => `http://localhost:8000/media/${img.image}`
  ) || ["/placeholder.svg"];
  const mainImage = allImages[0];

  const displayData = {
    id: circuit.id,
    title: circuit.titre,
    image: mainImage,
    location: `${circuit.destination.nom}, ${circuit.destination.region}`,
    duration: `${circuit.duree} jours`,
    price: circuit.prix,
    description: circuit.description,
    rating: 4.5,
    reviews: 24,
    highlights: [
      "🏞️ Exploration du Parc National de la Montagne d'Ambre",
      "🏖️ Plages paradisiaques d'Antsiranana",
      "🐒 Rencontre avec les lémuriens endémiques",
      "🎨 Visite du marché artisanal d'Antsiranana",
      "🥾 Randonnée dans les Tsingy Rouges",
    ],
    itineraires: circuit.itineraires || [],
    included: [
      "🚗 Transport local climatisé",
      "👨‍🏫 Guide professionnel francophone",
      "🏨 Hébergement selon programme",
      "🍽️ Repas mentionnés au programme",
      "🎯 Activités prévues au programme",
      "📋 Assistance 24h/7j",
    ],
    notIncluded: [
      "✈️ Vol international",
      "📄 Visa d'entrée",
      "🛡️ Assurance voyage",
      "🍴 Repas non mentionnés",
      "🍷 Boissons alcoolisées",
      "💰 Pourboires et dépenses personnelles",
    ],
    gallery: allImages,
  };
  const totalPrice = displayData.price * guestCount;

  console.log(`displayData: ${circuitFromState.itineraires}`);
  

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
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setActiveImageModal(true)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Voir toutes les photos
                  </Button>
                </div>

                {/* Miniatures */}
                {displayData.gallery.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {displayData.gallery.slice(0, 6).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Vue ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {displayData.gallery.length > 6 && (
                      <div className="flex-shrink-0 w-20 h-16 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        +{displayData.gallery.length - 6}
                      </div>
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
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
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

                {/* Prix */}
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {displayData.price.toLocaleString()} Ar
                    </span>
                    <span className="text-gray-600">/personne</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Tout inclus • Base chambre double
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date de départ
                        </label>
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Voyageurs
                        </label>
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              setGuestCount(Math.max(1, guestCount - 1))
                            }
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={guestCount}
                            readOnly
                            className="w-full text-center py-2 text-sm"
                          />
                          <button
                            onClick={() => setGuestCount(guestCount + 1)}
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-primary">
                          {totalPrice.toLocaleString()} Ar
                        </span>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full h-12 text-base font-semibold">
                          <Calendar className="h-5 w-5 mr-2" />
                          Réserver maintenant
                        </Button>
                        <Button variant="outline" className="w-full h-12">
                          Demander un devis personnalisé
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <h3 className="text-2xl font-bold mb-4">
                      Description du circuit
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {displayData.description}
                    </p>

                    <h4 className="text-xl font-bold mb-4">
                      Points forts du voyage
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {displayData.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-primary/5 rounded-lg"
                        >
                          <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
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
                    <h3 className="text-2xl font-bold mb-6">
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
                                <h4 className="text-lg font-semibold mb-2">
                                  {day.titre || `Jour ${index + 1}`}
                                </h4>
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
                      <h3 className="text-2xl font-bold mb-6 text-green-600">
                        Ce qui est inclus
                      </h3>
                      <ul className="space-y-3">
                        {displayData.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6 text-red-600">
                        Non inclus
                      </h3>
                      <ul className="space-y-3">
                        {displayData.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
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
                      <h3 className="text-xl font-semibold mb-2">
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
                  className="flex items-center border-white text-white hover:bg-white hover:text-primary"
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
