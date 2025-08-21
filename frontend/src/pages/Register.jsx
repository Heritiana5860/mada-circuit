import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Camera,
  X,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirm, setConfirm] = useState("");
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Nettoyer l'URL de l'aperçu quand le composant se démonte
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(["L'image ne doit pas dépasser 5MB"]);
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setErrors(["Veuillez sélectionner une image valide"]);
        return;
      }

      // Nettoyer l'ancienne URL si elle existe
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Stocker le fichier et créer l'aperçu
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Effacer les erreurs
      if (errors.length > 0) {
        setErrors([]);
      }
    }
  };

  const handleImageRemove = () => {
    // Nettoyer l'URL de l'aperçu
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = [];

    if (!email || !mdp || !nom || !prenom) {
      newErrors.push("Veuillez remplir tous les champs obligatoires");
    }

    if (!email.includes("@")) {
      newErrors.push("Veuillez entrer une adresse email valide");
    }

    if (mdp.length < 6) {
      newErrors.push("Le mot de passe doit contenir au moins 6 caractères");
    }

    if (mdp !== confirm) {
      newErrors.push("Les mots de passe ne correspondent pas");
    }

    if (tel && !/^[0-9+\-\s()]+$/.test(tel)) {
      newErrors.push("Veuillez entrer un numéro de téléphone valide");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    // Validation côté client
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nom: nom,
        prenom: prenom,
        telephone: tel,
        email: email,
        password: mdp,
        image: image, // Le fichier sera envoyé
      };

      const result = await register(userData);

      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setErrors(result.errors || ["Erreur lors de la création du compte"]);
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setErrors(["Une erreur est survenue. Veuillez réessayer."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 py-8">
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

      <div className="relative z-10 w-full max-w-xl">
        <Card className="glass-card shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Rejoignez Madagascar Journey pour découvrir des aventures uniques
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errors.length > 0 && (
              <Alert className="border-destructive/50 text-destructive">
                <AlertDescription>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Section Photo de profil */}
              <div className="space-y-3">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative group">
                    {imagePreview ? (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        <div className="w-full h-full rounded-full border-4 border-primary/20 shadow-lg overflow-hidden bg-card relative">
                          <img
                            src={imagePreview}
                            alt="Aperçu"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleImageRemove}
                          className="absolute bottom-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 shadow-lg hover:bg-destructive/90 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/30 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                        <Camera className="h-8 w-8 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 transition-colors">
                      <Camera className="h-3 w-3 mr-1.5" />
                      <span className="ml-2">
                        {imagePreview
                          ? "Changer la photo"
                          : "Choisir une photo"}
                      </span>
                    </span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>

                  <p className="text-xs text-muted-foreground text-center px-2">
                    JPG, PNG, GIF (max. 5MB)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-medium">
                    Nom *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nom"
                      name="nom"
                      type="text"
                      placeholder="Nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-sm font-medium">
                    Prénom *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="prenom"
                      name="prenom"
                      type="text"
                      placeholder="Prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Adresse email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-sm font-medium">
                    Téléphone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="+261 XX XX XXX XX"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de passe *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 caractères"
                      value={mdp}
                      onChange={(e) => setMdp(e.target.value)}
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

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirmer le mot de passe *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary mt-4 hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Création du compte...</span>
                  </div>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Déjà un compte ?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-white hover:text-foreground transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
