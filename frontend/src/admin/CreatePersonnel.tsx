import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BriefcaseBusiness,
  Camera,
  Fingerprint,
  FlaskConical,
  Globe,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  User,
  X,
} from "lucide-react";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Field from "./composants/Field";
import { Separator } from "@radix-ui/react-separator";
import { useMutation } from "@apollo/client";
import { CREATE_PERSONNEL } from "@/graphql/mutations";

const CreatePersonnel = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [statut, setStatut] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [langue, setLangue] = useState("");
  const [biographie, setBiographie] = useState("");

  const [addPerson, { loading: loadingPerso, error: errorPerso, data }] =
    useMutation(CREATE_PERSONNEL);

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

  if (loadingPerso) {
    return <div>Loading...</div>;
  }

  if (errorPerso) {
    return <div>Erreur!</div>;
  }

  const validateForm = () => {
    const newErrors = [];

    if (
      !email ||
      !prenom ||
      !nom ||
      !tel ||
      !adresse ||
      !statut ||
      !specialite ||
      !langue ||
      !biographie
    ) {
      newErrors.push("Veuillez remplir tous les champs obligatoires");
    }

    if (!email.includes("@")) {
      newErrors.push("Veuillez entrer une adresse email valide");
    }

    if (tel && !/^[0-9+\-\s()]+$/.test(tel)) {
      newErrors.push("Veuillez entrer un numéro de téléphone valide");
    }

    return newErrors;
  };

  const emptyInput = () => {
    setNom("");
    setPrenom("");
    setTel("");
    setEmail("");
    setAdresse("");
    setSpecialite("");
    setLangue("");
    setBiographie("");
    setStatut("");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation côté client
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const personneData = {
      nom: nom,
      prenom: prenom,
      contact: tel,
      email: email,
      adresse: adresse,
      specialite: specialite,
      langues: langue,
      biographie: biographie,
      status: statut,
      photo: image,
    };

    try {
      await addPerson({
        variables: personneData,
      });

      emptyInput();
    } catch (err) {
      setErrors(["Une erreur est survenue. Veuillez réessayer."]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-[50%]">
        <Card>
          <CardHeader className="space-y-1 text-center border-b border-gray-200">
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
                      {imagePreview ? "Changer la photo" : "Choisir une photo"}
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-5">
              {/* Nom & Prenom */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field
                  label="Nom"
                  id="nom"
                  name="nom"
                  placeholder="Nom personnel"
                  type="text"
                  value={nom}
                  setValue={setNom}
                  icon={<User className="h-4 w-4" />}
                />

                <Field
                  label="Prénom"
                  id="prenom"
                  name="prenom"
                  placeholder="Prénom personnel"
                  type="text"
                  value={prenom}
                  setValue={setPrenom}
                  icon={<User className="h-4 w-4" />}
                />
              </div>

              {/* Email & Contact */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field
                  label="Adresse email"
                  id="email"
                  name="email"
                  placeholder="exemple@email.com"
                  type="email"
                  value={email}
                  setValue={setEmail}
                  icon={<Mail className="h-4 w-4" />}
                />

                <Field
                  label="Téléphone"
                  id="telephone"
                  name="telephone"
                  placeholder="+261 XX XX XXX XX"
                  type="tel"
                  value={tel}
                  setValue={setTel}
                  icon={<Phone className="h-4 w-4" />}
                />
              </div>

              {/* Adresse & Status */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field
                  label="Adresse"
                  id="adresse"
                  name="adresse"
                  placeholder="lot ..."
                  type="text"
                  value={adresse}
                  setValue={setAdresse}
                  icon={<MapPinHouse className="h-4 w-4" />}
                />

                <Field
                  label="Status"
                  id="status"
                  name="status"
                  placeholder="ex: Guide touristique"
                  type="text"
                  value={statut}
                  setValue={setStatut}
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                />
              </div>

              {/* Specialité & Langue */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field
                  label="Specialité"
                  id="specialite"
                  name="specialite"
                  placeholder="Agent de voyages; Agent d'escale; sns..."
                  type="text"
                  value={specialite}
                  setValue={setSpecialite}
                  icon={<FlaskConical className="h-4 w-4" />}
                />

                <Field
                  label="Langue(s)"
                  id="langue"
                  name="langue"
                  placeholder="Français; Anglais; ..."
                  type="text"
                  value={langue}
                  setValue={setLangue}
                  icon={<Globe className="h-4 w-4" />}
                />
              </div>

              {/* Biographie */}
              <Field
                label="Biographie"
                id="biographie"
                name="biographie"
                placeholder="Passionné par le voyage et l'histoire..."
                type="text"
                value={biographie}
                setValue={setBiographie}
                icon={<Fingerprint className="h-4 w-4" />}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-primary mt-4 hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Sauvegarde...</span>
                  </div>
                ) : (
                  "Sauvegarder"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreatePersonnel;
