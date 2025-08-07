import Footer from "./Footer";
import NavBar from "./NavBar";
import { Alert, AlertDescription } from "./ui/alert";

const ContentError = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Erreur lors du chargement des circuits. Veuillez réessayer plus
            tard.
          </AlertDescription>
        </Alert>
      </main>
      <Footer />
    </div>
  );
};

export default ContentError;
