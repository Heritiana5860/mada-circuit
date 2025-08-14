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
  handleCardClick,
  onContact,
  onEmail,
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
            "https://plus.unsplash.com/premium_photo-1666739388590-72762edf76ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2UlMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={nom || "Guide"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
