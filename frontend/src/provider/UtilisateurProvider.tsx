import { GET_UTILISATEUR_BY_EMAIL } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { DataContext } from "./DataContext";
import { useAuth } from "@/contexts/AuthContext";

export const UtilisateurProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const { data, loading, error } = useQuery(GET_UTILISATEUR_BY_EMAIL, {
    variables: {
      email: user?.email,
    },
    skip: authLoading || !user?.email,
  });

  return (
    <DataContext.Provider
      value={{
        utilisateur: data?.utilisateurByEmail,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
