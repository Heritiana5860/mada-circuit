import { ArrowRight, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-section">
      {/* Overlay gradient sophistiqué - optimisé pour garder l'image visible en bas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/30"></div>

      {/* Effet de vignette léger */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20"></div>

      <div className="relative z-10 px-4 text-center max-w-5xl mx-auto">
        {/* Badge premium */}
        <div
          className={`inline-flex items-center gap-2 mb-6 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative group">
            {/* Effet glass premium */}
            <div className="absolute inset-0 bg-white/15 backdrop-blur-2xl border border-white/25 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]"></div>

            {/* Halo lumineux */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Effet de réflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-full"></div>

            <div className="relative px-4 py-2 flex items-center gap-2 text-sm font-medium text-white">
              <Star className="w-4 h-4 text-accent fill-current drop-shadow-sm" />
              <span className="drop-shadow-sm">
                Expérience authentique Madagascar
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_theme(colors.primary)]"></div>
            </div>
          </div>
        </div>

        {/* Titre principal raffiné */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1200 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{
            textShadow:
              "0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3)",
            animationDelay: "0.2s",
          }}
        >
          Explorez les
          <br />
          <span className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text">
            merveilles
          </span>
          <br />
          de Madagascar
        </h1>

        {/* Sous-titre élégant */}
        <p
          className={`text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            animationDelay: "0.4s",
          }}
        >
          Des circuits sur mesure, la découverte du canal des Pangalanes et la
          location de véhicules 4x4 pour une{" "}
          <span className="font-semibold text-accent">
            aventure inoubliable
          </span>
          .
        </p>

        {/* Boutons professionnels */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            to="/circuits"
            className="bg-primary rounded group relative overflow-hidden transform hover:scale-105 transition-all duration-300 px-8 py-4 text-base"
          >
            {/* Effet glass premium sur le bouton principal */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 rounded-md"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-md group-hover:bg-white/20 transition-all duration-300"></div>

            {/* Effet de brillance diagonale */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Shadow glow */}
            <div className="absolute -inset-1 bg-primary/30 rounded-md blur-lg opacity-0 group-hover:opacity-60 transition-all duration-300"></div>

            <div className="relative flex items-center justify-center gap-2 z-10 font-semibold text-white">
              <span>Découvrir nos circuits</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/contact"
            className="group relative overflow-hidden transform hover:scale-105 transition-all duration-300 px-8 py-4 text-base text-white font-semibold rounded-md"
          >
            {/* Effet glass amélioré */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"></div>

            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            {/* Effet de lumière sur les bords */}
            <div className="absolute inset-0 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"></div>

            <div className="relative flex items-center justify-center gap-2 z-10">
              <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
              <span>Nous contacter</span>
            </div>
          </Link>
        </div>

        {/* Points forts subtils */}
        <div
          className={`flex flex-wrap justify-center gap-8 mt-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ animationDelay: "0.8s" }}
        >
          {[
            { label: "Circuits personnalisés", value: "100%" },
            { label: "Guides expérimentés", value: "15+ ans" },
            { label: "Clients satisfaits", value: "2000+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient de transition amélioré */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/95 via-white/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>

      {/* Indicateur de scroll repositionné */}
      <div
        className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ animationDelay: "1s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div
              className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce shadow-sm"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
