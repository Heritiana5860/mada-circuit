import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useMutation, gql } from '@apollo/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';

// Mutation GraphQL pour créer un message
const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $nom: String!
    $prenom: String!
    $telephone: String!
    $sujet: String!
    $contenu: String!
    $utilisateurId: ID
  ) {
    createMessage(
      nom: $nom
      prenom: $prenom
      telephone: $telephone
      sujet: $sujet
      contenu: $contenu
      utilisateurId: $utilisateurId
    ) {
      success
      message {
        id
        nom
        prenom
        sujet
      }
      errors
    }
  }
`;


const Contact = () => {
  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted: (data) => {
      if (data.createMessage.success) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
          variant: "default"
        });
        resetForm();
      } else {
        toast({
          title: "Erreur",
          description: data.createMessage.errors?.[0] || "Erreur lors de l'envoi du message",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('Erreur GraphQL:', error);
      toast({
        title: "Erreur",
        description: `Échec de l'envoi du message: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation côté client
    if (!formData.firstName || !formData.lastName || !formData.subject || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone) {
      toast({
        title: "Erreur",
        description: "Le numéro de téléphone est obligatoire",
        variant: "destructive",
      });
      return;
    }

    createMessage({
      variables: {
        nom: formData.lastName,
        prenom: formData.firstName,
        telephone: formData.phone,
        sujet: formData.subject,
        contenu: formData.message,
        utilisateurId: user?.id || null
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact | Madagascar Voyage';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
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
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à planifier votre voyage à Madagascar.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-card rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Votre prénom" 
                        required 
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Votre nom" 
                        required 
                        value={formData.lastName}
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
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      placeholder="+261 34 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input 
                      id="subject" 
                      placeholder="L'objet de votre message" 
                      required 
                      value={formData.subject}
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
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
              
              {/* Le reste du code reste inchangé */}
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
                          123 Avenue de l'Indépendance<br />
                          Antananarivo 101<br />
                          Madagascar
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
                        <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                        <p className="text-muted-foreground">
                          +261 34 123 4567<br />
                          +261 32 987 6543
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Horaires d'ouverture</h3>
                        <p className="text-muted-foreground">
                          Lundi - Vendredi: 8h30 - 17h30<br />
                          Samedi: 9h00 - 12h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg shadow-md p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-6">Besoin d'aide urgente ?</h2>
                  <p className="text-muted-foreground mb-6">
                    En cas d'urgence pendant votre séjour à Madagascar, nous sommes disponibles 24/7 via notre ligne d'assistance.
                  </p>
                  <Separator className="my-6" />
                  <div className="flex justify-center">
                    <a href="tel:+261345678910" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                      <Phone className="mr-2 h-5 w-5" />
                      +261 34 567 8910
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Foire Aux Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Retrouvez ci-dessous les réponses aux questions les plus fréquemment posées par nos clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Comment réserver un circuit ?</h3>
                <p className="text-muted-foreground">
                  Vous pouvez réserver un circuit directement via notre site web, par email ou par téléphone. Un acompte de 30% est généralement demandé pour confirmer la réservation.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Quelle est la meilleure période pour visiter Madagascar ?</h3>
                <p className="text-muted-foreground">
                  La meilleure période s'étend d'avril à novembre, pendant la saison sèche. La haute saison touristique se situe entre juillet et août.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Faut-il un visa pour visiter Madagascar ?</h3>
                <p className="text-muted-foreground">
                  Oui, un visa est nécessaire pour la plupart des nationalités. Il peut être obtenu à l'arrivée à l'aéroport ou auprès des ambassades malgaches.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Quelles vaccinations sont recommandées ?</h3>
                <p className="text-muted-foreground">
                  Il est recommandé d'être à jour dans ses vaccinations habituelles. La vaccination contre la fièvre jaune est exigée si vous venez d'un pays où elle est endémique.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Peut-on louer une voiture sans chauffeur ?</h3>
                <p className="text-muted-foreground">
                  Oui, mais nous recommandons fortement les locations avec chauffeur compte tenu de l'état des routes et des conditions de circulation particulières à Madagascar.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">Comment annuler ou modifier ma réservation ?</h3>
                <p className="text-muted-foreground">
                  Pour toute annulation ou modification, veuillez nous contacter par email ou téléphone au moins 30 jours avant la date prévue du voyage.
                </p>
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