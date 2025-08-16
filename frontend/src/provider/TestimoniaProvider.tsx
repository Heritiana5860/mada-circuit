import { GET_TESTIMONIA_BY_STATUS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { TestimoniaContext } from "./DataContext";

export const TestimoniaProvider = ({ children }) => {
  const {
    data,
    loading: testimoniaLoading,
    error: testimoniaError,
  } = useQuery(GET_TESTIMONIA_BY_STATUS, {
    variables: {
      status: true,
    },
  });

  const testimoniaData = data?.allTestimoniaByStatus;
  return (
    <TestimoniaContext.Provider
      value={{
        testimoniaData,
        testimoniaLoading,
        testimoniaError,
      }}
    >
      {children}
    </TestimoniaContext.Provider>
  );
};
