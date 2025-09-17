import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X, Star, Users } from "lucide-react";
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
import SEO from "@/SEO";
import { urlMedia } from "@/helper/UrlImage";
import EmptyData from "@/components/EmptyData";
import { useTranslation, Trans } from "react-i18next";

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
    "/circuits/vam_baobab.webp",
    "/gidro.webp",
    "/circuits/balene.webp",
    "/trano.webp",
    "/circuits/hazo.webp",
    "/soleil.webp",
    "/kaly.webp",
  ];

  const { t } = useTranslation();

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
    variables: { typeCircuit: "CIRCUIT" },
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
          circuit["region"].toLowerCase().includes(selectedRegion.toLowerCase())
        );
      }

      // Filtre par recherche textuelle
      if (searchQuery.trim()) {
        circuits = circuits.filter(
          (circuit: string) =>
            circuit["titre"]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            circuit["destination"]
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
    ? `${urlMedia}${utilisateur.image}`
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Tours in Madagascar | Authentic Journeys and Adventures"
        description="Explore our tours in Madagascar: unique adventures, cultural discoveries, and breathtaking landscapes for an unforgettable journey to the heart of the Red Island."
        canonical="https://madagascar-voyagesolidaire.com/circuits"
        image="https://madagascar-voyagesolidaire.com/images/circuit-og.webp"
      />

      <NavBar />

      <main className="flex-grow">
        {/* Section Hero */}
        <CarouselHeader
          backgroundImages={backgroundImages}
          // circuitsData={circuitsData}
          currentImageIndex={currentImageIndex}
          titre={t("pages.circuits.circuitsTitle")}
          description={t(
            "pages.circuits.circuitsDescription",
            "Embark on unforgettable journeys through Madagascar’s breathtaking landscapes, rare wildlife, and vibrant cultural heritage."
          )}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
          goToSlide={goToSlide}
          // showCircuitsCount={true}
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
                    placeholder={t(
                      "pages.circuits.searchPlaceholder",
                      "Find your ideal tour or destination..."
                    )}
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
                    { value: "all", label: t("pages.circuits.all", "All") },
                    {
                      value: "nord",
                      label: t("pages.circuits.north", "North"),
                    },
                    { value: "sud", label: t("pages.circuits.south", "South") },
                    { value: "est", label: t("pages.circuits.east", "East") },
                    { value: "ouest", label: t("pages.circuits.west", "West") },
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
                  {t("pages.circuits.filters", "Filters")}
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
                      {t("pages.circuits.duration", "Duration")}
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) =>
                        setFilters({ ...filters, duration: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">
                        {t("pages.circuits.allDuration", "All duration")}
                      </option>
                      <option value="short">
                        1-5 {t("common.days", "days")}
                      </option>
                      <option value="medium">
                        6-10 {t("common.days", "days")}
                      </option>
                      <option value="long">
                        11+ {t("common.days", "days")}
                      </option>
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
                      <option value="all">
                        {t("pages.circuits.all", "All")} budgets
                      </option>
                      <option value="budget">
                        {t("pages.circuits.under", "Under")} €95
                      </option>
                      <option value="mid">€95 – €285</option>
                      <option value="luxury">
                        {t("pages.circuits.over", "Over")} €285
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("pages.circuits.season", "Season")}
                    </label>
                    <select
                      value={filters.season}
                      onChange={(e) =>
                        setFilters({ ...filters, season: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All year round</option>
                      <option value="dry">Dry season</option>
                      <option value="wet">Rainy season</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear filters
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
                      Search: "{searchQuery}"
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
                      Region: {selectedRegion}
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
              <EmptyData
                titre={t(
                  "pages.circuits.upcomingCircuit",
                  "Upcoming Tours Coming Soon"
                )}
              />
            )}
          </div>
        </section>

        {/* Section promotionnelle */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t("pages.circuits.circuitsNeed", "Need help choosing?")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t(
                "pages.circuits.circuitsOurTravel",
                "Our travel experts are here to guide you and craft the perfect itinerary based on your preferences."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/guides"}>
                <Button size="lg" className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {t("pages.circuits.circuitsTalkTo", "Talk to an expert")}
                </Button>
              </Link>
              <Link to={"/voyages-sur-mesure"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  <Star className="h-5 w-5 mr-2" />
                  {t("pages.circuits.circuitsTailorMade", "Tailor-made tour")}
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
