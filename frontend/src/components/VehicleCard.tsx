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
  const { id, marque, modele, annee, prix, images, type, capacite } = vehicle;

  // Afficher la première image de la galerie ou un placeholder
  const imageUrl =
    images && images.length > 0
      ? `${urlMedia}${images[0].image}`
      : "/placeholder.svg";

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
      style={style}
    >
      <Link to={`/location-4x4/${id}`} className="block">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src={imageUrl}
            alt={`${marque} ${modele}`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-sans font-semibold text-gray-900">
              {marque} {modele}
            </h3>
            <span className="text-sm text-gray-500">{annee}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Car className="w-4 h-4 mr-1" />
              <span>{type}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{capacite} places</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-primary">
              {formatPrice(prix)}
              <span className="text-sm text-gray-500 font-normal"> / jour</span>
            </div>
            <span className="text-sm text-primary font-medium">Réserver</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VehicleCard;
