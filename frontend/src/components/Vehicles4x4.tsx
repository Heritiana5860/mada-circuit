import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_VEHICULES } from '../graphql/queries';
import VehicleCard from './VehicleCard';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Vehicles4x4: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_VEHICULES);

  // Prendre les 4 derniers véhicules (les plus récemment ajoutés)
  const vehicles = data?.allVehicules?.length > 0
    ? data.allVehicules.slice(-4).reverse()
    : [];

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-sm font-medium text-primary">Véhicules 4x4</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Nos véhicules disponibles
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Découvrez notre flotte de véhicules 4x4 parfaitement adaptés pour explorer
            les routes de Madagascar en toute sécurité et confort.
          </p>
        </div>
        <Link to="/location-4x4" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
          <span>Voir tous les véhicules</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des véhicules...</span>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Erreur lors du chargement des véhicules. Veuillez réessayer plus tard.
          </AlertDescription>
        </Alert>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun véhicule disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index: number) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Vehicles4x4;