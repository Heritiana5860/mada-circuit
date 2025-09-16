import { useTranslation, Trans } from "react-i18next";

export const SectionCitation = () => {
  return (
    <>
      <section className="py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Trans i18nKey="pages.pangalanes.pangalanesCitation">
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                "On peut trouver les avantages de la navigation fluviale sans
                stress, sans danger, sans pollution sur le canal des pangalanes,
                mais en plus, il y a une vraie aventure à vivre comme au début
                du 20ème siècle, il y a cent ans, à l'époque de Gallieni
                Gouverneur de Madagascar. Les étendues d'eau présentent une
                diversité remarquable, les immenses rivières et lacs bordant
                l'océan Indien sur 650 kilomètres. Les villages sont nichés sur
                les dunes côtières ou dans la forêt vierge, ils regorgent de
                poissons et de crustacés, de volaille et de zébus, de fruits et
                de légumes, de riz et d'épices. Les villes ont de petits hôtels
                confortables avec des bungalows en bord de mer et des
                restaurants traditionnels de qualité."
              </blockquote>
              <div className="mt-6">
                <p className="font-bold">
                  Récemment, Pangalanes voyage, des associations comme
                  Parrainage des enfants sur le canal des pangalanes dirigée par
                  Mme RAZAFIHERISON Maminiaina, des prestataires touristiques et
                  des guides, se sont organisés et regroupés pour offrir aux
                  clients du tourisme des produits qu'ils sont en mesure de
                  gérer au complet. Anciens pécheurs, francophones, anglophones
                  amoureux de leurs traditions et fiers de les faire connaître
                  leur famille, leur cuisine.
                </p>
              </div>
            </Trans>
          </div>
        </div>
      </section>
    </>
  );
};
