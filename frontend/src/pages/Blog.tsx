import { useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  UserRound,
  Tag,
  ChevronRight,
  Loader2,
  Search,
  TrendingUp,
  Clock,
  Eye,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Constantes pour une meilleure maintenance
const WORDS_PER_MINUTE = 200;
const DEFAULT_EXCERPT_LENGTH = 160;
const FEATURED_EXCERPT_LENGTH = 200;
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80";

// Catégories prédéfinies
const PREDEFINED_CATEGORIES = [
  "Tous",
  "Destinations",
  "Culture & Traditions",
  "Conseils Voyage",
  "Nature & Faune",
  "Gastronomie",
  "Aventure",
];

// Tags par défaut pour les articles sans tags
const DEFAULT_TAGS = ["madagascar", "voyage", "découverte"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Requête GraphQL avec gestion d'erreurs améliorée
  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
    refetch: refetchBlogs,
  } = useQuery(GET_ALL_BLOGS, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erreur lors du chargement des blogs:", error);
    },
  });

  // Validation et normalisation des données
  const validatedBlogs = useMemo(() => {
    if (!blogsData?.allBlogs || !Array.isArray(blogsData.allBlogs)) {
      return [];
    }

    return blogsData.allBlogs
      .filter((blog) => {
        // Vérification des champs obligatoires
        return (
          blog &&
          typeof blog.id !== "undefined" &&
          typeof blog.titre === "string" &&
          blog.titre.trim() !== "" &&
          typeof blog.contenu === "string" &&
          blog.contenu.trim() !== ""
        );
      })
      .map((blog) => ({
        ...blog,
        // Normalisation des données
        titre: blog.titre.trim(),
        contenu: blog.contenu.trim(),
        auteur: blog.auteur?.trim() || "Auteur inconnu",
        datePublication: blog.datePublication || new Date().toISOString(),
        // Correction pour les images : prendre la première image ou image par défaut
        image:
          blog.images && blog.images.length > 0
            ? `http://localhost:8000/media/${blog.images[0].image}`
            : DEFAULT_IMAGE,
        images:
          blog.images && blog.images.length > 0
            ? blog.images.map(
                (img) => `http://localhost:8000/media/${img.image}`
              )
            : [DEFAULT_IMAGE],
        tags:
          blog.tags && blog.tags.length > 0
            ? blog.tags
                .split(";")
                .filter((tag) => tag && typeof tag === "string")
                .map((tag) => tag.trim())
            : DEFAULT_TAGS,
      }))
      .sort(
        (a, b) =>
          new Date(b.datePublication).getTime() -
          new Date(a.datePublication).getTime()
      );
  }, [blogsData]);

  // Filtrage des blogs avec mémorisation
  const filteredBlogs = useMemo(() => {
    let blogs = validatedBlogs;

    // Filtrer par catégorie
    if (selectedCategory !== "Tous") {
      blogs = blogs.filter((blog) => {
        const categoryLower = selectedCategory.toLowerCase();
        return (
          blog.titre.toLowerCase().includes(categoryLower) ||
          blog.contenu.toLowerCase().includes(categoryLower) ||
          (blog.tags &&
            blog.tags.some((tag) => tag.toLowerCase().includes(categoryLower)))
        );
      });
    }

    // Filtrer par terme de recherche
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      blogs = blogs.filter(
        (blog) =>
          blog.titre.toLowerCase().includes(searchLower) ||
          blog.contenu.toLowerCase().includes(searchLower) ||
          blog.auteur.toLowerCase().includes(searchLower) ||
          (blog.tags &&
            blog.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
      );
    }

    return blogs;
  }, [validatedBlogs, selectedCategory, searchTerm]);

  // Fonction pour extraire un extrait du contenu
  const getExcerpt = useCallback(
    (content, maxLength = DEFAULT_EXCERPT_LENGTH) => {
      if (!content || typeof content !== "string") return "";

      const textContent = content.replace(/<[^>]*>/g, "").trim();
      return textContent.length > maxLength
        ? textContent.substring(0, maxLength) + "..."
        : textContent;
    },
    []
  );

  // Fonction pour formater la date avec gestion d'erreurs
  const formatDate = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date non disponible";
      }
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Erreur lors du formatage de la date:", error);
      return "Date non disponible";
    }
  }, []);

  // Fonction pour calculer le temps de lecture
  const getReadingTime = useCallback((content) => {
    if (!content || typeof content !== "string") return 1;

    const textContent = content.replace(/<[^>]*>/g, "").trim();
    const wordCount = textContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  }, []);

  // Fonction de retry pour les erreurs
  const handleRetry = useCallback(async () => {
    setRetryCount((prev) => prev + 1);
    try {
      await refetchBlogs();
    } catch (error) {
      console.error("Erreur lors du retry:", error);
    }
  }, [refetchBlogs]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setSelectedCategory("Tous");
    setSearchTerm("");
  }, []);

  // Effet pour le titre de la page
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | Madagascar Voyage - Découvrez nos Articles";
  }, []);

  // Blogs pour l'affichage
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const regularBlogs = filteredBlogs.slice(1);

  // Composant d'erreur avec retry
  const ErrorComponent = ({ error, onRetry }) => (
    <Alert variant="destructive" className="mb-8 border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="text-red-800">
        <div className="flex items-center justify-between">
          <span>
            Une erreur s'est produite lors du chargement des articles.
            {retryCount > 0 && ` (Tentative ${retryCount})`}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-4 border-red-300 text-red-600 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );

  // Composant de chargement
  const LoadingComponent = () => (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-500" />
        <p className="text-lg text-slate-600">Chargement des articles...</p>
      </div>
    </div>
  );

  // Composant d'état vide
  const EmptyStateComponent = ({ hasError = false }) => (
    <div className="col-span-full text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {hasError ? "Aucune donnée disponible" : "Aucun article trouvé"}
        </h3>
        <p className="text-slate-600 mb-6">
          {hasError
            ? "Il semble qu'il y ait un problème avec le chargement des données."
            : "Essayez de modifier vos critères de recherche ou explorez nos autres catégories."}
        </p>
        <Button
          onClick={hasError ? handleRetry : resetFilters}
          variant="outline"
          className="border-green-300 text-green-600 hover:bg-green-50"
        >
          {hasError ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </>
          ) : (
            "Voir tous les articles"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
      <NavBar />

      <main className="flex-grow">
        {/* Section Hero avec design moderne */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent z-10"></div>
          <img
            src={DEFAULT_IMAGE}
            alt="Blog Madagascar Voyage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-6xl">
                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Articles & Guides de Voyage
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Explorez l'île aux mille visages
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 block">
                    Madagascar
                  </span>
                </h1>
                <p className="text-xl md:text-lg text-white/90 mb-8 max-w-2xl leading-relaxed">
                  Préparez votre aventure avec nos{" "}
                  <strong>guides de voyage complets</strong>, nos{" "}
                  <strong>conseils exclusifs</strong> et des{" "}
                  <strong>itinéraires sur mesure</strong>. Que vous voyagiez en{" "}
                  <strong>voiture de location</strong> ou en{" "}
                  <strong>circuit organisé</strong>, partez à la rencontre d'une
                  île unique au monde : plages paradisiaques, forêts tropicales,
                  parcs nationaux et une culture riche et authentique.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Rechercher un guide ou un article..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/90 backdrop-blur-sm border-white/30 text-slate-900 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Affichage des erreurs */}
            {blogsError && (
              <ErrorComponent error={blogsError} onRetry={handleRetry} />
            )}

            {/* Filtres par catégorie */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Catégories
              </h2>
              <div className="flex flex-wrap gap-3">
                {PREDEFINED_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className={`rounded-full px-6 py-2.5 font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-500 hover:to-green-400 shadow-lg"
                        : "border-slate-300 text-slate-700 hover:border-green-300 hover:text-green-600 hover:bg-green-50"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* État de chargement */}
            {blogsLoading && <LoadingComponent />}

            {/* Contenu principal */}
            {!blogsLoading && (
              <>
                {/* Vérification s'il y a des données */}
                {validatedBlogs.length === 0 && !blogsError ? (
                  <EmptyStateComponent hasError={false} />
                ) : (
                  <>
                    {/* Article vedette */}
                    {featuredBlog && (
                      <div className="mb-16">
                        <div className="flex items-center mb-6">
                          <Badge
                            variant="default"
                            className="bg-gradient-to-r from-orange-500 to-red-500"
                          >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Article Vedette
                          </Badge>
                        </div>
                        <Link
                          to={`/blog/${featuredBlog.id}`}
                          className="block group"
                        >
                          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
                            <div className="grid lg:grid-cols-2 gap-0">
                              <div className="relative h-80 lg:h-full overflow-hidden">
                                <img
                                  src={featuredBlog.image}
                                  alt={featuredBlog.titre}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = DEFAULT_IMAGE;
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              </div>
                              <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="space-y-6">
                                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      <span>
                                        {formatDate(
                                          featuredBlog.datePublication
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <UserRound className="h-4 w-4 mr-2" />
                                      <span className="font-medium">
                                        {featuredBlog.auteur}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2" />
                                      <span>
                                        {getReadingTime(featuredBlog.contenu)}{" "}
                                        min
                                      </span>
                                    </div>
                                  </div>
                                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 group-hover:text-green-600 transition-colors leading-tight">
                                    {featuredBlog.titre}
                                  </h2>
                                  <p className="text-slate-600 text-lg leading-relaxed">
                                    {getExcerpt(
                                      featuredBlog.contenu,
                                      FEATURED_EXCERPT_LENGTH
                                    )}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                      {featuredBlog.tags
                                        .slice(0, 3)
                                        .map((tag, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="bg-slate-100 text-slate-700"
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                    </div>
                                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                                      Lire l'article
                                      <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}

                    {featuredBlog && regularBlogs.length > 0 && (
                      <Separator className="mb-12" />
                    )}

                    {/* Grille d'articles */}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        {featuredBlog ? "Autres articles" : "Tous les articles"}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {regularBlogs.length > 0
                          ? regularBlogs.map((blog) => (
                              <article
                                key={blog.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                              >
                                <Link to={`/blog/${blog.id}`} className="block">
                                  <div className="relative h-56 overflow-hidden">
                                    <img
                                      src={blog.image}
                                      alt={blog.titre}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.src = DEFAULT_IMAGE;
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                      <Badge className="bg-white/90 text-slate-800 backdrop-blur-sm">
                                        Article
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="p-6 space-y-4">
                                    <div className="flex items-center text-sm text-slate-500 space-x-4">
                                      <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>
                                          {formatDate(blog.datePublication)}
                                        </span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>
                                          {getReadingTime(blog.contenu)} min
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-2">
                                      {blog.titre}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                                      {getExcerpt(blog.contenu)}
                                    </p>
                                    <div className="flex items-center justify-between pt-2">
                                      <div className="flex items-center text-sm text-slate-500">
                                        <UserRound className="h-4 w-4 mr-1" />
                                        <span className="font-medium">
                                          {blog.auteur}
                                        </span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                                      >
                                        Lire plus
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                      </Button>
                                    </div>
                                  </div>
                                </Link>
                              </article>
                            ))
                          : !featuredBlog && (
                              <EmptyStateComponent hasError={false} />
                            )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
