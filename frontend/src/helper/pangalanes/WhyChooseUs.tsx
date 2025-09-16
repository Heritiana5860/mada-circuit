import { Camera, Compass, Fish, Heart, Trees, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export const useWhyChooseUs = () => {
  const { t } = useTranslation();
  return [
    {
      title: t(
        "pages.pangalanes.pangalanesEthnicDiversity",
        "Ethnic Diversity"
      ),
      description: t(
        "pages.pangalanes.pangalanesDiscovertherich",
        "Discover the rich diversity of Malagasy ethnic groups living along the canal and their unique cultures."
      ),
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesExceptionalWildlife",
        "Exceptional Wildlife"
      ),
      description: t(
        "pages.pangalanes.pangalanesObserveavibrant",
        "Observe a vibrant array of wildlife, including over 100 bird species and many endemic animals."
      ),
      icon: <Fish className="h-6 w-6 text-primary" />,
    },
    {
      title: t("pages.pangalanes.pangalanesLushVegetation", "Lush Vegetation"),
      description: t(
        "pages.pangalanes.pangalanesExploretheabundant",
        "Explore the abundant tropical greenery that lines the canal and its lakes."
      ),
      icon: <Trees className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesUniqueLandscapes",
        "Unique Landscapes"
      ),
      description: t(
        "pages.pangalanes.pangalanesAdmirebreathtaking",
        "Admire breathtaking panoramas of virgin forests, serene lakes, and coastal dunes."
      ),
      icon: <Camera className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesCommunityBasedTourism",
        "Community-Based Tourism"
      ),
      description: t(
        "pages.pangalanes.pangalanesTakepart",
        "Take part in local initiatives that support canal-side communities and their development."
      ),
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: t(
        "pages.pangalanes.pangalanesExperiencedGuides",
        "Experienced Guides"
      ),
      description: t(
        "pages.pangalanes.pangalanesTravelwith",
        "Travel with passionate French- and English-speaking guides who share their culture and heritage."
      ),
      icon: <Compass className="h-6 w-6 text-primary" />,
    },
  ];
};
