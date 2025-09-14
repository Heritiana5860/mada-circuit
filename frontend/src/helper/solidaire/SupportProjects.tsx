import {
  BookOpen,
  Building,
  Church,
  Droplets,
  Heart,
  LightbulbIcon,
  ShieldCheck,
} from "lucide-react";

export const supportProjects = [
  {
    title: "Well Construction",
    description:
      "Fund the construction of wells to ensure access to clean drinking water for canal-side villages.",
    icon: <Droplets className="h-6 w-6 text-primary" />,
  },
  {
    title: "Solar Panels",
    description:
      "Install solar panels to bring electricity to remote villages along the Pangalanes Canal.",
    icon: <LightbulbIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: "Child Sponsorship",
    description:
      "Support children so they can continue their education through secondary school and even university.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
  {
    title: "School Supplies",
    description:
      "Provide school supplies to help children study in better conditions.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "School Renovation",
    description:
      "Take part in renovating school infrastructure to improve learning conditions.",
    icon: <Building className="h-6 w-6 text-primary" />,
  },
  {
    title: "Hospital Renovation",
    description:
      "Contribute to improving medical infrastructure to offer better healthcare to local residents.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Church Construction",
    description:
      "Help build or renovate churches, key places of spiritual and social life in the villages.",
    icon: <Church className="h-6 w-6 text-primary" />,
  },
  {
    title: "Seed Distribution",
    description:
      "Provide maize, bean, and vegetable seeds to ensure food security in the villages.",
  },
];
