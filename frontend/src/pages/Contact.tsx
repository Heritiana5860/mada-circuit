import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Divide,
  Heading1,
} from "lucide-react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { CREATE_CONTACT_US } from "@/graphql/mutations";
import { GET_ALL_FAQS } from "@/graphql/queries";
import ContentLoading from "@/components/Loading";
import ContentError from "@/components/error";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { error } from "console";
import { FaqContext } from "@/provider/DataContext";

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

  // Query faq
  // const {
  //   loading: faqLoading,
  //   error: faqError,
  //   data: allFaq,
  // } = useQuery(GET_ALL_FAQS);

  const { allDataFaq, faqLoading, faqError } = useContext(FaqContext);

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

  if (faqLoading) {
    return <ContentLoading />;
  }
  if (faqError) {
    return <ContentError />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Contactez-nous */}
        <section className="relative h-[40vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Contactez-nous"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Contactez-nous
                </h1>
                <p className="text-xl text-white/90">
                  Notre équipe est à votre disposition pour répondre à toutes
                  vos questions et vous aider à planifier votre voyage à
                  Madagascar.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                <div className="glass-card p-8 rounded-lg mb-6">
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
                          0033601903524 | +33 7 83 39 91 41
                          <br />
                          +261 34 52 981 05 | +261 32 72 731 67
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

        {/* Foire Aux Questions */}
        {allDataFaq.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Foire Aux Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Retrouvez ci-dessous les réponses aux questions les plus
                fréquemment posées par nos clients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {allDataFaq.map((faq, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.reponse}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

{
  /* <div className="bg-card p-6 rounded-lg shadow-sm">
  <h3 className="font-bold text-lg mb-2">Comment réserver un circuit ?</h3>
  <p className="text-muted-foreground">
    Vous pouvez réserver un circuit directement via notre site web, par email ou
    par téléphone. Un acompte de 30% est généralement demandé pour confirmer la
    réservation.
  </p>
</div>; */
}
