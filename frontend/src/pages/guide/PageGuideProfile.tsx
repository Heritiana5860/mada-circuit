import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <NavBar />

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
                      src={`http://localhost:8000/media/${guideData.photo}`}
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
                    {guideData.nom} {guideData.prenom}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {guideData.specialite
                      ?.split(";")
                      .map((sp) => sp.trim())
                      .filter((sp) => sp.length > 0)
                      .map((sp, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium shadow-sm"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          {sp || "Guide Touristique"}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="space-y-4 mb-8">
                  {guideData.adresse && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-red-500" />
                      <span>{guideData.adresse}</span>
                    </div>
                  )}

                  {guideData.langues && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Globe className="w-5 h-5 mr-3 text-blue-500" />
                      <div className="space-2">
                        {guideData.langues.split(";").map((ln) => (
                          <span>{ln} </span>
                        ))}
                      </div>
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
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* À propos */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-500" />À propos de{" "}
                  {guideData.nom || "votre guide"}
                </h2>

                {/* Status */}
                <h2 className="text-lg font-bold text-blue-600 dark:text-white mb-6 flex items-center">
                  <BriefcaseBusiness className="w-4 h-4 mr-3 text-blue-500" />
                  {guideData.status || "votre guide"}
                </h2>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {guideData.biographie ||
                      "Biographie du guide non disponible."}
                  </p>
                </div>
              </div>

              {/* Spécialités */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Spécialités & Services
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {guideData.specialite.split(";").map((sp, index) => (
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
