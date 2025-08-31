import NavBar from "@/components/NavBar";
import PageGuideCard from "./PageGuideCard";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AllPersonnelContext } from "@/provider/DataContext";

const PageGuide = () => {
  const { personnelData, peronnelLoading, personnelError } =
    useContext(AllPersonnelContext);

  const navigate = useNavigate();

  const handleCardClick = (guide) => {
    navigate(`/guidesprofile/${guide.id}`, {
      state: guide,
    });
  };

  const handleContact = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  if (peronnelLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Chargement de nos experts...
          </p>
        </div>
      </div>
    );
  }

  if (personnelError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-300">
            Erreur lors du chargement des données
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <NavBar />

      {/* Hero Section modernisé */}
      <section className="relative bg-green-100 text-white overflow-hidden bg-[url(/guide.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="mr-2">🏝️</span>
              Votre Équipe d'Experts Madagascar
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Rencontrez nos
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {" "}
              Spécialistes
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Une équipe de professionnels passionnés, chacun expert dans son
            domaine, prêts à vous accompagner dans la création de votre voyage
            sur mesure à Madagascar. De la planification à l'exploration, nous
            sommes là pour vous.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => {
                document.getElementById("equipe")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              <span className="flex items-center">
                <span className="mr-2">👥</span>
                Découvrir l'équipe
              </span>
            </button>
            <Link to="/contact">
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-lg">
                <span className="flex items-center">
                  <span className="mr-2">💬</span>
                  Demander conseil
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section d'introduction des services */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comment Nous Vous Aidons
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Chaque membre de notre équipe apporte une expertise unique pour
              faire de votre voyage une expérience extraordinaire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Planification sur Mesure
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nos conseillers voyage créent des itinéraires personnalisés
                selon vos envies, votre budget et vos centres d'intérêt.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Expertise Locale
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nos guides locaux vous font découvrir les secrets de Madagascar
                : faune, flore, culture et traditions authentiques.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Accompagnement 24/7
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Notre équipe reste disponible avant, pendant et après votre
                voyage pour garantir une expérience parfaite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section des experts */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900" id="equipe">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Notre Équipe d'Experts
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Faites Connaissance avec Nos Spécialistes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Chaque expert possède des compétences uniques et une passion
              authentique pour partager les merveilles de Madagascar. Cliquez
              sur un profil pour découvrir comment ils peuvent vous aider à
              planifier votre voyage idéal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personnelData.map((guide) => (
              <PageGuideCard
                key={guide.id}
                url={`http://localhost:8000/media/${guide.photo}`}
                nom={`${guide.nom} ${guide.prenom}`}
                lieu={guide.adresse}
                languages={guide.langues}
                Biographie={guide.biographie}
                lien={guide}
                handleCardClick={handleCardClick}
                contact={guide.contact}
                email={guide.email}
                onContact={handleContact}
                onEmail={handleEmail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section pourquoi nous choisir */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Pourquoi Choisir Notre Équipe ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Expertise Certifiée
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Guides professionnels certifiés et conseillers expérimentés
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗣️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Multilingues
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Communication fluide en français, anglais, et langues locales
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Excellence Reconnue
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notes exceptionnelles et témoignages clients élogieux
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Engagement Local
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Soutien aux communautés et tourisme responsable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA améliorée */}
      <section className="bg-secondary/5 text-black py-20">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Planifier Votre Aventure Malgache ?
          </h3>
          <p className="text-xl mb-8 text-gray-500 leading-relaxed">
            Nos experts sont là pour vous accompagner dans chaque étape de votre
            projet. Que vous ayez une idée précise ou besoin d'inspiration,
            contactez-nous pour un conseil personnalisé gratuit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/contact">
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center">
                  <span className="mr-2">📞</span>
                  Demander un conseil gratuit
                </span>
              </button>
            </Link>
            <Link to="/voyages-sur-mesure">
              <button className="border-2 border-white text-gray-500 hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
                <span className="flex items-center">
                  <span className="mr-2">✈️</span>
                  Créer mon voyage sur mesure
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">Réponse Rapide</h4>
              <p className="text-gray-500">
                Réponse sous 24h à toutes vos demandes
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">Conseil Gratuit</h4>
              <p className="text-gray-500">
                Première consultation sans engagement
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">Sur Mesure</h4>
              <p className="text-gray-500">
                Voyage adapté à vos envies et budget
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageGuide;
