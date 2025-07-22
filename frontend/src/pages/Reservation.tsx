import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';


const Reservation = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-32 pb-12">
        <h1>Reservation</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
