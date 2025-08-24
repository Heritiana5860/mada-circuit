import { GET_ALL_BLOGS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { AllBlogContext } from "./DataContext";

export const AllBlogProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_ALL_BLOGS);

  return (
    <AllBlogContext.Provider
      value={{
        dataBlog: data?.allBlogs,
        loadingBlog: loading,
        errorBlog: error,
      }}
    >
      {" "}
      {children}
    </AllBlogContext.Provider>
  );
};
