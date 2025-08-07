import { Loader2 } from "lucide-react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ContentLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Chargement des circuits</h3>
            <p className="text-muted-foreground">
              Découvrez nos destinations exceptionnelles...
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentLoading;
