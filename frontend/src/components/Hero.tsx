import { ArrowRight, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-section relative">
      {/* Collage de photos en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Photo 1 - Paysage Madagascar */}
          <div
            className="absolute w-72 h-48 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              top: "10%",
              left: "5%",
              transform: "rotate(-8deg)",
              backgroundImage: "url(soleil.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float1 6s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 2 - Baobabs */}
          <div
            className="absolute w-64 h-80 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              top: "15%",
              right: "8%",
              transform: "rotate(12deg)",
              backgroundImage: "url(dobo.JPG)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float2 7s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 3 - Canal des Pangalanes */}
          <div
            className="absolute w-80 h-52 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              bottom: "25%",
              left: "8%",
              transform: "rotate(6deg)",
              backgroundImage: "url(terracan.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float3 8s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 4 - Village local */}
          <div
            className="absolute w-56 h-72 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              bottom: "15%",
              right: "15%",
              transform: "rotate(-10deg)",
              backgroundImage: "url(lemur.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float4 5.5s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 5 - Faune Madagascar */}
          <div
            className="absolute w-60 h-44 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              top: "50%",
              left: "15%",
              transform: "rotate(-3deg)",
              backgroundImage: "url(feu.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float5 6.5s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 6 - Plage tropicale */}
          <div
            className="absolute w-48 h-64 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              top: "35%",
              right: "30%",
              transform: "rotate(15deg)",
              backgroundImage: "url(lakana.JPG)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float6 7.5s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>
          <div
            className="absolute w-80 h-64 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              top: "15%",
              right: "60%",
              transform: "rotate(-3deg)",
              backgroundImage: "url(solidaire.JPG)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float6 7.5s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Photo 7 - Coucher de soleil */}
          <div
            className="absolute w-44 h-32 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl"
            style={{
              bottom: "45%",
              right: "5%",
              transform: "rotate(-12deg)",
              backgroundImage: "url(park.JPG)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "float7 6s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          </div>

          {/* Particules flottantes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${10 + i * 8}%`,
                animation: `particle-float 10s linear infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay gradient sophistiqué - optimisé pour garder l'image visible en bas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/40 z-1"></div>

      {/* Effet de vignette léger */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 z-2"></div>

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
          className={`text-6xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1200 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{
            textShadow:
              "0 4px 20px rgba(0,0,0,0.7), 0 8px 40px rgba(0,0,0,0.5)",
            animationDelay: "0.2s",
          }}
        >
          Madagascar
          <br />
          <span className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text">
            Voyage
          </span>
          <br />
          Solidaire
        </h1>

        {/* Sous-titre élégant */}
        <p
          className={`text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
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
          <a
            href="/circuits"
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
          </a>

          <a
            href="/contact"
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
          </a>
        </div>
      </div>

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

      {/* Styles CSS intégrés pour les animations */}
      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: rotate(-8deg) translateY(0px);
          }
          50% {
            transform: rotate(-8deg) translateY(-20px);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: rotate(12deg) translateY(0px);
          }
          50% {
            transform: rotate(12deg) translateY(-15px);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: rotate(6deg) translateY(0px);
          }
          50% {
            transform: rotate(6deg) translateY(-25px);
          }
        }
        @keyframes float4 {
          0%,
          100% {
            transform: rotate(-10deg) translateY(0px);
          }
          50% {
            transform: rotate(-10deg) translateY(-18px);
          }
        }
        @keyframes float5 {
          0%,
          100% {
            transform: rotate(-3deg) translateY(0px);
          }
          50% {
            transform: rotate(-3deg) translateY(-22px);
          }
        }
        @keyframes float6 {
          0%,
          100% {
            transform: rotate(15deg) translateY(0px);
          }
          50% {
            transform: rotate(15deg) translateY(-16px);
          }
        }
        @keyframes float7 {
          0%,
          100% {
            transform: rotate(-12deg) translateY(0px);
          }
          50% {
            transform: rotate(-12deg) translateY(-20px);
          }
        }
        @keyframes particle-float {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
          }
        }

        /* Responsive pour mobile */
        @media (max-width: 768px) {
          .absolute.w-72 {
            width: 200px;
            height: 140px;
          }
          .absolute.w-64 {
            width: 160px;
            height: 220px;
          }
          .absolute.w-80 {
            width: 180px;
            height: 120px;
          }
          .absolute.w-56 {
            width: 140px;
            height: 180px;
          }
          .absolute.w-60 {
            width: 150px;
            height: 110px;
          }
          .absolute.w-48 {
            width: 120px;
            height: 160px;
          }
          .absolute.w-44 {
            width: 110px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
