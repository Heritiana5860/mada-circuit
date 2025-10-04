import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Eye, EyeOff, Mail, Lock, MapPin } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  // CORRECTION : Ajouter 'user' à la destructuration
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getRedirectPath = (userRole, fallbackPath = "/") => {
    switch (userRole) {
      case "ADMIN":
        return "/admin";
      case "CLIENT":
        return "/";
      default:
        console.warn(`Unknown role: ${userRole}, using fallback`);
        return fallbackPath;
    }
  };

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRedirectPath(user.role, "/");

      console.log("redirectPath: ", redirectPath);

      const finalPath =
        user.role === "CLIENT" && location.state?.from?.pathname
          ? location.state.from.pathname
          : redirectPath;

      navigate(finalPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer les erreurs quand l'utilisateur tape
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation des champs
    if (!formData.email?.trim() || !formData.password?.trim()) {
      setError("Please complete all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email.trim(), formData.password);

      if (result.success && result.user) {
      } else {
        setError(result.error || "Erreur de connexion");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err instanceof Error) {
        setError(`Erreur de connexion: ${err.message}`);
      } else {
        setError("Erreur de connexion au serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  // Afficher les erreurs de connexion
  const displayError = error || (errors.length > 0 ? errors.join(", ") : "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url('/canal_bac.jpg')",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="glass-card shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Login
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Log in to your Madagascar Journey account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* CORRECTION : Utiliser displayError pour l'affichage */}
            {displayError && (
              <Alert className="border-destructive/50 text-destructive">
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  First time on Madagascar Voyage Solidaire?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
