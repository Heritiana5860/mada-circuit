import { GET_ALL_USERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { AllUserContext } from "./DataContext";

export const AllUserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  return (
    <AllUserContext.Provider
      value={{ data: data?.allUtilisateurs, loading, error }}
    >
      {children}
    </AllUserContext.Provider>
  );
};
