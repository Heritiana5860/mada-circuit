
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CircuitCard from '../components/CircuitCard';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { GET_ALL_CIRCUITS, GET_ALL_DESTINATIONS } from '@/graphql/queries';
import { Circuit } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Circuits = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [filteredCircuits, setFilteredCircuits] = useState<Circuit[]>([]);

  // Requêtes GraphQL
  const { data: circuitsData, loading: circuitsLoading, error: circuitsError } = useQuery(GET_ALL_CIRCUITS);
  const { data: destinationsData } = useQuery(GET_ALL_DESTINATIONS);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Circuits Touristiques à Madagascar | Madagascar Voyage';
  }, []);

  // Filtrer les circuits par région
  useEffect(() => {
    if (circuitsData?.allCircuits) {
      const circuits = circuitsData.allCircuits;
      if (selectedRegion === 'all') {
        setFilteredCircuits(circuits);
      } else {
        const filtered = circuits.filter((circuit: Circuit) =>
          circuit.destination.region.toLowerCase().includes(selectedRegion.toLowerCase())
        );
        setFilteredCircuits(filtered);
      }
    }
  }, [circuitsData, selectedRegion]);

  // Fonction pour mapper les régions
  const getRegionCircuits = (region: string) => {
    if (!circuitsData?.allCircuits) return [];
    return circuitsData.allCircuits.filter((circuit: Circuit) =>
      circuit.destination.region.toLowerCase().includes(region.toLowerCase())
    );
  };

  // Fonction pour convertir les données du backend vers le format attendu par CircuitCard
  const convertCircuitData = (circuit: Circuit) => ({
    id: circuit.id,
    title: circuit.titre,
    location: `${circuit.destination.nom}, ${circuit.destination.region}`,
    duration: `${circuit.duree} jours`,
    price: circuit.prix,
    image: `http://localhost:8000/media/${circuit.image}`,
  });

  if (circuitsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Chargement des circuits...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (circuitsError) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>
              Erreur lors du chargement des circuits. Veuillez réessayer plus tard.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="bg-primary/5 pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Circuits Touristiques à Madagascar
              </h1>
              <p className="text-lg text-muted-foreground">
                Explorez nos circuits soigneusement conçus pour vous faire découvrir les merveilles 
                naturelles, la faune unique et la culture fascinante de Madagascar.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedRegion}>
              <TabsList className="mb-8">
                <TabsTrigger value="all">Tous les circuits</TabsTrigger>
                <TabsTrigger value="nord">Nord</TabsTrigger>
                <TabsTrigger value="sud">Sud</TabsTrigger>
                <TabsTrigger value="est">Est</TabsTrigger>
                <TabsTrigger value="ouest">Ouest</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Durée:</span>
                  <select className="ml-2 text-sm p-1 border rounded">
                    <option>Toutes durées</option>
                    <option>1-5 jours</option>
                    <option>6-10 jours</option>
                    <option>11+ jours</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Destination:</span>
                  <select className="ml-2 text-sm p-1 border rounded">
                    <option>Toutes destinations</option>
                    <option>Parcs nationaux</option>
                    <option>Plages</option>
                    <option>Montagnes</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Meilleure saison:</span>
                  <select className="ml-2 text-sm p-1 border rounded">
                    <option>Toute l'année</option>
                    <option>Saison sèche (Mai-Oct)</option>
                    <option>Saison verte (Nov-Avr)</option>
                  </select>
                </div>
              </div>
              
              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCircuits.length > 0 ? (
                  filteredCircuits.map((circuit) => (
                    <CircuitCard
                      key={circuit.id}
                      {...convertCircuitData(circuit)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun circuit disponible pour le moment.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="nord" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getRegionCircuits('nord').length > 0 ? (
                  getRegionCircuits('nord').map((circuit) => (
                    <CircuitCard
                      key={circuit.id}
                      {...convertCircuitData(circuit)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun circuit disponible dans le Nord pour le moment.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="sud" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getRegionCircuits('sud').length > 0 ? (
                  getRegionCircuits('sud').map((circuit) => (
                    <CircuitCard
                      key={circuit.id}
                      {...convertCircuitData(circuit)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun circuit disponible dans le Sud pour le moment.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="est" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getRegionCircuits('est').length > 0 ? (
                  getRegionCircuits('est').map((circuit) => (
                    <CircuitCard
                      key={circuit.id}
                      {...convertCircuitData(circuit)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun circuit disponible dans l'Est pour le moment.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="ouest" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getRegionCircuits('ouest').length > 0 ? (
                  getRegionCircuits('ouest').map((circuit) => (
                    <CircuitCard
                      key={circuit.id}
                      {...convertCircuitData(circuit)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun circuit disponible dans l'Ouest pour le moment.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Circuits;
