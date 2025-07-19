from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid
import os


# Fonctions pour les chemins d'upload des images
def destination_image_path(instance, filename):
    """Chemin d'upload pour les images de destinations"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('destinations/', filename)


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
    GUIDE = 'GUIDE', 'Guide'
    COMMERCIAL = 'COMMERCIAL', 'Commercial'


class Utilisateur(AbstractUser):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CLIENT)
    date_inscription = models.DateTimeField(default=timezone.now)
    
    # Ajout de related_name pour éviter les conflits
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='utilisateur_set',  # Nom personnalisé
        related_query_name='utilisateur'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='utilisateur_set',  # Nom personnalisé
        related_query_name='utilisateur'
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Destination(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nom = models.CharField(max_length=100)
    description = models.TextField()
    region = models.CharField(max_length=100)
    pays = models.CharField(max_length=100, default="Madagascar")
    image = models.ImageField(upload_to=destination_image_path, blank=True, null=True)

    def __str__(self):
        return self.nom


class Saison(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nom = models.CharField(max_length=100, unique=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    
    def __str__(self):
        return self.nom


class Difficulte(models.TextChoices):
    FACILE = 'FACILE', 'Facile'
    MOYEN = 'MOYEN', 'Moyen'
    DIFFICILE = 'DIFFICILE', 'Difficile'


class Circuit(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    duree = models.IntegerField(help_text="Durée en jours")
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to=circuit_image_path, blank=True, null=True)
    difficulte = models.CharField(max_length=10, choices=Difficulte.choices, default=Difficulte.FACILE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='circuits')
    saison = models.ForeignKey(Saison, on_delete=models.CASCADE, related_name='circuits')

    def __str__(self):
        return self.titre


class PointInteret(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nom = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to=point_interet_image_path, blank=True, null=True)
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE, related_name='points_interet')

    def __str__(self):
        return self.nom


class TypeVehicule(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    libelle = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.libelle


class Capacite(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nombre_places = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.nombre_places} places"


class EtatVehicule(models.TextChoices):
    DISPONIBLE = 'DISPONIBLE', 'Disponible'
    RESERVE = 'RESERVE', 'Réservé'
    MAINTENANCE = 'MAINTENANCE', 'En maintenance'


class Vehicule(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    immatriculation = models.CharField(max_length=20, unique=True)
    marque = models.CharField(max_length=100)
    modele = models.CharField(max_length=100)
    annee = models.IntegerField()
    type = models.ForeignKey(TypeVehicule, on_delete=models.CASCADE, related_name='vehicules')
    capacite = models.ForeignKey(Capacite, on_delete=models.CASCADE, related_name='vehicules')
    prix = models.DecimalField(max_digits=10, decimal_places=2)  # Nom original dans la DB
    etat = models.CharField(max_length=20, choices=EtatVehicule.choices, default=EtatVehicule.DISPONIBLE)
    # image = models.ImageField(upload_to=vehicule_image_path, blank=True, null=True)

    def __str__(self):
        return f"{self.marque} {self.modele} ({self.immatriculation})"

    def get_caracteristiques_list(self):
        return [c.strip() for c in self.caracteristiques.split(',')] if self.caracteristiques else []

    def get_conditions_location_list(self):
        return [c.strip() for c in self.conditions_location.split(',')] if self.conditions_location else []


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


class StatutReservation(models.TextChoices):
    EN_ATTENTE = 'EN_ATTENTE', 'En attente'
    CONFIRMEE = 'CONFIRMEE', 'Confirmée'
    ANNULEE = 'ANNULEE', 'Annulée'
    TERMINEE = 'TERMINEE', 'Terminée'


class Reservation(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='reservations')
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE, related_name='reservations')
    vehicule = models.ForeignKey(Vehicule, on_delete=models.CASCADE, related_name='reservations')
    date_reservation = models.DateTimeField(default=timezone.now)
    date_depart = models.DateTimeField()
    statut = models.CharField(max_length=20, choices=StatutReservation.choices, default=StatutReservation.EN_ATTENTE)
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
    
    def __str__(self):
        return f"Réservation {self.id} - {self.nom} {self.prenom}"


class Guide(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    specialite = models.CharField(max_length=100)
    langues = models.JSONField()
    biographie = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to=guide_photo_path, blank=True, null=True)
    disponibilite = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Message(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='messages')
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    sujet = models.CharField(max_length=200)
    contenu = models.TextField()
    date_envoi = models.DateTimeField(default=timezone.now)
    lu = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message de {self.nom} {self.prenom}: {self.sujet}"


class Blog(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    datePublication = models.DateTimeField(default=timezone.now)
    auteur = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to=blog_image_path, blank=True, null=True)
    tags = models.JSONField(default=list, blank=True)

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
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    question = models.CharField(max_length=255)
    reponse = models.TextField()
    categorie = models.CharField(max_length=100, blank=True, null=True)
    order_affichage = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.question
    
    class Meta:
        ordering = ['order_affichage']


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


class DestinationImage(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=destination_image_path)
    titre = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ordre = models.IntegerField(default=0, help_text="Ordre d'affichage")

    def __str__(self):
        return f"Image {self.ordre} - {self.destination.nom}"

    class Meta:
        ordering = ['ordre']


class BlogImage(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=36)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=blog_image_path)
    titre = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    ordre = models.IntegerField(default=0, help_text="Ordre d'affichage")

    def __str__(self):
        return f"Image {self.ordre} - {self.blog.titre}"

    class Meta:
        ordering = ['ordre']   