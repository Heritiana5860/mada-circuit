import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// Gestion des erreurs
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Si erreur 401, rediriger vers login
    if ("statusCode" in networkError && networkError.statusCode === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
  }
});

// Lien upload pour gérer les fichiers (remplace createHttpLink)
const uploadLink = createUploadLink({
  uri: "http://localhost:8000/graphql/",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

// Lien d'authentification pour ajouter le token aux headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // Ne pas définir Content-Type pour les uploads multipart
      // Apollo Upload Client s'en charge automatiquement
    },
  };
});

// Création du client Apollo
const client = new ApolloClient({
  link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
