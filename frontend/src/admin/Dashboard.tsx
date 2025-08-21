import { BarChart3, Bell, Search } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Réservations",
      value: "147",
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Circuits actifs",
      value: "23",
      change: "+5%",
      color: "bg-green-500",
    },
    {
      title: "Utilisateurs",
      value: "1,248",
      change: "+8%",
      color: "bg-purple-500",
    },
    {
      title: "Revenus",
      value: "€45,230",
      change: "+15%",
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      action: "Nouvelle réservation",
      user: "Marie Dubois",
      time: "Il y a 5 min",
      type: "reservation",
    },
    {
      action: "Circuit créé",
      user: "Admin",
      time: "Il y a 1h",
      type: "circuit",
    },
    {
      action: "Nouveau témoignage",
      user: "Jean Martin",
      time: "Il y a 2h",
      type: "review",
    },
    {
      action: "Utilisateur inscrit",
      user: "Sophie Leroy",
      time: "Il y a 3h",
      type: "user",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-purple-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activité récente
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
