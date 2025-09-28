import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_VEHICULES } from "@/graphql/queries";
import VehicleCard from "@/components/VehicleCard.new";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DataContext,
  FaqContext,
  TestimoniaContext,
} from "@/provider/DataContext";
import { FaqCard } from "@/components/FaqCard";
import { TestimoniaCarousel } from "@/components/TestimoniaCarousel";
import SEO from "@/SEO";
import EmptyData from "@/components/EmptyData";
import ContentLoading from "@/components/Loading";

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

  const { t } = useTranslation();

  // Recuperer les FAQ
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);
  
  // Recuperer les Testimonias
  const { testimoniaData, testimoniaLoading, testimoniaError } =
    useContext(TestimoniaContext);

  const filteredVehicles = filter
    ? vehicles.filter((v) => v.type === filter)
    : vehicles;

  if (loading || faqLoading || testimoniaLoading)
    return <ContentLoading />;

  if (error || faqError || testimoniaError)
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

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="4x4 Rental in Madagascar | With Experienced Driver"
        description="Rent a 4x4 with a driver in Madagascar for your tours and excursions. Comfort, safety, and flexibility to explore the island with peace of mind."
        canonical="https://madagascar-voyagesolidaire.com/location-4x4"
        image="https://madagascar-voyagesolidaire.com/images/vehicule-og.webp"
      />

      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">
            {t("pages.vehicule.rental", "Vehicle Rental")}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtres */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  {t("pages.circuits.filters", "Filters")}
                </h2>

                <div className="space-y-4">
                  {/* Filtrer par type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("pages.vehicule.byType", "Filter by type")}
                    </label>
                    <select
                      onChange={(e) => setFilter(e.target.value)}
                      value={filter}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">
                        {t("pages.vehicule.allTypes", "All types")}
                      </option>
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
                  <EmptyData titre="Upcoming Vehicles Comming Soon." />
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
        />

        {/* Foire Aux Questions */}
        {faqVehicule.length > 0 && <FaqCard faq={faqVehicule} />}
      </main>
      <Footer />
    </div>
  );
};

export default Location4x4;
