import {
  BookOpen,
  Heart,
  Landmark,
  School,
  TreePine,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useObjectifs = () => {
  const { t } = useTranslation();
  return [
    {
      title: t(
        "pages.solidaire.solidaireParrainagedenfants",
        "Parrainage d'enfants"
      ),
      description: t(
        "pages.solidaire.solidaireAider",
        "Aider des enfants qui vivent dans des villages au bord du canal des pangalanes entre Tamatave-Mahanoro-Mananjary-Manakara à trouver des parrains pour subvenir à leurs études complètes et leurs besoins vitaux dès la classe primaire, secondaire ou lycée."
      ),
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireSoutien",
        "Soutien aux établissements scolaires"
      ),
      description: t(
        "pages.solidaire.solidaireassociationa",
        "L'association a pour objet de participer à aider les établissements scolaires en construisant de nouvelles infrastructures et en fournissant des matériels scolaires."
      ),
      icon: <School className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireDroit", "Droit à l'éducation"),
      description: t(
        "pages.solidaire.solidaireElle",
        "Elle a pour but de protéger le principal droit des enfants à l'éducation, en leur donnant accès à un enseignement de qualité."
      ),
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireRespect", "Respect des traditions"),
      description: t(
        "pages.solidaire.solidaireEllea",
        "Elle a pour but de prioriser l'école en gardant la religion, la tradition et les coutumes locales."
      ),
      icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireProtection",
        "Protection de l'environnement"
      ),
      description: t(
        "pages.solidaire.solidairepour",
        "Elle a pour but de protéger l'environnement et la nature ainsi que les biens publics."
      ),
      icon: <TreePine className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidairecommunautaire",
        "Développement communautaire"
      ),
      description: t(
        "pages.solidaire.solidaireContribuerau",
        "Contribuer au développement des communautés locales à travers l'éducation des enfants qui deviendront les forces vives de demain."
      ),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
  ];
};
