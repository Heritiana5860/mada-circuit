import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation, Trans } from "react-i18next";
import { MapPin, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CIRCUITS } from "@/graphql/queries";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";
import { SectionCitation } from "./pangalanes/SectionCitation";
import CardContentDetail from "@/components/detail/CardContentDetail";
import { Helmet } from "react-helmet-async";
import EmptyData from "@/components/EmptyData";
import { useActivities } from "@/helper/pangalanes/Activities";
import { useWhyChooseUs } from "@/helper/pangalanes/WhyChooseUs";
import { useTravelOptions } from "@/helper/pangalanes/TravelOptions";
import "./pangalanesCss.css";

const PangalanesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const activities = useActivities();
  const whyChooseUs = useWhyChooseUs();
  const travelOptions = useTravelOptions();

  const handleClick = () => {
    navigate("/programme-solidaire");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Canal des Pangalanes | Madagascar Voyage";
  }, []);

  const { data, loading, error } = useQuery(GET_ALL_CIRCUITS, {
    variables: {
      typeCircuit: "pangalane",
    },
  });

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return <ContentError />;
  }

  const dataPangalanes = data?.allCircuitsByType;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pangalanes Canal Madagascar | Tours & Discovery</title>
        <meta
          name="description"
          content="Experience the unique charm of the Pangalanes Canal: cruises, dugout canoe excursions, and immersion in wild nature and authentic villages."
        />
      </Helmet>

      <NavBar />

      <main className="flex-grow">
        <div className="relative p-10 custom-bg">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="max-w-6xl mx-auto">
            <div className=" relative text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="text-white">
                  {t(
                    "pages.pangalanes.pangalanesTitle",
                    "Discover the Pangalanes Canal"
                  )}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                {t(
                  "pages.pangalanes.pangalanesDescription",
                  "Embark on an unforgettable adventure: cruises, pirogue excursions, and immersion into the heart of wild nature and authentic local villages."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-2">
                <Button
                  onClick={() => {
                    document.getElementById("offres")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px]"
                >
                  {t("pages.pangalanes.offers", "Discover our offers")}
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    document
                      .getElementById("pangalanesVoyages")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px]"
                >
                  {t("pages.pangalanes.why", "Why choose Pangalanes Voyages?")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Trans i18nKey="pages.pangalanes.pangalanesAHistoricWaterway">
                  <h2 className="text-3xl font-bold mb-6">
                    A Historic waterway
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The Canal des Pangalanes, one of the longest man-made
                    waterways in the world, was built during the French colonial
                    era to facilitate the transport of goods along Madagascar’s
                    eastern coast.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Today, this nearly 700-kilometer-long canal has become a
                    major tourist attraction, offering visitors a deep immersion
                    into Malagasy nature and culture. It connects several lakes,
                    lagoons, and rivers between Farafangana in the south and
                    Toamasina (Tamatave) in the north.
                  </p>
                </Trans>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">700</span>
                    <span className="text-sm text-muted-foreground">
                      {t("pages.pangalanes.pangalaneskilometers", "kilometers")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      1896
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("pages.pangalanes.pangalanesyear", "year of creation")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      100+
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("pages.pangalanes.pangalanesbird", "bird species")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/navigale.webp"
                  alt="Canal des Pangalanes"
                  className="rounded-lg shadow-lg w-full h-auto"
                  loading="lazy"
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
              <Trans i18nKey="pages.pangalanes.pangalanesActivitiesontheCanal">
                <h2 className="text-3xl font-bold mb-4">
                  Activities on the Canal
                </h2>
                <p className="text-muted-foreground">
                  From serene boat rides to cultural encounters, the Pangalanes
                  Canal invites every traveler—whether a nature enthusiast or an
                  explorer—to experience Madagascar’s hidden gems.
                </p>
              </Trans>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
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
              <Trans i18nKey="pages.pangalanes.pangalanesPackages">
                <h2 className="text-3xl font-bold mb-4" id="offres">
                  Our Travel Packages
                </h2>
                <p className="text-muted-foreground">
                  Explore our curated travel packages crafted to offer you a
                  truly unforgettable journey along the Pangalanes Canal.
                </p>
              </Trans>
            </div>

            {dataPangalanes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dataPangalanes.map((pack, index) => (
                  <CardContentDetail
                    pack={pack}
                    lien="pangalanes"
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyData
                titre={t(
                  "pages.pangalanes.pangalanesUpcoming",
                  "Upcoming pangalanes tours Coming Soon"
                )}
              />
            )}
          </div>
        </section>

        {/* Nouvelle section: Pourquoi choisir Pangalanes Voyages */}
        <section className="py-16" id="pangalanesVoyages">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {t("pages.pangalanes.why", "Why Choose Pangalanes Voyages")}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "pages.pangalanes.whyDesc",
                  "Discover the true essence of Madagascar with travel options designed for every budget—crafted to deliver a truly unforgettable journey."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nouvelle section: Citation sur l'expérience */}
        <SectionCitation />

        {/* Nouvelle section: Nos Formules de Voyage */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Trans i18nKey="pages.pangalanes.pangalanesOurTravelPackages">
                <h2 className="text-3xl font-bold mb-4">Our Travel Packages</h2>
                <p className="text-muted-foreground">
                  Embark on a fully personalized journey, designed just for you
                  by experts who know Madagascar inside and out.
                </p>
              </Trans>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelOptions.map((option, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">{option.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground">
                      {option.description}
                    </p>
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
                <Trans i18nKey="pages.pangalanes.pangalanesSustainable">
                  <h2 className="text-3xl font-bold mb-6">
                    Sustainable and Community-Based Tourism
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    "You’re surrounded by nature, beside a lake with water at
                    22°C, and your only concern is comparing the position of the
                    stars in the sky. You’re in the southern hemisphere. In the
                    villages along the canal, tourism can help the locals who
                    welcome you, share their catch and fruits, gain access to
                    electricity in their homes—opening up to the world and
                    telling stories to their children."
                  </p>
                  <p className="text-muted-foreground mb-6">
                    "Develop sustainable tourism tailored to travelers’
                    desires—3 to 6-day cruises, community-based tourism, and
                    local potential. Encourage and support the transfer of
                    renewable energy technologies, and establish dynamic,
                    respectful international partnerships. Sponsor children by
                    giving them the opportunity to continue their education
                    through secondary school and even university."
                  </p>

                  <Button onClick={handleClick} size="lg">
                    Discover Our Solidarity Program
                  </Button>
                </Trans>
              </div>

              <div className="relative">
                <img
                  src="/canal.webp"
                  alt="Tourisme solidaire à Madagascar"
                  className="rounded-lg shadow-lg w-full h-auto"
                  loading="lazy"
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
              src="/navigale.webp"
              alt="Background"
              className="w-full h-full object-fill"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <Trans i18nKey="pages.pangalanes.pangalanesReadytoExplore">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Explore the Pangalanes Canal?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                Reach out now to reserve your journey along the Pangalanes Canal
                and dive into an unforgettable escape through Madagascar’s
                vibrant landscapes.
              </p>
            </Trans>
            <div>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                >
                  {t("pages.hero.contactUs", "Contact us")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PangalanesPage;
