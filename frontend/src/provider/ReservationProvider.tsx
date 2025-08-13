import { useAuth } from "@/contexts/AuthContext";
import { GET_USER_RESERVATIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { StatistiqueReservationContext } from "./DataContext";
import { Circuit, User, Vehicule } from "@/types";

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

export const ReservationProvider = ({ children }) => {
  const { loading: authLoading, user, isAuthenticated } = useAuth();
  const {
    loading: loadingReservation,
    error: errorReservation,
    data,
    refetch,
  } = useQuery<{
    reservationsByUser: Reservation[];
  }>(GET_USER_RESERVATIONS, {
    variables: { userId: user?.id },
    skip: authLoading || !isAuthenticated || !user?.id,
    fetchPolicy: "network-only",
  });

  return (
    <StatistiqueReservationContext.Provider
      value={{
        reservation: data?.reservationsByUser || null,
        loading: authLoading || loadingReservation,
        errorReservation,
        user,
        isAuthenticated,
        refetchReservations: refetch,
      }}
    >
      {children}
    </StatistiqueReservationContext.Provider>
  );
};
