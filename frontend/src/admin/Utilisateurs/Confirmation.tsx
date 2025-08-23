import { AlertTriangle, X } from "lucide-react";

const Confirmation = ({
  showModal,
  selectedUser,
  setShowModal,
  handleDelete,
  loadUser,
}) => {
  return (
    <div>
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-900">
                    Confirmer la suppression
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              <p className="text-gray-600 mb-4">
                Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur
                suivant ?
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-medium">
                      {selectedUser.nom?.[0]}
                      {selectedUser.prenom?.[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {selectedUser.nom} {selectedUser.prenom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedUser.email}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                ⚠️ Cette action est irréversible et supprimera toutes les
                données associées.
              </p>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={loadUser}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadUser && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loadUser ? "Suppression..." : "Oui, supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
