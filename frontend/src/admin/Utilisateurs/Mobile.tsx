import { Mail, Phone, Shield, Trash } from "lucide-react";

const Mobile = ({
  filteredUsers,
  getRoleBadgeColor,
  loadUser,
  setSelectedUser,
  setShowModal,
}) => {
  return (
    <div className="lg:hidden divide-y divide-gray-200">
      {filteredUsers.map((user) => (
        <div key={user.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-medium text-lg">
                  {user.nom?.[0]}
                  {user.prenom?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {user.nom} {user.prenom}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.telephone && (
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {user.telephone}
                  </div>
                )}
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    <Shield className="w-3 h-3" />
                    {user.role || "Non défini"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                disabled={loadUser}
                onClick={() => {
                  setSelectedUser(user);
                  setShowModal(true);
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
              >
                <Trash className="w-3 h-3" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mobile;
