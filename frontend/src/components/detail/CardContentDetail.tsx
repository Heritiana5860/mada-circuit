import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { formatPrice } from "@/helper/formatage";

interface ImageType {
  image: string;
}

interface PackType {
  id: number;
  titre: string;
  duree: number;
  prix: number;
  images: ImageType[];
  destination: string;
  description: string;
}

interface CardContentDetailProps {
  pack: PackType;
  lien: string;
}

const CardContentDetail: React.FC<CardContentDetailProps> = ({
  pack,
  lien,
}) => {
  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48">
          {pack.images && pack.images.length > 0 && (
            <img
              src={`http://localhost:8000/media/${pack.images[0].image}`}
              alt={pack.titre}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {pack.duree} jours
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{pack?.destination ?? "Destination inconnue"}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{pack.titre}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{pack.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-primary">
              {formatPrice(pack.prix)}
            </span>
            <Link to={`/${lien}/${pack.id}`} state={{ dataState: pack }}>
              <Button variant="outline" size="sm" className="flex items-center">
                <span>Détails</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardContentDetail;
