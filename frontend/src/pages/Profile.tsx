import { useContext, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DataContext,
  StatistiqueReservationContext,
} from "@/provider/DataContext";

const Profile = () => {
  const { user } = useAuth();

  const { loading, error, utilisateur } = useContext(DataContext);
  const {
    loading: loadingReservation,
    error: errorReservation,
    reservation,
  } = useContext(StatistiqueReservationContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mon Profil | Madagascar Voyage";
  }, []);

  // Si l'utilisateur n'est pas authentifié, le hook se charge de la redirection
  if (!user) {
    return null;
  }

  // Handle loading state
  if (loading || loadingReservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <p>Chargement du profil...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle error state
  if (error || errorReservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">
                Erreur lors du chargement du profil: {error.message}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "GUIDE":
        return "default";
      case "COMMERCIAL":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrateur";
      case "GUIDE":
        return "Guide";
      case "COMMERCIAL":
        return "Commercial";
      case "CLIENT":
        return "Client";
      default:
        return role;
    }
  };

  // Correction principale : récupération des données utilisateur
  const userData = utilisateur;

  // Calcul des statistiques
  const stats = {
    total: reservation.length,
    confirmees: reservation.filter((r) => r.statut === "CONFIRMEE").length,
    enAttente: reservation.filter((r) => r.statut === "EN_ATTENTE").length,
    annulees: reservation.filter((r) => r.statut === "ANNULEE").length,
    terminees: reservation.filter((r) => r.statut === "TERMINEE").length,
  };

  // Si pas de données utilisateur
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <p>Aucune donnée utilisateur trouvée.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-6 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations principales */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>
                    Vos informations de base et de contact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Section Photo de profil */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                        {userData.image ? (
                          <img
                            src={`http://localhost:8000/media/${userData.image}`}
                            alt={`${userData.nom} ${userData.prenom}`}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-16 h-16 text-white" />
                        )}
                      </div>
                      <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border">
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {userData.nom} {userData.prenom}
                      </h2>
                      <p className="text-gray-600 mt-1">{userData.email}</p>
                      <div className="mt-2">
                        <Badge variant={getRoleBadgeVariant(userData.role)}>
                          {getRoleLabel(userData.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <p className="text-base">{userData.email}</p>
                      </div>
                    </div>

                    {userData.telephone && (
                      <div className="flex items-center">
                        <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Téléphone
                          </label>
                          <p className="text-base">{userData.telephone}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Membre depuis
                        </label>
                        <p className="text-base">
                          {formatDate(userData.dateInscription)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Shield className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Rôle
                        </label>
                        <div className="mt-1">
                          <Badge variant={getRoleBadgeVariant(userData.role)}>
                            {getRoleLabel(userData.role)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides et Photo de profil mobile */}
            <div className="space-y-6">
              {/* Photo de profil pour mobile - visible uniquement sur petits écrans */}
              <Card className="lg:hidden">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                        {userData.photoUrl ? (
                          <img
                            src={userData.photoUrl}
                            alt={`${userData.prenom} ${userData.nom}`}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 text-white" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-shadow border">
                        <Camera className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-lg">
                      {userData.prenom} {userData.nom}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {userData.email}
                    </p>
                    <Badge variant={getRoleBadgeVariant(userData.role)}>
                      {getRoleLabel(userData.role)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/reservations">
                    <Button variant="outline" className="w-full justify-start">
                      Mes réservations
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-3">
                  <div className="flex justify-between pt-4 mb-5">
                    <span className="text-medium font-bold text-blue-600">
                      Total réservations
                    </span>
                    <span className="font-bold text-blue-600 text-medium">{stats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-600">
                      Confirmées
                    </span>
                    <span className="font-medium text-green-600 text-sm">{stats.confirmees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-yellow-600">
                      En attente
                    </span>
                    <span className="font-medium text-yellow-600 text-sm">{stats.enAttente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Terminées
                    </span>
                    <span className="font-medium text-muted-foreground text-sm">{stats.terminees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-red-600">
                      Annulées
                    </span>
                    <span className="font-medium text-red-600 text-sm">{stats.annulees}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
