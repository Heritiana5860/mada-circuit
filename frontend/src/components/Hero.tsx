import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10"></div>
      
      <div className="relative z-10 px-4 text-center max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block bg-primary/80 text-white text-sm font-medium px-3 py-1 rounded-full mb-6 backdrop-blur-sm">
          Découvrez Madagascar
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Explorez les merveilles de Madagascar
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Des circuits sur mesure, la découverte du canal des Pangalanes et la location de véhicules 4x4 pour une aventure inoubliable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/circuits" className="btn-primary">
            <span>Découvrir nos circuits</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-secondary">
            <span>Nous contacter</span>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
