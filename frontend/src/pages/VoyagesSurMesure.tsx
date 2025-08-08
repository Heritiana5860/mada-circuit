import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TestimonialCard from "../components/testimonia/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Compass,
  Check,
  Send,
  Quote,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_TESTIMONIA_BY_STATUS } from "@/graphql/queries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const VoyagesSurMesure = () => {
  const { data, loading, error } = useQuery(GET_TESTIMONIA_BY_STATUS, {
    variables: {
      status: true,
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Voyages Sur Mesure | Madagascar Voyage";
  }, []);

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const destinations = [
    {
      name: "Antananarivo",
      region: "Hautes Terres Centrales",
      image:
        "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      name: "Nosy Be",
      region: "Nord",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      name: "Isalo",
      region: "Sud-Ouest",
      image:
        "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      name: "Pangalanes",
      region: "Est",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      name: "Diego Suarez",
      region: "Nord",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      name: "Tuléar",
      region: "Sud-Ouest",
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
  ];

  const activities = [
    { name: "Randonnée", icon: <Compass className="h-5 w-5" /> },
    { name: "Plage", icon: <Compass className="h-5 w-5" /> },
    { name: "Safari", icon: <Compass className="h-5 w-5" /> },
    { name: "Plongée", icon: <Compass className="h-5 w-5" /> },
    { name: "Culture", icon: <Compass className="h-5 w-5" /> },
    { name: "Gastronomie", icon: <Compass className="h-5 w-5" /> },
  ];

  const testimonials = [
    {
      name: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Avril 2023",
      rating: 5,
      text: "Notre voyage sur mesure à Madagascar était parfait ! Notre guide était exceptionnel et les itinéraires proposés correspondaient exactement à nos attentes. Je recommande vivement.",
    },
    {
      name: "Sophie Martin",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Janvier 2023",
      rating: 5,
      text: "La flexibilité du voyage sur mesure nous a permis de découvrir des endroits extraordinaires hors des sentiers battus. Une expérience inoubliable à Madagascar.",
    },
    {
      name: "David Lee",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      date: "Décembre 2022",
      rating: 4,
      text: "L'équipe a créé un itinéraire parfait qui a répondu à toutes nos demandes. La découverte du Canal des Pangalanes était le point fort de notre séjour.",
    },
  ];

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">
              Chargement des témoignages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur lors du chargement
              </h3>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const allData = data?.allTestimoniaByStatus || [];
  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  for (let i = 0; i < allData.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(allData.slice(i, i + testimonialsPerSlide));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src="/surmesure.jpg"
            alt="Canal des Pangalanes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 flex items-center">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Créez votre Voyage Sur Mesure
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Un voyage unique, conçu selon vos préférences, pour découvrir
                Madagascar à votre rythme et selon vos envies.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">
                    Votre itinéraire personnalisé
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Étape {step} sur {totalSteps}
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Choisissez vos destinations
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Sélectionnez les régions et les lieux que vous souhaitez
                      visiter pendant votre voyage.
                    </p>

                    <Tabs defaultValue="regions">
                      <TabsList className="mb-6">
                        <TabsTrigger value="regions">Par région</TabsTrigger>
                        <TabsTrigger value="destinations">
                          Toutes les destinations
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="regions">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[
                            "Nord",
                            "Sud",
                            "Est",
                            "Ouest",
                            "Hautes Terres",
                            "Sud-Ouest",
                            "Nord-Ouest",
                            "Nord-Est",
                          ].map((region) => (
                            <label
                              key={region}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input type="checkbox" className="mr-2" />
                              <span>{region}</span>
                            </label>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="destinations">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {destinations.map((destination) => (
                            <label
                              key={destination.name}
                              className="relative cursor-pointer"
                            >
                              <input type="checkbox" className="sr-only peer" />
                              <div className="overflow-hidden rounded-lg peer-checked:ring-2 peer-checked:ring-primary">
                                <img
                                  src={destination.image}
                                  alt={destination.name}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-end">
                                  <div className="p-3 text-white">
                                    <h4 className="font-bold">
                                      {destination.name}
                                    </h4>
                                    <p className="text-xs opacity-80">
                                      {destination.region}
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center opacity-0 peer-checked:opacity-100">
                                  <Check className="h-3 w-3 text-primary" />
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Détails du voyage
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Indiquez les dates et le nombre de voyageurs pour votre
                      séjour.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date de début
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              className="w-full p-2 border rounded-lg"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date de fin
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              className="w-full p-2 border rounded-lg"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Durée préférée (jours)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            defaultValue="7"
                            className="w-full p-2 border rounded-lg"
                          />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Nombre de voyageurs
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="20"
                            defaultValue="2"
                            className="w-full p-2 border rounded-lg"
                          />
                          <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Préférences et activités
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Choisissez le type d'hébergement et les activités qui vous
                      intéressent.
                    </p>

                    <div className="space-y-6 mb-6">
                      <div>
                        <h4 className="font-medium mb-3">Type d'hébergement</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["Standard", "Confort", "Luxe"].map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input
                                type="radio"
                                name="accommodation"
                                className="mr-2"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Activités souhaitées
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {activities.map((activity) => (
                            <label
                              key={activity.name}
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary/5"
                            >
                              <input type="checkbox" className="mr-2" />
                              <div className="flex items-center">
                                {activity.icon}
                                <span className="ml-2">{activity.name}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Budget estimé par personne
                        </h4>
                        <div className="space-x-4">
                          {[
                            "< 2M Ar",
                            "2M - 5M Ar",
                            "5M - 10M Ar",
                            "> 10M Ar",
                          ].map((budget) => (
                            <label
                              key={budget}
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                name="budget"
                                className="mr-1"
                              />
                              <span>{budget}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Vos coordonnées</h3>
                    <p className="text-muted-foreground mb-6">
                      Laissez-nous vos coordonnées pour recevoir votre devis
                      personnalisé.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Prénom
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Votre prénom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-lg"
                          placeholder="votre.email@exemple.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-lg"
                          placeholder="+261 34 12 345 67"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Informations complémentaires
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Précisez toute demande particulière ou information supplémentaire pour votre voyage..."
                        ></textarea>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-2" />
                        <span className="text-sm text-muted-foreground">
                          J'accepte de recevoir mon devis personnalisé et les
                          communications de Madagascar Voyage concernant mon
                          voyage sur mesure.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                      Précédent
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < totalSteps ? (
                    <Button onClick={() => setStep(step + 1)}>Continuer</Button>
                  ) : (
                    <Button className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      <span>Envoyer ma demande</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi choisir un voyage sur mesure ?
              </h2>
              <p className="text-muted-foreground">
                Un voyage personnalisé vous offre une expérience unique, adaptée
                à vos envies et à votre rythme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Liberté totale</h3>
                  <p className="text-muted-foreground">
                    Choisissez librement vos destinations, la durée de votre
                    séjour dans chaque lieu et les activités qui vous
                    intéressent le plus.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Assistance locale</h3>
                  <p className="text-muted-foreground">
                    Nos guides locaux vous accompagnent tout au long de votre
                    voyage pour vous faire découvrir les trésors cachés de
                    Madagascar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Expérience authentique
                  </h3>
                  <p className="text-muted-foreground">
                    Vivez des expériences uniques, loin des sentiers battus, et
                    découvrez la culture malgache de façon authentique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ce que disent nos voyageurs
              </h2>
              <p className="text-muted-foreground">
                Découvrez les expériences de ceux qui ont déjà profité de nos
                services de voyages personnalisés.
              </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Carousel de témoignages */}
              {allData.length > 0 ? (
                <Carousel
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  setApi={(api) => {
                    api?.on("select", () => {
                      setCurrentIndex(api.selectedScrollSnap());
                    });
                  }}
                >
                  <CarouselContent>
                    {groupedTestimonials.map((group, index) => (
                      <CarouselItem key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {group.map((testimonial, i) => (
                            <div
                              key={i}
                              className="transform hover:scale-105 transition-all duration-300"
                              style={{
                                animationDelay: `${i * 0.1}s`,
                              }}
                            >
                              <TestimonialCard allData={testimonial} />
                            </div>
                          ))}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation */}
                  {allData.length > testimonialsPerSlide && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <CarouselPrevious
                        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                        aria-label="Témoignage précédent"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </CarouselPrevious>

                      <div className="flex gap-2">
                        {groupedTestimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              i === currentIndex
                                ? "bg-primary scale-125"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Page ${i + 1}`}
                          />
                        ))}
                      </div>

                      <CarouselNext
                        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                        aria-label="Témoignage suivant"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </CarouselNext>
                    </div>
                  )}
                </Carousel>
              ) : (
                <div className="text-center py-12">
                  <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucun témoignage disponible
                  </h3>
                  <p className="text-gray-500">
                    Les témoignages de nos clients apparaîtront ici
                    prochainement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-muted-foreground">
                Vous avez des questions sur nos voyages sur mesure ? Consultez
                nos réponses aux questions les plus fréquentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Comment fonctionne un voyage sur mesure ?
                  </h3>
                  <p className="text-muted-foreground">
                    Vous précisez vos préférences via notre formulaire, nous
                    élaborons une proposition d'itinéraire personnalisé, puis
                    nous affinons ensemble jusqu'à obtenir le voyage idéal qui
                    répond parfaitement à vos attentes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Combien coûte un voyage sur mesure ?
                  </h3>
                  <p className="text-muted-foreground">
                    Le prix varie selon vos choix de destinations,
                    d'hébergements et d'activités. Nous vous proposons une
                    estimation détaillée après réception de votre demande, sans
                    engagement de votre part.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Peut-on modifier l'itinéraire en cours de voyage ?
                  </h3>
                  <p className="text-muted-foreground">
                    Oui, dans la mesure du possible, des ajustements peuvent
                    être effectués pendant votre séjour. Nos guides locaux sont
                    flexibles et s'adaptent à vos souhaits, tout en respectant
                    les réservations déjà effectuées.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Les guides parlent-ils français ?
                  </h3>
                  <p className="text-muted-foreground">
                    Oui, tous nos guides sont bilingues et parlent couramment
                    français et anglais. Certains guides maîtrisent également
                    d'autres langues comme l'allemand, l'italien ou l'espagnol,
                    sur demande.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VoyagesSurMesure;
