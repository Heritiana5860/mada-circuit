from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator, EmailValidator
from django.core.validators import FileExtensionValidator
from django.utils import timezone
import uuid
import os



def circuit_image_path(instance, filename):
    """Chemin d'upload pour les images de circuits"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('circuits/', filename)


def point_interet_image_path(instance, filename):
    """Chemin d'upload pour les images de points d'intérêt"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('points_interet/', filename)


def vehicule_image_path(instance, filename):
    """Chemin d'upload pour les images de véhicules"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('vehicules/', filename)


def guide_photo_path(instance, filename):
    """Chemin d'upload pour les photos de guides"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('guides/', filename)


def blog_image_path(instance, filename):
    """Chemin d'upload pour les images de blog"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('blog/', filename)



class Role(models.TextChoices):
    CLIENT = 'CLIENT', 'Client'
    ADMIN = 'ADMIN', 'Admin'
    COMMERCIAL = 'COMMERCIAL', 'Commercial'


class Utilisateur(AbstractUser):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CLIENT)
    date_inscription = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='photos/', blank=True, null=True)
    
    # Ajout de related_name pour éviter les conflits
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='utilisateur_set', 
        related_query_name='utilisateur'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='utilisateur_set',
        related_query_name='utilisateur'
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Difficulte(models.TextChoices):
    FACILE = 'FACILE', 'Facile'
    MOYEN = 'MOYEN', 'Moyen'
    DIFFICILE = 'DIFFICILE', 'Difficile'


class Circuit(models.Model):
    
    class CircuitType(models.TextChoices):
        PANGALANE = "pangalane", _("Pangalane")
        CIRCUIT = "circuit", _("Circuit")
        SOLIDAIRE = "solidaire", _("Solidaire")
        
    class CircuitTransport(models.TextChoices):
        VOITURE = "voiture", _("Voiture")
        BATEAU = "bateau", _("Bateau")
    
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    duree = models.IntegerField(help_text="Durée en jours")
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    inclus = models.TextField(blank=True, help_text="Services inclus (ex: hébergement, guide, petit-déjeuner), lister en separant par ';'")
    non_inclus = models.TextField(blank=True, help_text="Services non inclus (ex: essence, péages), lister en separant par ';'")
    destination = models.CharField(max_length=100, blank=True, help_text="Destination principale du circuit")
    region = models.CharField(max_length=100, blank=True, help_text="Région principale du circuit")
    saison = models.CharField(max_length=100, blank=True, help_text="Saison recommandée pour ce circuit")
    
    image = models.ImageField(upload_to=circuit_image_path, blank=True, null=True)
    
    difficulte = models.CharField(max_length=10, choices=Difficulte.choices, default=Difficulte.FACILE)
    type_circuit = models.CharField(
        choices=CircuitType, 
        max_length=20, 
        default=CircuitType.CIRCUIT, 
        verbose_name=_("Type de circuit"), 
        help_text="circuit avec voiture, circuit sur canal de pangalanes avec bateau, circuit pour la visite solidaire")
    transport = models.CharField(
        choices=CircuitTransport,
        max_length=255, 
        default=CircuitTransport.VOITURE, 
        verbose_name='Transport')

    def __str__(self):
        return self.titre
    
    
class Itineraire(models.Model):
    # Choix pour le type d'étape
    TYPE_CHOICES = [
        ('trajet', 'Trajet'),
        ('sejour', 'Séjour'),
    ]
    
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    jour = models.PositiveIntegerField(default=1, help_text="Jour 1, Jour 2...")
    type_itineraire = models.CharField(max_length=10, choices=TYPE_CHOICES, default='trajet', help_text="Type d'étape")
    
    # Champs pour les trajets
    lieu_depart = models.CharField(max_length=100, null=True, blank=True, help_text="Lieu de départ (pour trajets)")
    lieu_arrivee = models.CharField(max_length=100, null=True, blank=True, help_text="Lieu d'arrivée (pour trajets)")
    distance_km = models.FloatField(null=True, blank=True, help_text="Distance estimée (km)")
    duree_trajet = models.FloatField(null=True, blank=True, help_text="Durée estimée (heures)")
    
    # Champs pour les séjours
    lieu = models.CharField(max_length=100, null=True, blank=True, help_text="Lieu de séjour")
    nuitees = models.PositiveIntegerField(null=True, blank=True, default=1, help_text="Nombre de nuitées")
    
    # Champs communs
    description = models.TextField(verbose_name="Description détaillée", null=True, blank=True)
    carte_gps = models.URLField(null=True, blank=True, help_text="Lien vers l'itinéraire GPS")
    
    circuit = models.ForeignKey('Circuit', on_delete=models.CASCADE, related_name='itineraires')
    
    class Meta:
        verbose_name = "Itinéraire"
        verbose_name_plural = "Itinéraires"
        ordering = ['jour']  # Tri par ordre de jour
    
    def clean(self):
        """Validation personnalisée selon le type d'étape"""
        from django.core.exceptions import ValidationError
        
        if self.type_itineraire == 'trajet':
            if not self.lieu_depart:
                raise ValidationError({'lieu_depart': 'Le lieu de départ est obligatoire pour un trajet.'})
            if not self.lieu_arrivee:
                raise ValidationError({'lieu_arrivee': 'Le lieu d\'arrivée est obligatoire pour un trajet.'})
        
        elif self.type_itineraire == 'sejour':
            if not self.lieu:
                raise ValidationError({'lieu': 'Le lieu est obligatoire pour un séjour.'})
            if self.nuitees is None or self.nuitees < 1:
                raise ValidationError({'nuitees': 'Le nombre de nuitées doit être d\'au moins 1 pour un séjour.'})
    
    def save(self, *args, **kwargs):
        """Override save pour valider avant sauvegarde"""
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        if self.type_itineraire == 'trajet':
            return f"Jour {self.jour}: {self.lieu_depart} → {self.lieu_arrivee}"
        else:
            return f"Jour {self.jour}: Séjour à {self.lieu} ({self.nuitees} nuitée{'s' if self.nuitees > 1 else ''})"
    
    @property
    def display_name(self):
        """Nom d'affichage formaté selon le type"""
        if self.type_itineraire == 'trajet':
            return f"Trajet: {self.lieu_depart} → {self.lieu_arrivee}"
        else:
            return f"Séjour: {self.lieu}"
    
    @property
    def is_trajet(self):
        """Vérifie si c'est un trajet"""
        return self.type_itineraire == 'trajet'
    
    @property
    def is_sejour(self):
        """Vérifie si c'est un séjour"""
        return self.type_itineraire == 'sejour'


class PointInteret(models.Model):
    
    CATEGORIE_POINT_INTERET= [('NATURE', 'Nature'), ('CULTURE', 'Culture'), ('GASTRONOMIE', 'Gastronomie')]
    
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nom = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(max_length=100, choices=CATEGORIE_POINT_INTERET, default='CULTURE', help_text="Catégoriser les points d'intérêt")
    temps_visite = models.FloatField(default=1.0, help_text="Durée recommandée (heures)")
    prix_entree = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, help_text="Coût d'entrée si applicable")
    
    image = models.ImageField(upload_to=point_interet_image_path, blank=True, null=True)
    
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE, related_name='points_interet')

    def __str__(self):
        return self.nom


class EtatVehicule(models.TextChoices):
    DISPONIBLE = 'DISPONIBLE', 'Disponible'
    RESERVE = 'RESERVE', 'Réservé'
    MAINTENANCE = 'MAINTENANCE', 'En maintenance'


class Vehicule(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    marque = models.CharField(max_length=100, help_text="Marque du véhicule (ex: Toyota, Ford)")
    modele = models.CharField(max_length=100, help_text="Modèle du véhicule (ex: Corolla, Focus)")
    annee = models.IntegerField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    capacite = models.IntegerField(blank=True, help_text="Nombre de places assises")
    type = models.CharField(max_length=100, blank=True, help_text="Type de véhicule (ex: 4x4, berline)")
    langue = models.CharField(max_length=100, blank=True, null=True, help_text="Langue parlé par le chauffeur, ex: Anglais, Français, ...")
    etat = models.CharField(max_length=20, choices=EtatVehicule.choices, default=EtatVehicule.DISPONIBLE)
    
    def __str__(self):
        return f"{self.marque} {self.modele}"

class Hebergement(models.TextChoices):
    STANDARD = 'STANDARD', 'Standard'
    CONFORT = 'CONFORT', 'Confort'
    LUXE = 'LUXE', 'Luxe'


class Activite(models.TextChoices):
    RANDONNEE = 'RANDONNEE', 'Randonnée'
    PLAGE = 'PLAGE', 'Plage'
    SAFARI = 'SAFARI', 'Safari'
    PLONGEE = 'PLONFEE', 'Plongée'  # Corriger la faute dans le modèle Prisma
    CULTURE = 'CULTURE', 'Culture'
    GASTRONOMIE = 'GASTRONOMIE', 'Gastronomie'


class Reservation(models.Model):
    class ReservationStatus(models.TextChoices):
        EN_ATTENTE = 'EN_ATTENTE', 'En attente'
        CONFIRMEE = 'CONFIRMEE', 'Confirmée'
        ANNULEE = 'ANNULEE', 'Annulée'
        TERMINEE = 'TERMINEE', 'Terminée'
    class ReservationType(models.TextChoices):
        VEHICULE = "vehicule", _("Véhicule")
        CIRCUIT = "circuit", _("Circuit")


    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    type = models.CharField(choices=ReservationType, max_length=20, default=ReservationType.VEHICULE, verbose_name=_("Reservation Type"))
    date_reservation = models.DateTimeField(default=timezone.now)
    date_depart = models.DateTimeField()
    date_fin = models.DateTimeField()
    statut = models.CharField(max_length=20, choices=ReservationStatus.choices, default=ReservationStatus.EN_ATTENTE)
    duree = models.IntegerField()
    nombre_personnes = models.IntegerField()
    hebergement = models.CharField(max_length=20, choices=Hebergement.choices, default=Hebergement.STANDARD)
    activite = models.CharField(max_length=20, choices=Activite.choices, default=Activite.RANDONNEE)
    budget = models.CharField(max_length=100, blank=True, null=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    commentaire = models.TextField(blank=True, null=True)

    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='reservations')
    circuit = models.ForeignKey(Circuit, null=True, blank=True, on_delete=models.CASCADE, related_name='reservations')
    vehicule = models.ForeignKey(Vehicule, null=True, blank=True, on_delete=models.CASCADE, related_name='reservations')

    
    def __str__(self):
        return f"Réservation {self.id} - {self.nom} {self.prenom}"


class Personnel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    email = models.CharField(max_length=200)
    adresse = models.CharField(max_length=200)
    specialite = models.CharField(max_length=100, help_text="Lister les specialitées en separant par ';'")
    langues = models.CharField(max_length=200, help_text="Lister les langues en separant par ';'")
    biographie = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='personnel_image')

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Blog(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    datePublication = models.DateTimeField(default=timezone.now)
    auteur = models.CharField(max_length=100, blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.titre

    class Meta:
        ordering = ['-datePublication']


class BlogCommentaire(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='commentaires')
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='commentaires_blog')
    contenu = models.TextField()
    date_commentaire = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Commentaire de {self.utilisateur.prenom} sur {self.blog.titre}"


class Faq(models.Model):
    class TypeFaq(models.TextChoices):
        SOLIDAIRE = 'SOLIDAIRE', 'solidaire'
        SURMESURE = 'SURMESURE', 'surMesure'
        CIRCUIT = 'CIRCUIT', 'circuit'
        VEHICULE = 'VEHICULE', 'vehicule'
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=255, verbose_name="Question")
    reponse = models.TextField(verbose_name="Reponse")
    faq_type = models.CharField(max_length=20, choices=TypeFaq.choices, default=TypeFaq.CIRCUIT, verbose_name="Type")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.question
    
    class Meta:
        ordering = ['created_at']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"


# Modèles pour les galeries d'images
class CircuitImage(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=circuit_image_path)
    titre = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ordre = models.IntegerField(default=0, help_text="Ordre d'affichage")

    def __str__(self):
        return f"Image {self.ordre} - {self.circuit.titre}"

    class Meta:
        ordering = ['ordre']


class VehiculeImage(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    vehicule = models.ForeignKey(Vehicule, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=vehicule_image_path)
    titre = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ordre = models.IntegerField(default=0, help_text="Ordre d'affichage")

    def __str__(self):
        return f"Image {self.ordre} - {self.vehicule.marque} {self.vehicule.modele}"

    class Meta:
        ordering = ['ordre']


def blog_media_path(instance, filename):
    # Chemin personnalisé pour stocker les fichiers
    return f"blogs/{instance.blog.id}/{filename}"

class BlogImage(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    blog = models.ForeignKey("Blog", on_delete=models.CASCADE, related_name="medias")
    file = models.FileField(
        upload_to=blog_media_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'])]
    )
    titre = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ordre = models.IntegerField(default=0, help_text="Ordre d'affichage")

    def __str__(self):
        return f"Media {self.ordre} - {self.blog.titre}"

    class Meta:
        ordering = ["ordre"]
             
             
# Testimonia Modele
class Testimonia(models.Model):
    class TemoignageTypes(models.TextChoices):
        CIRCUIT = "CIRCUIT", "circuit"
        VEHICULE = "VEHICULE", "vehicule"
        SURMESURE = "SURMESURE", "surMesure"
        PANGALANES = "PANGALANES", "pangalanes"
        
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    score = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(6)],
        help_text="Entrez un score entre 1 et 6",
        verbose_name="Score"
    )
    description = models.TextField(
        verbose_name="Description",
        help_text="Un petit témoignage"
    )
    type = models.CharField(
        max_length=30, 
        choices=TemoignageTypes.choices, 
        default=TemoignageTypes.CIRCUIT, 
        verbose_name="Type")
    status = models.BooleanField(
        default=False,
        verbose_name="Statut"
    )
    post_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de publication"
    )
    utilisateur = models.ForeignKey(
        "Utilisateur", 
        on_delete=models.CASCADE,
        related_name='testimonia'
    )

    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"
        ordering = ["-post_date"]

    def __str__(self):
        return f"{self.utilisateur.nom} - {self.score}/6"    
    
# Contact us Modele
class ContactUsModele(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    nom = models.CharField(max_length=200, verbose_name="Nom")
    prenom = models.CharField(max_length=200, verbose_name="Prenom")
    email = models.CharField(max_length=200, verbose_name="Email")
    tel = models.CharField(max_length=200, verbose_name="Contact")
    objet = models.CharField(max_length=200, verbose_name="Objet")
    message = models.TextField(verbose_name="Message")
    date_envoi = models.DateTimeField(auto_now_add=True, verbose_name="Date d'envoi")
    
    def __str__(self):
        return f"{self.objet}"
    
    
class SurMesureActivite(models.Model):
    """Activités disponibles"""
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Activité"
        verbose_name_plural = "Activités"
    
    def __str__(self):
        return self.nom


class LieuAVisiter(models.Model):
    """Lieux touristiques"""
    nom = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Lieu à visiter"
        verbose_name_plural = "Lieux à visiter"
    
    def __str__(self):
        return self.nom
    
# Modele sur mesure
class SurMesure(models.Model):
    
    class TypeHebergement(models.TextChoices):
        STANDARD = 'STANDARD', 'standard'
        CONFORT = 'CONFORT', 'confort'
        LUXE = 'LUXE', 'luxe'
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    point_depart = models.CharField(max_length=200, verbose_name="Point de depart", null=True, blank=True)
    lieu_visiter = models.ManyToManyField(
        LieuAVisiter,
        verbose_name="Lieux à visiter",
        blank=True,
        help_text="Liste des lieux que le client souhaite visiter"
    )
    point_arrivee = models.CharField(max_length=200, verbose_name="Point d'arrivée", null=True, blank=True)
    date_debut = models.DateField(
        verbose_name="Date de départ",
        help_text="Date de début du voyage"
    )
    date_fin = models.DateField(
        verbose_name="Date de retour",
        help_text="Date de fin du voyage"
    )
    duree = models.PositiveIntegerField(
        verbose_name="Durée (jours)",
        validators=[MinValueValidator(1)],
        help_text="Durée du voyage en jours"
    )
    nombre_de_personne = models.PositiveIntegerField(
        verbose_name="Nombre de personnes",
        validators=[MinValueValidator(1)],
        default=1
    )
    hebergement = models.CharField(
        max_length=20,
        choices=TypeHebergement.choices,
        default=TypeHebergement.STANDARD,
        verbose_name="Type d'hébergement"
    )
    activite = models.ManyToManyField(
        SurMesureActivite,
        verbose_name="Activités souhaitées",
        blank=True,
        help_text="Liste des activités que le client souhaite faire"
    )
    budget = models.CharField(max_length=200, verbose_name="Budget")
    nom = models.CharField(max_length=200, verbose_name="Nom")
    prenom = models.CharField(max_length=200, verbose_name="Prenom")
    email = models.EmailField(
        verbose_name="Adresse e-mail",
        validators=[EmailValidator()]
    )
    contact = models.CharField(
        max_length=20,
        verbose_name="Numéro de contact",
        help_text="Numéro de téléphone"
    )
    commentaire = models.TextField(
        verbose_name="Commentaires supplémentaires",
        blank=True,
        help_text="Informations ou demandes particulières"
    )
    
    def __str__(self):
        return f"{self.point_depart} - {self.point_arrivee}"
