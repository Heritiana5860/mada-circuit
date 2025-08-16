import graphene
from graphene_django import DjangoObjectType
from graphene import relay
from django.contrib.auth import get_user_model
from .models import (
    Utilisateur, Destination, Saison, Circuit, PointInteret,
    TypeVehicule, Capacite, Vehicule, Reservation, Personnel, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, DestinationImage, BlogImage,
    Role, Difficulte, EtatVehicule, Hebergement, Activite, Itineraire, Testimonia, ContactUsModele, SurMesure, LieuAVisiter, SurMesureActivite
)

User = get_user_model()

# Enums GraphQL
class RoleEnum(graphene.Enum):
    CLIENT = Role.CLIENT
    ADMIN = Role.ADMIN
    COMMERCIAL = Role.COMMERCIAL

class DifficulteEnum(graphene.Enum):
    FACILE = Difficulte.FACILE
    MOYEN = Difficulte.MOYEN
    DIFFICILE = Difficulte.DIFFICILE

class EtatVehiculeEnum(graphene.Enum):
    DISPONIBLE = EtatVehicule.DISPONIBLE
    RESERVE = EtatVehicule.RESERVE
    MAINTENANCE = EtatVehicule.MAINTENANCE

class HebergementEnum(graphene.Enum):
    STANDARD = Hebergement.STANDARD
    CONFORT = Hebergement.CONFORT
    LUXE = Hebergement.LUXE

class ActiviteEnum(graphene.Enum):
    RANDONNEE = Activite.RANDONNEE
    PLAGE = Activite.PLAGE
    SAFARI = Activite.SAFARI
    PLONGEE = Activite.PLONGEE
    CULTURE = Activite.CULTURE
    GASTRONOMIE = Activite.GASTRONOMIE

class StatutReservationEnum(graphene.Enum):
    EN_ATTENTE = Reservation.ReservationStatus.EN_ATTENTE
    CONFIRMEE = Reservation.ReservationStatus.CONFIRMEE
    ANNULEE = Reservation.ReservationStatus.ANNULEE
    TERMINEE = Reservation.ReservationStatus.TERMINEE

# Types GraphQL pour les galeries d'images
class CircuitImageType(DjangoObjectType):
    class Meta:
        model = CircuitImage
        fields = ('id', 'circuit', 'image', 'titre', 'description', 'ordre')
        interfaces = (relay.Node,)

class VehiculeImageType(DjangoObjectType):
    class Meta:
        model = VehiculeImage
        fields = ('id', 'vehicule', 'image', 'titre', 'description', 'ordre')
        interfaces = (relay.Node,)

class DestinationImageType(DjangoObjectType):
    class Meta:
        model = DestinationImage
        fields = ('id', 'destination', 'image', 'titre', 'description', 'ordre')
        interfaces = (relay.Node,)

class BlogImageType(DjangoObjectType):
    class Meta:
        model = BlogImage
        fields = ('id', 'blog', 'image', 'titre', 'description', 'ordre')
        interfaces = (relay.Node,)

# Types GraphQL pour les modèles
class UtilisateurType(DjangoObjectType):
    role = graphene.Field(RoleEnum)
    
    class Meta:
        model = Utilisateur
        fields = (
            'id', 'email', 'nom', 'prenom', 'telephone', 'role', 'image',
            'date_inscription', 'is_active', 'last_login'
        )
        interfaces = (relay.Node,)

class DestinationType(DjangoObjectType):
    circuits_count = graphene.Int()
    images = graphene.List(DestinationImageType)
    images_count = graphene.Int()

    class Meta:
        model = Destination
        fields = ('id', 'nom', 'description', 'region', 'pays', 'image')
        interfaces = (relay.Node,)

    def resolve_circuits_count(self, info):
        return self.circuits.count()

    def resolve_images(self, info):
        return self.images.all().order_by('ordre')

    def resolve_images_count(self, info):
        return self.images.count()

class SaisonType(DjangoObjectType):
    circuits_count = graphene.Int()
    
    class Meta:
        model = Saison
        fields = ('id', 'nom', 'date_debut', 'date_fin')
        interfaces = (relay.Node,)
    
    def resolve_circuits_count(self, info):
        return self.circuits.count()

class PointInteretType(DjangoObjectType):
    class Meta:
        model = PointInteret
        fields = ('id', 'nom', 'description', 'type', 'temps_visite', 'prix_entree', 'image', 'circuit')
        interfaces = (relay.Node,)

class ItineraireType(DjangoObjectType):
    class Meta:
        model = Itineraire
        fields = ('id', 'jour', 'lieu_depart', 'lieu_arrivee', 'distance_km', 'duree_trajet', 'description', 'carte_gps', 'circuit')
        interfaces = (relay.Node,)

class CircuitType(DjangoObjectType):
    difficulte = graphene.Field(DifficulteEnum)
    points_interet = graphene.List(PointInteretType)
    itineraires = graphene.List(ItineraireType)
    reservations_count = graphene.Int()
    is_available = graphene.Boolean()
    images = graphene.List(CircuitImageType)
    images_count = graphene.Int()

    class Meta:
        model = Circuit
        fields = (
            'id', 'titre', 'description', 'duree', 'transport', 'prix', 'inclus', 'non_inclus', 'type', 'image',
            'difficulte', 'destination', 'saison', 'vehicule_recommande'   
        )
        interfaces = (relay.Node,)

    def resolve_points_interet(self, info):
        return self.points_interet.all()
    
    def resolve_itineraires(self, info):
        return self.itineraires.all()

    def resolve_reservations_count(self, info):
        return self.reservations.count()

    def resolve_is_available(self, info):
        # Logique pour déterminer si le circuit est disponible
        return self.reservations.filter(statut=Reservation.ReservationStatus.CONFIRMEE).count() < 10

    def resolve_images(self, info):
        return self.images.all().order_by('ordre')

    def resolve_images_count(self, info):
        return self.images.count()

class TypeVehiculeType(DjangoObjectType):
    vehicules_count = graphene.Int()
    
    class Meta:
        model = TypeVehicule
        fields = ('id', 'libelle')
        interfaces = (relay.Node,)
    
    def resolve_vehicules_count(self, info):
        return self.vehicules.count()
    
class VehiculeImageType(DjangoObjectType):
    class Meta:
        model = VehiculeImage
        fields = ('id', 'image', 'ordre')

class CapaciteType(DjangoObjectType):
    vehicules_count = graphene.Int()
    
    class Meta:
        model = Capacite
        fields = ('id', 'nombre_places', 'description')
        interfaces = (relay.Node,)
    
    def resolve_vehicules_count(self, info):
        return self.vehicules.count()

class VehiculeType(DjangoObjectType):
    etat = graphene.Field(EtatVehiculeEnum)
    is_available = graphene.Boolean()
    reservations_count = graphene.Int()
    images = graphene.List(VehiculeImageType)
    images_count = graphene.Int()

    class Meta:
        model = Vehicule
        fields = (
            'id', 'immatriculation', 'marque', 'modele', 'annee',
            'type', 'capacite', 'prix', 'etat', 'images'
        )
        interfaces = (relay.Node,)

    def resolve_is_available(self, info):
        return self.etat == EtatVehicule.DISPONIBLE

    def resolve_reservations_count(self, info):
        return self.reservations.count()

    def resolve_images(self, info):
        return self.images.all().order_by('ordre')

    def resolve_images_count(self, info):
        return self.images.count()

class ReservationType(DjangoObjectType):
    statut = graphene.Field(StatutReservationEnum)
    hebergement = graphene.Field(HebergementEnum)
    activite = graphene.Field(ActiviteEnum)
    prix_total = graphene.Float()
    
    class Meta:
        model = Reservation
        fields = (
            'id', 'utilisateur', 'circuit', 'vehicule', 'date_reservation',
            'date_depart', 'statut', 'duree', 'nombre_personnes',
            'hebergement', 'activite', 'budget', 'nom', 'prenom',
            'email', 'telephone', 'commentaire'
        )
        interfaces = (relay.Node,)
    
    def resolve_prix_total(self, info):
        # Calcul du prix total basé sur le circuit, véhicule et nombre de personnes
        prix_circuit = float(self.circuit.prix) if self.circuit else 0
        prix_vehicule = float(self.vehicule.prix) if self.vehicule else 0
        return (prix_circuit + prix_vehicule) * self.nombre_personnes

class PersonnelType(DjangoObjectType):
    age = graphene.Int()
    langues_parlees = graphene.List(graphene.String)
    
    class Meta:
        model = Personnel
        fields = (
            'id', 'nom', 'prenom', 'contact', 'email', 'adresse', 'specialite',
            'langues', 'biographie', 'status', 'photo'
        )

class BlogType(DjangoObjectType):
    commentaires = graphene.List(lambda: BlogCommentaireType)
    commentaires_count = graphene.Int()
    tags_list = graphene.List(graphene.String)
    images = graphene.List(BlogImageType)
    images_count = graphene.Int()
    image_url = graphene.String()

    class Meta:
        model = Blog
        fields = (
            'id', 'titre', 'contenu', 'datePublication',
            'auteur', 'image', 'tags'
        )
        interfaces = (relay.Node,)

    def resolve_commentaires(self, info):
        return self.commentaires.all().order_by('-date_commentaire')

    def resolve_commentaires_count(self, info):
        return self.commentaires.count()

    def resolve_tags_list(self, info):
        return self.tags if isinstance(self.tags, list) else []

    def resolve_images(self, info):
        return self.images.all().order_by('ordre')

    def resolve_images_count(self, info):
        return self.images.count()
    
    def resolve_image_url(self, info):
        if self.image:
            request = info.context
            return request.build_absolute_uri(self.image.url)
        return None
    
    def resolve_image(self, info):
        if self.image:
            request = info.context
            return request.build_absolute_uri(self.image.url)
        return None

class BlogCommentaireType(DjangoObjectType):
    class Meta:
        model = BlogCommentaire
        fields = ('id', 'blog', 'utilisateur', 'contenu', 'date_commentaire')
        interfaces = (relay.Node,)

class FaqType(DjangoObjectType):
    class Meta:
        model = Faq
        fields = (
            'id', 'question', 'reponse', 'faq_type'
        )
        interfaces = (relay.Node,)

class AvailabilityTYpe(graphene.ObjectType):
    disponible = graphene.Boolean()
    message = graphene.String()
    reservationsExistantes = graphene.List(ReservationType)

    def resolve_reservationsExistantes(self, info):
        
        return 

class TestimoniaType(DjangoObjectType):
    class Meta:
        model = Testimonia
        fields = ("id", "score", "description", "post_date", "status", "utilisateur")
        
class ContactUsType(DjangoObjectType):
    class Meta:
        model = ContactUsModele
        fields = ("id", "nom", "prenom", "email", "tel", "objet", "message", "date_envoi")
 
class LieuAVisiterType(DjangoObjectType):
    class Meta:
        model = LieuAVisiter
        fields = "__all__"


class SurMesureActiviteType(DjangoObjectType):
    class Meta:
        model = SurMesureActivite
        fields = "__all__"
        
class SurMesureType(DjangoObjectType):
    class Meta:
        model = SurMesure
        fields = "__all__"