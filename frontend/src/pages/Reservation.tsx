import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Car, Fuel, Settings, Users } from "lucide-react";

const Reservation = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">Réservation de véhicule</h1>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img
                src="https://en.wikipedia.org/wiki/Hyundai_Terracan#/media/File:Hyundai_Terracan_JX290_CRDi_HP_PE_Ebony_Black_(3).jpg"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="bg-gray-200 rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-4">
                "vehicle.marque vehicle.modele vehicle.annee"
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Car className="w-5 h-5 mr-2 text-primary" />
                  <span>vehicle.type.libelle</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <span> vehicle.capacite.nombrePlaces places</span>
                </div>
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  <span>État: vehicle.etat</span>
                </div>
                <div className="flex items-center">
                  <Fuel className="w-5 h-5 mr-2 text-primary" />
                  <span>Immatriculation: vehicle.immatriculation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
