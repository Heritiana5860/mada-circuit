import {
  ArrowRight,
  Globe,
  MapPin,
  Sailboat,
  Shield,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useTravelOptions = () => {
  const { t } = useTranslation();
  return [
    {
      title: t(
        "pages.pangalanes.pangalanesAuthenticCruises",
        "Authentic Cruises"
      ),
      description: t(
        "pages.pangalanes.pangalanesSailalong",
        "Sail along the canal and enjoy local cuisine aboard our traditional boats."
      ),
      icon: <Sailboat className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesTailorMadeJourneys",
        "Tailor-Made Journeys"
      ),
      description: t(
        "pages.pangalanes.pangalanesCreateyour",
        "Create your personalized itinerary based on your preferences and pace with our specialists."
      ),
      icon: <Star className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesAdventureRaid", "Adventure Raid"),
      description: t(
        "pages.pangalanes.pangalanesLivean",
        "Live an unforgettable experience by exploring the entire 650 km stretch of the canal."
      ),
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesClassicTours", "Classic Tours"),
      description: t(
        "pages.pangalanes.pangalanesChoosefrom",
        "Choose from our tried-and-tested itineraries to discover the canal’s hidden treasures."
      ),
      icon: <MapPin className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesBeachStays", "Beach Stays"),
      description: t(
        "pages.pangalanes.pangalanesEnjoythe",
        "Enjoy the beaches and cozy lodges along the canal and the Indian Ocean."
      ),
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesVehicleRentals", "Vehicle Rentals"),
      description: t(
        "pages.pangalanes.pangalanesRent4x4s",
        "Rent 4x4s or compact cars to freely explore the surroundings of the canal."
      ),
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
    },
  ];
};
