import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import HomeFeatures from "../components/HomeFeatures";
import PopularCircuits from "../components/PopularCircuits";
import PangalanesSection from "../components/PangalanesSection";
import Vehicles4x4 from "../components/Vehicles4x4";
import Footer from "../components/Footer";
import SEO from "@/SEO";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set page title
    document.title =
      "Madagascar Voyage - Circuits, Canal des Pangalanes & Location 4x4";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Madagascar Voyage | Circuits, Pangalanes & Location 4x4"
        description="Circuits sur mesure à Madagascar, excursions sur le Canal des Pangalanes et location de 4x4 avec chauffeur pour une aventure inoubliable."
        canonical="https://madagascar-voyagesolidaire.com/"
        image="https://madagascar-voyagesolidaire.com/images/index-og.webp"
      />

      <NavBar />

      <main className="flex-grow">
        <Hero />

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
