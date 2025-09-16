import { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { School, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { FaqContext } from "@/provider/DataContext";
import { FaqCard } from "@/components/FaqCard";
import { useObjectifs } from "@/helper/ObjectifsAssociations";
import { useTranslation, Trans } from "react-i18next";

const ObjectifsAssociationPage = () => {
  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);
  const { t } = useTranslation();
  const objectifs = useObjectifs();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Objectifs de l'Association | Madagascar Voyage";
  }, []);

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
            src="solidaire2.webp"
            alt="Enfants malgaches à l'école"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <Trans i18nKey="pages.solidaire.solidaireObjectifs">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Objectifs de l'Association
                  </h1>
                  <p className="text-xl text-white/90 mb-8">
                    Parrainer un enfant est synonyme de lui ouvrir la porte à
                    une meilleure éducation
                  </p>
                </Trans>
                <Link to="/contact">
                  <Button size="lg" className="mr-4">
                    {t(
                      "pages.solidaire.solidaireParrainer",
                      "Parrainer un enfant"
                    )}
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
                <Trans i18nKey="pages.solidaire.solidaireNotreMission">
                  <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    À Madagascar, sur le canal des pangalanes entre
                    Tamatave-Mahanoro-Mananjary-Manakara, seulement 35% des
                    enfants sont scolarisés par leurs parents et uniquement 10%
                    peuvent continuer jusqu'aux classes secondaires en raison du
                    manque de moyens, de l'isolement et du manque de
                    subventions.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    De nombreux villages sont isolés à cause de l'ensablement du
                    canal et manquent d'accès routier, ce qui provoque la hausse
                    du prix des fournitures scolaires. Pire encore, les
                    instituteurs ne veulent plus enseigner dans ces conditions
                    et abandonnent l'école et les enfants, alors que nombre
                    d'entre eux ont envie de continuer leurs études et de
                    réaliser leurs rêves de devenir médecin, instituteur ou
                    ingénieur.
                  </p>
                </Trans>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">35%</span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidaireenfantsscolarisés",
                        "enfants scolarisés"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">10%</span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidairecontinuentausecondaire",
                        "continuent au secondaire"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-3xl font-bold text-primary">
                      100%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "pages.solidaire.solidaireespoir",
                        "d'espoir avec vous"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="mission.webp"
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
              <Trans i18nKey="pages.solidaire.solidaireAssociation">
                <h2 className="text-3xl font-bold mb-4">
                  Objectifs de l'Association
                </h2>
                <p className="text-muted-foreground">
                  Notre association œuvre pour offrir une éducation de qualité
                  aux enfants vivant le long du canal des pangalanes, tout en
                  respectant leur culture et leur environnement.
                </p>
              </Trans>
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

        {/* Citation Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Trans i18nKey="pages.solidaire.solidairepossible">
                <h3 className="text-2xl font-bold mb-6 italic">
                  "Le possible est déjà fait, pour le miracle il faut attendre
                  48h"
                </h3>
                <p className="text-lg text-muted-foreground">
                  Vous êtes le miracle qu'ils attendent depuis 48h, aidez-les
                  s'il vous plaît à continuer leurs études.
                </p>
              </Trans>
            </div>
          </div>
        </section>

        {/* Future Projects Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="site.webp"
                  alt="Projet futur"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Trans i18nKey="pages.solidaire.solidaireNosProjetsFuturs">
                  <h2 className="text-3xl font-bold mb-6">
                    Nos Projets Futurs
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Au cours d'une première phase, un site Web sera mis en ligne
                    pour devenir un portail d'information permettant de
                    rencontrer en temps réel les enfants, les villageois et
                    suivre leur progression.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Nous souhaitons également développer des programmes de
                    formation pour les enseignants locaux, améliorer les
                    infrastructures scolaires existantes et créer des
                    bibliothèques mobiles qui pourront naviguer le long du canal
                    pour atteindre les villages les plus isolés.
                  </p>
                </Trans>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{t("pages.hero.contactUs", "Contactez-nous")}</span>
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
              src="salut.webp"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <Trans i18nKey="pages.solidaire.solidaireParticipez">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Participez au changement aujourd'hui
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                Votre parrainage peut transformer la vie d'un enfant sur le
                canal des pangalanes. Contactez-nous dès maintenant pour
                découvrir comment vous pouvez faire la différence.
              </p>
            </Trans>
            <div>
              <Link to="/contact">
                <Button size="lg" variant="default">
                  {t(
                    "pages.solidaire.solidaireParrainer",
                    "Parrainer un enfant"
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* Foire Aux Questions */}
        {faqSolidaire.length > 0 && <FaqCard faq={faqSolidaire} />}
      </main>

      <Footer />
    </div>
  );
};

export default ObjectifsAssociationPage;
