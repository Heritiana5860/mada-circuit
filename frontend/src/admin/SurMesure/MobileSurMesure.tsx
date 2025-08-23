import { Eye, Trash } from "lucide-react";

const MobileSurMesure = ({ filteredUsers, setSelectedUser, setShowModal }) => {
  return (
    <div className="lg:hidden divide-y divide-gray-200">
      {filteredUsers.map((user) => (
        <div key={user.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {user.pointDepart} -- {user.pointArrivee}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <span className="truncate">
                    {user.dateDebut} -- {user.dateFin}
                  </span>
                </div>
                {user.duree && (
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    {user.duree} jours | {user.nombreDePersonne} personnes
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                // disabled={loadUser}
                onClick={() => {
                  setSelectedUser(user);
                  setShowModal(true);
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50"
              >
                <Eye className="w-3 h-3" />
                Detail
              </button>
              <button
                // disabled={loadUser}
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

export default MobileSurMesure;
