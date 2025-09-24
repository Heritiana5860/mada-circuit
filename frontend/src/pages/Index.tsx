import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import HomeFeatures from "../components/HomeFeatures";
import PopularCircuits from "../components/PopularCircuits";
import PangalanesSection from "../components/PangalanesSection";
import Vehicles4x4 from "../components/Vehicles4x4";
import Footer from "../components/Footer";
import SEO from "@/SEO";
import { AllTestimoniaContext } from "@/provider/DataContext";
import { TestimoniaCarousel } from "@/components/TestimoniaCarousel";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set page title
    document.title =
      "Madagascar Travel - Tours, Pangalanes Canal & 4x4 Rentals";
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: testimoniaData,
    loading: testimoniaLoading,
    error: testimoniaError,
  } = useContext(AllTestimoniaContext);

  if (testimoniaLoading)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Chargement...</p>
        </main>
        <Footer />
      </div>
    );

  if (testimoniaError)
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Erreur lors du chargement.</p>
        </main>
        <Footer />
      </div>
    );

  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  if (testimoniaData?.length) {
    for (let i = 0; i < testimoniaData.length; i += testimonialsPerSlide) {
      groupedTestimonials.push(
        testimoniaData.slice(i, i + testimonialsPerSlide)
      );
    }
  }

  console.log("Testimonia Data:", testimoniaData);
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Voyage à Madagascar | Circuits, Canal des Pangalanes & Location de 4x4"
        description="Tailor-made tours in Madagascar, excursions on the Pangalanes Canal, and 4x4 rentals with a driver for an unforgettable adventure."
        canonical="https://madagascar-voyagesolidaire.com/"
        image="https://madagascar-voyagesolidaire.com/images/index-og.webp"
      />

      <NavBar />

      <main className="flex-grow">
        <Hero />

        <TestimoniaCarousel
          currentIndex={currentIndex}
          datas={testimoniaData}
          groupedTestimonials={groupedTestimonials}
          setCurrentIndex={setCurrentIndex}
          testimonialsPerSlide={testimonialsPerSlide}
        />

        <HomeFeatures />

        <PopularCircuits />

        <PangalanesSection />

        <Vehicles4x4 />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
