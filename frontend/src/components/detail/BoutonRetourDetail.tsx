import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const BoutonRetoureDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux pangalanes
        </Button>
      </div>
    </div>
  );
};

export default BoutonRetoureDetail;
