import React from "react";
import { Star, MapPin, Phone, Mail, Globe, Award } from "lucide-react";

// Composant PageGuideCard modernisé
const PageGuideCard = ({
  url,
  nom,
  specialite,
  languages,
  lieu,
  Biographie,
  contact,
  email,
}) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image avec overlay gradient */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={url}
          alt={nom}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-900">4.8</span>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Nom et spécialité */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {nom}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
              {specialite}
            </p>
          </div>
        </div>

        {/* Informations pratiques */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm">{lieu.replace("📍", "")}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Globe className="w-4 h-4 text-green-500" />
            <span className="text-sm">Langues: {languages}</span>
          </div>
        </div>

        {/* Biographie tronquée */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
          {Biographie}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Voir le profil complet
          </button>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Appeler</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageGuideCard;
