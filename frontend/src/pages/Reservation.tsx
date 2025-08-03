// import { useAuth } from "@/contexts/AuthContext";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import { Car, Fuel, Settings, Users } from "lucide-react";
// import { useQuery } from "@apollo/client";
// import { Circuit, User, Vehicule } from "@/types";
// import { GET_USER_RESERVATIONS } from "@/graphql/queries";

// interface Reservation {
//   id: string;
//   dateReservation: string;
//   dateDebut: string;
//   dateFin: string;
//   nombrePersonnes: number;
//   prixTotal: number;
//   statut: "EN_ATTENTE" | "CONFIRMEE" | "ANNULEE" | "TERMINEE";
//   circuit?: Circuit;
//   vehicule?: Vehicule;
//   utilisateur: User;
// }

// const Reservation = () => {
//   const { isAuthenticated, user } = useAuth();

//   // Ne lancer la query que si l'utilisateur est connecté et a un id
//   const { loading, error, data } = useQuery<{
//     reservationsByUser: Reservation[];
//   }>(GET_USER_RESERVATIONS, {
//     variables: { userId: user?.id },
//     skip: !isAuthenticated || !user?.id,
//     fetchPolicy: "network-only", // optionnel : force une récupération fraîche
//   });

//   if (!isAuthenticated)
//     return <p>Vous devez être connecté pour voir vos réservations.</p>;
//   if (loading) return <p>Loading...</p>;

//   if (error) {
//     console.error("GraphQL errors:", error.graphQLErrors);
//     console.error("Network error:", error.networkError);
//     return <p>Error fetching user: {error.message}</p>;
//   }

//   const reservations = data?.reservationsByUser;
//   if (!reservations || reservations.length === 0)
//     return <p>Aucune réservation trouvée.</p>;

//   const first = reservations[0];

//   // Si tu veux normaliser les dates pour ton UI (ex : dateDepart -> dateDebut)
//   // const dateDebut = first.dateDepart || "Non renseigné";

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <NavBar />

//       <main className="flex-grow ">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6">Réservation</h1>
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">
//               Détails de la Réservation
//             </h2>
//             <p className="mb-2">
//               <strong>Nom:</strong> {user?.nom}
//             </p>
//             <p className="mb-2">
//               <strong>Prénom:</strong> {user?.prenom}
//             </p>
//             <p className="mb-2">
//               <strong>Email:</strong> {user?.email || "Non fourni"}
//             </p>
//             {/* <p className="mb-2">
//               <strong>Téléphone:</strong> {user?.telephone || "Non fourni"}
//             </p> */}

//             <div className="mt-6">
//               <h3 className="text-lg font-semibold mb-2">
//                 Informations de la réservation
//               </h3>
//               <p className="mb-1">
//                 <strong>ID réservation:</strong> {first.id}
//               </p>
//               <p className="mb-1">
//                 <strong>Date de réservation:</strong> {first.dateReservation}
//               </p>
//               {/* <p className="mb-1">
//                 <strong>Date de début:</strong> {dateDebut}
//               </p> */}
//               <p className="mb-1">
//                 <strong>Nombre de personnes:</strong> {first.nombrePersonnes}
//               </p>
//               <p className="mb-1">
//                 <strong>Statut:</strong> {first.statut}
//               </p>
//               <p className="mb-1">
//                 <strong>Prix total:</strong> {first.prixTotal}{" "}
//                 {/* formate selon la devise si besoin */}
//               </p>

//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">
//                   Options de Réservation
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="flex items-center space-x-2">
//                     <Car size={24} />
//                     <span>
//                       Véhicule:{" "}
//                       {first.vehicule
//                         ? `${first.vehicule.marque} ${first.vehicule.modele}`
//                         : "Non défini"}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Fuel size={24} />
//                     <span>
//                       Prix véhicule:{" "}
//                       {first.vehicule ? first.vehicule.prix : "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Settings size={24} />
//                     <span>
//                       Circuit:{" "}
//                       {first.circuit ? first.circuit.titre : "Non défini"}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Users size={24} />
//                     <span>Participants: {first.nombrePersonnes}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Add more reservation details or actions here */}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Reservation;

import {
  Car,
  Calendar,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@apollo/client";
import { Circuit, User, Vehicule } from "@/types";
import { GET_USER_RESERVATIONS } from "@/graphql/queries";
import { formatPrice } from "@/helper/formatage";

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
  const { isAuthenticated, user } = useAuth();

  // Ne lancer la query que si l'utilisateur est connecté et a un id
  const { loading, error, data } = useQuery<{
    reservationsByUser: Reservation[];
  }>(GET_USER_RESERVATIONS, {
    variables: { userId: user?.id },
    skip: !isAuthenticated || !user?.id,
    fetchPolicy: "network-only",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Connexion requise
            </h1>
            <p className="text-gray-600">
              Vous devez être connecté pour voir vos réservations.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Chargement...
            </h1>
            <p className="text-gray-600">
              Récupération de vos réservations en cours.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error("GraphQL errors:", error.graphQLErrors);
    console.error("Network error:", error.networkError);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Erreur de chargement
            </h1>
            <p className="text-gray-600 mb-4">
              Impossible de récupérer vos réservations.
            </p>
            <p className="text-sm text-red-600">{error.message}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const reservations = data?.reservationsByUser;

  if (!reservations || reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
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

  // Utiliser la première réservation pour l'affichage
  const reservation = reservations[0];
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMEE":
        return "bg-green-100 text-green-800 border-green-200";
      case "EN_ATTENTE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ANNULEE":
        return "bg-red-100 text-red-800 border-red-200";
      case "TERMINEE":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "CONFIRMEE":
        return <CheckCircle className="w-4 h-4" />;
      case "EN_ATTENTE":
        return <Clock className="w-4 h-4" />;
      case "ANNULEE":
        return <AlertCircle className="w-4 h-4" />;
      case "TERMINEE":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <NavBar />

      {/* Header moderne */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mes Réservations
              </h1>
              <p className="text-gray-600 mt-1">
                {reservations.length} réservation
                {reservations.length > 1 ? "s" : ""} trouvée
                {reservations.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Bienvenue, {user?.prenom} {user?.nom}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {reservations.map((reservation, index) => (
            <div
              key={reservation.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* En-tête de la réservation */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {reservation.circuit?.titre ||
                          reservation.vehicule?.marque}
                      </h2>
                      <p className="text-blue-100 mt-1">
                        Réservation le {formatDate(reservation.dateReservation)}
                      </p>
                      <p className="text-blue-100 mt-1">
                        Durée: {reservation?.duree} jour(s)
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/10 border-white/20`}
                  >
                    {getStatusIcon(reservation.statut)}
                    <span className="font-medium text-sm text-white">
                      {reservation.statut.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenu de la réservation */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Informations principales */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Dates et participants */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date de début</p>
                          <p className="font-semibold text-gray-900">
                            {reservation.dateReservation
                              ? formatDate(reservation.dateReservation)
                              : "Non définie"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date de fin</p>
                          <p className="font-semibold text-gray-900">
                            {reservation.dateDepart
                              ? formatDate(reservation.dateDepart)
                              : "Non définie"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Participants</p>
                          <p className="font-semibold text-gray-900">
                            {reservation.nombrePersonnes} personnes
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Véhicule si disponible */}
                    {reservation.vehicule && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Car className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-gray-900">
                            Véhicule à reserver
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {reservation.vehicule.marque}{" "}
                              {reservation.vehicule.modele}
                            </p>
                            <p className="text-sm text-gray-500">
                              Véhicule tout-terrain
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {reservation.vehicule.prix
                                ? formatPrice(reservation.vehicule.prix)
                                : "Prix non défini"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Date de réservation */}
                    <div className="text-sm text-gray-500">
                      Réservé le{" "}
                      {reservation.dateReservation
                        ? formatDate(reservation.dateReservation)
                        : "Date inconnue"}
                    </div>
                  </div>

                  {/* Sidebar - Prix et actions */}
                  <div className="space-y-4">
                    {/* Prix total */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Prix total
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {formatPrice(reservation.prixTotal || 0)}
                      </p>
                      {reservation.vehicule && (
                        <div className="mt-2 pt-2 border-t border-green-200 text-sm text-green-700">
                          <div className="flex justify-between">
                            <span>Circuit:</span>
                            <span>
                              {reservation.circuit?.prix
                                ? formatPrice(reservation.circuit?.prix)
                                : 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Véhicule:</span>
                            <span>
                              {formatPrice(reservation.vehicule.prix || 0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé global */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Résumé de vos réservations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {reservations.length}
              </p>
              <p className="text-sm text-blue-700">
                Réservation{reservations.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {reservations.filter((r) => r.statut === "CONFIRMEE").length}
              </p>
              <p className="text-sm text-green-700">
                Confirmée
                {reservations.filter((r) => r.statut === "CONFIRMEE").length > 1
                  ? "s"
                  : ""}
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {reservations.filter((r) => r.statut === "EN_ATTENTE").length}
              </p>
              <p className="text-sm text-yellow-700">En attente</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {reservations.filter((r) => r.statut === "ANNULEE").length}
              </p>
              <p className="text-sm text-red-700">Annulée</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">
                {reservations.filter((r) => r.statut === "TERMINEE").length}
              </p>
              <p className="text-sm text-gray-700">Terminée</p>
            </div>
            {/* <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">
                {formatPrice(
                  reservations.reduce(
                    (total, r) => total + (r.prixTotal || 0),
                    0
                  )
                )}
              </p>
              <p className="text-sm text-gray-700">Montant total</p>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservation;
