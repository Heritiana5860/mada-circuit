import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Car, Users, Fuel } from 'lucide-react';
import { CSSProperties } from 'react';
import { Vehicule } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicule;
  className?: string;
  style?: CSSProperties;
}

const VehicleCard = ({ 
  vehicle,
  className,
  style
}: VehicleCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden bg-card shadow-md card-hover",
        className
      )}
      style={style}
    >
      {/* <div className="relative img-zoom-container">
        <img 
          src={vehicle.image || '/images/placeholder-vehicle.jpg'} 
          alt={`${vehicle.marque} ${vehicle.modele}`} 
          className="w-full h-56 object-cover img-zoom"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {vehicle.type.libelle}
          </span>
        </div>
      </div> */}
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{`${vehicle.marque} ${vehicle.modele}`}</h3>
        
        {/* <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{vehicle.capacite.nombre_places}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Car className="h-4 w-4 mr-1" />
              <span className="text-sm">{vehicle.transmission === 'MANUELLE' ? 'Manuelle' : 'Automatique'}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Fuel className="h-4 w-4 mr-1" />
              <span className="text-sm">{vehicle.carburant === 'DIESEL' ? 'Diesel' : 'Essence'}</span>
            </div>
          </div>
        </div> */}
        
        {/* <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-primary">
              {vehicle.prix_par_jour.toLocaleString()} Ar
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              /jour
            </span>
          </div>
          
          <Link 
            to={`/vehicules/${vehicle.id}`} 
            className="btn-secondary text-sm py-1 px-3 h-auto"
          >
            Réserver
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default VehicleCard;
