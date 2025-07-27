import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Car, Fuel, Settings, Users } from "lucide-react";

const Reservation = () => {
  const { user } = useAuth();

  console.log("User in Reservation page:", user);

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
              <strong>Email:</strong> {user?.prenom}
            </p>
            <p className="mb-2">
              <strong>Téléphone:</strong> {user?.email || "Non fourni"}
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Options de Réservation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Car size={24} />
                  <span>Véhicule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Fuel size={24} />
                  <span>Carburant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings size={24} />
                  <span>Options de réglage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={24} />
                  <span>Passagers</span>
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
