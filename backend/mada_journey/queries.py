import graphene
from django.db.models import Q
from django.utils import timezone
from graphql_relay import from_global_id
import logging
import base64
from django.core.exceptions import ValidationError

from .models import (
    Utilisateur, Destination, Saison, Circuit, PointInteret,
    TypeVehicule, Capacite, Vehicule, Reservation, Personnel, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, DestinationImage, BlogImage,
    EtatVehicule, Itineraire, Testimonia
)
from .model_types import (
    UtilisateurType, DestinationType, SaisonType, CircuitType,
    PointInteretType, TypeVehiculeType, CapaciteType, VehiculeType,
    ReservationType, PersonnelType, BlogType,
    BlogCommentaireType, FaqType,
    CircuitImageType, VehiculeImageType, DestinationImageType, BlogImageType, ItineraireType, TestimoniaType
)

logger = logging.getLogger("myapp") 
logger.setLevel(logging.INFO)

class Query(graphene.ObjectType):
    # Queries pour les utilisateurs
    all_utilisateurs = graphene.List(UtilisateurType)
    utilisateur = graphene.Field(UtilisateurType, id=graphene.ID())
    utilisateur_by_email = graphene.Field(UtilisateurType, email=graphene.String())
    
    # Queries pour les destinations
    all_destinations = graphene.List(DestinationType)
    destination = graphene.Field(DestinationType, id=graphene.ID())
    destinations_by_region = graphene.List(DestinationType, region=graphene.String())
    popular_destinations = graphene.List(DestinationType, limit=graphene.Int())
    
    # Queries pour les saisons
    all_saisons = graphene.List(SaisonType)
    saison = graphene.Field(SaisonType, id=graphene.ID())
    current_saison = graphene.Field(SaisonType)
    saisons_by_period = graphene.List(SaisonType, start_date=graphene.Date(), end_date=graphene.Date())
    
    # Queries pour les circuits
    all_circuits = graphene.List(CircuitType)
    all_circuits_by_type = graphene.List(
        CircuitType, 
        type=graphene.String(required=True)
    )
    circuit = graphene.Field(CircuitType, id=graphene.ID())
    circuits_by_destination = graphene.List(CircuitType, destination_id=graphene.ID())
    circuits_by_saison = graphene.List(CircuitType, saison_id=graphene.ID())
    circuits_by_difficulte = graphene.List(CircuitType, difficulte=graphene.String())
    circuits_by_price_range = graphene.List(CircuitType, min_price=graphene.Float(), max_price=graphene.Float())
    available_circuits = graphene.List(CircuitType)
    featured_circuits = graphene.List(CircuitType, limit=graphene.Int())
    search_circuits = graphene.List(CircuitType, search_term=graphene.String())
    
    # itineraire
    itineraire = graphene.Field(ItineraireType)
    
    # Queries pour les points d'intérêt
    all_points_interet = graphene.List(PointInteretType)
    point_interet = graphene.Field(PointInteretType, id=graphene.ID())
    points_interet_by_circuit = graphene.List(PointInteretType, circuit_id=graphene.ID())
    
    # Queries pour les types de véhicules
    all_types_vehicule = graphene.List(TypeVehiculeType)
    type_vehicule = graphene.Field(TypeVehiculeType, id=graphene.ID())
    
    # Queries pour les capacités
    all_capacites = graphene.List(CapaciteType)
    capacite = graphene.Field(CapaciteType, id=graphene.ID())
    capacites_by_places = graphene.List(CapaciteType, min_places=graphene.Int(), max_places=graphene.Int())
    
    # Queries pour les véhicules
    all_vehicules = graphene.List(VehiculeType)
    vehicule = graphene.Field(VehiculeType, id=graphene.ID())
    vehicules_disponibles = graphene.List(VehiculeType)
    vehicules_by_type = graphene.List(VehiculeType, type_id=graphene.ID())
    vehicules_by_capacite = graphene.List(VehiculeType, capacite_id=graphene.ID())
    vehicules_by_price_range = graphene.List(VehiculeType, min_price=graphene.Float(), max_price=graphene.Float())

    # Queries pour les réservations
    all_reservations = graphene.List(ReservationType)
    reservation = graphene.Field(ReservationType, id=graphene.ID())
    reservations_by_user = graphene.List(ReservationType, user_id=graphene.ID())
    reservations_by_circuit = graphene.List(ReservationType, circuit_id=graphene.ID())
    reservations_by_statut = graphene.List(ReservationType, statut=graphene.String())
    reservations_by_date_range = graphene.List(ReservationType, start_date=graphene.DateTime(), end_date=graphene.DateTime())
    pending_reservations = graphene.List(ReservationType)
    confirmed_reservations = graphene.List(ReservationType)
    
    # Queries pour les guides
    all_personnels = graphene.List(PersonnelType)
    
    # Queries pour les blogs
    all_blogs = graphene.List(BlogType)
    blog = graphene.Field(BlogType, id=graphene.ID())
    blogs_by_author = graphene.List(BlogType, auteur=graphene.String())
    blogs_by_tag = graphene.List(BlogType, tag=graphene.String())
    recent_blogs = graphene.List(BlogType, limit=graphene.Int())
    search_blogs = graphene.List(BlogType, search_term=graphene.String())
    
    # Queries pour les commentaires de blog
    all_blog_commentaires = graphene.List(BlogCommentaireType)
    blog_commentaire = graphene.Field(BlogCommentaireType, id=graphene.ID())
    commentaires_by_blog = graphene.List(BlogCommentaireType, blog_id=graphene.ID())
    commentaires_by_user = graphene.List(BlogCommentaireType, user_id=graphene.ID())
    
    # Queries pour les FAQs
    all_faqs = graphene.List(FaqType)
    faq = graphene.Field(FaqType, id=graphene.ID())
    faqs_by_categorie = graphene.List(FaqType, categorie=graphene.String())
    active_faqs = graphene.List(FaqType)

    # Queries pour les galeries d'images
    all_circuit_images = graphene.List(CircuitImageType)
    circuit_image = graphene.Field(CircuitImageType, id=graphene.ID())
    circuit_images_by_circuit = graphene.List(CircuitImageType, circuit_id=graphene.ID())

    all_vehicule_images = graphene.List(VehiculeImageType)
    vehicule_image = graphene.Field(VehiculeImageType, id=graphene.ID())
    vehicule_images_by_vehicule = graphene.List(VehiculeImageType, vehicule_id=graphene.ID())

    all_destination_images = graphene.List(DestinationImageType)
    destination_image = graphene.Field(DestinationImageType, id=graphene.ID())
    destination_images_by_destination = graphene.List(DestinationImageType, destination_id=graphene.ID())

    all_blog_images = graphene.List(BlogImageType)
    blog_image = graphene.Field(BlogImageType, id=graphene.ID())
    blog_images_by_blog = graphene.List(BlogImageType, blog_id=graphene.ID())
    
    # Query Testimonia
    all_testimonia = graphene.List(TestimoniaType)
    all_testimonia_by_status = graphene.List(TestimoniaType, status=graphene.Boolean(required=True))
    
    # Resolvers pour les utilisateurs
    def resolve_all_utilisateurs(self, info):
        return Utilisateur.objects.all()
    
    def resolve_utilisateur(self, info, id):
        try:
            return Utilisateur.objects.get(pk=id)
        except Utilisateur.DoesNotExist:
            return None
    
    def resolve_utilisateur_by_email(self, info, email):
        try:
            return Utilisateur.objects.get(email=email)
        except Utilisateur.DoesNotExist:
            return None
    
    # Resolvers pour les destinations
    def resolve_all_destinations(self, info):
        return Destination.objects.all()
    
    def resolve_destination(self, info, id):
        try:
            return Destination.objects.get(pk=id)
        except Destination.DoesNotExist:
            return None
    
    def resolve_destinations_by_region(self, info, region):
        return Destination.objects.filter(region__icontains=region)
    
    def resolve_popular_destinations(self, info, limit=5):
        # Destinations avec le plus de circuits
        return Destination.objects.annotate(
            circuits_count=graphene.Count('circuits')
        ).order_by('-circuits_count')[:limit]
    
    # Resolvers pour les saisons
    def resolve_all_saisons(self, info):
        return Saison.objects.all()
    
    def resolve_saison(self, info, id):
        try:
            return Saison.objects.get(pk=id)
        except Saison.DoesNotExist:
            return None
    
    def resolve_current_saison(self, info):
        today = timezone.now().date()
        try:
            return Saison.objects.filter(
                date_debut__lte=today,
                date_fin__gte=today
            ).first()
        except Saison.DoesNotExist:
            return None
    
    def resolve_saisons_by_period(self, info, start_date=None, end_date=None):
        queryset = Saison.objects.all()
        if start_date:
            queryset = queryset.filter(date_debut__gte=start_date)
        if end_date:
            queryset = queryset.filter(date_fin__lte=end_date)
        return queryset
    
    # Resolvers pour les circuits
    def resolve_all_circuits(self, info):
        return Circuit.objects.all().select_related('destination', 'saison')
    
    def resolve_all_circuits_by_type(self, info, type):
        logger.debug(f"filter type {type}")
        return Circuit.objects.filter(type=type).select_related('destination', 'saison')
    
    def resolve_circuit(self, info, id):
        try:
            return Circuit.objects.select_related('destination', 'saison').get(pk=id)
        except Circuit.DoesNotExist:
            return None
    
    # Itineraire
    def resolve_itineraire(root, info, id):
        try:
            return Itineraire.objects.get(pk=id)
        except Itineraire.DoesNotExist:
            return None
    
    def resolve_circuits_by_destination(self, info, destination_id):
        return Circuit.objects.filter(destination_id=destination_id).select_related('destination', 'saison')
    
    def resolve_circuits_by_saison(self, info, saison_id):
        return Circuit.objects.filter(saison_id=saison_id).select_related('destination', 'saison')
    
    def resolve_circuits_by_difficulte(self, info, difficulte):
        return Circuit.objects.filter(difficulte=difficulte).select_related('destination', 'saison')
    
    def resolve_circuits_by_price_range(self, info, min_price=None, max_price=None):
        queryset = Circuit.objects.all().select_related('destination', 'saison')
        if min_price is not None:
            queryset = queryset.filter(prix__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(prix__lte=max_price)
        return queryset
    
    def resolve_available_circuits(self, info):
        # Circuits avec moins de 10 réservations confirmées
        return Circuit.objects.annotate(
            confirmed_reservations=graphene.Count(
                'reservations',
                filter=Q(reservations__statut=Reservation.ReservationStatus.CONFIRMEE)
            )
        ).filter(confirmed_reservations__lt=10).select_related('destination', 'saison')
    
    def resolve_featured_circuits(self, info, limit=6):
        # Circuits les plus populaires (avec le plus de réservations)
        return Circuit.objects.annotate(
            reservations_count=graphene.Count('reservations')
        ).order_by('-reservations_count').select_related('destination', 'saison')[:limit]
    
    def resolve_search_circuits(self, info, search_term):
        return Circuit.objects.filter(
            Q(titre__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(destination__nom__icontains=search_term)
        ).select_related('destination', 'saison')
    
    # Resolvers pour les points d'intérêt
    def resolve_all_points_interet(self, info):
        return PointInteret.objects.all().select_related('circuit')
    
    def resolve_point_interet(self, info, id):
        try:
            return PointInteret.objects.select_related('circuit').get(pk=id)
        except PointInteret.DoesNotExist:
            return None
    
    def resolve_points_interet_by_circuit(self, info, circuit_id):
        return PointInteret.objects.filter(circuit_id=circuit_id).select_related('circuit')

    # Resolvers pour les types de véhicules
    def resolve_all_types_vehicule(self, info):
        return TypeVehicule.objects.all()

    def resolve_type_vehicule(self, info, id):
        try:
            return TypeVehicule.objects.get(pk=id)
        except TypeVehicule.DoesNotExist:
            return None

    # Resolvers pour les capacités
    def resolve_all_capacites(self, info):
        return Capacite.objects.all()

    def resolve_capacite(self, info, id):
        try:
            return Capacite.objects.get(pk=id)
        except Capacite.DoesNotExist:
            return None

    def resolve_capacites_by_places(self, info, min_places=None, max_places=None):
        queryset = Capacite.objects.all()
        if min_places is not None:
            queryset = queryset.filter(nombre_places__gte=min_places)
        if max_places is not None:
            queryset = queryset.filter(nombre_places__lte=max_places)
        return queryset

    # Resolvers pour les véhicules

    def resolve_all_vehicules(self, info):
        return Vehicule.objects.all().select_related('type', 'capacite').prefetch_related('images')

    def resolve_vehicule(self, info, id):
        try:
            return Vehicule.objects.select_related('type', 'capacite').get(pk=id)
        except Vehicule.DoesNotExist:
            return None

    def resolve_vehicules_disponibles(self, info):
        return Vehicule.objects.filter(etat=EtatVehicule.DISPONIBLE).select_related('type', 'capacite')

    def resolve_vehicules_by_type(self, info, type_id):
        return Vehicule.objects.filter(type_id=type_id).select_related('type', 'capacite')

    def resolve_vehicules_by_capacite(self, info, capacite_id):
        return Vehicule.objects.filter(capacite_id=capacite_id).select_related('type', 'capacite')

    def resolve_vehicules_by_price_range(self, info, min_price=None, max_price=None):
        queryset = Vehicule.objects.all().select_related('type', 'capacite')
        if min_price is not None:
            queryset = queryset.filter(prix__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(prix__lte=max_price)
        return queryset

    # Resolvers pour les réservations
    def resolve_all_reservations(self, info):
        return Reservation.objects.all().select_related('utilisateur', 'circuit', 'vehicule')

    def resolve_reservation(self, info, id):
        try:
            return Reservation.objects.select_related('utilisateur', 'circuit', 'vehicule').get(pk=id)
        except Reservation.DoesNotExist:
            return None
        
    def resolve_reservations_by_user(self, info, user_id):
        decoded_bytes = base64.b64decode(user_id)
        decoded_str = decoded_bytes.decode('utf-8')
        clean_user_id = decoded_str.split(':')[1]
        logger.debug(f"Decoded User ID: {user_id}")
        logger.debug(f"decoded_str: {decoded_str}")
        logger.debug(f"clean_user_id: {clean_user_id}")
        return Reservation.objects.filter(utilisateur_id=clean_user_id).select_related('utilisateur', 'circuit', 'vehicule')

    def resolve_reservations_by_circuit(self, info, circuit_id):
        return Reservation.objects.filter(circuit_id=circuit_id).select_related('utilisateur', 'circuit', 'vehicule')

    def resolve_reservations_by_statut(self, info, statut):
        return Reservation.objects.filter(statut=statut).select_related('utilisateur', 'circuit', 'vehicule')

    def resolve_reservations_by_date_range(self, info, start_date=None, end_date=None):
        queryset = Reservation.objects.all().select_related('utilisateur', 'circuit', 'vehicule')
        if start_date:
            queryset = queryset.filter(date_depart__gte=start_date)
        if end_date:
            queryset = queryset.filter(date_depart__lte=end_date)
        return queryset

    def resolve_pending_reservations(self, info):
        return Reservation.objects.filter(statut=Reservation.ReservationStatus.EN_ATTENTE).select_related('utilisateur', 'circuit', 'vehicule')

    def resolve_confirmed_reservations(self, info):
        return Reservation.objects.filter(statut=Reservation.ReservationStatus.CONFIRMEE).select_related('utilisateur', 'circuit', 'vehicule')

    # Resolvers pour les guides
    def resolve_all_personnels(self, info):
        return Personnel.objects.all()

    # Resolvers pour les blogs
    def resolve_all_blogs(self, info):
        return Blog.objects.all().order_by('-datePublication')

    def resolve_blog(self, info, id):
        try:
            # Décode l'ID global GraphQL (Relay ID)
            type_name, real_id = from_global_id(id)
            return Blog.objects.get(pk=real_id)
        except Blog.DoesNotExist:
            return None
        except Exception as e:
            print("Erreur lors du décodage de l'ID:", e)
            return None

    def resolve_blogs_by_author(self, info, auteur):
        return Blog.objects.filter(auteur__icontains=auteur).order_by('-datePublication')

    def resolve_blogs_by_tag(self, info, tag):
        return Blog.objects.filter(tags__contains=[tag]).order_by('-datePublication')

    def resolve_recent_blogs(self, info, limit=5):
        return Blog.objects.all().order_by('-datePublication')[:limit]

    def resolve_search_blogs(self, info, search_term):
        return Blog.objects.filter(
            Q(titre__icontains=search_term) |
            Q(contenu__icontains=search_term) |
            Q(auteur__icontains=search_term)
        ).order_by('-datePublication')

    # Resolvers pour les commentaires de blog
    def resolve_all_blog_commentaires(self, info):
        return BlogCommentaire.objects.all().select_related('blog', 'utilisateur').order_by('-date_commentaire')

    def resolve_blog_commentaire(self, info, id):
        try:
            return BlogCommentaire.objects.select_related('blog', 'utilisateur').get(pk=id)
        except BlogCommentaire.DoesNotExist:
            return None

    def resolve_commentaires_by_blog(self, info, blog_id):
        return BlogCommentaire.objects.filter(blog_id=blog_id).select_related('blog', 'utilisateur').order_by('-date_commentaire')

    def resolve_commentaires_by_user(self, info, user_id):
        return BlogCommentaire.objects.filter(utilisateur_id=user_id).select_related('blog', 'utilisateur').order_by('-date_commentaire')

    # Resolvers pour les FAQs
    def resolve_all_faqs(self, info):
        return Faq.objects.all()

    def resolve_faq(self, info, id):
        try:
            return Faq.objects.get(pk=id)
        except Faq.DoesNotExist:
            return None

    def resolve_faqs_by_categorie(self, info, categorie):
        return Faq.objects.filter(categorie__icontains=categorie)

    def resolve_active_faqs(self, info):
        return Faq.objects.filter(active=True)

    # Resolvers pour les galeries d'images
    def resolve_all_circuit_images(self, info):
        return CircuitImage.objects.all().select_related('circuit').order_by('circuit', 'ordre')

    def resolve_circuit_image(self, info, id):
        try:
            return CircuitImage.objects.select_related('circuit').get(pk=id)
        except CircuitImage.DoesNotExist:
            return None

    def resolve_circuit_images_by_circuit(self, info, circuit_id):
        return CircuitImage.objects.filter(circuit_id=circuit_id).select_related('circuit').order_by('ordre')

    def resolve_all_vehicule_images(self, info):
        return VehiculeImage.objects.all().select_related('vehicule').order_by('vehicule', 'ordre')

    def resolve_vehicule_image(self, info, id):
        try:
            return VehiculeImage.objects.select_related('vehicule').get(pk=id)
        except VehiculeImage.DoesNotExist:
            return None

    def resolve_vehicule_images_by_vehicule(self, info, vehicule_id):
        return VehiculeImage.objects.filter(vehicule_id=vehicule_id).select_related('vehicule').order_by('ordre')

    def resolve_all_destination_images(self, info):
        return DestinationImage.objects.all().select_related('destination').order_by('destination', 'ordre')

    def resolve_destination_image(self, info, id):
        try:
            return DestinationImage.objects.select_related('destination').get(pk=id)
        except DestinationImage.DoesNotExist:
            return None

    def resolve_destination_images_by_destination(self, info, destination_id):
        return DestinationImage.objects.filter(destination_id=destination_id).select_related('destination').order_by('ordre')

    def resolve_all_blog_images(self, info):
        return BlogImage.objects.all().select_related('blog').order_by('blog', 'ordre')

    def resolve_blog_image(self, info, id):
        try:
            return BlogImage.objects.select_related('blog').get(pk=id)
        except BlogImage.DoesNotExist:
            return None

    def resolve_blog_images_by_blog(self, info, blog_id):
        return BlogImage.objects.filter(blog_id=blog_id).select_related('blog').order_by('ordre')
    
    def resolve_all_testimonia(self, info):
        return Testimonia.objects.all()

    def resolve_all_testimonia_by_status(self, info, status):
        return Testimonia.objects.filter(status=status).select_related('utilisateur')