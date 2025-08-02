import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CircuitCard from "../components/CircuitCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Clock,
  Loader2,
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  Star,
  Users,
  TrendingUp,
  Compass,
} from "lucide-react";
import { GET_ALL_CIRCUITS, GET_ALL_DESTINATIONS } from "@/graphql/queries";
import { Circuit } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CarouselHeader from "@/components/CarouselHeader";
import { Link } from "react-router-dom";

const Circuits = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [filteredCircuits, setFilteredCircuits] = useState<Circuit[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
  } = useQuery(GET_ALL_CIRCUITS);
  const { data: destinationsData } = useQuery(GET_ALL_DESTINATIONS);

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
    }, 5000); // Change d'image toutes les 5 secondes

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
    if (circuitsData?.allCircuits) {
      let circuits = circuitsData.allCircuits;

      // Filtre par région
      if (selectedRegion !== "all") {
        circuits = circuits.filter((circuit: Circuit) =>
          circuit.destination.region
            .toLowerCase()
            .includes(selectedRegion.toLowerCase())
        );
      }

      // Filtre par recherche textuelle
      if (searchQuery.trim()) {
        circuits = circuits.filter(
          (circuit: Circuit) =>
            circuit.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            circuit.destination.nom
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            circuit.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      // Filtres avancés
      if (filters.duration !== "all") {
        circuits = circuits.filter((circuit: Circuit) => {
          const duration = circuit.duree;
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
        circuits = circuits.filter((circuit: Circuit) => {
          const price = circuit.prix;
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

      // Tri des résultats
      circuits = [...circuits].sort((a: Circuit, b: Circuit) => {
        switch (sortBy) {
          case "price-low":
            return a.prix - b.prix;
          case "price-high":
            return b.prix - a.prix;
          case "duration":
            return a.duree - b.duree;
          case "name":
            return a.titre.localeCompare(b.titre);
          default: // popular
            return 0;
        }
      });

      setFilteredCircuits(circuits);
    }
  }, [circuitsData, selectedRegion, searchQuery, filters, sortBy]);

  // Fonction pour convertir les données du backend vers le format attendu par CircuitCard
  const convertCircuitData = (circuit: Circuit) => ({
    id: circuit.id,
    title: circuit.titre,
    location: `${circuit.destination.nom}, ${circuit.destination.region}`,
    duration: `${circuit.duree} jours`,
    price: circuit.prix,
    saison: circuit.saison.nom,
    pointsInteret: circuit.pointsInteret || [],
    images: circuit.images,
    circuitData: circuit,
  });

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

  if (circuitsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Chargement des circuits</h3>
              <p className="text-muted-foreground">
                Découvrez nos destinations exceptionnelles...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (circuitsError) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>
              Erreur lors du chargement des circuits. Veuillez réessayer plus
              tard.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

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

                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="duration">Durée</option>
                  <option value="name">Nom A-Z</option>
                </select>

                {/* Mode d'affichage */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
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
                {filteredCircuits.map((circuit) => (
                  <CircuitCard
                    key={circuit.id}
                    {...convertCircuitData(circuit)}
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
              <Button size="lg" className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Parler à un expert
              </Button>
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
      </main>

      <Footer />
    </div>
  );
};

export default Circuits;
