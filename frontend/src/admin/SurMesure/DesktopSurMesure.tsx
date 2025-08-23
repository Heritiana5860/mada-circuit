import { Eye, Trash } from "lucide-react";

const DesktopSurMesure = ({ filteredUsers, setSelectedUser, setShowModal }) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lieu à visité
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durée
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre de personne
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
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {user.pointDepart} -- {user.pointArrivee}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 flex items-center gap-1">
                  {user.lieuVisiter.nom || "Non renseigné"}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 flex items-center gap-1">
                  {user.dateDebut} -- {user.dateFin}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 flex items-center gap-1">
                  {user.duree} jours
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 flex items-center gap-1">
                  {user.nombreDePersonne}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    // disabled={loadUser}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="w-4 h-4" />
                    {/* {loadUser ? "Suppression..." : "Supprimer"} */}
                  </button>
                  <button
                    // disabled={loadUser}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center gap-1 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash className="w-4 h-4" />
                    {/* {loadUser ? "Suppression..." : "Supprimer"} */}
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

export default DesktopSurMesure;
