import { Heart } from 'lucide-react';
import { useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { CircuitImage } from '@/types';

interface CircuitCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  images?: CircuitImage[];
  className?: string;
  style?: CSSProperties;
}

const CircuitCard = ({ id, title, location, duration, price, images, className, style }: CircuitCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  // Afficher la première image de la galerie ou un placeholder
  const imageUrl = images && images.length > 0
    ? `http://localhost:8000/media/${images[0].image}`
    : '/placeholder.svg';

  return (
    <Link to={`/circuits/${id}`}>
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
            alt={title}
            className="w-full h-64 object-cover img-zoom"
          />
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-background/50 hover:bg-background/80 p-2 rounded-full transition-colors backdrop-blur-sm"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={cn(
                "h-5 w-5", 
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              )} 
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white text-sm font-medium bg-primary/90 px-2 py-1 rounded-full">
              {duration}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold truncate">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3">{location}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              {price.toLocaleString()} Ar
            </span>
            <span className="text-sm text-muted-foreground">par personne</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CircuitCard;
