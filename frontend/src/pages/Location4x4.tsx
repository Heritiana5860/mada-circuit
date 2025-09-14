import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_VEHICULES } from "@/graphql/queries";
import VehicleCard from "@/components/VehicleCard.new";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Filter } from "lucide-react";
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

const Location4x4: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_VEHICULES);
  const vehicles = data?.allVehicules || [];
  const vehicleTypes = [];
  vehicles.forEach((v) => {
    if (!vehicleTypes.includes(v.type)) {
      vehicleTypes.push(v.type);
    }
  });
  // const vehicleTypes = typesData?.allTypesVehicule || [];
  const [filter, setFilter] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const filteredVehicles = filter
    ? vehicles.filter((v) => v.type === filter)
    : vehicles;

  if (loading || faqLoading || utilisateurLoading || testimoniaLoading)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Chargement des véhicules...</p>
        </main>
        <Footer />
      </div>
    );

  if (error || faqError || utilisateurError || testimoniaError)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Erreur lors du chargement des véhicules</p>
        </main>
        <Footer />
      </div>
    );

  const faqVehicule = allDataFaq.filter((faq) => faq.faqType === "VEHICULE");
  const allData = testimoniaData.filter((data) => data.type === "VEHICULE");

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
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Location 4x4 à Madagascar | Avec Chauffeur Expérimenté"
        description="Louez un 4x4 avec chauffeur à Madagascar pour vos circuits et excursions. Confort, sécurité et flexibilité pour explorer l’île en toute sérénité."
        canonical="https://madagascar-voyagesolidaire.com/location-4x4"
        image="https://madagascar-voyagesolidaire.com/images/vehicule-og.webp"
      />

      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Vehicle Rental</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtres */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>

                <div className="space-y-4">
                  {/* Filtrer par type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Filter by type
                    </label>
                    <select
                      onChange={(e) => setFilter(e.target.value)}
                      value={filter}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">All types</option>
                      {vehicleTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des véhicules */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.length === 0 ? (
                  <EmptyData
                    titre="Nos vehicules seront bientôt disponible."
                    description="Merci pour votre patience."
                  />
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <TestimoniaCarousel
          currentIndex={currentIndex}
          datas={allData}
          groupedTestimonials={groupedTestimonials}
          setCurrentIndex={setCurrentIndex}
          testimonialsPerSlide={testimonialsPerSlide}
          utilisateurImage={utilisateurImage}
        />

        {/* Foire Aux Questions */}
        {faqVehicule.length > 0 && <FaqCard faq={faqVehicule} />}
      </main>
      <Footer />
    </div>
  );
};

export default Location4x4;
