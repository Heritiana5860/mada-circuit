import {
  ArrowRight,
  Globe,
  Heart,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export const exchangeActivities = [
  {
    title: "Basketry Workshop",
    description:
      "Learn the traditional art of basket weaving from local artisans who share their ancestral know-how.",
    icon: <Star className="h-6 w-6 text-primary" />,
  },
  {
    title: "Fishing Techniques",
    description:
      "Discover traditional fishing methods used by the communities living along the Pangalanes Canal.",
    icon: <ArrowRight className="h-6 w-6 text-primary" />,
  },
  {
    title: "Rice Cultivation",
    description:
      "Take part in the various stages of rice farming, a staple of Malagasy cuisine.",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
  {
    title: "Rice Pounding",
    description:
      "Try your hand at traditional rice pounding, a daily activity in Malagasy villages.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Cultural Traditions",
    description:
      "Immerse yourself in local customs and traditions through meaningful exchanges with villagers.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Songs and Choir",
    description:
      "Attend village church services featuring choral singing and hymns for an authentic cultural experience.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
];
