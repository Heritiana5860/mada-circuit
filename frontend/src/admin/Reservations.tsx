import { ReservationContext } from "@/provider/DataContext";
import { useContext } from "react";

const Reservations = () => {
  const { data, loading, error } = useContext(ReservationContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur!</div>;
  }

  const allData = data?.allReservations;
  console.log("all data: ", allData);
  return <div>Reservations</div>;
};

export default Reservations;
