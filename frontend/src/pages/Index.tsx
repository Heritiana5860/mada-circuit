import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import HomeFeatures from "../components/HomeFeatures";
import PopularCircuits from "../components/PopularCircuits";
import PangalanesSection from "../components/PangalanesSection";
import Vehicles4x4 from "../components/Vehicles4x4";
import Footer from "../components/Footer";
import SEO from "@/SEO";
import { TestimoniaContext } from "@/provider/DataContext";
import { TestimoniaCarousel } from "@/components/TestimoniaCarousel";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set page title
    document.title =
      "Madagascar Travel - Tours, Pangalanes Canal & 4x4 Rentals";
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { testimoniaData, testimoniaLoading, testimoniaError } =
    useContext(TestimoniaContext);

  if (testimoniaLoading) return <ContentLoading />;

  if (testimoniaError) return <ContentError />;

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
