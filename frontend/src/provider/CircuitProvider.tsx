import { useQuery } from "@apollo/client";
import { CircuitContext } from "./DataContext";
import { ALL_CIRCUITS } from "@/graphql/queries";

const CircuitProvider = ({ children }) => {
  const { loading, error, data } = useQuery(ALL_CIRCUITS);

  return (
    <CircuitContext.Provider
      value={{ data: data?.allCircuits, loading, error }}
    >
      {children}
    </CircuitContext.Provider>
  );
};

export default CircuitProvider;
