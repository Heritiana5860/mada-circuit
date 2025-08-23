import { useState, useEffect, useContext } from "react";
import {
  Home,
  Map,
  FileText,
  Users,
  HelpCircle,
  Car,
  Calendar,
  Settings,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  User,
  BarChart3,
  Package,
} from "lucide-react";
import Dashboard from "./admin/Dashboard";
import CreateCircuit from "./admin/Circuits/CreateCircuit";
import CreateBlog from "./admin/Blog/CreateBlog";
import CreateFaq from "./admin/CreateFaq";
import CreatePersonnel from "./admin/CreatePersonnel";
import CreateVehicule from "./admin/Vehicules/CreateVehicule";
import Reservations from "./admin/Reservations";
import SurMesures from "./admin/SurMesure/SurMesures";
import Utilisateurs from "./admin/Utilisateurs/Utilisateurs";
import Temoignages from "./admin/Temoignages";
import {
  AllTestimoniaContext,
  ReservationContext,
  SurMesureContext,
} from "./provider/DataContext";

const ImprovedAdmin = () => {
  const { data, loading, error } = useContext(SurMesureContext);
  const {
    data: resaData,
    loading: resaLoading,
    error: resaError,
  } = useContext(ReservationContext);
  const {
    data: testimoniaData,
    loading: testimoniaLoading,
    error: testimoniaError,
  } = useContext(AllTestimoniaContext);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (loading || resaLoading || testimoniaLoading) {
    return <div>Loading...</div>;
  }

  if (error || resaError || testimoniaError) {
    return <div>Erreur!</div>;
  }

  const menuGroups = [
    {
      title: "Vue d'ensemble",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
        { id: "analytics", label: "Analytiques", icon: BarChart3, badge: null },
      ],
    },
    {
      title: "Gestion contenu",
      items: [
        { id: "circuits", label: "Circuits", icon: Map, badge: null },
        { id: "blog", label: "Blog", icon: FileText, badge: null },
        { id: "personnel", label: "Personnel", icon: Users, badge: null },
        { id: "faqs", label: "FAQs", icon: HelpCircle, badge: null },
      ],
    },
    {
      title: "Réservations",
      items: [
        { id: "vehicules", label: "Véhicules", icon: Car, badge: null },
        {
          id: "reservations",
          label: "Réservations",
          icon: Calendar,
          badge: resaData.length,
        },
        {
          id: "sur-mesure",
          label: "Sur mesure",
          icon: Package,
          badge: data.length,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        { id: "utilisateurs", label: "Utilisateurs", icon: Users, badge: null },
        {
          id: "temoignages",
          label: "Témoignages",
          icon: MessageSquare,
          badge: testimoniaData.length,
        },
        { id: "settings", label: "Paramètres", icon: Settings, badge: null },
      ],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "circuits":
        return <CreateCircuit />;
      case "blog":
        return <CreateBlog />;
      case "faqs":
        return <CreateFaq />;
      case "personnel":
        return <CreatePersonnel />;
      case "vehicules":
        return <CreateVehicule />;
      case "reservations":
        return <Reservations />;
      case "sur-mesure":
        return <SurMesures />;
      case "utilisateurs":
        return <Utilisateurs />;
      case "temoignages":
        return <Temoignages />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
          ${isMobile ? "fixed inset-y-0 left-0 z-50 transform" : "relative"} 
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
          w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out
        `}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-emerald-600">
                  Voyage Solidaire
                </h3>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          if (isMobile) setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium flex-1 text-left">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@voyage.com</p>
              </div>
            </div>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 md:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isMobile && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-lg font-semibold text-gray-900 hidden md:block">
                  Tableau de bord
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-8">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default ImprovedAdmin;
