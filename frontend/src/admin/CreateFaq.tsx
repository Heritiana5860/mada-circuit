import { CREATE_FAQ } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const CreateFaq = () => {
  const [question, setQuestion] = useState("");
  const [reponse, setReponse] = useState("");
  const [types, setTypes] = useState("");

  const [addFaq, { loading, error, data }] = useMutation(CREATE_FAQ);

  const isValidated = question.trim() && reponse.trim() && types !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question: question,
      reponse: reponse,
      faqType: types,
    };

    try {
      const result = await addFaq({
        variables: data,
      });

      setQuestion("");
      setReponse("");
      setTypes("");

      console.log("result: ", result);
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur!</div>;
  }

  return (
    <div className="w-[50%] mx-auto mt-20">
      <form onSubmit={handleSubmit} className="rounded bg-white shadow p-8">
        {/* Titre et description */}
        <div className=" mb-6">
          <h1 className="font-bold text-lg">FAQs</h1>
          <p className="text-gray-500">
            Création des questions & reponses frequants par les clients
          </p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Question du client..."
            required
          />
        </div>

        {/* Reponse */}
        <div className="mb-4">
          <label
            htmlFor="reponse"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reponse
          </label>
          <input
            type="text"
            id="reponse"
            value={reponse}
            onChange={(e) => setReponse(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Reponse au client..."
            required
          />
        </div>

        {/* Type */}
        <div className="mb-10">
          <label
            htmlFor="types"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Selectionnez un type
          </label>
          <select
            id="types"
            value={types}
            onChange={(e) => setTypes(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choisissez un type...</option>
            <option value="CIRCUIT">Circuit</option>
            <option value="SOLIDAIRE">Solidaire</option>
            <option value="SURMESURE">Sur Mesure</option>
            <option value="VEHICULE">Vehicule</option>
          </select>
        </div>

        <div className="text-center">
          <button
            disabled={!isValidated}
            className={`rounded px-12 py-3 ${
              isValidated
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFaq;
