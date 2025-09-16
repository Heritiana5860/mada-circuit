import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { CREATE_TESTIMONIA } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Testimonia = () => {
  const [formData, setFormData] = useState({
    score: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [tem, setTem] = useState("vide");
  const handleChange = (event) => {
    setTem(event.target.value);
  };

  const [creationTestimonia] =
    useMutation(CREATE_TESTIMONIA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataTestimonia = {
      utilisateurId: user.id,
      score: parseInt(formData.score),
      description: formData.description,
      type: tem,
    };

    // Simulate API call
    await creationTestimonia({
      variables: dataTestimonia,
    });
    setSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setSubmitted(false);
    setFormData({ score: "", description: "" });
    setTem("vide");
  };

  const isFormValid =
    formData.score && formData.description.trim() && tem !== "vide";

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Merci!
            </h2>
            <p className="text-gray-600">
              Votre témoignage a été enregistré avec succès.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Partagez votre expérience
            </h1>
            <p className="text-gray-600">
              Votre avis nous aide à améliorer nos services. Merci de prendre le
              temps de nous faire part de votre retour.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="score"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Note (sur 10)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="score"
                  name="score"
                  min="0"
                  max="5"
                  step="1"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Entrez une note de 0 à 5"
                  required
                />
                {formData.score && (
                  <div className="mt-2 flex items-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < parseInt(formData.score)
                              ? "bg-yellow-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm text-gray-600">
                      {formData.score}/5
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <div>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Décrivez votre expérience..."
                  required
                />
                <div className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/500 caractères
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="myDropdown"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Temoignage pour:
              </label>
              <select
                id="tem"
                name="tem"
                value={tem}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              >
                <option value="vide"></option>
                <option value="CIRCUIT">Circuit</option>
                <option value="VEHICULE">Vehicule</option>
                <option value="SURMESURE">Sur mesure</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium text-white transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? "bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enregistrement...
                  </div>
                ) : (
                  "Enregistrer"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonia;
