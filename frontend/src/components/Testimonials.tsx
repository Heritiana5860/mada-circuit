
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michel Dubois",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Mars 2023",
      rating: 5,
      text: "Un voyage extraordinaire ! Le circuit dans le Nord de Madagascar était parfaitement organisé. Notre guide était compétent et attentionné. Je recommande vivement Madagascar Voyage.",
    },
    {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Janvier 2023",
      rating: 5,
      text: "Nous avons loué un 4x4 pour explorer l'île à notre rythme. Le véhicule était en parfait état et le service client exceptionnel. Une expérience inoubliable !",
    },
    {
      name: "Roberto Guzman",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      date: "Décembre 2022",
      rating: 4,
      text: "Notre croisière sur le Canal des Pangalanes restera gravée dans nos mémoires. Des paysages à couper le souffle et des rencontres authentiques avec les habitants locaux.",
    },
  ];

  return (
    <section className="bg-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-medium text-primary">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground">
            Découvrez les expériences de nos clients qui ont exploré Madagascar avec nos services 
            et ont vécu des aventures inoubliables.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
