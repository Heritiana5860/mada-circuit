import { DELETE_USER } from "@/graphql/mutations";
import { GET_ALL_USERS } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CircleOff, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import EmptyData from "./composants/EmptyData";

const Utilisateurs = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [deleteUser, { loading: loadUser, error: errorUser, data: dataUser }] =
    useMutation(DELETE_USER, {
      // Optionnel: mettre à jour le cache après suppression
      refetchQueries: [{ query: GET_ALL_USERS }],
    });

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const headTitle = ["Nom Complet", "Contact", "Email", "Role", "Actions"];

  if (loading || loadUser) return <p>Loading...</p>;
  if (error || errorUser) return <p>Error fetching user: {error.message}</p>;

  const allData = data?.allUtilisateurs ?? [];

  if (!allData || allData.length === 0) {
    return <EmptyData />;
  }

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser({
        variables: { id: selectedUser.id },
      });

      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert(
        "Erreur lors de la suppression de l'utilisateur. Veuillez réessayer."
      );
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headTitle.map((head) => (
                <th key={head} className="px-6 py-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allData.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.nom} {user.prenom}
                </th>
                <td className="px-6 py-4">{user.telephone}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <button className="text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1">
                    <SquarePen size={16} /> Edit
                  </button>
                  <button
                    disabled={loadUser}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="text-red-600 dark:text-red-500 hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash size={16} />
                    {loadUser ? "Suppression..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg dark:bg-gray-700 max-w-md w-full p-6">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold">
                {selectedUser.nom} {selectedUser.prenom}
              </span>{" "}
              ?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;
