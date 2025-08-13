import { useQuery } from "@apollo/client";
import { FaqContext } from "./DataContext";
import { GET_ALL_FAQS } from "@/graphql/queries";

export const FaqProvider = ({ children }) => {
  // Query faq
  const {
    loading: faqLoading,
    error: faqError,
    data: allFaq,
  } = useQuery(GET_ALL_FAQS);

  return (
    <FaqContext.Provider
      value={{
        allDataFaq: allFaq?.allFaqs || null,
        faqLoading,
        faqError,
      }}
    >
      {children}
    </FaqContext.Provider>
  );
};
