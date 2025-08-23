import { DELETE_USER } from "@/graphql/mutations";
import { GET_ALL_USERS } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  SquarePen,
  Trash,
  Search,
  Filter,
  UserPlus,
  AlertTriangle,
  X,
  Users,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { useState, useMemo } from "react";
import EmptyData from "../composants/EmptyData";
import HeaderUser from "./Header";
import SearchUser from "./SearchUser";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import AucunResultat from "./AucunResultat";
import Confirmation from "./Confirmation";

const Utilisateurs = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [deleteUser, { loading: loadUser, error: errorUser }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: [{ query: GET_ALL_USERS }],
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  const allData = data?.allUtilisateurs || [];

  // Filtrage et recherche
  const filteredUsers = useMemo(() => {
    return allData.filter((user) => {
      const matchesSearch =
        user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telephone?.includes(searchTerm);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [allData, searchTerm, roleFilter]);

  // Obtenir la liste des rôles uniques
  const uniqueRoles = useMemo(() => {
    return [...new Set(allData.map((user) => user.role).filter(Boolean))];
  }, [allData]);

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      moderator: "bg-orange-100 text-orange-800 border-orange-200",
      user: "bg-blue-100 text-blue-800 border-blue-200",
      client: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      colors[role?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

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

  if (loading || loadUser) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || errorUser) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
            <p className="text-red-600 text-sm mt-1">
              {error?.message || errorUser?.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!allData || allData.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderUser filteredUsers={filteredUsers} />

      {/* Filtres et recherche */}
      <SearchUser
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        uniqueRoles={uniqueRoles}
      />

      {/* Table responsive */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <Desktop
          filteredUsers={filteredUsers}
          loadUser={loadUser}
          getRoleBadgeColor={getRoleBadgeColor}
          setSelectedUser={setSelectedUser}
          setShowModal={setShowModal}
        />

        {/* Mobile Cards */}
        <Mobile
          filteredUsers={filteredUsers}
          getRoleBadgeColor={getRoleBadgeColor}
          loadUser={loadUser}
          setSelectedUser={setSelectedUser}
          setShowModal={setShowModal}
        />
      </div>

      {/* Message si aucun résultat */}
      <AucunResultat
        filteredUsers={filteredUsers}
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        setSearchTerm={setSearchTerm}
        setRoleFilter={setRoleFilter}
      />

      {/* Modal de confirmation amélioré */}
      <Confirmation
        showModal={showModal}
        selectedUser={selectedUser}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        loadUser={loadUser}
      />
    </div>
  );
};

export default Utilisateurs;
