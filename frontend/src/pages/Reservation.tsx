import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Car, Fuel, Settings, Users } from "lucide-react";
import { useQuery } from "@apollo/client";
import { Circuit, User, Vehicule } from "@/types";
import { GET_USER_RESERVATIONS } from "@/graphql/queries";

interface Reservation {
  id: string;
  dateReservation: string;
  dateDebut: string;
  dateFin: string;
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
    fetchPolicy: "network-only", // optionnel : force une récupération fraîche
  });

  if (!isAuthenticated)
    return <p>Vous devez être connecté pour voir vos réservations.</p>;
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("GraphQL errors:", error.graphQLErrors);
    console.error("Network error:", error.networkError);
    return <p>Error fetching user: {error.message}</p>;
  }

  const reservations = data?.reservationsByUser;
  if (!reservations || reservations.length === 0)
    return <p>Aucune réservation trouvée.</p>;

  const first = reservations[0];

  // Si tu veux normaliser les dates pour ton UI (ex : dateDepart -> dateDebut)
  // const dateDebut = first.dateDepart || "Non renseigné";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <main className="flex-grow ">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Réservation</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Détails de la Réservation
            </h2>
            <p className="mb-2">
              <strong>Nom:</strong> {user?.nom}
            </p>
            <p className="mb-2">
              <strong>Prénom:</strong> {user?.prenom}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user?.email || "Non fourni"}
            </p>
            {/* <p className="mb-2">
              <strong>Téléphone:</strong> {user?.telephone || "Non fourni"}
            </p> */}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Informations de la réservation
              </h3>
              <p className="mb-1">
                <strong>ID réservation:</strong> {first.id}
              </p>
              <p className="mb-1">
                <strong>Date de réservation:</strong> {first.dateReservation}
              </p>
              {/* <p className="mb-1">
                <strong>Date de début:</strong> {dateDebut}
              </p> */}
              <p className="mb-1">
                <strong>Nombre de personnes:</strong> {first.nombrePersonnes}
              </p>
              <p className="mb-1">
                <strong>Statut:</strong> {first.statut}
              </p>
              <p className="mb-1">
                <strong>Prix total:</strong> {first.prixTotal}{" "}
                {/* formate selon la devise si besoin */}
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Options de Réservation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Car size={24} />
                    <span>
                      Véhicule:{" "}
                      {first.vehicule
                        ? `${first.vehicule.marque} ${first.vehicule.modele}`
                        : "Non défini"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel size={24} />
                    <span>
                      Prix véhicule:{" "}
                      {first.vehicule ? first.vehicule.prix : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings size={24} />
                    <span>
                      Circuit:{" "}
                      {first.circuit ? first.circuit.titre : "Non défini"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={24} />
                    <span>Participants: {first.nombrePersonnes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add more reservation details or actions here */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reservation;
