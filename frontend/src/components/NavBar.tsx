import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  Sun,
  Moon,
  User,
  LogOut,
  MailCheck,
  BookOpenText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/circuits", label: "Circuits" },
    { to: "/voyages-sur-mesure", label: "Sur Mesure" },
    { to: "/location-4x4", label: "Location 4x4" },
    { to: "/pangalanes", label: "Canal des Pangalanes" },
    { to: "/programme-solidaire", label: "Solidaire" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-xl border-b border-border/10",
        scrolled
          ? "bg-white/90 dark:bg-card/90 shadow-md"
          : "bg-white/60 dark:bg-card/60"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14" : "h-16"
          )}
        >
          <Link to="/" className="flex items-center space-x-2 group">
            <MapPin
              className={cn(
                "text-primary transition-transform duration-300 group-hover:scale-110",
                scrolled ? "h-7 w-7" : "h-8 w-8"
              )}
            />
            <span
              className={cn(
                "font-bold text-foreground transition-all duration-300",
                scrolled ? "text-lg" : "text-xl"
              )}
            >
              Madagascar Voyage
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={
                  location.pathname === item.to ? "page" : undefined
                }
                className={cn(
                  "relative text-sm font-medium text-muted-foreground hover:text-primary after:absolute after:w-0 after:h-[2px] after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full",
                  location.pathname === item.to && "text-primary font-semibold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.prenom}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/reservations" className="flex items-center">
                        <BookOpenText className="mr-2 h-4 w-4" />
                        <span>Mes réservations</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/testimonia" className="flex items-center">
                        <MailCheck className="mr-2 h-4 w-4" />
                        <span>Temoignage</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Connexion</Link>
                  </Button>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    asChild
                  >
                    <Link to="/register">Inscription</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-muted active:scale-95 transition-transform"
              >
                <span className="sr-only">Toggle menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-border",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-card">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t pt-3 mt-3">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Connecté en tant que {user?.prenom}
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                >
                  Profil
                </Link>
                <Link
                  to="/reservations"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                >
                  Mes réservations
                </Link>
                <Link
                  to="/temoignage"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                >
                  Temoignage
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-muted"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
