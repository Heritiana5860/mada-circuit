import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

/**
 * Hook personnalisé pour gérer la redirection automatique vers la page de connexion
 * quand une action nécessite une authentification
 */
export const useAuthRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Fonction pour vérifier si l'utilisateur est authentifié
   * et le rediriger vers la page de connexion si nécessaire
   * @param action - Description de l'action qui nécessite une authentification
   * @returns boolean - true si l'utilisateur est authentifié, false sinon
   */
  const requireAuth = (action: string = "cette action"): boolean => {
    if (loading) {
      return false; // En cours de chargement, on attend
    }

    if (!isAuthenticated) {
      toast({
        title: "Authentification requise",
        description: `Vous devez être connecté pour ${action}.`,
        variant: "destructive",
      });

      // Rediriger vers la page de connexion avec l'URL actuelle
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
      
      return false;
    }

    return true;
  };

  /**
   * Fonction pour vérifier l'authentification de manière silencieuse
   * (sans toast ni redirection)
   * @returns boolean - true si l'utilisateur est authentifié, false sinon
   */
  const isAuthenticatedSilent = (): boolean => {
    return !loading && isAuthenticated;
  };

  /**
   * Fonction pour rediriger vers la page de connexion avec un message personnalisé
   * @param message - Message à afficher à l'utilisateur
   */
  const redirectToLogin = (message?: string) => {
    if (message) {
      toast({
        title: "Authentification requise",
        description: message,
        variant: "destructive",
      });
    }

    navigate('/login', { 
      state: { from: location },
      replace: true 
    });
  };

  return {
    requireAuth,
    isAuthenticatedSilent,
    redirectToLogin,
    isAuthenticated,
    loading
  };
};

export default useAuthRedirect;
