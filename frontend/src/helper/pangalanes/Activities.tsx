import { Camera, Compass, Fish, Sailboat, Trees, Users } from "lucide-react";

export const activities = [
  {
    title: "Canal Cruise",
    description:
      "Sail the calm waters of the canal aboard our comfortable boats and take in breathtaking scenery.",
    icon: <Sailboat className="h-6 w-6 text-primary" />,
  },
  {
    title: "Wildlife Watching",
    description:
      "Admire various species of lemurs, birds, and other animals living in the forests along the canal.",
    icon: <Trees className="h-6 w-6 text-primary" />,
  },
  {
    title: "Traditional Fishing",
    description:
      "Learn local fishing techniques and try your luck catching freshwater fish.",
    icon: <Fish className="h-6 w-6 text-primary" />,
  },
  {
    title: "Photo Safari",
    description:
      "Capture unforgettable moments and unique landscapes during your journey along the Pangalanes Canal.",
    icon: <Camera className="h-6 w-6 text-primary" />,
  },
  {
    title: "Village Visits",
    description:
      "Meet local communities and discover their traditional lifestyle and craftsmanship.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Guided Hikes",
    description:
      "Explore the trails along the canal with our experienced guides and discover the local flora.",
    icon: <Compass className="h-6 w-6 text-primary" />,
  },
];
