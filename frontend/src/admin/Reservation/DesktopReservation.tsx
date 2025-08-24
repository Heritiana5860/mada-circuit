import {
  Calendar,
  CircleDot,
  Clock,
  Eye,
  Loader2,
  MapPin,
  Trash,
  Users,
} from "lucide-react";

const ReservationDesktop = ({
  filteredUsers,
  setShowModalDetail,
  setSelectedUser,
  setShowModal,
  handleStatusChange,
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
      "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      default:
        "text-gray-600 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-gray-200 hover:border-gray-300",
      danger:
        "text-red-600 hover:text-red-700 hover:bg-red-50 focus:ring-red-500 border border-red-200 hover:border-red-300",
      view: "text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-500 border border-blue-200 hover:border-blue-300",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variants[variant]} hover:shadow-sm`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Icon className="w-4 h-4" />
        )}
        {children}
      </button>
    );
  };

  const StatusBadge = ({ duration }) => {
    const getDurationStatus = (days) => {
      if (days <= 3)
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          label: "Court séjour",
        };
      if (days <= 7)
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          label: "Séjour moyen",
        };
      return {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Long séjour",
      };
    };

    const status = getDurationStatus(duration);
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}
      >
        {status.label}
      </span>
    );
  };

  return (
    <div className="hidden lg:block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with count */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Liste des Reservations
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {filteredUsers.length} reservation
              {filteredUsers.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Type
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Période
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Durée
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Participants
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-4 h-4" />
                    Status
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-blue-50 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900 text-sm">
                          {user.circuit.id !== null ? "Circuit" : "Vehicule"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{user.dateDepart}</div>
                      <div className="text-xs text-gray-500">
                        au {user.dateFin}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.duree} jour{user.duree > 1 ? "s" : ""}
                      </div>
                      <StatusBadge duration={user.duree} />
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {Array.from({
                          length: Math.min(user.nombrePersonnes, 3),
                        }).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                          >
                            <Users className="w-3 h-3 text-gray-600" />
                          </div>
                        ))}
                        {user.nombrePersonnes > 3 && (
                          <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium">
                            +{user.nombrePersonnes - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.nombrePersonnes}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-gray-900">
                        <select
                          id={`status-${user.id}`}
                          value={user.statut}
                          onChange={(e) =>
                            handleStatusChange(user.id, e.target.value)
                          }
                          className="h-12 px-2 border rounded-md w-full"
                        >
                          <option value="EN_ATTENTE">En attente</option>
                          <option value="CONFIRMEE">Confirmée</option>
                          <option value="ANNULEE">Annulée</option>
                          <option value="TERMINEE">Terminée</option>
                        </select>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <ActionButton
                        onClick={() => {
                          setShowModalDetail(true);
                          setSelectedUser(user);
                        }}
                        icon={Eye}
                        variant="view"
                      >
                        Voir
                      </ActionButton>

                      <ActionButton
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        icon={Trash}
                        variant="danger"
                      >
                        Delete
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationDesktop;
