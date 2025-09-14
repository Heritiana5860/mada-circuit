import NavBar from "@/components/NavBar";
import PageGuideCard from "./PageGuideCard";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AllPersonnelContext } from "@/provider/DataContext";
import { urlMedia } from "@/helper/UrlImage";
import EmptyData from "@/components/EmptyData";

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
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (personnelError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-600 dark:text-gray-300">Error!</p>
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
              Madagascar Travel Experts
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Meet Our
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {" "}
              Specialists
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Our passionate team of travel professionals, each specialized in
            their domain, is here to guide you in crafting your personalized
            adventure in Madagascar. From the first idea to the final
            discovery—we’re with you every step of the way.
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
                Meet the team
              </span>
            </button>
            <Link to="/contact">
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-lg">
                <span className="flex items-center">
                  <span className="mr-2">💬</span>
                  Ask for advice
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
              Our Commitment to Your Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every member of our team contributes their unique expertise to
              craft a travel experience that’s unforgettable and tailored just
              for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Custom Travel Planning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our travel experts design unique itineraries tailored to your
                desires, budget, and passions.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Local Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover Madagascar through the eyes of our local guides, who
                unveil its natural wonders, vibrant culture, and time-honored
                traditions.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Support Around the Clock
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                From planning to return, our team is here for you—day and
                night—to make your journey seamless and unforgettable.
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
              Our Team of Experts
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Specialists
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Each expert brings unique skills and a genuine passion for sharing
              the wonders of Madagascar. Click on a profile to discover how they
              can help you plan your ideal journey.
            </p>
          </div>

          {personnelData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personnelData.map((guide) => (
                <PageGuideCard
                  key={guide.id}
                  url={`${urlMedia}${guide.photo}`}
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
          ) : (
            <EmptyData
              titre="Upcoming experts Coming Soon"
            />
          )}
        </div>
      </section>

      {/* Section pourquoi nous choisir */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Makes Our Team Unique?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Certified Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our certified guides and seasoned travel consultants bring
                trusted expertise to every journey.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗣️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Multilingual
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer seamless communication in French, English, and native
                Malagasy languages.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Recognized Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Exceptional reviews and enthusiastic feedback from our clients
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Local Commitment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Empowering local communities through sustainable and responsible
                tourism
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA améliorée */}
      <section className="bg-secondary/5 text-black py-20">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Design Your Dream Trip to Madagascar?
          </h3>
          <p className="text-xl mb-8 text-gray-500 leading-relaxed">
            From first ideas to final details, our travel specialists are here
            to guide you. Whether you're full of plans or just starting out,
            contact us for free expert advice tailored to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/contact">
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center">
                  <span className="mr-2">📞</span>
                  Get a free consultation
                </span>
              </button>
            </Link>
            <Link to="/voyages-sur-mesure">
              <button className="border-2 border-white text-gray-500 hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
                <span className="flex items-center">
                  <span className="mr-2">✈️</span>
                  Design My Personalized Journey
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">
                Fast & Friendly Support
              </h4>
              <p className="text-gray-500">
                We respond to all your requests within 24 hours
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">Free Advice</h4>
              <p className="text-gray-500">
                First consultation with no obligation
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-lg mb-2">Tailor-Made</h4>
              <p className="text-gray-500">
                Travel tailored to your desires and budget
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
