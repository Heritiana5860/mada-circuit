import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import TestimonialCard from "./testimonia/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const TestimoniaCarousel = ({
  datas,
  utilisateurImage,
  setCurrentIndex,
  groupedTestimonials,
  testimonialsPerSlide,
  currentIndex,
}) => {
  return (
    <div>
      {datas?.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                What our travelers say
              </h2>
              <p className="text-muted-foreground">
                Discover the experiences of those who have already enjoyed our
                personalized travel services.
              </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Carousel de témoignages */}
              {datas.length > 0 ? (
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
                  {datas.length > testimonialsPerSlide && (
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
                    No testimonials available
                  </h3>
                  <p className="text-gray-500">
                    Customer testimonials will appear here soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
