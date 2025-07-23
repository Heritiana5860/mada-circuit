import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Calendar,
  MessageCircle,
  Heart,
} from "lucide-react";

const PageGuideCard = ({
  url,
  nom,
  languages,
  lieu,
  lien,
  Biographie,
  contact,
  email,
  rating = 4.8,
  reviewCount = 127,
  price = "À partir de 50€",
  availability = "Disponible",
  handleCardClick,
  onContact,
  onEmail,
  onFavorite,
  isFavorite = false,
}) => {
  // Gestion des données manquantes
  const handleContactClick = (e) => {
    e.stopPropagation();
    if (contact && onContact) {
      onContact(contact);
    } else {
      alert("Numéro de téléphone non disponible");
    }
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    if (email && onEmail) {
      onEmail(email);
    } else {
      alert("Email non disponible");
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavorite && lien) {
      onFavorite(lien);
    }
  };

  const handleCardMainClick = () => {
    if (handleCardClick) {
      handleCardClick({
        nom,
        languages,
        lieu,
        Biographie,
        contact,
        email,
        url,
      });
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer">
      {/* Image avec overlay gradient */}
      <div
        className="relative h-48 overflow-hidden"
        onClick={handleCardMainClick}
      >
        <img
          src={
            url ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
          }
          alt={nom || "Guide"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          // onError={(e) => {
          //   e.target.src =
          //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face";
          // }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge note et favoris */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900">
              {rating}
            </span>
            <span className="text-xs text-gray-600">({reviewCount})</span>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? "text-red-500 fill-current"
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>
        </div>

        {/* Badge disponibilité */}
        <div className="absolute bottom-4 left-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              availability === "Disponible"
                ? "bg-green-500/90 text-white"
                : "bg-yellow-500/90 text-white"
            }`}
          >
            {availability}
          </div>
        </div>

        {/* Prix */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            {price}
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Nom et spécialité */}
        <div className="mb-4" onClick={handleCardMainClick}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
            {nom || "Guide Non Spécifié"}
          </h3>
        </div>

        {/* Informations pratiques */}
        <div className="space-y-2 mb-4">
          {lieu && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {lieu.replace("📍", "")}
              </span>
            </div>
          )}
          {languages && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Globe className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm line-clamp-1">Langues: {languages}</span>
            </div>
          )}
        </div>

        {/* Biographie tronquée */}
        {Biographie && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
            {Biographie}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleCardClick(lien)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Voir le profil complet
            </span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleContactClick}
              disabled={!contact}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Appeler</span>
            </button>

            <button
              onClick={handleEmailClick}
              disabled={!email}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </button>

            <button className="flex items-center justify-center gap-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loader pour les interactions */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    </div>
  );
};

export default PageGuideCard;
