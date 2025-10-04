import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// Gestion des erreurs
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`[GraphQL error]: Message: ${message}`);
      if (message.includes("login_required")) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        window.location.href = "/login";
      }
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Lien upload pour gérer les fichiers (remplace createHttpLink)
const uploadLink = createUploadLink({
  // uri: "https://api.madagascar-voyagesolidaire.com/graphql/",
  uri: "http://localhost:8000/graphql/",
});

// Lien d'authentification pour ajouter le token aux headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
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
