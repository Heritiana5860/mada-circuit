import { formatterUS } from "@/helper/formatage";
import {
  Eye,
  Trash,
  MapPin,
  Calendar,
  Users,
  Clock,
  Loader2,
  ChevronRight,
} from "lucide-react";

const MobileSurMesure = ({
  filteredUsers,
  setSelectedUser,
  setShowModal,
  deleteLoading,
  setShowModalDetail,
  showModalDetail,
}) => {
  const ActionButton = ({
    onClick,
    icon: Icon,
    variant = "default",
    loading = false,
    disabled = false,
    children,
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]";

    const variants = {
      view: "text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200",
      danger: "text-red-700 bg-red-50 hover:bg-red-100 border border-red-200",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Icon className="w-3 h-3" />
        )}
        <span>{children}</span>
      </button>
    );
  };

  const StatusBadge = ({ duration }) => {
    const getDurationStatus = (days) => {
      if (days <= 3)
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          label: "Court",
        };
      if (days <= 7)
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          label: "Moyen",
        };
      return {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Long",
      };
    };

    const status = getDurationStatus(duration);
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}
      >
        {status.label}
      </span>
    );
  };

  const InfoChip = ({ icon: Icon, children, color = "gray" }) => {
    const colors = {
      gray: "bg-gray-100 text-gray-700",
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
    };

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[color]}`}
      >
        <Icon className="w-3 h-3" />
        <span>{children}</span>
      </div>
    );
  };

  if (!filteredUsers || filteredUsers.length === 0) {
    return (
      <div className="lg:hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center mx-4 my-6">
          <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-2">
            Aucun voyage trouvé
          </h3>
          <p className="text-sm text-gray-500">
            Aucun voyage ne correspond à vos critères.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden">
      {/* Header mobile */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Voyages</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {filteredUsers.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-6">
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Header de la carte */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {user.pointDepart}
                    </div>
                    <div className="flex items-center text-xs text-blue-600 gap-1">
                      <span>→</span>
                      <span className="font-medium truncate">
                        {user.pointArrivee}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Contenu de la carte */}
            <div className="p-4">
              {/* Lieu à visiter */}
              {user.lieuVisiter?.nom && (
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Lieu à visiter
                  </div>
                  <div className="text-sm text-gray-600">
                    {user.lieuVisiter.nom}
                  </div>
                </div>
              )}

              {/* Informations principales */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>Période</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatterUS.format(new Date(user.dateDebut))}
                  </div>
                  <div className="text-xs text-gray-500">
                    au {formatterUS.format(new Date(user.dateFin))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Users className="w-3 h-3" />
                    <span>Participants</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.nombreDePersonne} personne
                    {user.nombreDePersonne > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Tags informatifs */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <InfoChip icon={Clock} color="blue">
                  {user.duree} jour{user.duree > 1 ? "s" : ""}
                </InfoChip>
                <StatusBadge duration={user.duree} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <ActionButton
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModalDetail(true);
                  }}
                  icon={Eye}
                  variant="view"
                  disabled={deleteLoading}
                >
                  Détails
                </ActionButton>

                <ActionButton
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                  icon={Trash}
                  variant="danger"
                  loading={deleteLoading}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "..." : "Supprimer"}
                </ActionButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSurMesure;
