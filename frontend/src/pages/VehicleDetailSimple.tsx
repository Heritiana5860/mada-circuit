import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VEHICULE_BY_ID, GET_VEHICULE_BY_NODE_ID } from '@/graphql/queries';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Car, Hash, CheckCircle, XCircle, Calendar, MapPin } from 'lucide-react';

// Fonction pour décoder l'ID Relay
const decodeRelayId = (relayId: string): string => {
  try {
    const decoded = atob(relayId);
    const parts = decoded.split(':');
    return parts[1] || relayId; // Retourne l'ID réel ou l'ID original si le décodage échoue
  } catch {
    return relayId; // Retourne l'ID original si le décodage échoue
  }
};

// Fonction pour obtenir l'icône de l'état
const getEtatIcon = (etat: string) => {
  const etatLower = etat.toLowerCase();
  if (etatLower.includes('disponible') || etatLower.includes('bon') || etatLower.includes('excellent')) {
    return <CheckCircle className="w-5 h-5 mr-2 text-green-600" />;
  } else if (etatLower.includes('maintenance') || etatLower.includes('réparation') || etatLower.includes('indisponible')) {
    return <XCircle className="w-5 h-5 mr-2 text-red-600" />;
  } else {
    return <CheckCircle className="w-5 h-5 mr-2 text-primary" />;
  }
};

// Fonction pour générer une description enrichie
const generateDescription = (vehicle) => {
  const typeVehicule = vehicle.type.libelle.toLowerCase();
  const marque = vehicle.marque;
  const modele = vehicle.modele;
  const annee = vehicle.annee;
  const places = vehicle.capacite.nombrePlaces;
  
  let description = `Découvrez notre ${typeVehicule} ${marque} ${modele} de ${annee}, `;
  
  if (typeVehicule.includes('4x4')) {
    description += `parfaitement équipé pour l'aventure malgache. Ce véhicule tout-terrain vous permettra d'explorer les routes les plus difficiles de Madagascar en toute sécurité. `;
  } else if (typeVehicule.includes('berline') || typeVehicule.includes('citadine')) {
    description += `idéal pour vos déplacements urbains et périurbains à Madagascar. Confortable et économique, ce véhicule est parfait pour découvrir les villes malgaches. `;
  } else if (typeVehicule.includes('suv')) {
    description += `combinant confort et robustesse pour tous vos trajets à Madagascar. Ce SUV offre une excellente tenue de route sur tous types de terrains. `;
  } else {
    description += `parfaitement adapté à vos besoins de déplacement à Madagascar. `;
  }
  
  description += `Avec ses ${places} places, il convient parfaitement `;
  
  if (places <= 2) {
    description += `pour un voyage en couple ou en solo, offrant intimité et agilité sur les routes malgaches.`;
  } else if (places <= 5) {
    description += `pour une famille ou un petit groupe d'amis souhaitant explorer Madagascar ensemble.`;
  } else {
    description += `pour un groupe plus important, idéal pour les excursions familiales ou entre amis à travers l'île.`;
  }
  
  description += ` Ce véhicule est régulièrement entretenu et vérifié pour garantir votre sécurité et votre confort durant votre séjour à Madagascar.`;
  
  return description;
};

const VehicleDetailSimple = () => {
  const { id: rawId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Décoder l'ID si c'est un ID Relay
  const id = rawId ? decodeRelayId(rawId) : rawId;
  
  const [dateDebut, setDateDebut] = useState<string>('');
  const [dateFin, setDateFin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Essayer d'abord avec l'ID décodé
  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_VEHICULE_BY_ID, {
    variables: { id },
    skip: !id,
  });

  // Si ça échoue, essayer avec l'ID Relay original
  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_VEHICULE_BY_NODE_ID, {
    variables: { id: rawId },
    skip: !rawId || !error1,
  });

  // Utiliser les données de la requête qui a réussi
  const loading = loading1 || loading2;
  const queryError = error1 && error2 ? error1 : null;
  const data = data1?.vehicule ? { vehicule: data1.vehicule } : data2?.node ? { vehicule: data2.node } : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Détails du Véhicule | Madagascar Voyage';
  }, []);

  const handleReservation = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/location-4x4/${id}` } });
      return;
    }

    if (!dateDebut || !dateFin) {
      setError('Veuillez sélectionner des dates valides');
      return;
    }

    // Simulation de réservation
    setError(null);
    alert(`Réservation simulée pour le véhicule ${data?.vehicule.marque} ${data?.vehicule.modele} du ${dateDebut} au ${dateFin}`);
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
        <div className="text-center">
          <p className="text-xl mb-4">Véhicule non trouvé</p>
          <p className="text-gray-600 mb-2">ID original: {rawId}</p>
          <p className="text-gray-600 mb-2">ID décodé: {id}</p>
          <p className="text-gray-600 mb-2">Erreur requête 1: {error1?.message}</p>
          <p className="text-gray-600 mb-2">Erreur requête 2: {error2?.message}</p>
          <p className="text-gray-600 mb-4">Data1: {data1 ? 'Trouvé' : 'Non trouvé'}</p>
          <p className="text-gray-600 mb-4">Data2: {data2 ? 'Trouvé' : 'Non trouvé'}</p>
          <Button onClick={() => navigate('/location-4x4')}>
            Retour à la liste des véhicules
          </Button>
        </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations du véhicule */}
            <div>
              <div className="mb-6">
                <img
                  src={vehicle.image ? `http://localhost:8000/media/${vehicle.image}` : '/placeholder.svg'}
                  alt={`${vehicle.marque} ${vehicle.modele}`}
                  className="object-cover w-full h-64 rounded-lg shadow-lg"
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                  {vehicle.marque} {vehicle.modele} ({vehicle.annee})
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Car className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">Type</span>
                      <span className="font-medium">{vehicle.type.libelle}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">Capacité</span>
                      <span className="font-medium">{vehicle.capacite.nombrePlaces} places</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    {getEtatIcon(vehicle.etat)}
                    <div>
                      <span className="text-sm text-gray-500 block">État</span>
                      <span className="font-medium">{vehicle.etat}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Hash className="w-5 h-5 mr-3 text-purple-600" />
                    <div>
                      <span className="text-sm text-gray-500 block">Immatriculation</span>
                      <span className="font-medium font-mono">{vehicle.immatriculation}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {generateDescription(vehicle)}
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      <strong>Année de mise en circulation :</strong> {vehicle.annee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Réservation */}
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Réserver ce véhicule</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Date de début</label>
                      <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Date de fin</label>
                      <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={dateDebut || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    {dateDebut && dateFin && (
                      <Alert variant="default" className="bg-green-50 border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Vérification de disponibilité en cours de développement.
                          Vous pouvez procéder à la réservation.
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="destructive">
                        <XCircle className="w-4 h-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600">Prix par jour</span>
                        <span className="font-semibold text-lg">{vehicle.prix.toLocaleString('fr-FR')} Ar</span>
                      </div>
                      
                      {dateDebut && dateFin && (
                        <>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-600">Nombre de jours</span>
                            <span className="font-semibold">
                              {Math.ceil((new Date(dateFin).getTime() - new Date(dateDebut).getTime()) / (1000 * 60 * 60 * 24))} jours
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-6 p-3 bg-blue-50 rounded-lg">
                            <span className="text-lg font-semibold text-gray-800">Total</span>
                            <span className="text-2xl font-bold text-blue-600">
                              {(Math.ceil((new Date(dateFin).getTime() - new Date(dateDebut).getTime()) / (1000 * 60 * 60 * 24)) *
                                vehicle.prix).toLocaleString('fr-FR')} Ar
                            </span>
                          </div>
                        </>
                      )}

                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                        size="lg"
                        onClick={handleReservation}
                        disabled={!dateDebut || !dateFin}
                      >
                        {!isAuthenticated ? 'Se connecter pour réserver' : 'Réserver maintenant'}
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

export default VehicleDetailSimple;