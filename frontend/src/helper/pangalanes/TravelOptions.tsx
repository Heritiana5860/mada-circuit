import {
  ArrowRight,
  Globe,
  MapPin,
  Sailboat,
  Shield,
  Star,
} from "lucide-react";

export const travelOptions = [
  {
    title: "Authentic Cruises",
    description:
      "Sail along the canal and enjoy local cuisine aboard our traditional boats.",
    icon: <Sailboat className="h-6 w-6 text-primary" />,
  },
  {
    title: "Tailor-Made Journeys",
    description:
      "Create your personalized itinerary based on your preferences and pace with our specialists.",
    icon: <Star className="h-6 w-6 text-primary" />,
  },
  {
    title: "Adventure Raid",
    description:
      "Live an unforgettable experience by exploring the entire 650 km stretch of the canal.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "Classic Tours",
    description:
      "Choose from our tried-and-tested itineraries to discover the canal’s hidden treasures.",
    icon: <MapPin className="h-6 w-6 text-primary" />,
  },
  {
    title: "Beach Stays",
    description:
      "Enjoy the beaches and cozy lodges along the canal and the Indian Ocean.",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
  {
    title: "Vehicle Rentals",
    description:
      "Rent 4x4s or compact cars to freely explore the surroundings of the canal.",
    icon: <ArrowRight className="h-6 w-6 text-primary" />,
  },
];
