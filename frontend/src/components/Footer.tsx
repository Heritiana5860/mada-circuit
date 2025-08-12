
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Madagascar Voyage</h3>
            <p className="text-muted-foreground mb-4">
              Découvrez les merveilles de Madagascar avec nos circuits sur mesure et nos services de location de véhicules 4x4.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/circuits" className="text-muted-foreground hover:text-primary transition-colors">Circuits</Link></li>
              <li><Link to="/voyages-sur-mesure" className="text-muted-foreground hover:text-primary transition-colors">Sur Mesure</Link></li>
              <li><Link to="/location-4x4" className="text-muted-foreground hover:text-primary transition-colors">Location 4x4</Link></li>
              <li><Link to="/pangalanes" className="text-muted-foreground hover:text-primary transition-colors">Canal des Pangalanes</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">À Propos</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground">Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">0033601903524 | +33 7 83 39 91 41 </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">+261 34 52 981 05 | +261 32 72 731 67 </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">info@madagascar-voyagesolidaire.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Madagascar Voyage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
