import { Camera, Compass, Fish, Sailboat, Trees, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export const useActivities = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("pages.pangalanes.pangalanesCanalCruise", "Canal Cruise"),
      description: t(
        "pages.pangalanes.pangalanesSail",
        "Sail the calm waters of the canal aboard our comfortable boats and take in breathtaking scenery."
      ),
      icon: <Sailboat className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesWildlifeWatching",
        "Wildlife Watching"
      ),
      description: t(
        "pages.pangalanes.pangalanesAdmire",
        "Admire various species of lemurs, birds, and other animals living in the forests along the canal."
      ),
      icon: <Trees className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesTraditionalFishing",
        "Traditional Fishing"
      ),
      description: t(
        "pages.pangalanes.pangalanesLearn",
        "Learn local fishing techniques and try your luck catching freshwater fish."
      ),
      icon: <Fish className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesPhotoSafari", "Photo Safari"),
      description: t(
        "pages.pangalanes.pangalanesCapture",
        "Capture unforgettable moments and unique landscapes during your journey along the Pangalanes Canal."
      ),
      icon: <Camera className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesVillageVisits", "Village Visits"),
      description: t(
        "pages.pangalanes.pangalanesMeet",
        "Meet local communities and discover their traditional lifestyle and craftsmanship."
      ),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesGuidedHikes", "Guided Hikes"),
      description: t(
        "pages.pangalanes.pangalanesExplore",
        "Explore the trails along the canal with our experienced guides and discover the local flora."
      ),
      icon: <Compass className="h-6 w-6 text-primary" />,
    },
  ];
};
