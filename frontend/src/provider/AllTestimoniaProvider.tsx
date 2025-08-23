import { useQuery } from "@apollo/client";
import { AllTestimoniaContext } from "./DataContext";
import { ALL_TESTIMONIA } from "@/graphql/queries";

export const AllTestimoniaProvider = ({ children }) => {
  const { loading, error, data } = useQuery(ALL_TESTIMONIA);

  return (
    <AllTestimoniaContext.Provider
      value={{
        data: data?.allTestimonia,
        loading,
        error,
      }}
    >
      {children}
    </AllTestimoniaContext.Provider>
  );
};
