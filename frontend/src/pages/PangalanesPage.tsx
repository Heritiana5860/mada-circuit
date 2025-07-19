import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, Compass, Sailboat, Fish, Camera, Trees, Users, Heart, Globe, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PangalanesPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/programme-solidaire')
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Canal des Pangalanes | Madagascar Voyage';
  }, []);

  const activities = [
    {
      title: "Croisière sur le Canal",
      description: "Naviguez sur les eaux calmes du canal à bord de nos bateaux confortables et découvrez des paysages à couper le souffle.",
      icon: <Sailboat className="h-6 w-6 text-primary" />,
    },
    {
      title: "Observation de la Faune",
      description: "Admirez les diverses espèces de lémuriens, oiseaux et autres animaux qui habitent les forêts bordant le canal.",
      icon: <Trees className="h-6 w-6 text-primary" />,
    },
    {
      title: "Pêche Traditionnelle",
      description: "Apprenez les techniques de pêche locales et tentez votre chance pour attraper des poissons d'eau douce.",
      icon: <Fish className="h-6 w-6 text-primary" />,
    },
    {
      title: "Safari Photo",
      description: "Capturez des moments inoubliables et des paysages uniques lors de votre voyage sur le Canal des Pangalanes.",
      icon: <Camera className="h-6 w-6 text-primary" />,
    },
    {
      title: "Visites de Villages",
      description: "Rencontrez les communautés locales et découvrez leur mode de vie traditionnel et leur artisanat.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Randonnées Guidées",
      description: "Explorez les sentiers qui bordent le canal avec nos guides expérimentés qui vous feront découvrir la flore locale.",
      icon: <Compass className="h-6 w-6 text-primary" />,
    },
  ];

  const tourPackages = [
    {
      title: "Escapade d'une Journée",
      description: "Une journée pour découvrir les merveilles du canal au départ de Tamatave.",
      price: 300000,
      duration: "1 jour",
      location: "Tamatave - Ambila Lemaitso",
      image: "https://www.madagascar-circuits.com/wp-content/uploads/2024/05/Canal-des-Pangalanes.jpg",
    },
    {
      title: "Aventure de 3 Jours",
      description: "Trois jours d'immersion dans la nature luxuriante avec logement dans des lodges au bord du canal.",
      price: 900000,
      duration: "3 jours",
      location: "Tamatave - Ankanin'ny Nofy",
      image: "https://zamilane.com/wp-content/uploads/2023/12/img_20211030_082531.jpg.webp",
    },
    {
      title: "Exploration Complète",
      description: "Une semaine pour découvrir en profondeur le canal et ses environs avec des activités variées.",
      price: 2100000,
      duration: "7 jours",
      location: "Tamatave - Mananjary",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/16/05/32/ea/moyen-de-transport-sur.jpg",
    },
  ];

  const whyChooseUs = [
    {
      title: "Richesse Ethnique",
      description: "Découvrez la diversité des ethnies malgaches qui vivent le long du canal et leur culture unique.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Faune Exceptionnelle",
      description: "Observez une faune riche comprenant plus de 100 espèces d'oiseaux et de nombreux animaux endémiques.",
      icon: <Fish className="h-6 w-6 text-primary" />,
    },
    {
      title: "Flore Luxuriante",
      description: "Explorez la végétation tropicale abondante qui borde le canal et ses lacs.",
      icon: <Trees className="h-6 w-6 text-primary" />,
    },
    {
      title: "Paysages Uniques",
      description: "Admirez des panoramas à couper le souffle entre forêts vierges, lacs et dunes côtières.",
      icon: <Camera className="h-6 w-6 text-primary" />,
    },
    {
      title: "Tourisme Solidaire",
      description: "Participez à des initiatives locales qui soutiennent les communautés du canal et leur développement.",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Guides Expérimentés",
      description: "Voyagez avec nos guides francophones et anglophones, passionnés par leur culture et leur patrimoine.",
      icon: <Compass className="h-6 w-6 text-primary" />,
    },
  ];

  const travelOptions = [
    {
      title: "Croisières Authentiques",
      description: "Naviguez sur le canal et savourez la gastronomie locale à bord de nos bateaux traditionnels.",
      icon: <Sailboat className="h-6 w-6 text-primary" />,
    },
    {
      title: "Voyages Sur-Mesure",
      description: "Créez votre itinéraire personnalisé selon vos envies et votre rythme avec nos spécialistes.",
      icon: <Star className="h-6 w-6 text-primary" />,
    },
    {
      title: "Raid-Aventure",
      description: "Vivez une expérience inoubliable en explorant le canal sur toute sa longueur de 650 km.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Circuits Classiques",
      description: "Optez pour nos itinéraires éprouvés qui vous feront découvrir les trésors du canal.",
      icon: <MapPin className="h-6 w-6 text-primary" />,
    },
    {
      title: "Séjours Balnéaires",
      description: "Profitez des plages et des lodges confortables le long du canal et de l'océan Indien.",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: "Location de Véhicules",
      description: "Louez des 4x4 ou des voitures légères pour explorer les environs du canal en toute liberté.",
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Canal des Pangalanes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Le Canal des Pangalanes
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Une merveille d'ingénierie de près de 700 kilomètres qui relie Farafangana 
                  à Tamatave à travers un chapelet de lagunes, de lacs et d'estuaires.
                </p>
                <Button size="lg" className="mr-4">Découvrir nos offres</Button>
                <Button size="lg" variant="secondary">En savoir plus</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Une voie navigable historique</h2>
                <p className="text-muted-foreground mb-4">
                  Le Canal des Pangalanes, l'une des plus longues voies navigables artificielles au monde, 
                  a été construit à l'époque coloniale française pour faciliter le transport 
                  des marchandises le long de la côte est de Madagascar.
                </p>
                <p className="text-muted-foreground mb-6">
                  Aujourd'hui, ce canal long de près de 700 kilomètres est devenu un site touristique 
                  majeur, offrant aux visiteurs une immersion complète dans la nature et la culture malgaches. 
                  Il relie plusieurs lacs, lagunes et rivières entre Farafangana au sud et Toamasina (Tamatave) au nord.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">700</span>
                    <span className="text-sm text-muted-foreground">kilomètres</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">1896</span>
                    <span className="text-sm text-muted-foreground">année de création</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">100+</span>
                    <span className="text-sm text-muted-foreground">espèces d'oiseaux</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://cdn.generationvoyage.fr/2016/03/canal-pangalanes-madagascar-1.jpg" 
                  alt="Canal des Pangalanes"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Activités sur le Canal</h2>
              <p className="text-muted-foreground">
                Le Canal des Pangalanes offre une multitude d'activités pour tous les types de voyageurs, 
                des amoureux de la nature aux aventuriers en quête de découvertes authentiques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {activity.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos Offres de Voyage</h2>
              <p className="text-muted-foreground">
                Découvrez nos formules spécialement conçues pour vous faire vivre une expérience 
                inoubliable sur le Canal des Pangalanes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourPackages.map((pack, index) => (
                <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={pack.image} 
                    alt={pack.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {pack.duration}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{pack.location}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pack.title}</h3>
                  <p className="text-muted-foreground mb-4">{pack.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      {pack.price.toLocaleString()} Ar
                    </span>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <span>Détails</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section: Pourquoi choisir Pangalanes Voyages */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Pangalanes Voyages</h2>
            <p className="text-muted-foreground">
              Des richesses malgaches authentiques et des formules adaptées à tous les budgets pour une expérience inoubliable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nouvelle section: Citation sur l'expérience */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
              "On peut trouver les avantages de la navigation fluviale sans stress, sans danger, sans pollution sur le canal des pangalanes, mais en plus, il y a une vraie aventure à vivre comme au début du 20ème siècle, il y a cent ans, à l'époque de Gallieni Gouverneur de Madagascar. Les étendues d'eau présentent une diversité remarquable, les immenses rivières et lacs bordant l'océan Indien sur 650 kilomètres. Les villages sont nichés sur les dunes côtières ou dans la forêt vierge, ils regorgent de poissons et de crustacés, de volaille et de zébus, de fruits et de légumes, de riz et d'épices. Les villes ont de petits hôtels confortables avec des bungalows en bord de mer et des restaurants traditionnels de qualité."
            </blockquote>
            <div className="mt-6">
              <p className="font-bold">Récemment, Pangalanes voyage, des associations comme Parrainage des enfants sur le canal des pangalanes dirigée par Mme RAZAFIHERISON Maminiaina, des prestataires touristiques et des guides, se sont organisés et regroupés pour offrir aux clients du tourisme des produits qu'ils sont en mesure de gérer au complet. Anciens pécheurs, francophones, anglophones amoureux de leurs traditions et fiers de les faire connaître leur famille, leur cuisine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nouvelle section: Nos Formules de Voyage */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Formules de Voyage</h2>
            <p className="text-muted-foreground">
              Vivez un voyage réellement sur mesure en individuel, conçu par des spécialistes de Madagascar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelOptions.map((option, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section: Tourisme Durable et Solidaire */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tourisme Durable et Solidaire</h2>
              <p className="text-muted-foreground mb-4">
                "Vous êtes en pleine nature, au bord d'un lac où l'eau est à 22°C et votre seul souci est de comparer la position des étoiles dans le ciel. Vous êtes dans l'hémisphère sud. Dans ces villages au long du canal, le tourisme peut permettre aux villageois qui vous accueillent, vous donnent leur pêche et leurs fruits, d'avoir de l'électricité dans les baraques pour s'ouvrir au monde et raconter des histoires aux enfants."
              </p>
              <p className="text-muted-foreground mb-6">
                "Développer un tourisme durable adapté aux désirs, croisière de 3 à 6 jours, tourisme solidaire et potentiels locaux, encourager et favoriser le transfert de technologie de solutions d'énergies renouvelables, mettre en place un partenariat international dynamique et respectueux. Parrainez des enfants en donnant une chance de continuer leur étude au secondaire et même jusqu'à l'université."
              </p>
              <Button onClick={handleClick} size="lg">Découvrir notre programme solidaire</Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Tourisme solidaire à Madagascar"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à explorer le Canal des Pangalanes ?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour réserver votre aventure sur le Canal des Pangalanes
            et vivre une expérience inoubliable au cœur de Madagascar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default">Réserver maintenant</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
);
};

export default PangalanesPage;