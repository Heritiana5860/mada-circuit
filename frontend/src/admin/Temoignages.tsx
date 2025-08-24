import { DELETE_TESTIMONIA, UPDATE_TESTIMONIA } from "@/graphql/mutations";
import { ALL_TESTIMONIA } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import {
  Trash,
  Star,
  User,
  MessageCircle,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useContext, useState } from "react";
import EmptyData from "./composants/EmptyData";
import { AllTestimoniaContext } from "@/provider/DataContext";

const Temoignages = () => {
  const { data: allData, loading, error } = useContext(AllTestimoniaContext);
  const [
    updateTestimonia,
    { loading: testimoniaLoading, error: testimoniaError },
  ] = useMutation(UPDATE_TESTIMONIA, {
    refetchQueries: [{ query: ALL_TESTIMONIA }],
  });
  const [
    deleteTestimonia,
    { loading: loadTestimonia, error: errorTestimonia },
  ] = useMutation(DELETE_TESTIMONIA, {
    refetchQueries: [{ query: ALL_TESTIMONIA }],
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonia, setSelectedTestimonia] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' ou 'cards'

  const headTitle = [
    { key: "score", label: "Score", icon: Star },
    { key: "description", label: "Description", icon: MessageCircle },
    { key: "type", label: "Type", icon: Calendar },
    { key: "status", label: "Status", icon: CheckCircle },
    { key: "utilisateur", label: "Utilisateur", icon: User },
    { key: "actions", label: "Actions", icon: null },
  ];

  if (loading || testimoniaLoading || loadTestimonia) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Chargement des témoignages...
          </p>
        </div>
      </div>
    );
  }

  if (error || testimoniaError || errorTestimonia) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mx-4">
        <div className="flex items-center space-x-3">
          <XCircle className="text-red-500" size={24} />
          <div>
            <h3 className="text-red-800 font-semibold">
              Erreur lors du chargement
            </h3>
            <p className="text-red-600 mt-1">
              {error?.message ||
                testimoniaError?.message ||
                errorTestimonia?.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!allData || allData.length === 0) {
    return <EmptyData />;
  }

  const handleStatusChange = async (id, currentStatus) => {
    try {
      await updateTestimonia({
        variables: {
          id,
          status: !currentStatus,
        },
      });
    } catch (e) {
      console.error("Erreur lors de la mise à jour du status:", e);
    }
  };

  const handleDelete = async () => {
    if (!selectedTestimonia) return;

    try {
      await deleteTestimonia({
        variables: {
          id: selectedTestimonia.id,
        },
      });

      setShowModal(false);
      setSelectedTestimonia(null);
    } catch (e) {
      console.error("Erreur lors de la suppression:", e);
      alert(
        "Erreur lors de la suppression de l'utilisateur. Veuillez réessayer."
      );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4) return "text-green-600 bg-green-100";
    if (score >= 3) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getTypeColor = (type) => {
    const colors = {
      positive: "bg-green-100 text-green-800",
      negative: "bg-red-100 text-red-800",
      neutral: "bg-gray-100 text-gray-800",
      suggestion: "bg-blue-100 text-blue-800",
    };
    return colors[type?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Vue en cartes
  if (viewMode === "cards") {
    return (
      <div className="space-y-6">
        {/* Header avec toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Témoignages ({allData.length})
          </h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("cards")}
              className="px-3 py-1 rounded-md text-sm font-medium bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            >
              Cartes
            </button>
            <button
              onClick={() => setViewMode("table")}
              className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Tableau
            </button>
          </div>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allData.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                {/* Header de la carte */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                      t.score
                    )}`}
                  >
                    <Star size={14} fill="currentColor" />
                    <span>{t.score}/5</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      t.type
                    )}`}
                  >
                    {t.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {t.description}
                </p>

                {/* Utilisateur */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <User size={14} className="text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {t.utilisateur.nom} {t.utilisateur.prenom}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Status:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.status}
                        onChange={() => handleStatusChange(t.id, t.status)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <button
                    disabled={loadTestimonia}
                    onClick={() => {
                      setSelectedTestimonia(t);
                      setShowModal(true);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vue tableau améliorée
  return (
    <div className="space-y-6">
      {/* Header avec stats et toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Témoignages
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              {allData.length} total
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              {allData.filter((t) => t.status).length} actifs
            </span>
          </div>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode("cards")}
            className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Cartes
          </button>
          <button
            onClick={() => setViewMode("table")}
            className="px-3 py-1 rounded-md text-sm font-medium bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
          >
            Tableau
          </button>
        </div>
      </div>

      {/* Tableau modernisé */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                {headTitle.map((head) => (
                  <th
                    key={head.key}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      {head.icon && <head.icon size={14} />}
                      <span>{head.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {allData.map((t, index) => (
                <tr
                  key={t.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50/50 dark:bg-gray-800/50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                        t.score
                      )}`}
                    >
                      <Star size={14} fill="currentColor" />
                      <span>{t.score}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        t.type
                      )}`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.status}
                        onChange={() => handleStatusChange(t.id, t.status)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t.utilisateur.nom} {t.utilisateur.prenom}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      disabled={loadTestimonia}
                      onClick={() => {
                        setSelectedTestimonia(t);
                        setShowModal(true);
                      }}
                      className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash size={16} />
                      <span className="text-sm font-medium">
                        {loadTestimonia ? "Suppression..." : "Supprimer"}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal amélioré */}
      {showModal && selectedTestimonia && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-6">
              {/* Header du modal */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Confirmer la suppression
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cette action ne peut pas être annulée
                  </p>
                </div>
              </div>

              {/* Contenu du témoignage */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(
                      selectedTestimonia.score
                    )}`}
                  >
                    <Star size={12} fill="currentColor" />
                    <span>{selectedTestimonia.score}/5</span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      selectedTestimonia.type
                    )}`}
                  >
                    {selectedTestimonia.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  "{selectedTestimonia.description}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Par {selectedTestimonia.utilisateur.nom}{" "}
                  {selectedTestimonia.utilisateur.prenom}
                </p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Êtes-vous sûr de vouloir supprimer ce témoignage ? Cette action
                est définitive.
              </p>

              {/* Actions du modal */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:ring-4 focus:ring-red-300"
                >
                  Oui, supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temoignages;
