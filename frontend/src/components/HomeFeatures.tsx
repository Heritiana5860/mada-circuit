
import { Map, Calendar, Compass, Users, Star, Truck } from 'lucide-react';
import FeatureCard from './FeatureCard';

const HomeFeatures = () => {
  const features = [
    {
      title: "Circuits Touristiques",
      description: "Découvrez nos circuits soigneusement conçus pour explorer les merveilles de Madagascar.",
      icon: <Map className="h-6 w-6 text-primary" />,
    },
    {
      title: "Voyages Sur Mesure",
      description: "Créez votre propre itinéraire avec l'aide de nos experts pour une expérience unique.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
    {
      title: "Canal des Pangalanes",
      description: "Explorez ce canal unique de 700 km reliant Farafangana à Toamasina.",
      icon: <Compass className="h-6 w-6 text-primary" />,
    },
    {
      title: "Location de 4x4",
      description: "Louez un véhicule tout-terrain pour explorer librement les paysages variés de l'île.",
      icon: <Truck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Guides Locaux",
      description: "Nos guides expérimentés vous feront découvrir la culture et l'histoire locales.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Service 5 Étoiles",
      description: "Nous nous engageons à offrir un service d'excellence pour un voyage sans souci.",
      icon: <Star className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-sm font-medium text-primary">Nos Services</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Découvrez nos offres exclusives
        </h2>
        <p className="text-muted-foreground">
          Nous proposons une gamme complète de services pour rendre votre séjour à Madagascar inoubliable, 
          de la découverte des circuits touristiques à la location de véhicules 4x4.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeFeatures;
