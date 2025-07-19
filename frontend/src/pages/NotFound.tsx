
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = '404 - Page non trouvée | Madagascar Voyage';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <p className="text-2xl font-semibold mb-4">Oups! Page non trouvée</p>
          <p className="text-muted-foreground mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/" className="btn-secondary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
