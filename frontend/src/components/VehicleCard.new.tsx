import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Car, Users } from "lucide-react";
import { CSSProperties } from "react";
import { Vehicule } from "@/types";
import { formatPrice } from "@/helper/formatage";
import { urlMedia } from "@/helper/UrlImage";

interface VehicleCardProps {
  vehicle: Vehicule;
  className?: string;
  style?: CSSProperties;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  className,
  style,
}) => {
  // Afficher la première image de la galerie ou un placeholder
  const imageUrl =
    vehicle.images && vehicle.images.length > 0
      ? `${urlMedia}${vehicle.images[0].image}`
      : "/placeholder.svg";

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden bg-card shadow-md card-hover",
        className
      )}
      style={style}
    >
      <div className="relative img-zoom-container">
        <img
          src={imageUrl}
          alt={`${vehicle.marque} ${vehicle.modele}`}
          className="w-full h-56 object-cover img-zoom"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {vehicle.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-sans font-bold mb-2">{`${vehicle.marque} ${vehicle.modele} (${vehicle.annee})`}</h3>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{vehicle.capacite} places</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Car className="h-4 w-4 mr-1" />
              <span className="text-sm">{vehicle.etat}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-primary">
              {formatPrice(vehicle.prix)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/jour</span>
          </div>

          <Link
            to={`/location-4x4/${vehicle.id}`}
            className="btn-secondary text-sm py-1 px-3 h-auto"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
