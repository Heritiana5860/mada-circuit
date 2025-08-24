import {
  AllBlogContext,
  AllPersonnelContext,
  AllTestimoniaContext,
  AllUserContext,
  CircuitContext,
  DataContext,
  FaqContext,
  ReservationContext,
  SurMesureContext,
} from "@/provider/DataContext";
import { BarChart3, Bell, Search } from "lucide-react";
import { useContext } from "react";

const Dashboard = () => {
  const { data: allData, loading, error } = useContext(ReservationContext);
  const {
    data: dataCircuit,
    loading: loadingCircuit,
    error: errorCircuit,
  } = useContext(CircuitContext);
  const {
    loading: userLoading,
    error: userError,
    data,
  } = useContext(AllUserContext);
  const {
    data: testimoniaData,
    loading: testimoniaLoading,
    error: testimoniaError,
  } = useContext(AllTestimoniaContext);
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);
  const {
    data: dataSur,
    loading: loadingSur,
    error: errorSur,
  } = useContext(SurMesureContext);
  const { personnelData, peronnelLoading, personnelError } =
    useContext(AllPersonnelContext);
  const { dataBlog, loadingBlog, errorBlog } = useContext(AllBlogContext);

  if (
    loading ||
    loadingCircuit ||
    userLoading ||
    testimoniaLoading ||
    faqLoading ||
    loadingSur ||
    peronnelLoading ||
    loadingBlog
  ) {
    return <div>Loading...</div>;
  }

  if (
    error ||
    errorCircuit ||
    userError ||
    testimoniaError ||
    faqError ||
    errorSur ||
    personnelError ||
    errorBlog
  ) {
    return <div>Erreur!</div>;
  }

  const stats = [
    {
      title: "Réservations",
      value: allData.length,
      color: "bg-blue-500",
    },
    {
      title: "Circuits actifs",
      value: dataCircuit.length,
      color: "bg-green-500",
    },
    {
      title: "Utilisateurs",
      value: data.length,
      color: "bg-purple-500",
    },
    {
      title: "Temoignage",
      value: testimoniaData.length,
      color: "bg-orange-500",
    },
    {
      title: "Faqs",
      value: allDataFaq.length,
      color: "bg-purple-500",
    },
    {
      title: "Sur Mesure",
      value: dataSur.length,
      color: "bg-orange-500",
    },
    {
      title: "Personnel",
      value: personnelData.length,
      color: "bg-green-500",
    },
    {
      title: "Blog",
      value: dataBlog.length,
      color: "bg-blue-500",
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
