import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VEHICULE_BY_ID } from '@/graphql/queries';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Car, Fuel, Shield, Settings, Check, Calendar } from 'lucide-react';
import { Vehicule } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [dateDebut, setDateDebut] = useState<Date>();
  const [dateFin, setDateFin] = useState<Date>();
  const [error, setError] = useState<string | null>(null);
  
  const { loading, error: queryError, data } = useQuery(GET_VEHICULE_BY_ID, {
    variables: { id },
    skip: !id,
  });

  // Mutations temporairement désactivées - à implémenter dans le backend
  const reservationLoading = false;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Détails du Véhicule | Madagascar Voyage';
  }, []);
  
  // Vérification de disponibilité temporairement désactivée

  const handleReservation = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/location-4x4/${id}` } });
      return;
    }

    if (!dateDebut || !dateFin) {
      setError('Veuillez sélectionner des dates valides');
      return;
    }

    // Simulation de réservation - à remplacer par la vraie mutation
    setError(null);
    alert(`Réservation simulée pour le véhicule ${data?.vehicule.marque} ${data?.vehicule.modele} du ${dateDebut.toLocaleDateString()} au ${dateFin.toLocaleDateString()}`);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <p>Chargement du véhicule...</p>
      </main>
      <Footer />
    </div>
  );

  if (queryError || !data?.vehicule) return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <p>Véhicule non trouvé</p>
      </main>
      <Footer />
    </div>
  );

  const vehicle = data.vehicule;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations du véhicule */}
            <div className="lg:col-span-2">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                  src={vehicle.image ? `http://localhost:8000/media/${vehicle.image}` : '/placeholder.svg'}
                  alt={`${vehicle.marque} ${vehicle.modele}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">
                  {vehicle.marque} {vehicle.modele} ({vehicle.annee})
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Car className="w-5 h-5 mr-2 text-primary" />
                    <span>{vehicle.type.libelle}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    <span>{vehicle.capacite.nombrePlaces} places</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    <span>État: {vehicle.etat}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 mr-2 text-primary" />
                    <span>Immatriculation: {vehicle.immatriculation}</span>
                  </div>
                </div>

                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="caracteristiques">Caractéristiques</TabsTrigger>
                    <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-4">
                    <p className="text-gray-600">
                      {vehicle.description || `Véhicule ${vehicle.type.libelle} ${vehicle.marque} ${vehicle.modele} de ${vehicle.annee}. 
                      Idéal pour explorer Madagascar en toute liberté.`}
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="caracteristiques" className="mt-4">
                    <ul className="list-disc list-inside space-y-2">
                      {(vehicle.caracteristiques || [
                        '4x4 permanent',
                        'Climatisation',
                        'GPS',
                        'Kit de secours',
                        'Roues de secours'
                      ]).map((carac, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 mr-2 text-primary" />
                          {carac}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="mt-4">
                    <ul className="list-disc list-inside space-y-2">
                      {(vehicle.conditions_location || [
                        'Permis B obligatoire',
                        'Assurance tous risques incluse',
                        'Kilométrage illimité',
                        'Franchise : 500€',
                        'Caution : 1000€'
                      ]).map((condition, index) => (
                        <li key={index} className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-primary" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Réservation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Réserver ce véhicule</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Dates de location</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateDebut && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateDebut ? format(dateDebut, 'P', { locale: fr }) : "Début"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={dateDebut}
                              onSelect={setDateDebut}
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateFin && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateFin ? format(dateFin, 'P', { locale: fr }) : "Fin"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={dateFin}
                              onSelect={setDateFin}
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    {dateDebut && dateFin && (
                      <Alert variant="default">
                        <AlertDescription>
                          Vérification de disponibilité en cours de développement.
                          Vous pouvez procéder à la réservation.
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600">Prix par jour</span>
                        <span className="font-semibold">{vehicle.prix.toLocaleString('fr-FR')} Ar</span>
                    </div>
                    
                      {dateDebut && dateFin && (
                        <>
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-600">Nombre de jours</span>
                            <span className="font-semibold">
                              {Math.ceil((dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24))} jours
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-xl font-bold text-primary">
                              {(Math.ceil((dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24)) *
                                vehicle.prix).toLocaleString('fr-FR')} Ar
                            </span>
                          </div>
                        </>
                      )}

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleReservation}
                        disabled={!dateDebut || !dateFin || reservationLoading}
                      >
                        {reservationLoading ? 'Réservation en cours...' : 'Réserver maintenant'}
                      </Button>
                    </div>
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

export default VehicleDetail;