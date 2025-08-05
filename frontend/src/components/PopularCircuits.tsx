import CircuitCard from "./CircuitCard";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CIRCUITS } from "@/graphql/queries";
import { Circuit } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PopularCircuits = () => {
  // Requête GraphQL pour récupérer tous les circuits (on prendra les 3 premiers)
  const { data, loading, error } = useQuery(GET_ALL_CIRCUITS, {
    variables: { type: "circuit" },
  });

  // Fonction pour convertir les données du backend vers le format attendu par CircuitCard
  const convertCircuitData = (circuit: Circuit) => ({
    id: circuit.id,
    title: circuit.titre,
    location: `${circuit.destination?.nom || "Destination inconnue"}, 
    ${circuit.destination?.region || "Région inconnue"}`,
    duration: `${circuit.duree} jours`,
    price: circuit.prix,
    saison: circuit.saison?.nom || "Saison non spécifiée",
    pointsInteret: circuit.pointsInteret || [],
    images: circuit.images,
    circuitData: circuit,
  });

  // Utiliser les données du backend (prendre les 4 derniers circuits)
  const circuits =
    data?.allCircuitsByType?.length > 0
      ? data.allCircuitsByType.slice(-4).reverse().map(convertCircuitData) 
      : [];

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Circuits Populaires
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Explorez nos meilleurs circuits
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Des itinéraires soigneusement conçus pour vous faire découvrir la
            biodiversité unique de Madagascar, sa culture riche et ses paysages
            à couper le souffle.
          </p>
        </div>
        <Link
          to="/circuits"
          className="mt-4 md:mt-0 flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <span>Voir tous les circuits</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des circuits...</span>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Erreur lors du chargement des circuits. Veuillez réessayer plus
            tard.
          </AlertDescription>
        </Alert>
      ) : circuits.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun circuit disponible pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {circuits.map((circuit, index) => (
            <CircuitCard
              key={circuit.id}
              {...circuit} // Remove the duplicate convertCircuitData call here
              className="animate-fade-in-up"
              style={
                { animationDelay: `${index * 0.1}s` } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularCircuits;
