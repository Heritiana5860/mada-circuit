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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        <title>Contact Madagascar Voyage Solidaire | Request Your Quote</title>
        <meta
          name="description"
          content="Get in touch to plan your trip to Madagascar. Request a personalized quote for a tailor-made tour, excursion, or 4x4 rental."
        />
        <link
          rel="canonical"
          href="https://madagascar-voyagesolidaire.com/contact"
        />
      </Helmet>

      <NavBar />

      <main className="flex-grow">
        {/* Contactez-nous */}
        <div className="relative p-10 bg-[url('/i.webp')] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Contenu */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="text-white">
                  {t("pages.hero.contactUs", "Contact us")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
                We’re here to assist you with any questions and guide you in
                planning your journey to Madagascar.
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
                  {t("pages.contact.ReachOutToUs", "Reach out to us")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">
                        {t("pages.contact.lastName", "Last name")}
                      </Label>
                      <Input
                        id="nom"
                        placeholder={t(
                          "pages.contact.lnPlaceholder",
                          "Your last name"
                        )}
                        required
                        value={formData.nom}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom">
                        {t("pages.contact.firstName", "First name")}
                      </Label>
                      <Input
                        id="prenom"
                        placeholder={t(
                          "pages.contact.fnPlaceholder",
                          "Your first name"
                        )}
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
                      placeholder={t(
                        "pages.contact.emailPlaceholder",
                        "your.email@example.com"
                      )}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">
                      {t("pages.contact.phone", "Phone")} *
                    </Label>
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
                    <Label htmlFor="objet">
                      {t("pages.contact.subject", "Subject")}
                    </Label>
                    <Input
                      id="objet"
                      placeholder={t(
                        "pages.contact.subjectPlaceholder",
                        "Email subject"
                      )}
                      required
                      value={formData.objet}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder={t(
                        "pages.contact.messagePlaceholder",
                        "Let us know what you need..."
                      )}
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
                        {t("pages.contact.contactSending", "Sending...")}
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("pages.contact.contactSend", "Send")}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Nos coordonnées*/}
              <div className="flex flex-col">
                <div className="bg-card shadow-md p-8 rounded-lg mb-6">
                  <h2 className="text-2xl font-bold mb-6">
                    {t(
                      "pages.contact.contactOurContactInformation",
                      "Our contact information"
                    )}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {t("pages.contact.contactAddress", "Address")}
                        </h3>
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
                          {t("pages.contact.phone", "Phone")}
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
                          {t(
                            "pages.contact.contactOpeningHours",
                            "Opening Hours"
                          )}
                        </h3>
                        <p className="text-muted-foreground">
                          {t("pages.contact.contactMonday", "Monday – Friday")}:
                          8:30 AM – 5:30 PM
                          <br />
                          {t("pages.contact.contactSaturday", "Saturday")}: 9:00
                          AM – 12:00 PM
                          <br />
                          {t("pages.contact.contactSunday", "Sunday: Closed")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-md p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-6">
                    {t(
                      "pages.contact.contactNeed",
                      "Need immediate assistance?"
                    )}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t(
                      "pages.contact.contactIfyou",
                      "If you experience an emergency while in Madagascar, our team is here for you 24/7 through our helpline."
                    )}
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
