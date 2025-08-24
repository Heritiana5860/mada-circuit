import { GET_ALL_PERSONNELS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { AllPersonnelContext } from "./DataContext";

export const AllPersonnelProvider = ({ children }) => {
  const {
    loading: peronnelLoading,
    error: personnelError,
    data,
  } = useQuery(GET_ALL_PERSONNELS);

  return (
    <AllPersonnelContext.Provider
      value={{
        personnelData: data?.allPersonnels,
        peronnelLoading,
        personnelError,
      }}
    >
      {children}
    </AllPersonnelContext.Provider>
  );
};
