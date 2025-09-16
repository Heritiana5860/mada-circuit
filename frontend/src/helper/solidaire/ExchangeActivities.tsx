import {
  ArrowRight,
  Globe,
  Heart,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useExchangeActivities = () => {
  const { t } = useTranslation();
  return [
    {
      title: t(
        "pages.solidaire.solidaireBasketryWorkshop",
        "Basketry Workshop"
      ),
      description: t(
        "pages.solidaire.solidaireLearnthe",
        "Learn the traditional art of basket weaving from local artisans who share their ancestral know-how."
      ),
      icon: <Star className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireFishingTechniques",
        "Fishing Techniques"
      ),
      description: t(
        "pages.solidaire.solidaireDiscovertraditional",
        "Discover traditional fishing methods used by the communities living along the Pangalanes Canal."
      ),
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireRiceCultivation", "Rice Cultivation"),
      description: t(
        "pages.solidaire.solidaireTakepartin",
        "Take part in the various stages of rice farming, a staple of Malagasy cuisine."
      ),
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireRicePounding", "Rice Pounding"),
      description: t(
        "pages.solidaire.solidaireTryyour",
        "Try your hand at traditional rice pounding, a daily activity in Malagasy villages."
      ),
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireCulturalTraditions",
        "Cultural Traditions"
      ),
      description: t(
        "pages.solidaire.solidaireImmerseyourself",
        "Immerse yourself in local customs and traditions through meaningful exchanges with villagers."
      ),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireSongsandChoir", "Songs and Choir"),
      description: t(
        "pages.solidaire.solidaireAttendvillage",
        "Attend village church services featuring choral singing and hymns for an authentic cultural experience."
      ),
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
  ];
};
