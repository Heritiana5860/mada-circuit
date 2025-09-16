import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Heart, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CIRCUITS } from "@/graphql/queries";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";
import { formatPrice } from "@/helper/formatage";
import SEO from "@/SEO";
import { urlMedia } from "@/helper/UrlImage";
import EmptyData from "@/components/EmptyData";
import { villages } from "@/helper/solidaire/Villages";
import { useSupportProjects } from "@/helper/solidaire/SupportProjects";
import { useExchangeActivities } from "@/helper/solidaire/ExchangeActivities";
import { useTranslation, Trans } from "react-i18next";

const ProgrammeSolidairePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const supportProjects = useSupportProjects();
  const exchangeActivities = useExchangeActivities();

  const { data, loading, error } = useQuery(GET_ALL_CIRCUITS, {
    variables: {
      typeCircuit: "solidaire",
    },
  });

  const handleClick = () => {
    navigate("/objectif-association");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Programme Solidaire | Madagascar Voyage";
  }, []);

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return <ContentError />;
  }

  const dataSolidaire = data?.allCircuitsByType;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Responsible Travel in Madagascar | Ethical & Solidarity Tours"
        description="Join a solidarity tour in Madagascar: authentic travel, local encounters, and support for sustainable community development."
        canonical="https://madagascar-voyagesolidaire.com/programme-solidaire"
        image="https://madagascar-voyagesolidaire.com/images/solidaire-og.webp"
      />

      <NavBar />

      <main className="flex-grow">
        <div className="relative p-10 bg-[url('solidaire.JPG')] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="max-w-6xl mx-auto">
            <div className="relative text-center">
              <Trans i18nKey="pages.solidaire.solidaireBecomeaSocially">
                <h1 className="text-5xl text-white md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                  Become a Socially Responsible Traveler
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                  Enjoy a perfect blend of comfortable vacations and meaningful
                  actions supporting local communities along the famous
                  Pangalanes Canal.
                </p>
              </Trans>
              <Button
                onClick={() => {
                  document.getElementById("projet")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                size="lg"
                className="mr-4"
              >
                {t("pages.solidaire.projects", "Discover our projects")}
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  {t("pages.solidaire.donation", "Make a donation")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Trans i18nKey="pages.solidaire.solidaireOurVision">
                  <h2 className="text-3xl font-bold mb-6">
                    Our Vision of Responsible Tourism
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The Pangalanes route introduces a new approach to travel
                    that goes beyond traditional tourism. Travelers actively
                    participate in a well-defined mission, working alongside a
                    compensated local team.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Economic benefits are fairly shared between the service
                    provider and the host village to sustain projects in
                    communities along the Pangalanes Canal. Our goal is to
                    create a genuine exchange where everyone enriches each
                    other.
                  </p>
                </Trans>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">21</span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidairesupportedvillages",
                        "supported villages"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">10+</span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidaireyearsofaction",
                        "years of action"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      100%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidairelocalbenefits",
                        "local benefits"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="slogan.webp"
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
              <Trans i18nKey="pages.solidaire.solidaireSupportedVillages">
                <h2 className="text-3xl font-bold mb-4">Supported Villages</h2>
                <p className="text-muted-foreground">
                  Our social impact program supports 21 major villages between
                  Mahanoro and Mananjary, located along the Pangalanes Canal,
                  which are isolated and in need of assistance to improve their
                  living conditions.
                </p>
              </Trans>
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

        <section className="py-16 bg-primary/5" id="projet">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Trans i18nKey="pages.solidaire.solidaireOurSupportProjects">
                <h2 className="text-3xl font-bold mb-4">
                  Our Support Projects
                </h2>
                <p className="text-muted-foreground">
                  The lack of interaction and education is the main hardship
                  faced by local communities. Here are the projects we carry out
                  with your support to improve their living conditions.
                </p>
              </Trans>
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
              <Trans i18nKey="pages.solidaire.solidaireRichCultural">
                <h2 className="text-3xl font-bold mb-4">
                  A Rich Cultural Exchange
                </h2>
                <p className="text-muted-foreground">
                  In return for your support, villagers share their skills,
                  culture, and traditions with you. A genuine exchange where
                  everyone enriches each other through meaningful interactions.
                </p>
              </Trans>
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
              <Trans i18nKey="pages.solidaire.solidaireOurSocially">
                <h2 className="text-3xl font-bold mb-4">
                  Our Socially Responsible Travel Packages
                </h2>
                <p className="text-muted-foreground">
                  Explore our socially responsible travel packages that combine
                  comfort, discovery, and contributions to the local development
                  of villages along the Pangalanes Canal.
                </p>
              </Trans>
            </div>

            {dataSolidaire.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dataSolidaire.map((pack, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={`${urlMedia}${pack.images[0].image}`}
                        alt={pack.titre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {pack.duree} days
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{pack.destination}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{pack.titre}</h3>
                      <p className="text-muted-foreground mb-4">
                        {pack.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(pack.prix)}
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
                            <span>Details</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyData titre="Upcoming Socially Responsible Tour Coming Soon" />
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Trans i18nKey="pages.solidaire.solidaireWerely">
                <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                  "We rely on the solidarity of travelers with whom we share our
                  values, and in return, we must adopt communication and
                  management methods that meet our visitors' expectations.
                  Mindful and realistic, we remain true to our authenticity."
                </blockquote>
                <p className="mt-6 font-medium">
                  Meeting the challenge of responsible and self-sufficient
                  development requires supportive and sustainable tourists. Over
                  the past 10 years, our activities with international travelers
                  have enabled our small community of around twenty locals to
                  survive and invest in the equipment and resources needed to
                  build sustainably, safe from cyclones.
                </p>
              </Trans>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="solidaire.JPG"
                  alt="École dans un village du Canal des Pangalanes"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <Trans i18nKey="pages.solidaire.solidaireTheAssociation">
                  <h2 className="text-3xl font-bold mb-6">
                    The Association and Its Work
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The association "Sponsorship of Children along the
                    Pangalanes Canal," led by Mrs. RAZAFIHERISON Maminiaina,
                    collaborates with tourism providers and guides to offer an
                    authentic experience while supporting local development.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Thanks to the support of socially responsible travelers, we
                    have been able to promote children's education in the best
                    schools of the region, provide clean drinking water, and
                    supply seeds to the villages. We will continue working
                    towards a better future for the communities along the
                    Pangalanes Canal.
                  </p>
                  <Button onClick={handleClick} size="lg" className="mb-4">
                    Discover the Association's Goals
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Canal Évasion, which brings together guides, boatmen, and
                    village leaders, ensures sustainable development
                    opportunities, as they receive support from local
                    authorities and seek an international platform to advance
                    these projects.
                  </p>
                </Trans>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden bg-black/60">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <Trans i18nKey="pages.solidaire.solidaireReady">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Become a Socially Responsible Traveler?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                Contact us today to book your socially responsible journey along
                the Pangalanes Canal and contribute to the sustainable
                development of local communities.
              </p>
            </Trans>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammeSolidairePage;
