import { Users } from "lucide-react";

const AucunResultat = ({
  filteredUsers,
  searchTerm,
  roleFilter,
  setSearchTerm,
  setRoleFilter,
}) => {
  return (
    <div>
      {filteredUsers.length === 0 && (searchTerm || roleFilter !== "all") && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun utilisateur trouvé
          </h3>
          <p className="text-gray-500 mb-4">
            Aucun utilisateur ne correspond à vos critères de recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setRoleFilter("all");
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default AucunResultat;
