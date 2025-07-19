import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Calendar, Shield, Edit } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { requireAuth } = useAuthRedirect();

  useEffect(() => {
    // Vérifier l'authentification au chargement de la page
    requireAuth("accéder à votre profil");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Mon Profil | Madagascar Voyage';
  }, []);

  // Si l'utilisateur n'est pas authentifié, le hook se charge de la redirection
  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'GUIDE':
        return 'default';
      case 'COMMERCIAL':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrateur';
      case 'GUIDE':
        return 'Guide';
      case 'COMMERCIAL':
        return 'Commercial';
      case 'CLIENT':
        return 'Client';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-12">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Prénom</label>
                      <p className="text-lg font-medium">{user.prenom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nom</label>
                      <p className="text-lg font-medium">{user.nom}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-base">{user.email}</p>
                      </div>
                    </div>

                    {user.telephone && (
                      <div className="flex items-center">
                        <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                          <p className="text-base">{user.telephone}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Membre depuis</label>
                        <p className="text-base">{formatDate(user.dateInscription)}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Shield className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Rôle</label>
                        <div className="mt-1">
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier le profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Mes réservations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Historique des voyages
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Préférences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Voyages effectués</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Réservations en cours</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Points fidélité</span>
                    <span className="font-medium">0</span>
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
