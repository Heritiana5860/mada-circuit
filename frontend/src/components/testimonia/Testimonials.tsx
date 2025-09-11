import { useQuery } from "@apollo/client";
import TestimonialCard from "./TestimonialCard";
import { GET_TESTIMONIA_BY_STATUS } from "@/graphql/queries";
import { useContext, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { DataContext } from "@/provider/DataContext";
import { urlMedia } from "@/helper/UrlImage";

const Testimonials = () => {
  const { data, loading, error } = useQuery(GET_TESTIMONIA_BY_STATUS, {
    variables: {
      status: true,
    },
  });

  const {
    loading: utilisateurLoading,
    error: utilisateurError,
    utilisateur,
  } = useContext(DataContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading || utilisateurLoading) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">
              Chargement des témoignages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || utilisateurError) {
    return (
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Erreur lors du chargement
              </h3>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const allData = data?.allTestimoniaByStatus || [];
  const utilisateurImage = utilisateur?.image
    ? `${urlMedia}${utilisateur.image}`
    : null;

  // Grouper les témoignages par lots de 3 pour chaque diapositive
  const testimonialsPerSlide = 3;
  const groupedTestimonials = [];
  for (let i = 0; i < allData.length; i += testimonialsPerSlide) {
    groupedTestimonials.push(allData.slice(i, i + testimonialsPerSlide));
  }

  return (
    <>
      {allData.length > 0 && (
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20 overflow-hidden">
          {/* Éléments décoratifs en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête amélioré */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full mb-8 shadow-sm">
                <Quote className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Témoignages Clients
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text">
                Ce que nos clients disent
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Découvrez les expériences authentiques de nos clients qui ont
                exploré Madagascar avec nos services et ont vécu des aventures
                inoubliables.
              </p>
            </div>

            {/* Carousel de témoignages */}
            {allData.length > 0 ? (
              <Carousel
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={(api) => {
                  api?.on("select", () => {
                    setCurrentIndex(api.selectedScrollSnap());
                  });
                }}
              >
                <CarouselContent>
                  {groupedTestimonials.map((group, index) => (
                    <CarouselItem key={index}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {group.map((testimonial, i) => (
                          <div
                            key={i}
                            className="transform hover:scale-105 transition-all duration-300"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                            }}
                          >
                            <TestimonialCard
                              allData={testimonial}
                              image={utilisateurImage}
                            />
                          </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation */}
                {allData.length > testimonialsPerSlide && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <CarouselPrevious
                      className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                      aria-label="Témoignage précédent"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </CarouselPrevious>

                    <div className="flex gap-2">
                      {groupedTestimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i === currentIndex
                              ? "bg-primary scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Page ${i + 1}`}
                        />
                      ))}
                    </div>

                    <CarouselNext
                      className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white group"
                      aria-label="Témoignage suivant"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </CarouselNext>
                  </div>
                )}
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucun témoignage disponible
                </h3>
                <p className="text-gray-500">
                  Les témoignages de nos clients apparaîtront ici prochainement.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
