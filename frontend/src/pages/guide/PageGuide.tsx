// import NavBar from "@/components/NavBar";
// import PageGuideCard from "./PageGuideCard";
// import Footer from "@/components/Footer";

import NavBar from "@/components/NavBar";
import PageGuideCard from "./PageGuideCard";
import Footer from "@/components/Footer";

// const PageGuide = () => {
//   const guideData = [
//     {
//       url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
//       nom: "Jean Doe",
//       specialite: "Guide naturaliste spécialisé dans les parcs nationaux",
//       languages: "Français, Anglais",
//       lieu: "📍Basé à Antananarivo",
//       Biographie:
//         "Andry est un passionné de la nature malgache depuis plus de 15 ans. Diplômé en écotourisme, il a parcouru les forêts denses de Ranomafana, les massifs de l’Isalo, et les zones humides de Masoala pour faire découvrir aux voyageurs la biodiversité unique de Madagascar. Il travaille en étroite collaboration avec les communautés locales et les chercheurs pour proposer des circuits éco-responsables.",
//       description:
//         "Andry propose des circuits immersifs dans les parcs nationaux pour observer lémuriens, caméléons et oiseaux endémiques. Il accompagne aussi bien les familles que les scientifiques, avec un sens aigu de l’organisation et une connaissance approfondie de la faune et de la flore.",
//       galleryPhoto: [],
//       contact: "+261 38 22 754 98",
//       email: "jean.doe@gmail.com",
//     },
//     {
//       url: "https://plus.unsplash.com/premium_photo-1714839367832-43d2363fff46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG91cmlzdGljJTIwZ3VpZGUlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
//       nom: "Mialy Notiavina",
//       specialite: "Guide culturelle et historique dans la région Sud",
//       languages: "Français, Anglais, Espagnol",
//       lieu: "📍Basée à Tuléar",
//       Biographie:
//         "Originaire du sud de Madagascar, Mialy a étudié l’histoire et la civilisation malgache à l’Université de Fianarantsoa. Depuis plus de 10 ans, elle accompagne des groupes et voyageurs curieux à travers les traditions, l'artisanat et les rites ancestraux de sa région.",
//       description:
//         "Spécialisée dans les circuits culturels, Mialy propose des visites guidées des villages Antandroy et Mahafaly, des tombes sculptées, des marchés traditionnels et des ateliers d’artisanat. Son approche humaine et respectueuse des coutumes locales permet aux visiteurs de vivre une immersion authentique.",
//       galleryPhoto: [],
//       contact: "+261 32 50 704 90",
//       email: "mialy@gmail.com",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1495538411606-c9efab92bcbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvdXJpc3RpYyUyMGd1aWRlJTIwbWFufGVufDB8fDB8fHww",
//       nom: "Hery Nasandratra",
//       specialite: "Guide aventure et trek dans les hautes terres",
//       languages: "Français, Anglais, Allemand",
//       lieu: "📍Basé à Antsirabe",
//       Biographie:
//         "Hery est un guide certifié passionné de randonnée, originaire des Hautes Terres. Ancien enseignant reconverti dans le tourisme, il combine connaissances géographiques et esprit d’aventure. Avec plus de 12 ans d’expérience, il a mené des treks de plusieurs jours dans l’Andringitra, l’Ankaratra, et les zones rurales inexplorées.",
//       description:
//         "Hery organise des circuits personnalisés à pied ou à vélo à travers rizières, plateaux volcaniques et villages reculés. Parfait pour les voyageurs sportifs à la recherche d’authenticité, de paysages grandioses et de rencontres inoubliables avec les habitants.",
//       galleryPhoto: [],
//       contact: "+261 33 21 958 88",
//       email: "hery@gmail.com",
//     },
//   ];

//   return (
//     <div>
//       {/* Navigation bar */}
//       <NavBar />
//       <main className="w-full px-4 py-6 bg-white dark:bg-gray-900 text-center">
//         {/* Entête pour dire quelque mot à propos de guide touristique */}
//         <section className="w-full h-50 bg-black-100 bg-[url(/)]">
//           <div className="max-w-4xl mx-auto py-6 px-4">
//             <h2 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
//               Decouvrir notre talentant guide
//             </h2>
//             <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 py-2">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               Expedita, temporibus. Officiis unde rem, sit voluptate, nisi
//               aperiam corrupti dolor quas dolores aut aliquid praesentium, eum
//               minus odit laudantium at error?
//             </p>
//           </div>
//         </section>
//       </main>
//       <div className="container py-16">
//         {/* Cards section */}
//         <section className="max-w-8xl mx-auto py-6 px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {guideData.map((guide, index) => (
//               <PageGuideCard
//                 key={index}
//                 url={guide.url}
//                 nom={guide.nom}
//                 specialite={guide.specialite}
//                 lieu={guide.lieu}
//                 languages={guide.languages}
//                 Biographie={guide.Biographie}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default PageGuide;

const PageGuide = () => {
  const guideData = [
    {
      url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      nom: "Jean Doe",
      specialite: "Guide naturaliste spécialisé dans les parcs nationaux",
      languages: "Français, Anglais",
      lieu: "📍Basé à Antananarivo",
      Biographie:
        "Andry est un passionné de la nature malgache depuis plus de 15 ans. Diplômé en écotourisme, il a parcouru les forêts denses de Ranomafana, les massifs de l'Isalo, et les zones humides de Masoala pour faire découvrir aux voyageurs la biodiversité unique de Madagascar.",
      contact: "+261 38 22 754 98",
      email: "jean.doe@gmail.com",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1714839367832-43d2363fff46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG91cmlzdGljJTIwZ3VpZGUlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
      nom: "Mialy Notiavina",
      specialite: "Guide culturelle et historique dans la région Sud",
      languages: "Français, Anglais, Espagnol",
      lieu: "📍Basée à Tuléar",
      Biographie:
        "Originaire du sud de Madagascar, Mialy a étudié l'histoire et la civilisation malgache à l'Université de Fianarantsoa. Depuis plus de 10 ans, elle accompagne des groupes et voyageurs curieux à travers les traditions, l'artisanat et les rites ancestraux de sa région.",
      contact: "+261 32 50 704 90",
      email: "mialy@gmail.com",
    },
    {
      url: "https://images.unsplash.com/photo-1495538411606-c9efab92bcbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvdXJpc3RpYyUyMGd1aWRlJTIwbWFufGVufDB8fDB8fHww",
      nom: "Hery Nasandratra",
      specialite: "Guide aventure et trek dans les hautes terres",
      languages: "Français, Anglais, Allemand",
      lieu: "📍Basé à Antsirabe",
      Biographie:
        "Hery est un guide certifié passionné de randonnée, originaire des Hautes Terres. Ancien enseignant reconverti dans le tourisme, il combine connaissances géographiques et esprit d'aventure. Avec plus de 12 ans d'expérience, il a mené des treks de plusieurs jours dans l'Andringitra, l'Ankaratra, et les zones rurales inexplorées.",
      contact: "+261 33 21 958 88",
      email: "hery@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <NavBar />

      {/* Hero Section modernisé */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
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
                key={index}
                url={guide.url}
                nom={guide.nom}
                specialite={guide.specialite}
                lieu={guide.lieu}
                languages={guide.languages}
                Biographie={guide.Biographie}
                contact={guide.contact}
                email={guide.email}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
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
