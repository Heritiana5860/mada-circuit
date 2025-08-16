import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  School,
  Heart,
  Landmark,
  Users,
  TreePine,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaqContext } from "@/provider/DataContext";
import { FaqCard } from "@/components/FaqCard";

const ObjectifsAssociationPage = () => {
  const navigate = useNavigate();
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Objectifs de l'Association | Madagascar Voyage";
  }, []);

  const objectifs = [
    {
      title: "Parrainage d'enfants",
      description:
        "Aider des enfants qui vivent dans des villages au bord du canal des pangalanes entre Tamatave-Mahanoro-Mananjary-Manakara à trouver des parrains pour subvenir à leurs études complètes et leurs besoins vitaux dès la classe primaire, secondaire ou lycée.",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Soutien aux établissements scolaires",
      description:
        "L'association a pour objet de participer à aider les établissements scolaires en construisant de nouvelles infrastructures et en fournissant des matériels scolaires.",
      icon: <School className="h-6 w-6 text-primary" />,
    },
    {
      title: "Droit à l'éducation",
      description:
        "Elle a pour but de protéger le principal droit des enfants à l'éducation, en leur donnant accès à un enseignement de qualité.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: "Respect des traditions",
      description:
        "Elle a pour but de prioriser l'école en gardant la religion, la tradition et les coutumes locales.",
      icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
      title: "Protection de l'environnement",
      description:
        "Elle a pour but de protéger l'environnement et la nature ainsi que les biens publics.",
      icon: <TreePine className="h-6 w-6 text-primary" />,
    },
    {
      title: "Développement communautaire",
      description:
        "Contribuer au développement des communautés locales à travers l'éducation des enfants qui deviendront les forces vives de demain.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
  ];

  if (faqLoading) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">Chargement des faqs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (faqError) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur lors du chargement!
              </h3>
              <p className="text-red-600">{faqError.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const faqSolidaire = allDataFaq.filter((faq) => faq.faqType === "SOLIDAIRE");

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Enfants malgaches à l'école"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Objectifs de l'Association
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Parrainer un enfant est synonyme de lui ouvrir la porte à une
                  meilleure éducation
                </p>
                <Link to="/contact">
                  <Button size="lg" className="mr-4">
                    Parrainer un enfant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
                <p className="text-muted-foreground mb-4">
                  À Madagascar, sur le canal des pangalanes entre
                  Tamatave-Mahanoro-Mananjary-Manakara, seulement 35% des
                  enfants sont scolarisés par leurs parents et uniquement 10%
                  peuvent continuer jusqu'aux classes secondaires en raison du
                  manque de moyens, de l'isolement et du manque de subventions.
                </p>
                <p className="text-muted-foreground mb-6">
                  De nombreux villages sont isolés à cause de l'ensablement du
                  canal et manquent d'accès routier, ce qui provoque la hausse
                  du prix des fournitures scolaires. Pire encore, les
                  instituteurs ne veulent plus enseigner dans ces conditions et
                  abandonnent l'école et les enfants, alors que nombre d'entre
                  eux ont envie de continuer leurs études et de réaliser leurs
                  rêves de devenir médecin, instituteur ou ingénieur.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">35%</span>
                    <span className="text-sm text-muted-foreground">
                      enfants scolarisés
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">10%</span>
                    <span className="text-sm text-muted-foreground">
                      continuent au secondaire
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      100%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      d'espoir avec vous
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="Enfants apprenant"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <School className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectifs Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Objectifs de l'Association
              </h2>
              <p className="text-muted-foreground">
                Notre association œuvre pour offrir une éducation de qualité aux
                enfants vivant le long du canal des pangalanes, tout en
                respectant leur culture et leur environnement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectifs.map((objectif, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">{objectif.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{objectif.title}</h3>
                    <p className="text-muted-foreground">
                      {objectif.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignage Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                "Un enfant de pêcheur sauvé par un touriste ! Dans un pays très
                pauvre comme Madagascar et surtout sur les habitants au bord du
                canal, le manque d'échange et d'éducation constituent la
                principale misère des riverains qui, avec insouciance se mettent
                à chanter, vivent le jour présent comme le premier jour, ne
                savent pas de quoi ils vivront demain, espèrent, travaillent
                parfois durement, mangent pas toujours à leur faim, n'ont pas
                les moyens de se soigner mais font face avec dignité et
                résistent ! Mais ils ont besoin de votre soutien pour aider
                leurs enfants d'aller à l'école pour qu'ils soient au courant de
                ce qu'ils vivront au futur, au moins ils sauront lire et écrire
                leurs noms et faire face au monde d'aujourd'hui."
              </blockquote>
              <div className="mt-6">
                <p className="font-bold">
                  Beaucoup d'enfants dans des pays pauvres ont été sauvés par
                  des gens comme vous. Ils ont donné une chance, permis de
                  changer leur destin vers un meilleur avenir pour leur famille,
                  village, ville, pays de se développer. C'est leur droit. Il
                  est de notre devoir de les aider à réaliser leurs destins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Citation Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 italic">
                "Le possible est déjà fait, pour le miracle il faut attendre
                48h"
              </h3>
              <p className="text-lg text-muted-foreground">
                Vous êtes le miracle qu'ils attendent depuis 48h, aidez-les s'il
                vous plaît à continuer leurs études.
              </p>
            </div>
          </div>
        </section>

        {/* Future Projects Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="Projet futur"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">Nos Projets Futurs</h2>
                <p className="text-muted-foreground mb-4">
                  Au cours d'une première phase, un site Web sera mis en ligne
                  pour devenir un portail d'information permettant de rencontrer
                  en temps réel les enfants, les villageois et suivre leur
                  progression.
                </p>
                <p className="text-muted-foreground mb-6">
                  Nous souhaitons également développer des programmes de
                  formation pour les enseignants locaux, améliorer les
                  infrastructures scolaires existantes et créer des
                  bibliothèques mobiles qui pourront naviguer le long du canal
                  pour atteindre les villages les plus isolés.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Contactez-nous</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Participez au changement aujourd'hui
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              Votre parrainage peut transformer la vie d'un enfant sur le canal
              des pangalanes. Contactez-nous dès maintenant pour découvrir
              comment vous pouvez faire la différence.
            </p>
            <div>
              <Link to="/contact">
                <Button size="lg" variant="default">
                  Parrainer un enfant
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* Foire Aux Questions */}
        {faqSolidaire.length > 0 && <FaqCard faq={faqSolidaire} />}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
              <p className="text-muted-foreground">
                Découvrez les réponses aux questions les plus courantes sur
                notre programme de parrainage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Comment fonctionne le parrainage?
                  </h3>
                  <p className="text-muted-foreground">
                    Le parrainage permet de financer la scolarité d'un enfant,
                    ses fournitures scolaires, et parfois une partie de ses
                    besoins vitaux. Vous recevrez régulièrement des nouvelles et
                    pourrez communiquer avec l'enfant que vous parrainez.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Combien coûte un parrainage?
                  </h3>
                  <p className="text-muted-foreground">
                    Le montant du parrainage est flexible selon vos
                    possibilités. Nous recommandons une participation mensuelle
                    qui sera entièrement consacrée à l'éducation et au bien-être
                    de l'enfant.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Puis-je visiter l'enfant que je parraine?
                  </h3>
                  <p className="text-muted-foreground">
                    Oui, nous encourageons les rencontres entre parrains et
                    filleuls lorsque cela est possible. Nous pouvons organiser
                    votre visite sur le canal des pangalanes dans le respect des
                    communautés locales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Comment sont utilisés les dons?
                  </h3>
                  <p className="text-muted-foreground">
                    Tous les dons sont utilisés pour financer l'éducation des
                    enfants, améliorer les infrastructures scolaires et soutenir
                    le développement des communautés locales. Nous vous
                    fournirons des rapports réguliers sur l'utilisation des
                    fonds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
              <p className="text-muted-foreground">
                Découvrez les histoires inspirantes d'enfants dont la vie a été
                transformée grâce au parrainage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    Rakoto, 15 ans
                  </h3>
                  <p className="text-muted-foreground text-center">
                    "Grâce à mon parrain, je peux continuer mes études au
                    collège. Mon rêve est de devenir médecin pour aider mon
                    village."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    Soa, 12 ans
                  </h3>
                  <p className="text-muted-foreground text-center">
                    "Je suis la première fille de ma famille à aller à l'école.
                    Maintenant je sais lire et écrire, et j'aide mes parents à
                    lire les documents importants."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    Maminiaina, Directrice
                  </h3>
                  <p className="text-muted-foreground text-center">
                    "Chaque parrainage est une lumière d'espoir pour un enfant
                    et sa communauté. Nous voyons des changements concrets dans
                    les villages où les enfants sont scolarisés."
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

export default ObjectifsAssociationPage;
