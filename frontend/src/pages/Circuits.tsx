import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Users,
  Compass,
} from "lucide-react";
import { GET_ALL_CIRCUITS } from "@/graphql/queries";
import CarouselHeader from "@/components/CarouselHeader";
import { Link } from "react-router-dom";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";
import CardContentDetail from "@/components/detail/CardContentDetail";
import {
  DataContext,
  FaqContext,
  TestimoniaContext,
} from "@/provider/DataContext";
import { FaqCard } from "@/components/FaqCard";
import { TestimoniaCarousel } from "@/components/TestimoniaCarousel";

const Circuits = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images de fond pour le carousel (remplacez par vos vraies images)
  const backgroundImages = [
    "/doubo.jpg",
    "/rano.jpg",
    "/trano.png",
    "/gidro.png",
    "/jus.jpg",
  ];

  // Filtres avancés
  const [filters, setFilters] = useState({
    duration: "all",
    priceRange: "all",
    season: "all",
    difficulty: "all",
  });

  // Requêtes GraphQL
  const {
    data: circuitsData,
    loading: circuitsLoading,
    error: circuitsError,
  } = useQuery(GET_ALL_CIRCUITS, {
    variables: { type: "circuit" },
  });

  // Recuperer les FAQ
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);
  // Recuperer l'utilisateur afin d'afficher son image sur testimonia
  const {
    loading: utilisateurLoading,
    error: utilisateurError,
    utilisateur,
  } = useContext(DataContext);
  // Recuperer les Testimonias
  const { testimoniaData, testimoniaLoading, testimoniaError } =
    useContext(TestimoniaContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Circuits Touristiques à Madagascar | Madagascar Voyage";
  }, []);

  // Auto-rotation du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % backgroundImages.length
    );
  };

  // Filtrage et recherche des circuits
  useEffect(() => {
    if (circuitsData?.allCircuitsByType) {
      let circuits = circuitsData?.allCircuitsByType;

      // Filtre par région
      if (selectedRegion !== "all") {
        circuits = circuits.filter((circuit: string) =>
          circuit["destination"]["region"]
            .toLowerCase()
            .includes(selectedRegion.toLowerCase())
        );
      }

      // Filtre par recherche textuelle
      if (searchQuery.trim()) {
        circuits = circuits.filter(
          (circuit: string) =>
            circuit["titre"]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            circuit["destination"]["nom"]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            circuit["description"]
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      // Filtres avancés
      if (filters.duration !== "all") {
        circuits = circuits.filter((circuit: string) => {
          const duration = circuit["duree"];
          switch (filters.duration) {
            case "short":
              return duration <= 5;
            case "medium":
              return duration >= 6 && duration <= 10;
            case "long":
              return duration >= 11;
            default:
              return true;
          }
        });
      }

      if (filters.priceRange !== "all") {
        circuits = circuits.filter((circuit: string) => {
          const price = circuit["prix"];
          switch (filters.priceRange) {
            case "budget":
              return price <= 500000;
            case "mid":
              return price > 500000 && price <= 1500000;
            case "luxury":
              return price > 1500000;
            default:
              return true;
          }
        });
      }

      setFilteredCircuits(circuits);
    }
  }, [circuitsData, selectedRegion, searchQuery, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      duration: "all",
      priceRange: "all",
      season: "all",
      difficulty: "all",
    });
    setSearchQuery("");
    setSelectedRegion("all");
  };

  const activeFiltersCount =
    Object.values(filters).filter((v) => v !== "all").length +
    (searchQuery ? 1 : 0) +
    (selectedRegion !== "all" ? 1 : 0);

  if (
    circuitsLoading ||
    faqLoading ||
    utilisateurLoading ||
    testimoniaLoading
  ) {
    return <ContentLoading />;
  }

  if (circuitsError || faqError || utilisateurError || testimoniaError) {
    return <ContentError />;
  }

  const faqCircuit = allDataFaq.filter((faq) => faq.faqType === "CIRCUIT");
  const allData = testimoniaData.filter((data) => data.type === "CIRCUIT");

  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  for (let i = 0; i < allData.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(allData.slice(i, i + testimonialsPerSlide));
  }

  const utilisateurImage = utilisateur?.image
    ? `http://localhost:8000/media/${utilisateur.image}`
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <main className="flex-grow">
        {/* Section Hero */}
        <CarouselHeader
          backgroundImages={backgroundImages}
          circuitsData={circuitsData}
          currentImageIndex={currentImageIndex}
          titre='Circuits Touristiques à <br /> <span class="text-yellow-300">Madagascar</span>'
          description="Explorez nos circuits soigneusement conçus pour vous faire
              découvrir les merveilles naturelles, la faune unique et la culture
              fascinante de Madagascar."
          goToNext={goToNext}
          goToPrevious={goToPrevious}
          goToSlide={goToSlide}
          showCircuitsCount={true}
        />

        {/* Section filtres et recherche */}
        <section className="bg-white shadow-sm sticky top-0 z-40 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Barre de recherche */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un circuit, une destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Onglets de région */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {[
                    { value: "all", label: "Tous" },
                    { value: "nord", label: "Nord" },
                    { value: "sud", label: "Sud" },
                    { value: "est", label: "Est" },
                    { value: "ouest", label: "Ouest" },
                  ].map((region) => (
                    <button
                      key={region.value}
                      onClick={() => setSelectedRegion(region.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedRegion === region.value
                          ? "bg-white shadow-sm text-primary"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>

                {/* Bouton filtres */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="default"
                      className="ml-1 h-5 w-5 p-0 text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Panneau de filtres avancés */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Durée
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) =>
                        setFilters({ ...filters, duration: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">Toutes durées</option>
                      <option value="short">1-5 jours</option>
                      <option value="medium">6-10 jours</option>
                      <option value="long">11+ jours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">Tous budgets</option>
                      <option value="budget">- 500k Ar</option>
                      <option value="mid">500k - 1.5M Ar</option>
                      <option value="luxury">+ 1.5M Ar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Saison
                    </label>
                    <select
                      value={filters.season}
                      onChange={(e) =>
                        setFilters({ ...filters, season: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">Toute l'année</option>
                      <option value="dry">Saison sèche</option>
                      <option value="wet">Saison des pluies</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Effacer filtres
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Résultats */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-6">
              {/* Badges de filtres actifs */}
              {(searchQuery ||
                selectedRegion !== "all" ||
                Object.values(filters).some((f) => f !== "all")) && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Recherche: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedRegion !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Région: {selectedRegion}
                      <button onClick={() => setSelectedRegion("all")}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Grille des circuits */}
            {filteredCircuits.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredCircuits.map((circuit, index) => (
                  <CardContentDetail
                    pack={circuit}
                    lien="circuits"
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-16">
                  <div className="mb-4">
                    <Compass className="h-16 w-16 mx-auto text-gray-300" />
                  </div>
                  <h3 className="text-xl font-sans font-semibold mb-2">
                    Aucun circuit trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez de modifier vos filtres ou votre recherche pour
                    découvrir nos circuits.
                  </p>
                  <Button onClick={clearFilters}>Voir tous les circuits</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Section promotionnelle */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nos experts voyage sont là pour vous conseiller et créer le
              circuit parfait selon vos envies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/guides"}>
                <Button size="lg" className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Parler à un expert
                </Button>
              </Link>
              <Link to={"/voyages-sur-mesure"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Circuit sur mesure
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <TestimoniaCarousel
          currentIndex={currentIndex}
          datas={allData}
          groupedTestimonials={groupedTestimonials}
          setCurrentIndex={setCurrentIndex}
          testimonialsPerSlide={testimonialsPerSlide}
          utilisateurImage={utilisateurImage}
        />

        {/* Foire Aux Questions */}
        {faqCircuit.length > 0 && <FaqCard faq={faqCircuit} />}
      </main>

      <Footer />
    </div>
  );
};

export default Circuits;
