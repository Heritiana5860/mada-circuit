import {
  BookOpen,
  Building,
  Church,
  Droplets,
  Heart,
  LightbulbIcon,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useSupportProjects = () => {
  const { t } = useTranslation();
  return [
    {
      title: t(
        "pages.solidaire.solidaireWellConstruction",
        "Well Construction"
      ),
      description: t(
        "pages.solidaire.solidaireFundthe",
        "Fund the construction of wells to ensure access to clean drinking water for canal-side villages."
      ),
      icon: <Droplets className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireSolarPanels", "Solar Panels"),
      description: t(
        "pages.solidaire.solidaireInstall",
        "Install solar panels to bring electricity to remote villages along the Pangalanes Canal."
      ),
      icon: <LightbulbIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireChildSponsorship",
        "Child Sponsorship"
      ),
      description: t(
        "pages.solidaire.solidaireSupportchildren",
        "Support children so they can continue their education through secondary school and even university."
      ),
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.solidaire.solidaireSchoolSupplies", "School Supplies"),
      description: t(
        "pages.solidaire.solidaireProvideschool",
        "Provide school supplies to help children study in better conditions."
      ),
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireSchoolRenovation",
        "School Renovation"
      ),
      description: t(
        "pages.solidaire.solidaireTakepart",
        "Take part in renovating school infrastructure to improve learning conditions."
      ),
      icon: <Building className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireHospitalRenovation",
        "Hospital Renovation"
      ),
      description: t(
        "pages.solidaire.solidaireContribute",
        "Contribute to improving medical infrastructure to offer better healthcare to local residents."
      ),
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireChurchConstruction",
        "Church Construction"
      ),
      description: t(
        "pages.solidaire.solidaireHelpbuild",
        "Help build or renovate churches, key places of spiritual and social life in the villages."
      ),
      icon: <Church className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.solidaire.solidaireSeedDistribution",
        "Seed Distribution"
      ),
      description: t(
        "pages.solidaire.solidaireProvidemaize",
        "Provide maize, bean, and vegetable seeds to ensure food security in the villages."
      ),
    },
  ];
};
