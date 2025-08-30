import {
  Car,
  Calendar,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Route,
  Info,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@apollo/client";
import { Circuit, User, Vehicule } from "@/types";
import { GET_USER_RESERVATIONS } from "@/graphql/queries";
import { formatPrice } from "@/helper/formatage";
import { useContext } from "react";
import { StatistiqueReservationContext } from "@/provider/DataContext";

interface Reservation {
  id: string;
  dateReservation: string;
  dateDepart: string;
  duree?: number;
  nombrePersonnes: number;
  prixTotal: number;
  statut: "EN_ATTENTE" | "CONFIRMEE" | "ANNULEE" | "TERMINEE";
  circuit?: Circuit;
  vehicule?: Vehicule;
  utilisateur: User;
}

const Reservation = () => {
  const { loading, errorReservation, reservation, user, isAuthenticated } =
    useContext(StatistiqueReservationContext);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-lg shadow-sm border p-12">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Connexion requise
            </h1>
            <p className="text-gray-600">
              Vous devez être connecté pour accéder à vos réservations.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-lg shadow-sm border p-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Chargement en cours...
            </h1>
            <p className="text-gray-600">Récupération de vos réservations.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (errorReservation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-lg shadow-sm border p-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur de chargement
            </h1>
            <p className="text-gray-600 mb-4">
              Impossible de récupérer vos réservations.
            </p>
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {errorReservation.message}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const reservations = reservation || [];

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-lg shadow-sm border p-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune réservation
            </h1>
            <p className="text-gray-600">
              Vous n'avez pas encore effectué de réservation.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fonctions utilitaires pour les statuts
  const getStatusConfig = (status) => {
    const configs = {
      CONFIRMEE: {
        label: "Confirmée",
        icon: CheckCircle,
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
        iconColor: "text-emerald-600",
      },
      EN_ATTENTE: {
        label: "En attente",
        icon: Clock,
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        borderColor: "border-amber-200",
        iconColor: "text-amber-600",
      },
      ANNULEE: {
        label: "Annulée",
        icon: XCircle,
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        iconColor: "text-red-600",
      },
      TERMINEE: {
        label: "Terminée",
        icon: CheckCircle,
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        borderColor: "border-gray-200",
        iconColor: "text-gray-600",
      },
    };
    return configs[status] || configs.EN_ATTENTE;
  };

  const getReservationType = (reservation) => {
    if (reservation.circuit && reservation.vehicule) {
      return {
        type: "COMPLETE",
        label: "Circuit + Véhicule",
        icon: Route,
        color: "text-purple-600",
      };
    } else if (reservation.circuit) {
      return {
        type: "CIRCUIT",
        label: "Circuit seul",
        icon: Route,
        color: "text-blue-600",
      };
    } else if (reservation.vehicule) {
      return {
        type: "VEHICULE",
        label: "Véhicule seul",
        icon: Car,
        color: "text-orange-600",
      };
    }
    return {
      type: "UNKNOWN",
      label: "Type inconnu",
      icon: Info,
      color: "text-gray-600",
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calcul des statistiques
  const stats = {
    total: reservations.length,
    confirmees: reservations.filter((r) => r.statut === "CONFIRMEE").length,
    enAttente: reservations.filter((r) => r.statut === "EN_ATTENTE").length,
    annulees: reservations.filter((r) => r.statut === "ANNULEE").length,
    terminees: reservations.filter((r) => r.statut === "TERMINEE").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* En-tête simplifié */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Mes Réservations
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {stats.total} réservation{stats.total > 1 ? "s" : ""} •
                {stats.confirmees} confirmée{stats.confirmees > 1 ? "s" : ""} •
                {stats.enAttente} en attente
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Bienvenue</p>
              <p className="font-medium text-gray-900">
                {user?.nom} {user?.prenom} 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {stats.total}
            </div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-semibold text-emerald-600">
              {stats.confirmees}
            </div>
            <div className="text-xs text-gray-500">Confirmées</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-semibold text-amber-600">
              {stats.enAttente}
            </div>
            <div className="text-xs text-gray-500">En attente</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-semibold text-red-600">
              {stats.annulees}
            </div>
            <div className="text-xs text-gray-500">Annulées</div>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-semibold text-gray-600">
              {stats.terminees}
            </div>
            <div className="text-xs text-gray-500">Terminées</div>
          </div>
        </div>

        {/* Liste des réservations */}
        <div className="space-y-6">
          {reservations.map((reservation) => {
            const statusConfig = getStatusConfig(reservation.statut);
            const typeConfig = getReservationType(reservation);
            const StatusIcon = statusConfig.icon;
            const TypeIcon = typeConfig.icon;

            return (
              <div
                key={reservation.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* En-tête de la carte */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Icône du type */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TypeIcon className={`w-6 h-6 ${typeConfig.color}`} />
                      </div>

                      {/* Informations principales */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {reservation.circuit?.titre ||
                              `${reservation.vehicule?.marque} ${reservation.vehicule?.modele}` ||
                              "Réservation"}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {typeConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Réservé le {formatDate(reservation.dateReservation)}
                        </p>
                      </div>
                    </div>

                    {/* Statut */}
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}
                    >
                      <StatusIcon
                        className={`w-4 h-4 ${statusConfig.iconColor}`}
                      />
                      <span className="text-sm font-medium">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Informations de la réservation */}
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Date de départ */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Départ
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDateShort(reservation.dateDepart)}
                            </p>
                          </div>
                        </div>

                        {/* Durée */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Durée
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {reservation.duree || 1} jour
                              {(reservation.duree || 1) > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        {/* Participants */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Participants
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {reservation.nombrePersonnes} personne
                              {reservation.nombrePersonnes > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Détails des services */}
                      <div className="space-y-3">
                        {reservation.circuit && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <Route className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900">
                                  Circuit : {reservation.circuit.titre}
                                </p>
                                <p className="text-xs text-blue-700">
                                  {reservation.circuit.description ||
                                    "Circuit touristique"}
                                </p>
                              </div>
                              {reservation.circuit.prix && (
                                <p className="text-sm font-semibold text-blue-900">
                                  {formatPrice(reservation.circuit.prix)}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {reservation.vehicule && (
                          <div className="bg-orange-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <Car className="w-5 h-5 text-orange-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-orange-900">
                                  Véhicule : {reservation.vehicule.marque}{" "}
                                  {reservation.vehicule.modele}
                                </p>
                                <p className="text-xs text-orange-700">
                                  Véhicule tout-terrain
                                </p>
                              </div>
                              {reservation.vehicule.prix && (
                                <p className="text-sm font-semibold text-orange-900">
                                  {formatPrice(reservation.vehicule.prix)}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prix et actions */}
                    <div className="space-y-4">
                      {/* Prix total */}
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <CreditCard className="w-4 h-4 text-gray-600" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            Prix total
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(reservation.prixTotal)}
                        </p>
                      </div>

                      {/* Actions (si nécessaire) */}
                      {/* <button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Voir détails</span>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservation;
