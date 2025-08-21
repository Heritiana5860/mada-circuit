import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useMutation, gql } from "@apollo/client";

// Types
interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  profileImage: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone?: string;
  image: File;
}

// Mutations GraphQL
const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
      errors
      token
      utilisateur {
        id
        email
        nom
        prenom
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $nom: String!
    $prenom: String!
    $telephone: String
    $image: Upload!
  ) {
    registerUser(
      email: $email
      password: $password
      nom: $nom
      prenom: $prenom
      telephone: $telephone
      image: $image
    ) {
      success
      errors
      token
      utilisateur {
        id
        email
        nom
        prenom
        role
        image
      }
    }
  }
`;

// Contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);

  // Vérifier le token au chargement
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erreur lors du parsing des données utilisateur:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data.loginUser.success) {
        const { token: newToken, utilisateur } = data.loginUser;
        setToken(newToken);
        setUser(utilisateur);
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("authUser", JSON.stringify(utilisateur));
        return { success: true, user: utilisateur };
      } else {
        return {
          success: false,
          error: data.loginUser.errors?.[0] || "Erreur de connexion",
        };
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return {
        success: false,
        error: "Erreur de connexion au serveur",
      };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const { data } = await registerMutation({
        variables: userData,
      });

      console.log("Mutation response:", userData);

      if (data.registerUser.success) {
        const { token: newToken, utilisateur } = data.registerUser;
        setToken(newToken);
        setUser(utilisateur);
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("authUser", JSON.stringify(utilisateur));
        return { success: true };
      } else {
        return {
          success: false,
          error: data.registerUser.errors?.[0] || "Erreur d'inscription",
        };
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return {
        success: false,
        error: "Erreur de connexion au serveur",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
