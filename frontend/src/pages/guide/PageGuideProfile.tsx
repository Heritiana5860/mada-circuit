import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Star,
  Globe,
  Award,
  MessageCircle,
  Calendar,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import CarouselHeader from "@/components/CarouselHeader";
import Footer from "@/components/Footer";

const PageGuideProfile = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const guideData = location.state || [];
  console.log("Guide Data:", guideData);

  // Auto-rotation du carousel
  useEffect(() => {
    if (guideData.aventureImage?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % guideData.aventureImage.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [guideData.aventureImage?.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? guideData.aventureImage.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % guideData.aventureImage.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <NavBar />

      <CarouselHeader
        backgroundImages={guideData.aventureImage || []}
        circuitsData={guideData}
        currentImageIndex={currentImageIndex}
        titre={guideData.nom || "Guide Professionnel"}
        description={guideData.Biographie}
        goToSlide={goToSlide}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        showCircuitsCount={false}
      />

      {/* Guide Profile Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Carte profil principale */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sticky top-8">
                {/* Photo de profil */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={guideData.url || "/api/placeholder/200/200"}
                      alt={guideData.nom}
                      className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-700"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Nom et spécialité */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {guideData.nom || "Guide Professionnel"}
                  </h1>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4 mr-2" />
                    {guideData.specialite || "Guide Touristique"}
                  </div>
                </div>

                {/* Évaluation */}
                <div className="flex justify-center items-center mb-6">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    4.9 (127 avis)
                  </span>
                </div>

                {/* Informations de contact */}
                <div className="space-y-4 mb-8">
                  {guideData.lieu && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-red-500" />
                      <span>{guideData.lieu.replace("📍", "")}</span>
                    </div>
                  )}

                  {guideData.languages && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Globe className="w-5 h-5 mr-3 text-blue-500" />
                      <span>{guideData.languages}</span>
                    </div>
                  )}

                  {guideData.email && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Mail className="w-5 h-5 mr-3 text-green-500" />
                      <span className="text-sm">{guideData.email}</span>
                    </div>
                  )}

                  {guideData.contact && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Phone className="w-5 h-5 mr-3 text-purple-500" />
                      <span>{guideData.contact}</span>
                    </div>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Contacter le guide
                  </button>

                  <button className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Réserver une visite
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* À propos */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-500" />À propos de{" "}
                  {guideData.nom?.split(" ")[0] || "votre guide"}
                </h2>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {guideData.Biographie ||
                      "Biographie du guide non disponible."}
                  </p>
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    150+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Visites guidées
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    5+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Années d'expérience
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {guideData.rating}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Note moyenne
                  </div>
                </div>
              </div>

              {/* Spécialités */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Spécialités & Services
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {guideData.specialite.map((sp, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {sp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avis clients */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Avis des voyageurs
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      nom: "Marie Dubois",
                      note: 4,
                      commentaire:
                        "Excellente expérience ! Guide très professionnel et passionné.",
                      date: "Il y a 2 semaines",
                    },
                    {
                      nom: "Jean Martin",
                      note: 5,
                      commentaire:
                        "Tour parfait, je recommande vivement ce guide !",
                      date: "Il y a 1 mois",
                    },
                  ].map((avis, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {avis.nom
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="ml-3">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {avis.nom}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {avis.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(avis.note)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {avis.commentaire}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageGuideProfile;
