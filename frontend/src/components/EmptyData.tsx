import { Compass } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface DataType {
  titre: string;
}

const EmptyData: React.FC<DataType> = ({ titre }) => {
  return (
    <div className="text-center">
      <Card className="border-0 shadow-sm">
        <CardContent className="text-center py-16">
          <div className="mb-4">
            <Compass className="h-16 w-16 mx-auto text-gray-300" />
          </div>
          <h3 className="text-xl font-sans font-semibold mb-2">{titre}</h3>
          <p className="text-muted-foreground mb-6">
            We appreciate your patience as we prepare something special.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyData;
