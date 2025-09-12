import { Map, Calendar, Compass, Truck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({
  title,
  description,
  icon,
  index,
  isHovered,
  onHover,
  lien,
}) => {
  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-500/30 cursor-pointer ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        animationDelay: `${index * 150}ms`,
        transform: isHovered
          ? "translateY(-8px) scale(1.02)"
          : "translateY(0) scale(1)",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl  to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />

      <div className="relative z-10">
        {/* Icon with animated background */}
        <div className="relative mb-6 inline-block">
          <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-110" />
          <div className="relative p-4 rounded-xl group-hover:from-primary group-hover:to-secondary transition-all duration-500">
            <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-500 transform group-hover:scale-110">
              {icon}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-500">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Animated arrow */}
        <Link to={lien} className="group-hover:underline">
          <div className="flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2">
            <span className="mr-2">Explorer</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-bounce" />
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300 group-hover:animate-pulse" />
    </div>
  );
};

const HomeFeatures = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      title: "Tourist Tours",
      description:
        "Discover our carefully crafted tours to explore the wonders of Madagascar.",
      icon: <Map className="h-7 w-7" />,
      lien: "/circuits",
    },
    {
      title: "Tailor-Made Trips",
      description:
        "Create your own itinerary with the help of our experts for a unique experience.",
      icon: <Calendar className="h-7 w-7" />,
      lien: "/voyages-sur-mesure",
    },
    {
      title: "Pangalanes Canal",
      description:
        "Explore this unique 700 km canal connecting Farafangana to Toamasina.",
      icon: <Compass className="h-7 w-7" />,
      lien: "/pangalanes",
    },
    {
      title: "4x4 Rentals",
      description:
        "Rent an off-road vehicle to freely explore the island's diverse landscapes.",
      icon: <Truck className="h-7 w-7" />,
      lien: "/location-4x4",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.05),transparent_50%)]" />

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ✨ Our Premium Services
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span>Discover Our Exclusive </span>
            <br />
            <span>Offers</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We offer a full range of services to make your stay in Madagascar
            <span className="font-semibold text-blue-600"> unforgettable</span>,
            from exploring tourist tours to renting 4x4 vehicles.
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
                isHovered={hoveredCard === index}
                onHover={setHoveredCard}
                lien={feature.lien}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to={"/voyages-sur-mesure"}>
            <button className="group relative inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 px-8 py-4 text-base">
              <span>Plan My Trip</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
