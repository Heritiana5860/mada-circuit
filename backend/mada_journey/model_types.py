import graphene
from graphene_django import DjangoObjectType
from graphene import relay
from django.contrib.auth import get_user_model
from .models import (
    Utilisateur, Circuit, PointInteret, Vehicule, Reservation, Personnel, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, BlogImage,
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


class BlogImageType(DjangoObjectType):
    class Meta:
        model = BlogImage
        fields = "__all__"
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


class PointInteretType(DjangoObjectType):
    class Meta:
        model = PointInteret
        fields = ('id', 'nom', 'description', 'type', 'temps_visite', 'prix_entree', 'image', 'circuit')
        interfaces = (relay.Node,)

class ItineraireType(graphene.ObjectType):
    id = graphene.String()
    jour = graphene.Int()
    type_itineraire = graphene.String()
    
    # Champs pour trajets
    lieu_depart = graphene.String()
    lieu_arrivee = graphene.String()
    distance_km = graphene.Float()
    duree_trajet = graphene.Float()
    
    # Champs pour séjours
    lieu = graphene.String()
    nuitees = graphene.Int()
    
    # Champs communs
    description = graphene.String()
    carte_gps = graphene.String()
    
    # Propriétés calculées
    display_name = graphene.String()
    is_trajet = graphene.Boolean()
    is_sejour = graphene.Boolean()
    
    def resolve_display_name(self, info):
        return self.display_name
    
    def resolve_is_trajet(self, info):
        return self.is_trajet
    
    def resolve_is_sejour(self, info):
        return self.is_sejour

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
            'id', 'titre', 'description', 'duree', 'transport', 'prix', 'inclus', 'non_inclus', 'type_circuit', 'image',
            'difficulte', 'destination', 'saison', 'region'  
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
    
class VehiculeImageType(DjangoObjectType):
    class Meta:
        model = VehiculeImage
        fields = ('id', 'image', 'ordre')

class VehiculeType(DjangoObjectType):
    etat = graphene.Field(EtatVehiculeEnum)
    is_available = graphene.Boolean()
    reservations_count = graphene.Int()
    images = graphene.List(VehiculeImageType)
    images_count = graphene.Int()

    class Meta:
        model = Vehicule
        fields = (
            'id', 'marque', 'modele', 'annee',
            'type', 'langue', 'capacite', 'prix', 'etat', 'images'
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
            'date_depart', 'date_fin', 'statut', 'duree', 'nombre_personnes',
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
    medias = graphene.List(BlogImageType)
    medias_count = graphene.Int()
    file_url = graphene.String() 
    youtube_thumbnail = graphene.String()

    class Meta:
        model = Blog
        fields = "__all__"
        interfaces = (relay.Node,)

    def resolve_commentaires(self, info):
        return self.commentaires.all().order_by('-date_commentaire')

    def resolve_commentaires_count(self, info):
        return self.commentaires.count()

    def resolve_tags_list(self, info):
        return self.tags if isinstance(self.tags, list) else []

    def resolve_medias(self, info):
        return self.medias.all().order_by('ordre')

    def resolve_medias_count(self, info):
        return self.medias.count()
    
    def resolve_file_url(self, info):
        if self.file:
            request = info.context
            return request.build_absolute_uri(self.file.url)
        return None
    
    def resolve_youtube_thumbnail(self, info):
        return self.youtube_thumbnail


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
        fields = ("id", "score", "description", "type", "post_date", "status", "utilisateur")
        
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