import { Users } from "lucide-react";

const HeaderUser = ({ filteredUsers }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Utilisateurs ({filteredUsers.length})
      </h1>
    </div>
  );
};

export default HeaderUser;
