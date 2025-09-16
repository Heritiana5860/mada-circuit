import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Charge les traductions depuis des fichiers
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Intègre avec React
  .init({
    // Langue par défaut
    fallbackLng: "fr",

    // Langues supportées
    supportedLngs: ["fr", "en"],

    // Configuration du détecteur de langue
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },

    // Configuration du backend
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Espaces de noms
    ns: ["translation"],
    defaultNS: "translation",

    // Options d'interpolation
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },

    // Mode debug (à désactiver en production)
    debug: process.env.NODE_ENV === "development",

    // Options React
    react: {
      useSuspense: true, // Utilise Suspense pour le chargement
    },
  });

export default i18n;
