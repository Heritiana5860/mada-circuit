"""
Système de permissions pour l'API GraphQL de l'application de tourisme
"""

from functools import wraps
from django.core.exceptions import PermissionDenied
from .models import Role

def login_required(func):
    """
    Décorateur pour vérifier que l'utilisateur est connecté
    """
    @wraps(func)
    def wrapper(self, info, *args, **kwargs):
        if not info.context.user or not info.context.user.is_authenticated:
            raise PermissionDenied("Vous devez être connecté pour effectuer cette action")
        return func(self, info, *args, **kwargs)
    return wrapper

def admin_required(func):
    """
    Décorateur pour vérifier que l'utilisateur est administrateur
    """
    @wraps(func)
    def wrapper(self, info, *args, **kwargs):
        if not info.context.user or not info.context.user.is_authenticated:
            raise PermissionDenied("Vous devez être connecté pour effectuer cette action")
        
        if info.context.user.role != Role.ADMIN:
            raise PermissionDenied("Vous devez être administrateur pour effectuer cette action")
        
        return func(self, info, *args, **kwargs)
    return wrapper

def staff_required(func):
    """
    Décorateur pour vérifier que l'utilisateur est membre du staff (admin, guide, commercial)
    """
    @wraps(func)
    def wrapper(self, info, *args, **kwargs):
        if not info.context.user or not info.context.user.is_authenticated:
            raise PermissionDenied("Vous devez être connecté pour effectuer cette action")
        
        allowed_roles = [Role.ADMIN, Role.GUIDE, Role.COMMERCIAL]
        if info.context.user.role not in allowed_roles:
            raise PermissionDenied("Vous n'avez pas les permissions nécessaires pour effectuer cette action")
        
        return func(self, info, *args, **kwargs)
    return wrapper

def owner_or_admin_required(func):
    """
    Décorateur pour vérifier que l'utilisateur est propriétaire de la ressource ou administrateur
    """
    @wraps(func)
    def wrapper(self, info, *args, **kwargs):
        if not info.context.user or not info.context.user.is_authenticated:
            raise PermissionDenied("Vous devez être connecté pour effectuer cette action")
        
        # Si c'est un admin, autoriser
        if info.context.user.role == Role.ADMIN:
            return func(self, info, *args, **kwargs)
        
        # Sinon, vérifier la propriété (doit être implémenté dans chaque mutation)
        user_id = kwargs.get('user_id') or kwargs.get('utilisateur_id')
        if user_id and str(info.context.user.id) != str(user_id):
            raise PermissionDenied("Vous ne pouvez modifier que vos propres données")
        
        return func(self, info, *args, **kwargs)
    return wrapper

class PermissionChecker:
    """
    Classe utilitaire pour vérifier les permissions
    """
    
    @staticmethod
    def can_view_reservation(user, reservation):
        """
        Vérifie si un utilisateur peut voir une réservation
        """
        if not user or not user.is_authenticated:
            return False
        
        # Admin peut tout voir
        if user.role == Role.ADMIN:
            return True
        
        # Guide et commercial peuvent voir toutes les réservations
        if user.role in [Role.GUIDE, Role.COMMERCIAL]:
            return True
        
        # Client ne peut voir que ses propres réservations
        if user.role == Role.CLIENT:
            return reservation.utilisateur == user
        
        return False
    
    @staticmethod
    def can_modify_reservation(user, reservation):
        """
        Vérifie si un utilisateur peut modifier une réservation
        """
        if not user or not user.is_authenticated:
            return False
        
        # Admin peut tout modifier
        if user.role == Role.ADMIN:
            return True
        
        # Commercial peut modifier les réservations
        if user.role == Role.COMMERCIAL:
            return True
        
        # Client ne peut modifier que ses propres réservations en attente
        if user.role == Role.CLIENT:
            return (reservation.utilisateur == user and 
                   reservation.statut == 'EN_ATTENTE')
        
        return False
    
    @staticmethod
    def can_manage_circuits(user):
        """
        Vérifie si un utilisateur peut gérer les circuits
        """
        if not user or not user.is_authenticated:
            return False
        
        return user.role in [Role.ADMIN, Role.COMMERCIAL]
    
    @staticmethod
    def can_manage_vehicles(user):
        """
        Vérifie si un utilisateur peut gérer les véhicules
        """
        if not user or not user.is_authenticated:
            return False
        
        return user.role == Role.ADMIN
    
    @staticmethod
    def can_view_admin_data(user):
        """
        Vérifie si un utilisateur peut voir les données administratives
        """
        if not user or not user.is_authenticated:
            return False
        
        return user.role in [Role.ADMIN, Role.COMMERCIAL]
    
    @staticmethod
    def can_manage_users(user):
        """
        Vérifie si un utilisateur peut gérer d'autres utilisateurs
        """
        if not user or not user.is_authenticated:
            return False
        
        return user.role == Role.ADMIN
    
    @staticmethod
    def can_manage_content(user):
        """
        Vérifie si un utilisateur peut gérer le contenu (blogs, FAQs)
        """
        if not user or not user.is_authenticated:
            return False
        
        return user.role in [Role.ADMIN, Role.COMMERCIAL]

def check_reservation_permission(func):
    """
    Décorateur spécifique pour vérifier les permissions sur les réservations
    """
    @wraps(func)
    def wrapper(self, info, *args, **kwargs):
        if not info.context.user or not info.context.user.is_authenticated:
            raise PermissionDenied("Vous devez être connecté pour effectuer cette action")
        
        # Pour les mutations de création, pas besoin de vérification spéciale
        if 'create' in func.__name__.lower():
            return func(self, info, *args, **kwargs)
        
        # Pour les modifications, vérifier la propriété
        reservation_id = kwargs.get('id')
        if reservation_id:
            from .models import Reservation
            try:
                reservation = Reservation.objects.get(pk=reservation_id)
                if not PermissionChecker.can_modify_reservation(info.context.user, reservation):
                    raise PermissionDenied("Vous n'avez pas les permissions pour modifier cette réservation")
            except Reservation.DoesNotExist:
                raise PermissionDenied("Réservation non trouvée")
        
        return func(self, info, *args, **kwargs)
    return wrapper

def rate_limit(max_requests=10, window_minutes=1):
    """
    Décorateur simple pour limiter le taux de requêtes
    """
    def decorator(func):
        @wraps(func)
        def wrapper(self, info, *args, **kwargs):
            # Implémentation basique - dans un vrai projet, utilisez Redis ou une solution plus robuste
            # Pour l'instant, on laisse passer toutes les requêtes
            return func(self, info, *args, **kwargs)
        return wrapper
    return decorator
