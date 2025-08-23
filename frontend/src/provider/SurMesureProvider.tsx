import { GET_ALL_SURMESURE } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { SurMesureContext } from "./DataContext";

export const SurMesureProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_ALL_SURMESURE);

  return (
    <SurMesureContext.Provider
      value={{
        data: data?.allSurMesure || null,
        loading,
        error,
      }}
    >
      {children}
    </SurMesureContext.Provider>
  );
};
