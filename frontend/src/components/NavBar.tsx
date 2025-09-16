import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  MapPin,
  User,
  LogOut,
  MailCheck,
  BookOpenText,
  Globe,
  Check,
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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", label: t("nav.home", "Home") },
    { to: "/circuits", label: t("nav.tours", "Tours") },
    {
      to: "/voyages-sur-mesure",
      label: t("nav.tailorMade", "Tailor-made tour"),
    },
    { to: "/location-4x4", label: t("nav.rentals", "4x4 Rentals") },
    { to: "/pangalanes", label: t("nav.pangalanes", "Pangalanes Canal") },
    {
      to: "/programme-solidaire",
      label: t("nav.sociallyResponsible", "Socially Responsible"),
    },
    { to: "/blog", label: t("nav.blog", "Blog") },
    { to: "/contact", label: t("nav.contact", "Contact") },
  ];

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
    // Fermer le menu mobile si ouvert
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-xl border-b border-border/10",
        scrolled
          ? "bg-white/90 dark:bg-card/90 shadow-md"
          : "bg-white/60 dark:bg-card/60"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14" : "h-16"
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="Madagascar Solidarity Travel - Home"
          >
            <MapPin
              className={cn(
                "text-primary transition-transform duration-300 group-hover:scale-110",
                scrolled ? "h-4 w-4" : "h-5 w-5"
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-bold text-foreground transition-all duration-300",
                scrolled ? "text-md" : "text-lg"
              )}
            >
              Madagascar Voyage Solidaire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={
                  location.pathname === item.to ? "page" : undefined
                }
                className={cn(
                  "relative text-sm font-medium text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 transition-colors duration-200",
                  "after:absolute after:w-0 after:h-[2px] after:bg-primary after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full",
                  location.pathname === item.to &&
                    "text-primary font-semibold after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-muted focus:ring-2 focus:ring-primary"
                    aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm font-medium">
                      {currentLanguage.flag}{" "}
                      {currentLanguage.code.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        i18n.language === language.code && "bg-muted"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                      </div>
                      {i18n.language === language.code && (
                        <Check
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 hover:bg-muted focus:ring-2 focus:ring-primary"
                      aria-label={`User menu for ${user?.prenom || "User"}`}
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span className="max-w-24 truncate">
                        {user?.prenom || "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span>{t("nav.profile", "Profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/reservations"
                        className="flex items-center cursor-pointer"
                      >
                        <BookOpenText
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span>{t("nav.bookings", "My Bookings")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/testimonia"
                        className="flex items-center cursor-pointer"
                      >
                        <MailCheck
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span>{t("nav.testimonial", "Testimonial")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>{t("nav.logout", "Logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">{t("nav.login", "Login")}</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90"
                    asChild
                  >
                    <Link to="/register">{t("nav.signUp", "Sign Up")}</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="p-2 hover:bg-muted focus:ring-2 focus:ring-primary"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-border/20",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-card/95 backdrop-blur-sm">
          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-muted",
                  location.pathname === item.to &&
                    "bg-muted text-primary font-semibold"
                )}
                aria-current={
                  location.pathname === item.to ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-border/20 pt-3 mt-3 space-y-3">
            {/* Language Selector */}
            <div>
              <div className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t("nav.language", "Language")}
              </div>
              <div className="flex space-x-2 px-3">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant={
                      i18n.language === language.code ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => changeLanguage(language.code)}
                    className="flex items-center space-x-1 text-xs"
                  >
                    <span>{language.flag}</span>
                    <span>{language.code.toUpperCase()}</span>
                    {i18n.language === language.code && (
                      <Check className="h-3 w-3 ml-1" aria-hidden="true" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div>
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t("nav.loggedInAs", "Logged in as")} {user?.prenom}
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("nav.profile", "Profile")}
                  </Link>
                  <Link
                    to="/reservations"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <BookOpenText className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("nav.bookings", "My Bookings")}
                  </Link>
                  <Link
                    to="/testimonia"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <MailCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("nav.testimonial", "Testimonial")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("nav.logout", "Logout")}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      {t("nav.login", "Login")}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full justify-start bg-primary text-white hover:bg-primary/90"
                    asChild
                  >
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      {t("nav.signUp", "Sign Up")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
