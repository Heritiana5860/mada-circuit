
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PangalanesSection = () => {
  return (
    <section className="bg-secondary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <span className="text-sm font-medium text-primary">Canal des Pangalanes</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Découvrez cette merveille naturelle
            </h2>
            <p className="text-muted-foreground mb-6">
              Le Canal des Pangalanes, long de près de 700 kilomètres, est l'une des plus grandes réalisations 
              d'ingénierie de Madagascar. Il relie Farafangana à Toamasina en longeant la côte est, offrant 
              une voie navigable à travers les lagunes, les lacs et les estuaires.
            </p>
            <p className="text-muted-foreground mb-6">
              Naviguez à travers des paysages luxuriants, observez la faune et la flore uniques, et 
              découvrez les villages traditionnels qui bordent ce canal historique.
            </p>
            <Link to="/pangalanes" className="btn-primary inline-flex">
              <span>Explorer le canal</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform lg:translate-x-6 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2600&q=80" 
                alt="Canal des Pangalanes" 
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl max-w-xs hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg font-semibold mb-2">700 km de navigation</p>
              <p className="text-muted-foreground text-sm">Une expérience unique à travers les lagunes et villages traditionnels.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PangalanesSection;
