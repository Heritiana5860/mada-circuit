import {
  BookOpen,
  Heart,
  Landmark,
  School,
  TreePine,
  Users,
} from "lucide-react";

export const objectifs = [
  {
    title: "Parrainage d'enfants",
    description:
      "Aider des enfants qui vivent dans des villages au bord du canal des pangalanes entre Tamatave-Mahanoro-Mananjary-Manakara à trouver des parrains pour subvenir à leurs études complètes et leurs besoins vitaux dès la classe primaire, secondaire ou lycée.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Soutien aux établissements scolaires",
    description:
      "L'association a pour objet de participer à aider les établissements scolaires en construisant de nouvelles infrastructures et en fournissant des matériels scolaires.",
    icon: <School className="h-6 w-6 text-primary" />,
  },
  {
    title: "Droit à l'éducation",
    description:
      "Elle a pour but de protéger le principal droit des enfants à l'éducation, en leur donnant accès à un enseignement de qualité.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Respect des traditions",
    description:
      "Elle a pour but de prioriser l'école en gardant la religion, la tradition et les coutumes locales.",
    icon: <Landmark className="h-6 w-6 text-primary" />,
  },
  {
    title: "Protection de l'environnement",
    description:
      "Elle a pour but de protéger l'environnement et la nature ainsi que les biens publics.",
    icon: <TreePine className="h-6 w-6 text-primary" />,
  },
  {
    title: "Développement communautaire",
    description:
      "Contribuer au développement des communautés locales à travers l'éducation des enfants qui deviendront les forces vives de demain.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];
