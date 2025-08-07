import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  MapPin,
  Heart,
  Users,
  Droplets,
  LightbulbIcon,
  BookOpen,
  Building,
  Church,
  ShieldCheck,
  Star,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CIRCUITS } from "@/graphql/queries";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";
import { formatPrice } from "@/helper/formatage";

const ProgrammeSolidairePage = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_ALL_CIRCUITS, {
    variables: {
      type: "solidaire",
    },
  });

  const handleClick = () => {
    navigate("/objectif-association");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Programme Solidaire | Madagascar Voyage";
  }, []);

  const villages = [
    "Salehy",
    "Ambodiarina",
    "Ambodisovika",
    "Ampangalana",
    "Andranotsara",
    "Sohihy",
    "Ampanambo",
    "Analila",
    "Manonilaza",
    "Masomeloka",
    "Ambalavotaka",
    "Analampotsy",
    "Andonaka",
    "Nosy Varika",
    "Ampohamanitra",
    "Ambodiarana",
    "Analanolona",
    "Ambahy",
    "Ambohitsara",
    "Ampandomana",
  ];

  const supportProjects = [
    {
      title: "Construction de Puits",
      description:
        "Financer la construction de puits pour garantir l'accès à l'eau potable aux villages riverains du canal.",
      icon: <Droplets className="h-6 w-6 text-primary" />,
    },
    {
      title: "Panneaux Solaires",
      description:
        "Installer des panneaux solaires pour apporter l'électricité aux villages isolés du canal des Pangalanes.",
      icon: <LightbulbIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: "Parrainage d'Enfants",
      description:
        "Soutenir les enfants pour leur permettre de poursuivre leur scolarité jusqu'au secondaire et même jusqu'à l'université.",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Fournitures Scolaires",
      description:
        "Offrir des fournitures scolaires pour permettre aux enfants d'étudier dans de meilleures conditions.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: "Rénovation d'Écoles",
      description:
        "Participer à la rénovation des infrastructures scolaires pour améliorer les conditions d'apprentissage.",
      icon: <Building className="h-6 w-6 text-primary" />,
    },
    {
      title: "Rénovation d'Hôpitaux",
      description:
        "Contribuer à l'amélioration des infrastructures médicales pour offrir de meilleurs soins aux riverains.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Construction d'Églises",
      description:
        "Aider à la construction ou rénovation d'églises, lieux importants de la vie spirituelle et sociale des villages.",
      icon: <Church className="h-6 w-6 text-primary" />,
    },
    {
      title: "Distribution de Semences",
      description:
        "Fournir des semences de maïs, haricot et légumes pour assurer la sécurité alimentaire des villages.",
      //   icon: <Seed className="h-6 w-6 text-primary" />,
    },
  ];

  const exchangeActivities = [
    {
      title: "Initiation à la Vannerie",
      description:
        "Apprenez l'art traditionnel de la vannerie avec les artisans locaux qui partagent leur savoir-faire ancestral.",
      icon: <Star className="h-6 w-6 text-primary" />,
    },
    {
      title: "Techniques de Pêche",
      description:
        "Découvrez les techniques de pêche traditionnelles utilisées par les riverains du canal des Pangalanes.",
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
    },
    {
      title: "Culture du Riz",
      description:
        "Participez aux différentes étapes de la culture du riz, aliment de base de la cuisine malgache.",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: "Pilage du Riz",
      description:
        "Initiez-vous au pilage traditionnel du riz, une activité quotidienne dans les villages malgaches.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Découverte des Coutumes",
      description:
        "Immergez-vous dans les traditions et coutumes locales à travers des échanges privilégiés avec les habitants.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Chants et Chorale",
      description:
        "Assistez aux louanges et chants chorals dans les églises des villages pour une expérience culturelle authentique.",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
  ];

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return <ContentError />;
  }

  const dataSolidaire = data?.allCircuitsByType;
  console.log("Data solidaire: ", dataSolidaire);
  console.log("Image solidaire: ", dataSolidaire.images);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <section className="relative h-[70vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Programme Solidaire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Devenez Voyageur Solidaire
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Un mélange de vacances confortables et d'actions solidaires
                  auprès des populations locales sur les rives du fameux Canal
                  des Pangalanes.
                </p>
                <Button size="lg" className="mr-4">
                  Découvrir nos projets
                </Button>
                <Button size="lg" variant="secondary">
                  Faire un don
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Notre Vision du Tourisme Solidaire
                </h2>
                <p className="text-muted-foreground mb-4">
                  La route des Pangalanes ouvre une nouvelle conception du
                  voyage qui se place au-dessus de toutes les autres notions de
                  tourisme. Les voyageurs participent activement à une mission
                  bien définie, avec une équipe locale rémunérée.
                </p>
                <p className="text-muted-foreground mb-6">
                  Les retombées économiques sont équitablement réparties entre
                  le prestataire et le village hôte pour pérenniser les projets
                  dans les villages situés au bord du canal des pangalanes.
                  Notre objectif est de créer un échange authentique où chacun
                  enrichit l'autre.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">21</span>
                    <span className="text-sm text-muted-foreground">
                      villages soutenus
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">10+</span>
                    <span className="text-sm text-muted-foreground">
                      années d'action
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      100%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      retombées locales
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="Villageois du Canal des Pangalanes"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Les Villages Soutenus</h2>
              <p className="text-muted-foreground">
                Notre programme solidaire soutient 21 grands villages entre
                Mahanoro et Mananjary, situés le long du Canal des Pangalanes,
                isolés et ayant besoin d'aide pour améliorer leurs conditions de
                vie.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {villages.map((village, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="font-medium">{village}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Nos Projets de Soutien
              </h2>
              <p className="text-muted-foreground">
                Le manque d'échange et d'éducation constituent la principale
                misère des riverains. Voici les projets que nous menons avec
                votre aide pour améliorer leurs conditions de vie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportProjects.map((project, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">{project.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Un Échange Culturel Enrichissant
              </h2>
              <p className="text-muted-foreground">
                En contrepartie de votre soutien, les villageois vous partagent
                leur savoir-faire, leur culture et leurs traditions. Un
                véritable échange où chacun s'enrichit au contact de l'autre.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exchangeActivities.map((activity, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">{activity.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Nos Offres de Voyage Solidaire
              </h2>
              <p className="text-muted-foreground">
                Découvrez nos formules de voyages solidaires qui allient
                confort, découverte et contribution au développement local des
                villages du Canal des Pangalanes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataSolidaire.map((pack, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={`http://localhost:8000/media/${pack.images[0].image}`}
                      alt={pack.titre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                        {pack.duree} jours
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{pack.destination.nom}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{pack.titre}</h3>
                    <p className="text-muted-foreground mb-4">
                      {pack.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(pack.prix)} Ar
                      </span>
                      <Link
                        to={`/programme-solidaire/${pack.id}`}
                        state={{ pangalanes: pack }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <span>Détails</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                "Nous avons besoin de la solidarité de voyageurs avec qui nous
                échangeons nos valeurs et, en contrepartie, nous devons
                intégrer, utiliser des méthodes de communication et de gestion
                correspondant aux attentes de nos visiteurs. Conscients et
                réalistes, nous garderons notre authenticité."
              </blockquote>
              <div className="mt-6">
                <p className="font-medium">
                  Pour relever le défi du développement responsable et autonome,
                  il faut des touristes solidaires et durables. Depuis 10 ans
                  nos activités avec les touristes étrangers ont permis à notre
                  petit groupe d'une vingtaine de personnes, les riverains de
                  survivre et d'investir dans les équipements et matériels
                  nécessaires à notre désir de construire durablement, à l'abri
                  des cyclones.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="École dans un village du Canal des Pangalanes"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  L'Association et son Action
                </h2>
                <p className="text-muted-foreground mb-4">
                  L'association "Parrainage des enfants sur le canal des
                  pangalanes" dirigée par Mme RAZAFIHERISON Maminiaina,
                  travaille en collaboration avec des prestataires touristiques
                  et des guides pour offrir une expérience authentique tout en
                  soutenant le développement local.
                </p>
                <p className="text-muted-foreground mb-6">
                  Grâce au soutien des touristes solidaires, nous avons pu
                  favoriser la scolarisation des enfants dans les meilleures
                  écoles de la région, fournir de l'eau potable et des semences
                  aux villages. Nous continuerons à œuvrer pour un avenir
                  meilleur pour les communautés du Canal des Pangalanes.
                </p>
                <Button onClick={handleClick} size="lg" className="mb-4">
                  Découvrir les objectifs de l'association
                </Button>
                <p className="text-sm text-muted-foreground">
                  Canal Évasion, qui regroupe les guides, les bateliers et les
                  chefs de village, vous garantit des perspectives de
                  développement durable, car ils bénéficient du soutien des
                  autorités administratives locales et souhaitent une interface
                  internationale pour accompagner ces projets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1544117519-31a4d6a6bec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à devenir un voyageur solidaire ?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              Contactez-nous dès aujourd'hui pour réserver votre voyage
              solidaire sur le Canal des Pangalanes et contribuer au
              développement durable des communautés locales.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default">
                Réserver un voyage solidaire
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                Faire un don
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammeSolidairePage;
