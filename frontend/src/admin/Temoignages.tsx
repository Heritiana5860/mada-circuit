import { DELETE_TESTIMONIA, UPDATE_TESTIMONIA } from "@/graphql/mutations";
import { ALL_TESTIMONIA } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import EmptyData from "./composants/EmptyData";

const Temoignages = () => {
  const { loading, error, data } = useQuery(ALL_TESTIMONIA);
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

  const headTitle = [
    "Score",
    "Description",
    "Type",
    "Status",
    "Utilisateur",
    "Actions",
  ];

  if (loading || testimoniaLoading || loadTestimonia) return <p>Loading...</p>;
  if (error || testimoniaError || errorTestimonia)
    return (
      <p>
        Error fetching testimonia: {error?.message || testimoniaError?.message}
      </p>
    );

  const allData = data?.allTestimonia ?? [];

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
            {allData.map((t) => (
              <tr
                key={t.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {t.score}
                </th>
                <td className="px-6 py-4">{t.description}</td>
                <td className="px-6 py-4">{t.type}</td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={t.status}
                    onChange={() => handleStatusChange(t.id, t.status)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </td>
                <td className="px-6 py-4">
                  {t.utilisateur.nom} {t.utilisateur.prenom}
                </td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <button
                    disabled={loadTestimonia}
                    onClick={() => {
                      setSelectedTestimonia(t);
                      setShowModal(true);
                    }}
                    className="text-red-600 dark:text-red-500 hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash size={16} />
                    {loadTestimonia ? "Suppression..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedTestimonia && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg dark:bg-gray-700 max-w-md w-full p-6">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer?
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

export default Temoignages;
