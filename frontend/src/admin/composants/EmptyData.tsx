import { CircleOff } from "lucide-react";

const EmptyData = () => {
  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <CircleOff size={48} className="mb-4 text-red-500" />
        <p className="text-lg font-medium">Aucune donnée disponible</p>
        <p className="text-sm">
          Les données apparaîtront ici une fois ajoutés.
        </p>
      </div>
    </div>
  );
};

export default EmptyData;
