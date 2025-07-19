
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Compass, Camera, Coffee, Star } from 'lucide-react';

const CircuitDetail = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Détails du Circuit | Madagascar Voyage';
  }, []);

  // Mock circuit data - in a real app, fetch this based on the ID
  const circuit = {
    id: "circuit-1",
    title: "Les Trésors du Nord",
    location: "Antsiranana, Montagne d'Ambre",
    duration: "7 jours",
    price: 2500000,
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    ],
    description: "Découvrez les merveilles du Nord de Madagascar à travers ce circuit exceptionnel qui vous emmène des plages paradisiaques aux montagnes majestueuses. Explorez la faune et la flore uniques de cette région, et immergez-vous dans la culture locale avec des visites de villages traditionnels.",
    highlights: [
      "Exploration du Parc National de la Montagne d'Ambre",
      "Plages paradisiaques d'Antsiranana",
      "Rencontre avec les lémuriens endémiques",
      "Visite du marché artisanal d'Antsiranana",
      "Randonnée dans les Tsingy Rouges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Antsiranana",
        activities: "Accueil à l'aéroport, transfert à l'hôtel, briefing sur le circuit, dîner de bienvenue.",
      },
      {
        day: 2,
        title: "Montagne d'Ambre",
        activities: "Journée d'exploration du Parc National de la Montagne d'Ambre, observation de la faune et flore endémiques.",
      },
      {
        day: 3,
        title: "Tsingy Rouges",
        activities: "Excursion aux Tsingy Rouges, formations géologiques uniques. Pique-nique sur place.",
      },
      {
        day: 4,
        title: "Village de pêcheurs",
        activities: "Visite d'un village de pêcheurs traditionnel, rencontre avec les habitants, déjeuner de fruits de mer frais.",
      },
      {
        day: 5,
        title: "Plages d'Antsiranana",
        activities: "Journée détente sur les plages, possibilité de snorkeling ou plongée (en option).",
      },
      {
        day: 6,
        title: "Marché artisanal",
        activities: "Visite du marché artisanal d'Antsiranana, temps libre pour shopping, soirée culturelle.",
      },
      {
        day: 7,
        title: "Départ",
        activities: "Temps libre selon l'horaire de vol, transfert à l'aéroport, fin des services.",
      },
    ],
    included: [
      "Transport en véhicule 4x4 climatisé",
      "Guide francophone professionnel",
      "Hébergement en hôtels 3* et 4*",
      "Petits déjeuners et dîners",
      "Entrées des parcs et sites touristiques mentionnés",
      "Transferts aéroport",
    ],
    notIncluded: [
      "Vols internationaux",
      "Déjeuners",
      "Boissons",
      "Pourboires",
      "Activités optionnelles",
      "Assurance voyage",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="relative h-[50vh]">
          <img 
            src={circuit.image} 
            alt={circuit.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {circuit.title}
                </h1>
                <div className="flex items-center flex-wrap gap-4 text-white">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{circuit.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{circuit.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{circuit.rating} ({circuit.reviews} avis)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Aperçu</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                    <TabsTrigger value="gallery">Galerie</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-3">Description</h3>
                        <p className="text-muted-foreground">{circuit.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-3">Points forts</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {circuit.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center">
                              <Compass className="h-5 w-5 mr-2 text-primary" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary">
                    <h3 className="text-2xl font-bold mb-6">Itinéraire détaillé</h3>
                    <div className="space-y-6">
                      {circuit.itinerary.map((day) => (
                        <div key={day.day} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold">{day.day}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">{day.title}</h4>
                            <p className="text-muted-foreground">{day.activities}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="inclusions">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Ce qui est inclus</h3>
                        <ul className="space-y-2">
                          {circuit.included.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                                <span className="text-xs">✓</span>
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Non inclus</h3>
                        <ul className="space-y-2">
                          {circuit.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2">
                                <span className="text-xs">✕</span>
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery">
                    <h3 className="text-2xl font-bold mb-6">Galerie photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[circuit.image, ...circuit.gallery].map((img, index) => (
                        <img 
                          key={index} 
                          src={img} 
                          alt={`${circuit.title} - Image ${index + 1}`}
                          className="w-full h-60 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:w-1/3">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {circuit.price.toLocaleString()} Ar
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Prix par personne, base chambre double
                      </p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>Date de départ:</span>
                        <input 
                          type="date" 
                          className="border rounded px-2 py-1 text-sm"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Nombre de personnes:</span>
                        <div className="flex border rounded overflow-hidden">
                          <button className="px-2 py-1 bg-muted">-</button>
                          <input 
                            type="number" 
                            value="2" 
                            min="1"
                            className="w-10 text-center"
                            readOnly
                          />
                          <button className="px-2 py-1 bg-muted">+</button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mb-3">Réserver maintenant</Button>
                    <Button variant="outline" className="w-full">Demander un devis personnalisé</Button>
                    
                    <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Besoin d'aide ?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Notre équipe est disponible pour répondre à toutes vos questions.
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        <span>+261 34 12 345 67</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CircuitDetail;
