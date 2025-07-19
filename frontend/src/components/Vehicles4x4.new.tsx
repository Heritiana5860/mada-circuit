import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_VEHICULES } from '@/graphql/queries';
import VehicleCard from './VehicleCard.new';
import { ArrowRight } from 'lucide-react';

const Vehicles4x4: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_VEHICULES);
  const vehicles = data?.allVehicules?.vehicules || [];

  if (loading) return (
    <section className="section-container">
      <div className="text-center">
        <p>Chargement des véhicules...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="section-container">
      <div className="text-center">
        <p>Erreur lors du chargement des véhicules</p>
      </div>
    </section>
  );

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-sm font-medium text-primary">Location 4x4</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Nos véhicules tout-terrain
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Louez un véhicule 4x4 robuste et fiable pour explorer les terrains parfois difficiles de Madagascar 
            et accéder aux endroits les plus reculés et extraordinaires.
          </p>
        </div>
        <Link to="/location-4x4" className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
          <span>Voir tous les véhicules</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">Aucun véhicule disponible.</div>
        ) : (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </div>
    </section>
  );
};

export default Vehicles4x4; 