import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRole,
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Cas 1: Route qui ne nécessite PAS d'authentification (login, register)
  if (requireAuth === false) {
    if (isAuthenticated) {
      // Utilisateur déjà connecté, rediriger selon son rôle
      if (user?.role === "ADMIN") {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
    // Utilisateur non connecté, afficher la page (login/register)
    return <>{children}</>;
  }

  // Cas 2: Route qui nécessite une authentification
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Cas 3: Route qui nécessite un rôle spécifique
  if (requireRole && user?.role !== requireRole) {
    console.warn(
      `Accès refusé. Rôle requis: ${requireRole}, Rôle utilisateur: ${user?.role}`
    );

    // Rediriger selon le rôle de l'utilisateur
    if (user?.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === "CLIENT") {
      return <Navigate to="/" replace />;
    } else {
      // Rôle non reconnu, rediriger vers login
      return <Navigate to="/login" replace />;
    }
  }

  // Cas 4: Utilisateur authentifié avec les bonnes permissions
  return <>{children}</>;
};

export default ProtectedRoute;
