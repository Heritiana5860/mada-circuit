import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const PangalanesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {t("pages.hero.pangalanesCanale", "Pangalanes Canal")}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t(
                "pages.hero.pangalanesDiscover",
                "Discover This Natural Wonder"
              )}
            </h2>
            <Trans i18nKey="pages.hero.pangalanesDiscoverDescription">
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                The Pangalanes Canal, nearly 700 kilometers long, is one of
                Madagascar's greatest engineering achievements. It connects
                Farafangana to Toamasina along the east coast, providing a
                navigable route through lagoons, lakes, and estuaries.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Cruise through lush landscapes, observe unique wildlife and
                plants, and discover the traditional villages that line this
                historic canal.
              </p>
            </Trans>
            <Link
              to="/pangalanes"
              className="btn-primary inline-flex mt-4 text-lg"
            >
              <span>
                {t("pages.hero.pangalanesTheCanal", "Explore the Canal")}
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform lg:translate-x-6 animate-fade-in">
              <img
                src="/pangalanes1.webp"
                alt="Canal des Pangalanes"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl max-w-xs hidden lg:block animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Trans i18nKey="pages.hero.pangalanes700Km">
                <p className="text-xl font-semibold mb-2">
                  700 km of Navigation
                </p>
                <p className="text-muted-foreground text-lg">
                  A unique experience through lagoons and traditional villages.
                </p>
              </Trans>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PangalanesSection;
