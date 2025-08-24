import { ReservationContext } from "@/provider/DataContext";
import { useContext, useMemo, useState } from "react";
import ReservationDesktop from "./DesktopReservation";
import ReservationMobile from "./MobileReservations";
import { useMutation } from "@apollo/client";
import { DELETE_RESERVATION, UPDATE_RESERVATION } from "@/graphql/mutations";
import { GET_ALL_RESERVATION } from "@/graphql/queries";
import ResaConfirmation from "./ResaConfirmation";
import DetailReservation from "./DetailReservation";

const Reservations = () => {
  const { data: allData, loading, error } = useContext(ReservationContext);
  const [updateReservation, { loading: resaLoading, error: resaError }] =
    useMutation(UPDATE_RESERVATION, {
      refetchQueries: [{ query: GET_ALL_RESERVATION }],
    });
  const [deleteAReservation, { loading: delLoading, error: delError }] =
    useMutation(DELETE_RESERVATION, {
      refetchQueries: [{ query: GET_ALL_RESERVATION }],
    });

  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  // Filtrage et recherche
  const filteredUsers = useMemo(() => {
    return allData.filter((user) => {
      const matchesSearch =
        user.activite?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.statut?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.duree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.budget?.includes(searchTerm) ||
        user.dateDepart?.includes(searchTerm) ||
        user.dateFin?.includes(searchTerm) ||
        user.nombreDePersonne?.includes(searchTerm) ||
        user.hebergement?.includes(searchTerm) ||
        user.nom?.includes(searchTerm) ||
        user.email?.includes(searchTerm) ||
        user.prenom?.includes(searchTerm) ||
        user.contact?.includes(searchTerm);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [allData, searchTerm, roleFilter]);

  if (loading || resaLoading || delLoading) {
    return <div>Loading...</div>;
  }

  if (error || resaError || delError) {
    return <div>Erreur!</div>;
  }

  const handleStatusChange = async (id, newStatus: string) => {
    try {
      const result = await updateReservation({
        variables: {
          id: id,
          statut: newStatus,
        },
      });

      if (result.data.success) {
        console.log("OK");
      } else {
        console.log(result);
      }
    } catch (e) {
      console.error("Erreur lors de la mise à jour du status:", e);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const result = await deleteAReservation({
        variables: { id: selectedUser.id },
      });
      setShowModal(false);
      setSelectedUser(null);

      console.log(result);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <ReservationDesktop
          filteredUsers={filteredUsers}
          setShowModalDetail={setShowModalDetail}
          setSelectedUser={setSelectedUser}
          setShowModal={setShowModal}
          handleStatusChange={handleStatusChange}
        />

        {/* Mobile Cards */}
        <ReservationMobile
          filteredUsers={filteredUsers}
          setSelectedUser={setSelectedUser}
          setShowModalDetail={setShowModalDetail}
          setShowModal={setShowModal}
          handleStatusChange={handleStatusChange}
        />

        {/* Modal de confirmation suppression */}
        <ResaConfirmation
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          deleteLoading={delLoading}
        />

        {/* Modal de detail */}
        <DetailReservation
          showModalDetail={showModalDetail}
          selectedUser={selectedUser}
          setShowModalDetail={setShowModalDetail}
        />
      </div>
    </div>
  );
};

export default Reservations;
