import { useQuery } from "@apollo/client";
import { ReservationContext } from "./DataContext";
import { GET_ALL_RESERVATION } from "@/graphql/queries";

export const ReservationListProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_ALL_RESERVATION);

  return (
    <ReservationContext.Provider
      value={{
        data: data?.allReservations,
        loading,
        error,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
