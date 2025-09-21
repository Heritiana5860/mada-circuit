import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_CIRCUITS } from "@/graphql/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CardContentDetail from "./detail/CardContentDetail";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EmptyData from "./EmptyData";

const PopularCircuits = () => {
  // Requête GraphQL pour récupérer tous les circuits (on prendra les 3 premiers)
  const { data, loading, error } = useQuery(ALL_CIRCUITS);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useTranslation();

  const circuits = data?.allCircuits;

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t("pages.hero.popularTours", "Popular Tours")}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t("pages.hero.popularExplore", "Explore Our Top Tours")}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t(
              "pages.hero.popularCarefully",
              "Carefully crafted itineraries to help you discover Madagascar's unique biodiversity, rich culture, and breathtaking landscapes."
            )}
          </p>
        </div>
        <Link
          to="/circuits"
          className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <span>{t("pages.hero.popularSeeAll", "See All Tours")}</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">{t("common.loading", "Loading...")}</span>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Error loading tours. Please try again later.
          </AlertDescription>
        </Alert>
      ) : circuits.length === 0 ? (
        <EmptyData
          titre={t("pages.hero.popularNoTours", "Upcoming tours coming soon.")}
        />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {circuits.map((circuit, index) => (
            <CardContentDetail pack={circuit} lien="circuits" key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularCircuits;
