"""
Resolvers personnalisés pour l'application de tourisme Madagascar
Contient la logique métier complexe pour les requêtes GraphQL
"""

from django.db.models import Q, Count, Avg, Sum
from django.utils import timezone
from datetime import datetime, timedelta
from .models import (
    Circuit, Reservation, Vehicule, Destination, 
    StatutReservation, EtatVehicule
)

class TourismResolvers:
    """
    Classe contenant les resolvers personnalisés pour l'application de tourisme
    """
    
    @staticmethod
    def get_popular_circuits(limit=5):
        """
        Retourne les circuits les plus populaires basés sur le nombre de réservations
        """
        return Circuit.objects.annotate(
            reservations_count=Count('reservations')
        ).order_by('-reservations_count')[:limit]
    
    @staticmethod
    def get_available_circuits_for_date(date):
        """
        Retourne les circuits disponibles pour une date donnée
        """
        # Circuits avec des véhicules disponibles pour la date
        available_circuits = Circuit.objects.filter(
            destination__vehicules__etat=EtatVehicule.DISPONIBLE
        ).exclude(
            reservations__date_depart__date=date,
            reservations__statut__in=[StatutReservation.EN_ATTENTE, StatutReservation.CONFIRMEE]
        ).distinct()
        
        return available_circuits
    
    @staticmethod
    def get_circuit_recommendations(user_preferences=None):
        """
        Recommande des circuits basés sur les préférences utilisateur
        """
        queryset = Circuit.objects.all()
        
        if user_preferences:
            # Filtrer par difficulté préférée
            if user_preferences.get('difficulte'):
                queryset = queryset.filter(difficulte=user_preferences['difficulte'])
            
            # Filtrer par budget
            if user_preferences.get('budget_max'):
                queryset = queryset.filter(prix__lte=user_preferences['budget_max'])
            
            # Filtrer par durée
            if user_preferences.get('duree_max'):
                queryset = queryset.filter(duree__lte=user_preferences['duree_max'])
            
            # Filtrer par région
            if user_preferences.get('region'):
                queryset = queryset.filter(destination__region__icontains=user_preferences['region'])
        
        # Ordonner par popularité
        return queryset.annotate(
            reservations_count=Count('reservations')
        ).order_by('-reservations_count')[:10]
    
    @staticmethod
    def get_vehicle_availability(start_date, end_date, capacity_needed=1):
        """
        Retourne les véhicules disponibles pour une période donnée
        """
        # Véhicules non réservés pendant la période
        unavailable_vehicles = Reservation.objects.filter(
            date_depart__date__range=[start_date, end_date],
            statut__in=[StatutReservation.EN_ATTENTE, StatutReservation.CONFIRMEE]
        ).values_list('vehicule_id', flat=True)
        
        available_vehicles = Vehicule.objects.filter(
            etat=EtatVehicule.DISPONIBLE,
            capacite__nombre_places__gte=capacity_needed
        ).exclude(id__in=unavailable_vehicles)
        
        return available_vehicles
    
    @staticmethod
    def calculate_trip_cost(circuit_id, vehicule_id, nombre_personnes, duree):
        """
        Calcule le coût total d'un voyage
        """
        try:
            circuit = Circuit.objects.get(id=circuit_id)
            vehicule = Vehicule.objects.get(id=vehicule_id)
            
            # Coût de base du circuit par personne
            cout_circuit = float(circuit.prix) * nombre_personnes
            
            # Coût du véhicule par jour
            cout_vehicule = float(vehicule.prix) * duree
            
            # Coût total
            cout_total = cout_circuit + cout_vehicule
            
            return {
                'cout_circuit': cout_circuit,
                'cout_vehicule': cout_vehicule,
                'cout_total': cout_total,
                'cout_par_personne': cout_total / nombre_personnes
            }
        except (Circuit.DoesNotExist, Vehicule.DoesNotExist):
            return None
    
    @staticmethod
    def get_seasonal_recommendations():
        """
        Retourne des recommandations basées sur la saison actuelle
        """
        today = timezone.now().date()
        
        # Circuits de la saison actuelle
        current_season_circuits = Circuit.objects.filter(
            saison__date_debut__lte=today,
            saison__date_fin__gte=today
        ).annotate(
            reservations_count=Count('reservations')
        ).order_by('-reservations_count')
        
        return current_season_circuits[:8]
    
    @staticmethod
    def get_destination_statistics():
        """
        Retourne des statistiques sur les destinations
        """
        destinations_stats = Destination.objects.annotate(
            circuits_count=Count('circuits'),
            total_reservations=Count('circuits__reservations'),
            avg_price=Avg('circuits__prix')
        ).order_by('-total_reservations')
        
        return destinations_stats
    
    @staticmethod
    def get_booking_trends(days=30):
        """
        Retourne les tendances de réservation des derniers jours
        """
        start_date = timezone.now() - timedelta(days=days)
        
        bookings = Reservation.objects.filter(
            date_reservation__gte=start_date
        ).extra(
            select={'day': 'date(date_reservation)'}
        ).values('day').annotate(
            count=Count('id')
        ).order_by('day')
        
        return bookings
    
    @staticmethod
    def search_circuits_advanced(search_params):
        """
        Recherche avancée de circuits avec plusieurs critères
        """
        queryset = Circuit.objects.all()
        
        # Recherche textuelle
        if search_params.get('search_term'):
            term = search_params['search_term']
            queryset = queryset.filter(
                Q(titre__icontains=term) |
                Q(description__icontains=term) |
                Q(destination__nom__icontains=term) |
                Q(destination__region__icontains=term)
            )
        
        # Filtres de prix
        if search_params.get('prix_min'):
            queryset = queryset.filter(prix__gte=search_params['prix_min'])
        if search_params.get('prix_max'):
            queryset = queryset.filter(prix__lte=search_params['prix_max'])
        
        # Filtre de durée
        if search_params.get('duree_min'):
            queryset = queryset.filter(duree__gte=search_params['duree_min'])
        if search_params.get('duree_max'):
            queryset = queryset.filter(duree__lte=search_params['duree_max'])
        
        # Filtre de difficulté
        if search_params.get('difficulte'):
            queryset = queryset.filter(difficulte=search_params['difficulte'])
        
        # Filtre de région
        if search_params.get('region'):
            queryset = queryset.filter(destination__region__icontains=search_params['region'])
        
        # Filtre de disponibilité
        if search_params.get('date_souhaitee'):
            date = search_params['date_souhaitee']
            # Exclure les circuits avec des réservations confirmées pour cette date
            queryset = queryset.exclude(
                reservations__date_depart__date=date,
                reservations__statut__in=[StatutReservation.EN_ATTENTE, StatutReservation.CONFIRMEE]
            )
        
        # Tri
        sort_by = search_params.get('sort_by', 'popularite')
        if sort_by == 'prix_asc':
            queryset = queryset.order_by('prix')
        elif sort_by == 'prix_desc':
            queryset = queryset.order_by('-prix')
        elif sort_by == 'duree_asc':
            queryset = queryset.order_by('duree')
        elif sort_by == 'duree_desc':
            queryset = queryset.order_by('-duree')
        elif sort_by == 'popularite':
            queryset = queryset.annotate(
                reservations_count=Count('reservations')
            ).order_by('-reservations_count')
        else:
            queryset = queryset.order_by('titre')
        
        return queryset.distinct()
    
    @staticmethod
    def get_user_booking_history(user_id):
        """
        Retourne l'historique des réservations d'un utilisateur
        """
        return Reservation.objects.filter(
            utilisateur_id=user_id
        ).select_related(
            'circuit', 'vehicule', 'circuit__destination'
        ).order_by('-date_reservation')
    
    @staticmethod
    def get_admin_dashboard_stats():
        """
        Retourne les statistiques pour le tableau de bord admin
        """
        today = timezone.now().date()
        this_month = today.replace(day=1)
        
        stats = {
            'total_circuits': Circuit.objects.count(),
            'total_reservations': Reservation.objects.count(),
            'reservations_this_month': Reservation.objects.filter(
                date_reservation__gte=this_month
            ).count(),
            'pending_reservations': Reservation.objects.filter(
                statut=StatutReservation.EN_ATTENTE
            ).count(),
            'confirmed_reservations': Reservation.objects.filter(
                statut=StatutReservation.CONFIRMEE
            ).count(),
            'available_vehicles': Vehicule.objects.filter(
                etat=EtatVehicule.DISPONIBLE
            ).count(),
            'total_revenue_this_month': Reservation.objects.filter(
                date_reservation__gte=this_month,
                statut=StatutReservation.CONFIRMEE
            ).aggregate(
                total=Sum('circuit__prix')
            )['total'] or 0
        }
        
        return stats
