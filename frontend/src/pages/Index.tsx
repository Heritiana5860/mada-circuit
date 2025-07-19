
import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import HomeFeatures from '../components/HomeFeatures';
import PopularCircuits from '../components/PopularCircuits';
import PangalanesSection from '../components/PangalanesSection';

import Vehicles4x4 from '../components/Vehicles4x4';
import Testimonials from '../components/Testimonials';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Madagascar Voyage - Circuits, Canal des Pangalanes & Location 4x4';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        
        <HomeFeatures />
        
        <PopularCircuits />

        <PangalanesSection />
        
        <Vehicles4x4 />
        
        <Testimonials />
        
        <section className="section-container">
          <NewsletterSignup />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
