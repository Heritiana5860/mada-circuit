import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Madagascar Voyage Solidaire
            </h3>
            <p className="text-muted-foreground mb-4">
              Discover the wonders of Madagascar with our tailor-made tours and
              4x4 vehicle rental services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.home", "Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/circuits"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.tours", "Tours")}
                </Link>
              </li>
              <li>
                <Link
                  to="/voyages-sur-mesure"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.tailorMade", "Tailor-made tour")}
                </Link>
              </li>
              <li>
                <Link
                  to="/location-4x4"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.rentals", "4x4 Rental")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pangalanes"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.pangalanes", "Pangalanes Canal")}
                </Link>
              </li>
              <li>
                <Link
                  to="/programme-solidaire"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.sociallyResponsible", "Socially Responsible")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.blog", "Blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.contact", "Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Antananarivo, Madagascar
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">
                  +33 7 44 89 44 08{" "}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">
                  +261 34 52 981 05 | +261 32 72 731 67{" "}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">
                  info@madagascar-voyagesolidaire.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Madagascar Voyage Solidaire.{" "}
            {t("nav.droit", "All rights reserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
