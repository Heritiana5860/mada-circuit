import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { CREATE_CONTACT_US } from "@/graphql/mutations";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    objet: "",
    message: "",
  });

  const { toast } = useToast();

  const [CreateContactUsMutation, { loading }] = useMutation(CREATE_CONTACT_US);

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      objet: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation côté client
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.objet ||
      !formData.message
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (!formData.contact) {
      toast({
        title: "Erreur",
        description: "Le numéro de téléphone est obligatoire",
        variant: "destructive",
      });
      return;
    }

    CreateContactUsMutation({
      variables: {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        contact: formData.contact,
        objet: formData.objet,
        message: formData.message,
      },
    });

    resetForm();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact | Madagascar Voyage";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>
          Contact Madagascar Voyage Solidaire | Demandez Votre Devis
        </title>
        <meta
          name="description"
          content="Contactez-nous pour organiser votre voyage à Madagascar. Demandez un devis personnalisé pour un circuit sur mesure, une excursion ou une location de 4x4."
        />
        <link
          rel="canonical"
          href="https://madagascar-voyagesolidaire.com/contact"
        />
      </Helmet>

      <NavBar />

      <main className="flex-grow">
        {/* Contactez-nous */}
        <div className="relative p-10 bg-[url('i.webp')] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Contenu */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="text-white">Contactez-nous</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                Notre équipe est à votre disposition pour répondre à toutes vos
                questions et vous aider à planifier votre voyage à Madagascar.
              </p>
            </div>
          </div>
        </div>

        {/* Envoyez-nous un message */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-card rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-nous un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        placeholder="Votre prénom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        placeholder="Votre Prénom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Téléphone *</Label>
                    <Input
                      type="number"
                      id="contact"
                      placeholder="+261 34 00 000 00"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objet">Sujet</Label>
                    <Input
                      id="objet"
                      placeholder="L'objet de votre message"
                      required
                      value={formData.objet}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Détaillez votre demande ici..."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Nos coordonnées*/}
              <div className="flex flex-col">
                <div className="bg-card shadow-md p-8 rounded-lg mb-6">
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                        <p className="text-muted-foreground">
                          Antananarivo Madagascar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          info@madagascar-voyage.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Téléphone
                        </h3>
                        <p className="text-muted-foreground">
                          +33 7 44 89 44 08
                          <br />
                          +261 34 52 981 05
                          <br />
                          +261 32 72 731 67
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Horaires d'ouverture
                        </h3>
                        <p className="text-muted-foreground">
                          Lundi - Vendredi: 8h30 - 17h30
                          <br />
                          Samedi: 9h00 - 12h00
                          <br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-md p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-6">
                    Besoin d'aide urgente ?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    En cas d'urgence pendant votre séjour à Madagascar, nous
                    sommes disponibles 24/7 via notre ligne d'assistance.
                  </p>
                  <Separator className="my-6" />
                  <div className="flex justify-center">
                    <a
                      href="tel:+261345678910"
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      +261 34 92 898 40
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
