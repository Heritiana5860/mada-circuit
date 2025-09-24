import { urlMedia } from "@/helper/UrlImage";
import { Star, Calendar, Eye, X } from "lucide-react";
import { useState } from "react";

interface UtilisateurType {
  nom: string;
  prenom: string;
  email?: string;
  image?: string;
}

interface TestimonialTypes {
  score: number;
  description: string;
  postDate: Date;
  utilisateur: UtilisateurType;
}

interface TestimonialCardProps {
  allData: TestimonialTypes;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  allData,
}) => {
  const user = allData.utilisateur || { nom: "Inconnu", prenom: "", image: "" , email: ""};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CHAR_LIMIT = 150;

  console.log("User:", user);

  // Génération des étoiles simplifiée
  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < score ? "text-amber-400 fill-amber-400" : "text-gray-200"
        }`}
      />
    ));
  };

  // Formatage de la date simplifié
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Génération des initiales
  const getInitials = (nom: string, prenom: string) => {
    const first = prenom?.charAt(0) || "";
    const last = nom?.charAt(0) || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  // Couleur d'avatar simplifiée
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const index = (name || "").length % colors.length;
    return colors[index];
  };

  // Texte tronqué
  const shouldTruncate =
    allData.description && allData.description.length > CHAR_LIMIT;
  const displayText = shouldTruncate
    ? allData.description.substring(0, CHAR_LIMIT) + "..."
    : allData.description;

  const initial = getInitials(user.nom, user.prenom);

  return (
    <>
      {/* Carte principale */}
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
        {/* En-tête utilisateur */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
              user.nom + user.prenom
            )}`}
          >
            <img 
            src={`${urlMedia}${user?.image}` } 
            alt={initial}
            className="w-full h-full object-cover rounded-full" 
            />
            {/* {getInitials(user.nom, user.prenom)} */}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {user.nom} {user.prenom} 
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(allData.postDate)}</span>
            </div>
          </div>
        </div>

        {/* Note étoiles */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">{renderStars(allData.score)}</div>
        </div>

        {/* Témoignage */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            "{displayText || "Aucun témoignage disponible."}"
          </p>
        </div>

        {/* Bouton "Lire plus" si nécessaire */}
        {shouldTruncate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            Lire la suite
          </button>
        )}
      </div>

      {/* Modal simplifié */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête modal */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                    user.nom + user.prenom
                  )}`}
                >
                  {getInitials(user.nom, user.prenom)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.prenom} {user.nom}
                  </h3>
                  <div className="flex gap-1">{renderStars(allData.score)}</div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Contenu complet */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                "{allData.description || "Aucun témoignage disponible."}"
              </p>
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {formatDate(allData.postDate)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
