import NavBar from "@/components/NavBar";
import PageGuideCard from "./PageGuideCard";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PageGuide = () => {
  const guideData = [
    {
      id: 1,
      aventureImage: [
        "https://plus.unsplash.com/premium_photo-1720373139748-8060f718ec21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZlbnR1cmUlMjB0b3VyaXN0aXF1ZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1626234151148-67eef56d0a34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZlbnR1cmUlMjB0b3VyaXN0aXF1ZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1566283190896-d1fc1c11beb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZlbnR1cmUlMjB0b3VyaXN0aXF1ZXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      nom: "Jean Doe",
      specialite: [
        "Guide naturaliste spécialisé dans les parcs nationaux",
        "Observation de la faune",
        "Randonnée",
        "Photographie de la nature",
      ],
      languages: "Français, Anglais",
      lieu: "📍Basé à Antananarivo",
      Biographie:
        "Andry est un passionné de la nature malgache depuis plus de 15 ans. Diplômé en écotourisme, il a parcouru les forêts denses de Ranomafana, les massifs de l'Isalo, et les zones humides de Masoala pour faire découvrir aux voyageurs la biodiversité unique de Madagascar.",
      contact: "+261 38 22 754 98",
      email: "jean.doe@gmail.com",
      rating: 3.9,
      reviewCount: 136,
      price: "À partir de 45€",
      availability: "Disponible",
      prix: "À partir de 45€",
    },
    {
      id: 2,
      aventureImage: [
        "https://images.unsplash.com/photo-1676808625978-400448b79d48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1553244687-0646c8e0b68e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1534249214258-6039e5137921?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
      ],
      url: "https://plus.unsplash.com/premium_photo-1714839367832-43d2363fff46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG91cmlzdGljJTIwZ3VpZGUlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
      nom: "Mialy Notiavina",
      specialite: [
        "Guide culturelle",
        "Artisanat",
        "Traditions malgaches",
        "Rites ancestraux",
      ],
      languages: "Français, Anglais, Espagnol",
      lieu: "📍Basée à Tuléar",
      Biographie:
        "Originaire du sud de Madagascar, Mialy a étudié l'histoire et la civilisation malgache à l'Université de Fianarantsoa. Depuis plus de 10 ans, elle accompagne des groupes et voyageurs curieux à travers les traditions, l'artisanat et les rites ancestraux de sa région.",
      contact: "+261 32 50 704 90",
      email: "mialy@gmail.com",
      rating: 4.0,
      reviewCount: 156,
      price: "À partir de 45€",
      availability: "Disponible",
      prix: "À partir de 40€",
    },
    {
      id: 3,
      aventureImage: [
        "https://images.unsplash.com/photo-1589411455082-23c608daac50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1487975836665-e091375fb97f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1445093446913-34933e71f8ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2ZW50dXJlJTIwdG91cmlzdGlxdWV8ZW58MHx8MHx8fDA%3D",
      ],
      url: "https://images.unsplash.com/photo-1495538411606-c9efab92bcbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvdXJpc3RpYyUyMGd1aWRlJTIwbWFufGVufDB8fDB8fHww",
      nom: "Hery Nasandratra",
      specialite: ["Guide aventure", "Randonnée", "Trekking"],
      languages: "Français, Anglais, Allemand",
      lieu: "📍Basé à Antsirabe",
      Biographie:
        "Hery est un guide certifié passionné de randonnée, originaire des Hautes Terres. Ancien enseignant reconverti dans le tourisme, il combine connaissances géographiques et esprit d'aventure. Avec plus de 12 ans d'expérience, il a mené des treks de plusieurs jours dans l'Andringitra, l'Ankaratra, et les zones rurales inexplorées.",
      contact: "+261 33 21 958 88",
      email: "hery@gmail.com",
      rating: 3.7,
      reviewCount: 123,
      price: "À partir de 45€",
      availability: "Disponible",
      prix: "À partir de 44€",
    },
  ];

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());

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

  const handleFavorite = (guide) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(guide.id)) {
        newFavorites.delete(guide.id);
      } else {
        newFavorites.add(guide.id);
      }
      return newFavorites;
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <NavBar />

      {/* Hero Section modernisé */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden bg-[url(/guide.png)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🇲🇬 Madagascar Authentique
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Découvrez nos
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}
              guides experts
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Des professionnels passionnés vous accompagnent pour une découverte
            authentique de Madagascar. Chaque guide apporte son expertise unique
            pour des expériences inoubliables.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explorer nos guides
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300">
              Planifier mon voyage
            </button>
          </div>
        </div>
      </section>

      {/* Section des statistiques */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                15+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Années d'expérience
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Voyageurs satisfaits
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                25+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Destinations uniques
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform">
                4.9★
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos Guides Experts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Chaque guide possède une expertise unique et une passion
              authentique pour partager les merveilles de Madagascar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideData.map((guide, index) => (
              <PageGuideCard
                key={guide.id}
                url={guide.url}
                nom={guide.nom}
                lieu={guide.lieu}
                languages={guide.languages}
                Biographie={guide.Biographie}
                lien={guide}
                handleCardClick={handleCardClick}
                rating={guide.rating}
                reviewCount={guide.reviewCount}
                price={guide.prix}
                contact={guide.contact}
                availability={guide.availability}
                email={guide.email}
                onContact={handleContact}
                onEmail={handleEmail}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(guide.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt pour votre aventure malgache ?
          </h3>
          <p className="text-lg mb-8 text-blue-100">
            Contactez nos guides pour planifier votre voyage sur mesure
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Commencer la planification
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageGuide;
