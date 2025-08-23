import { Mail, Phone, Shield, Trash } from "lucide-react";

const Desktop = ({
  filteredUsers,
  loadUser,
  getRoleBadgeColor,
  setSelectedUser,
  setShowModal,
}) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Utilisateur
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-medium">
                      {user.nom?.[0]}
                      {user.prenom?.[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {user.nom} {user.prenom}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {user.telephone || "Non renseigné"}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  <Shield className="w-3 h-3" />
                  {user.role || "Non défini"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    disabled={loadUser}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash className="w-3 h-3" />
                    {loadUser ? "Suppression..." : "Supprimer"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Desktop;
