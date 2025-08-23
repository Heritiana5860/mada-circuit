import { useContext, useMemo, useState } from "react";
import DesktopSurMesure from "./DesktopSurMesure";
import MobileSurMesure from "./MobileSurMesure";
import { SurMesureContext } from "@/provider/DataContext";

const SurMesures = () => {
  const { data, loading, error } = useContext(SurMesureContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  const allData = data?.allSurMesure || [];

  // Filtrage et recherche
  const filteredUsers = useMemo(() => {
    return allData.filter((user) => {
      const matchesSearch =
        user.pointDepart?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.pointArrivee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.duree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.budget?.includes(searchTerm) ||
        user.dateDebut?.includes(searchTerm) ||
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur!</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <DesktopSurMesure
          filteredUsers={filteredUsers}
          setSelectedUser={setSelectedUser}
          setShowModal={setShowModal}
        />

        {/* Mobile Cards */}
        <MobileSurMesure
          filteredUsers={filteredUsers}
          setSelectedUser={setSelectedUser}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default SurMesures;
