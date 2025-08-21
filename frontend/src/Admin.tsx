import { useState } from "react";
import {
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
  Home,
  ChevronRight,
} from "lucide-react";
import Dashboard from "./admin/Dashboard";
import CreateFaq from "./admin/CreateFaq";
import CreateCircuit from "./admin/Circuits/CreateCircuit";
import CreateBlog from "./admin/CreateBlog";
import CreatePersonnel from "./admin/CreatePersonnel";
import CreateVehicule from "./admin/CreateVehicule";
import Reservations from "./admin/Reservations";
import SurMesures from "./admin/SurMesures";
import Utilisateurs from "./admin/Utilisateurs";
import Temoignages from "./admin/Temoignages";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "circuits", label: "Création circuit", icon: Map },
    { id: "blog", label: "Création blog", icon: FileText },
    { id: "personnel", label: "Création Personnel", icon: Users },
    { id: "faqs", label: "Création FAQs", icon: HelpCircle },
    { id: "vehicules", label: "Location Véhicule", icon: Car },
    { id: "reservations", label: "Réservations", icon: Calendar },
    { id: "sur-mesure", label: "Sur mesure", icon: Settings },
    { id: "utilisateurs", label: "Utilisateurs", icon: Users },
    { id: "temoignages", label: "Témoignages", icon: MessageSquare },
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
    <div className="min-h-screen relative bg-gray-50">
      <div className="flex fixed top-0 right-0 left-0">
        {/* Sidebar */}
        <div className="w-64 transition-all duration-300 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary">
                  Voyage Solidaire
                </h3>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-4 right-4">
            <button className="w-64 flex items-center space-x-3 px-4 py-3 text-red-600 box-border hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
