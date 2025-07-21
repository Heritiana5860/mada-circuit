import graphene
from graphene_file_upload.scalars import Upload
from django.contrib.auth import authenticate
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db import transaction
from decimal import Decimal
import hashlib
import time

from .models import (
    Utilisateur, Destination, Saison, Circuit, PointInteret,
    TypeVehicule, Capacite, Vehicule, Reservation, Guide,
    Message, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, DestinationImage, BlogImage,
    StatutReservation, EtatVehicule
)
from .types import (
    UtilisateurType, DestinationType, SaisonType, CircuitType,
    PointInteretType, TypeVehiculeType, CapaciteType, VehiculeType,
    ReservationType, GuideType, MessageType, BlogType,
    BlogCommentaireType, FaqType,
    CircuitImageType, VehiculeImageType, DestinationImageType, BlogImageType
)



# Mutations pour les utilisateurs
class CreateUtilisateur(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        telephone = graphene.String()
        role = graphene.String()

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, email, password, nom, prenom, telephone=None, role=None):
        try:
            with transaction.atomic():
                if Utilisateur.objects.filter(email=email).exists():
                    return CreateUtilisateur(success=False, errors=["Un utilisateur avec cet email existe déjà"])
                
                utilisateur = Utilisateur.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    nom=nom,
                    prenom=prenom,
                    telephone=telephone,
                    role=role or 'CLIENT'
                )
                return CreateUtilisateur(utilisateur=utilisateur, success=True)
        except Exception as e:
            return CreateUtilisateur(success=False, errors=[str(e)])

class UpdateUtilisateur(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        email = graphene.String()
        nom = graphene.String()
        prenom = graphene.String()
        telephone = graphene.String()
        role = graphene.String()

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            utilisateur = Utilisateur.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(utilisateur, field, value)
            utilisateur.save()
            return UpdateUtilisateur(utilisateur=utilisateur, success=True)
        except Utilisateur.DoesNotExist:
            return UpdateUtilisateur(success=False, errors=["Utilisateur non trouvé"])
        except Exception as e:
            return UpdateUtilisateur(success=False, errors=[str(e)])

class DeleteUtilisateur(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            utilisateur = Utilisateur.objects.get(pk=id)
            utilisateur.delete()
            return DeleteUtilisateur(success=True)
        except Utilisateur.DoesNotExist:
            return DeleteUtilisateur(success=False, errors=["Utilisateur non trouvé"])
        except Exception as e:
            return DeleteUtilisateur(success=False, errors=[str(e)])

# Mutations pour les destinations
class CreateDestination(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        description = graphene.String(required=True)
        region = graphene.String(required=True)
        pays = graphene.String()
        image = Upload()

    destination = graphene.Field(DestinationType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, nom, description, region, pays="Madagascar", image=None):
        try:
            destination = Destination.objects.create(
                nom=nom,
                description=description,
                region=region,
                pays=pays,
                image=image
            )
            return CreateDestination(destination=destination, success=True)
        except Exception as e:
            return CreateDestination(success=False, errors=[str(e)])

class UpdateDestination(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        nom = graphene.String()
        description = graphene.String()
        region = graphene.String()
        pays = graphene.String()
        image = Upload()

    destination = graphene.Field(DestinationType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            destination = Destination.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(destination, field, value)
            destination.save()
            return UpdateDestination(destination=destination, success=True)
        except Destination.DoesNotExist:
            return UpdateDestination(success=False, errors=["Destination non trouvée"])
        except Exception as e:
            return UpdateDestination(success=False, errors=[str(e)])

class DeleteDestination(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            destination = Destination.objects.get(pk=id)
            destination.delete()
            return DeleteDestination(success=True)
        except Destination.DoesNotExist:
            return DeleteDestination(success=False, errors=["Destination non trouvée"])
        except Exception as e:
            return DeleteDestination(success=False, errors=[str(e)])

# Mutations pour les saisons
class CreateSaison(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        date_debut = graphene.Date(required=True)
        date_fin = graphene.Date(required=True)

    saison = graphene.Field(SaisonType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, nom, date_debut, date_fin):
        try:
            if date_debut >= date_fin:
                return CreateSaison(success=False, errors=["La date de début doit être antérieure à la date de fin"])
            
            saison = Saison.objects.create(
                nom=nom,
                date_debut=date_debut,
                date_fin=date_fin
            )
            return CreateSaison(saison=saison, success=True)
        except Exception as e:
            return CreateSaison(success=False, errors=[str(e)])

class UpdateSaison(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        nom = graphene.String()
        date_debut = graphene.Date()
        date_fin = graphene.Date()

    saison = graphene.Field(SaisonType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            saison = Saison.objects.get(pk=id)
            
            # Validation des dates
            date_debut = kwargs.get('date_debut', saison.date_debut)
            date_fin = kwargs.get('date_fin', saison.date_fin)
            if date_debut >= date_fin:
                return UpdateSaison(success=False, errors=["La date de début doit être antérieure à la date de fin"])
            
            for field, value in kwargs.items():
                if value is not None:
                    setattr(saison, field, value)
            saison.save()
            return UpdateSaison(saison=saison, success=True)
        except Saison.DoesNotExist:
            return UpdateSaison(success=False, errors=["Saison non trouvée"])
        except Exception as e:
            return UpdateSaison(success=False, errors=[str(e)])

class DeleteSaison(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            saison = Saison.objects.get(pk=id)
            if saison.circuits.exists():
                return DeleteSaison(success=False, errors=["Impossible de supprimer une saison avec des circuits associés"])
            saison.delete()
            return DeleteSaison(success=True)
        except Saison.DoesNotExist:
            return DeleteSaison(success=False, errors=["Saison non trouvée"])
        except Exception as e:
            return DeleteSaison(success=False, errors=[str(e)])

# Mutations pour les circuits
class CreateCircuit(graphene.Mutation):
    class Arguments:
        titre = graphene.String(required=True)
        description = graphene.String(required=True)
        duree = graphene.Int(required=True)
        prix = graphene.Float(required=True)
        image = Upload()
        difficulte = graphene.String(required=True)
        destination_id = graphene.ID(required=True)
        saison_id = graphene.ID(required=True)

    circuit = graphene.Field(CircuitType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, titre, description, duree, prix, difficulte, destination_id, saison_id, image=None):
        try:
            with transaction.atomic():
                destination = Destination.objects.get(pk=destination_id)
                saison = Saison.objects.get(pk=saison_id)

                circuit = Circuit.objects.create(
                    titre=titre,
                    description=description,
                    duree=duree,
                    prix=Decimal(str(prix)),
                    image=image,
                    difficulte=difficulte,
                    destination=destination,
                    saison=saison
                )
                return CreateCircuit(circuit=circuit, success=True)
        except (Destination.DoesNotExist, Saison.DoesNotExist):
            return CreateCircuit(success=False, errors=["Destination ou saison non trouvée"])
        except Exception as e:
            return CreateCircuit(success=False, errors=[str(e)])

class UpdateCircuit(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        titre = graphene.String()
        description = graphene.String()
        duree = graphene.Int()
        prix = graphene.Float()
        image = Upload()
        difficulte = graphene.String()
        destination_id = graphene.ID()
        saison_id = graphene.ID()

    circuit = graphene.Field(CircuitType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            circuit = Circuit.objects.get(pk=id)

            # Gestion des relations
            if 'destination_id' in kwargs and kwargs['destination_id']:
                circuit.destination = Destination.objects.get(pk=kwargs['destination_id'])
                del kwargs['destination_id']

            if 'saison_id' in kwargs and kwargs['saison_id']:
                circuit.saison = Saison.objects.get(pk=kwargs['saison_id'])
                del kwargs['saison_id']

            # Conversion du prix
            if 'prix' in kwargs and kwargs['prix'] is not None:
                kwargs['prix'] = Decimal(str(kwargs['prix']))

            for field, value in kwargs.items():
                if value is not None:
                    setattr(circuit, field, value)
            circuit.save()
            return UpdateCircuit(circuit=circuit, success=True)
        except Circuit.DoesNotExist:
            return UpdateCircuit(success=False, errors=["Circuit non trouvé"])
        except (Destination.DoesNotExist, Saison.DoesNotExist):
            return UpdateCircuit(success=False, errors=["Destination ou saison non trouvée"])
        except Exception as e:
            return UpdateCircuit(success=False, errors=[str(e)])

class DeleteCircuit(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            circuit = Circuit.objects.get(pk=id)
            if circuit.reservations.filter(statut__in=['EN_ATTENTE', 'CONFIRMEE']).exists():
                return DeleteCircuit(success=False, errors=["Impossible de supprimer un circuit avec des réservations actives"])
            circuit.delete()
            return DeleteCircuit(success=True)
        except Circuit.DoesNotExist:
            return DeleteCircuit(success=False, errors=["Circuit non trouvé"])
        except Exception as e:
            return DeleteCircuit(success=False, errors=[str(e)])

# Mutations pour les véhicules
class CreateVehicule(graphene.Mutation):
    class Arguments:
        immatriculation = graphene.String(required=True)
        marque = graphene.String(required=True)
        modele = graphene.String(required=True)
        annee = graphene.Int(required=True)
        type_id = graphene.ID(required=True)
        capacite_id = graphene.ID(required=True)
        prix = graphene.Float(required=True)
        etat = graphene.String()
        image = Upload()

    vehicule = graphene.Field(VehiculeType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, immatriculation, marque, modele, annee, type_id, capacite_id, prix, etat="DISPONIBLE", image=None):
        try:
            with transaction.atomic():
                if Vehicule.objects.filter(immatriculation=immatriculation).exists():
                    return CreateVehicule(success=False, errors=["Un véhicule avec cette immatriculation existe déjà"])

                type_vehicule = TypeVehicule.objects.get(pk=type_id)
                capacite = Capacite.objects.get(pk=capacite_id)

                vehicule = Vehicule.objects.create(
                    immatriculation=immatriculation,
                    marque=marque,
                    modele=modele,
                    annee=annee,
                    type=type_vehicule,
                    capacite=capacite,
                    prix=Decimal(str(prix)),
                    etat=etat,
                    image=image
                )
                return CreateVehicule(vehicule=vehicule, success=True)
        except (TypeVehicule.DoesNotExist, Capacite.DoesNotExist):
            return CreateVehicule(success=False, errors=["Type de véhicule ou capacité non trouvé"])
        except Exception as e:
            return CreateVehicule(success=False, errors=[str(e)])

class UpdateVehicule(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        immatriculation = graphene.String()
        marque = graphene.String()
        modele = graphene.String()
        annee = graphene.Int()
        type_id = graphene.ID()
        capacite_id = graphene.ID()
        prix = graphene.Float()
        etat = graphene.String()
        image = Upload()

    vehicule = graphene.Field(VehiculeType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            vehicule = Vehicule.objects.get(pk=id)

            # Vérifier l'unicité de l'immatriculation si elle est modifiée
            if 'immatriculation' in kwargs and kwargs['immatriculation']:
                if Vehicule.objects.filter(immatriculation=kwargs['immatriculation']).exclude(pk=id).exists():
                    return UpdateVehicule(success=False, errors=["Un véhicule avec cette immatriculation existe déjà"])

            # Gérer les relations
            if 'type_id' in kwargs and kwargs['type_id']:
                try:
                    type_vehicule = TypeVehicule.objects.get(pk=kwargs['type_id'])
                    vehicule.type = type_vehicule
                    del kwargs['type_id']
                except TypeVehicule.DoesNotExist:
                    return UpdateVehicule(success=False, errors=["Type de véhicule non trouvé"])

            if 'capacite_id' in kwargs and kwargs['capacite_id']:
                try:
                    capacite = Capacite.objects.get(pk=kwargs['capacite_id'])
                    vehicule.capacite = capacite
                    del kwargs['capacite_id']
                except Capacite.DoesNotExist:
                    return UpdateVehicule(success=False, errors=["Capacité non trouvée"])

            # Convertir le prix en Decimal si fourni
            if 'prix' in kwargs and kwargs['prix'] is not None:
                kwargs['prix'] = Decimal(str(kwargs['prix']))

            # Mettre à jour les autres champs
            for field, value in kwargs.items():
                if value is not None:
                    setattr(vehicule, field, value)

            vehicule.save()
            return UpdateVehicule(vehicule=vehicule, success=True)
        except Vehicule.DoesNotExist:
            return UpdateVehicule(success=False, errors=["Véhicule non trouvé"])
        except Exception as e:
            return UpdateVehicule(success=False, errors=[str(e)])

# Mutations pour les réservations
class CreateReservation(graphene.Mutation):
    class Arguments:
        circuit_id = graphene.ID(required=True)
        vehicule_id = graphene.ID(required=True)
        date_depart = graphene.DateTime(required=True)
        duree = graphene.Int(required=True)
        nombre_personnes = graphene.Int(required=True)
        hebergement = graphene.String()
        activite = graphene.String()
        budget = graphene.String()
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        email = graphene.String(required=True)
        telephone = graphene.String(required=True)
        commentaire = graphene.String()
        utilisateur_id = graphene.ID()

    reservation = graphene.Field(ReservationType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, circuit_id, vehicule_id, date_depart, duree, nombre_personnes,
               nom, prenom, email, telephone, **kwargs):
        try:
            with transaction.atomic():
                circuit = Circuit.objects.get(pk=circuit_id)
                vehicule = Vehicule.objects.get(pk=vehicule_id)

                # Vérifications de disponibilité
                if vehicule.etat != EtatVehicule.DISPONIBLE:
                    return CreateReservation(success=False, errors=["Véhicule non disponible"])

                if vehicule.capacite.nombre_places < nombre_personnes:
                    return CreateReservation(success=False, errors=["Capacité du véhicule insuffisante"])

                # Vérifier les conflits de dates
                conflicting_reservations = Reservation.objects.filter(
                    vehicule=vehicule,
                    statut__in=[StatutReservation.EN_ATTENTE, StatutReservation.CONFIRMEE],
                    date_depart__date=date_depart.date()
                )
                if conflicting_reservations.exists():
                    return CreateReservation(success=False, errors=["Véhicule déjà réservé pour cette date"])

                utilisateur = None
                if kwargs.get('utilisateur_id'):
                    utilisateur = Utilisateur.objects.get(pk=kwargs['utilisateur_id'])

                reservation = Reservation.objects.create(
                    utilisateur=utilisateur,
                    circuit=circuit,
                    vehicule=vehicule,
                    date_depart=date_depart,
                    duree=duree,
                    nombre_personnes=nombre_personnes,
                    hebergement=kwargs.get('hebergement', 'STANDARD'),
                    activite=kwargs.get('activite', 'RANDONNEE'),
                    budget=kwargs.get('budget'),
                    nom=nom,
                    prenom=prenom,
                    email=email,
                    telephone=telephone,
                    commentaire=kwargs.get('commentaire')
                )

                # Marquer le véhicule comme réservé
                vehicule.etat = EtatVehicule.RESERVE
                vehicule.save()

                return CreateReservation(reservation=reservation, success=True)
        except (Circuit.DoesNotExist, Vehicule.DoesNotExist, Utilisateur.DoesNotExist):
            return CreateReservation(success=False, errors=["Circuit, véhicule ou utilisateur non trouvé"])
        except Exception as e:
            return CreateReservation(success=False, errors=[str(e)])

class UpdateReservationStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        statut = graphene.String(required=True)

    reservation = graphene.Field(ReservationType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, statut):
        try:
            with transaction.atomic():
                reservation = Reservation.objects.get(pk=id)
                old_statut = reservation.statut
                reservation.statut = statut
                reservation.save()

                # Gestion de l'état du véhicule
                if statut == StatutReservation.ANNULEE and old_statut != StatutReservation.ANNULEE:
                    reservation.vehicule.etat = EtatVehicule.DISPONIBLE
                    reservation.vehicule.save()
                elif statut == StatutReservation.CONFIRMEE and old_statut != StatutReservation.CONFIRMEE:
                    reservation.vehicule.etat = EtatVehicule.RESERVE
                    reservation.vehicule.save()

                return UpdateReservationStatus(reservation=reservation, success=True)
        except Reservation.DoesNotExist:
            return UpdateReservationStatus(success=False, errors=["Réservation non trouvée"])
        except Exception as e:
            return UpdateReservationStatus(success=False, errors=[str(e)])

# Mutations pour les messages
class CreateMessage(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        telephone = graphene.String(required=True)
        sujet = graphene.String(required=True)
        contenu = graphene.String(required=True)
        utilisateur_id = graphene.ID()

    message = graphene.Field(MessageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, nom, prenom, telephone, sujet, contenu, utilisateur_id=None):
        try:
            utilisateur = None
            if utilisateur_id:
                utilisateur = Utilisateur.objects.get(pk=utilisateur_id)

            message = Message.objects.create(
                utilisateur=utilisateur,
                nom=nom,
                prenom=prenom,
                telephone=telephone,
                sujet=sujet,
                contenu=contenu
            )
            return CreateMessage(message=message, success=True)
        except Utilisateur.DoesNotExist:
            return CreateMessage(success=False, errors=["Utilisateur non trouvé"])
        except Exception as e:
            return CreateMessage(success=False, errors=[str(e)])

class UpdateMessage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        lu = graphene.Boolean()

    message = graphene.Field(MessageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, lu=None):
        try:
            message = Message.objects.get(pk=id)
            if lu is not None:
                message.lu = lu
            message.save()
            return UpdateMessage(message=message, success=True)
        except Message.DoesNotExist:
            return UpdateMessage(success=False, errors=["Message non trouvé"])
        except Exception as e:
            return UpdateMessage(success=False, errors=[str(e)])

class DeleteMessage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            message = Message.objects.get(pk=id)
            message.delete()
            return DeleteMessage(success=True)
        except Message.DoesNotExist:
            return DeleteMessage(success=False, errors=["Message non trouvé"])
        except Exception as e:
            return DeleteMessage(success=False, errors=[str(e)])

# Mutations pour les blogs
class CreateBlog(graphene.Mutation):
    class Arguments:
        titre = graphene.String(required=True)
        contenu = graphene.String(required=True)
        auteur = graphene.String()
        image = Upload()
        tags = graphene.List(graphene.String)

    blog = graphene.Field(BlogType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, titre, contenu, auteur=None, image=None, tags=None):
        try:
            # Nettoyer les valeurs None/vides
            cleaned_data = {
                'titre': titre,
                'contenu': contenu,
                'tags': tags or []
            }

            # Ajouter auteur seulement s'il n'est pas None ou vide
            if auteur and auteur.strip():
                cleaned_data['auteur'] = auteur

            # Ajouter image seulement si elle n'est pas None
            if image is not None:
                cleaned_data['image'] = image

            blog = Blog.objects.create(**cleaned_data)
            return CreateBlog(blog=blog, success=True)
        except Exception as e:
            return CreateBlog(success=False, errors=[str(e)])

class UpdateBlog(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        titre = graphene.String()
        contenu = graphene.String()
        auteur = graphene.String()
        image = Upload()
        tags = graphene.List(graphene.String)

    blog = graphene.Field(BlogType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            blog = Blog.objects.get(pk=id)

            # Traiter chaque champ spécifiquement
            for field, value in kwargs.items():
                if field == 'auteur':
                    # Pour auteur, ne mettre à jour que si la valeur n'est pas None et pas vide
                    if value is not None:
                        if value.strip():
                            setattr(blog, field, value)
                        else:
                            setattr(blog, field, None)
                elif field == 'tags':
                    # Pour tags, utiliser une liste vide si None
                    setattr(blog, field, value or [])
                elif value is not None:
                    # Pour les autres champs, mettre à jour seulement si pas None
                    setattr(blog, field, value)

            blog.save()
            return UpdateBlog(blog=blog, success=True)
        except Blog.DoesNotExist:
            return UpdateBlog(success=False, errors=["Blog non trouvé"])
        except Exception as e:
            return UpdateBlog(success=False, errors=[str(e)])

class DeleteBlog(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            blog = Blog.objects.get(pk=id)
            blog.delete()
            return DeleteBlog(success=True)
        except Blog.DoesNotExist:
            return DeleteBlog(success=False, errors=["Blog non trouvé"])
        except Exception as e:
            return DeleteBlog(success=False, errors=[str(e)])

# Mutations pour les commentaires de blog
class CreateBlogCommentaire(graphene.Mutation):
    class Arguments:
        blog_id = graphene.ID(required=True)
        utilisateur_id = graphene.ID(required=True)
        contenu = graphene.String(required=True)

    commentaire = graphene.Field(BlogCommentaireType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, blog_id, utilisateur_id, contenu):
        try:
            blog = Blog.objects.get(pk=blog_id)
            utilisateur = Utilisateur.objects.get(pk=utilisateur_id)

            commentaire = BlogCommentaire.objects.create(
                blog=blog,
                utilisateur=utilisateur,
                contenu=contenu
            )
            return CreateBlogCommentaire(commentaire=commentaire, success=True)
        except (Blog.DoesNotExist, Utilisateur.DoesNotExist):
            return CreateBlogCommentaire(success=False, errors=["Blog ou utilisateur non trouvé"])
        except Exception as e:
            return CreateBlogCommentaire(success=False, errors=[str(e)])

class DeleteBlogCommentaire(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            commentaire = BlogCommentaire.objects.get(pk=id)
            commentaire.delete()
            return DeleteBlogCommentaire(success=True)
        except BlogCommentaire.DoesNotExist:
            return DeleteBlogCommentaire(success=False, errors=["Commentaire non trouvé"])
        except Exception as e:
            return DeleteBlogCommentaire(success=False, errors=[str(e)])

# Mutations pour les FAQs
class CreateFaq(graphene.Mutation):
    class Arguments:
        question = graphene.String(required=True)
        reponse = graphene.String(required=True)
        categorie = graphene.String()
        order_affichage = graphene.Int()
        active = graphene.Boolean()

    faq = graphene.Field(FaqType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, question, reponse, categorie=None, order_affichage=0, active=True):
        try:
            faq = Faq.objects.create(
                question=question,
                reponse=reponse,
                categorie=categorie,
                order_affichage=order_affichage,
                active=active
            )
            return CreateFaq(faq=faq, success=True)
        except Exception as e:
            return CreateFaq(success=False, errors=[str(e)])

class UpdateFaq(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        question = graphene.String()
        reponse = graphene.String()
        categorie = graphene.String()
        order_affichage = graphene.Int()
        active = graphene.Boolean()

    faq = graphene.Field(FaqType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            faq = Faq.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(faq, field, value)
            faq.save()
            return UpdateFaq(faq=faq, success=True)
        except Faq.DoesNotExist:
            return UpdateFaq(success=False, errors=["FAQ non trouvée"])
        except Exception as e:
            return UpdateFaq(success=False, errors=[str(e)])

class DeleteFaq(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            faq = Faq.objects.get(pk=id)
            faq.delete()
            return DeleteFaq(success=True)
        except Faq.DoesNotExist:
            return DeleteFaq(success=False, errors=["FAQ non trouvée"])
        except Exception as e:
            return DeleteFaq(success=False, errors=[str(e)])

# Mutations pour les types de véhicules et capacités
class CreateTypeVehicule(graphene.Mutation):
    class Arguments:
        libelle = graphene.String(required=True)

    type_vehicule = graphene.Field(TypeVehiculeType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, libelle):
        try:
            type_vehicule = TypeVehicule.objects.create(libelle=libelle)
            return CreateTypeVehicule(type_vehicule=type_vehicule, success=True)
        except Exception as e:
            return CreateTypeVehicule(success=False, errors=[str(e)])

class CreateCapacite(graphene.Mutation):
    class Arguments:
        nombre_places = graphene.Int(required=True)
        description = graphene.String()

    capacite = graphene.Field(CapaciteType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, nombre_places, description=None):
        try:
            capacite = Capacite.objects.create(
                nombre_places=nombre_places,
                description=description
            )
            return CreateCapacite(capacite=capacite, success=True)
        except Exception as e:
            return CreateCapacite(success=False, errors=[str(e)])

# Mutations d'authentification
class RegisterUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        telephone = graphene.String()

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()

    def mutate(self, info, email, password, nom, prenom, telephone=None):
        try:
            with transaction.atomic():
                # Vérifier si l'utilisateur existe déjà
                if Utilisateur.objects.filter(email=email).exists():
                    return RegisterUser(
                        success=False,
                        errors=["Un utilisateur avec cet email existe déjà"]
                    )

                # Validation de l'email
                if '@' not in email or '.' not in email:
                    return RegisterUser(
                        success=False,
                        errors=["Format d'email invalide"]
                    )

                # Validation du mot de passe
                if len(password) < 6:
                    return RegisterUser(
                        success=False,
                        errors=["Le mot de passe doit contenir au moins 6 caractères"]
                    )

                # Créer l'utilisateur
                utilisateur = Utilisateur.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    nom=nom,
                    prenom=prenom,
                    telephone=telephone,
                    role='CLIENT'  # Par défaut, les nouveaux utilisateurs sont des clients
                )

                # Générer un token simple (optionnel)
                import uuid
                token = f"token_{utilisateur.id}_{uuid.uuid4().hex[:8]}"

                return RegisterUser(
                    utilisateur=utilisateur,
                    success=True,
                    token=token
                )

        except Exception as e:
            return RegisterUser(success=False, errors=[str(e)])

class LoginUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()

    def mutate(self, info, email, password):
        try:
            # Authentifier l'utilisateur
            utilisateur = authenticate(username=email, password=password)

            if utilisateur is None:
                return LoginUser(
                    success=False,
                    errors=["Email ou mot de passe incorrect"]
                )

            if not utilisateur.is_active:
                return LoginUser(
                    success=False,
                    errors=["Compte utilisateur désactivé"]
                )

            # Générer un token simple (optionnel)
            import uuid
            token = f"token_{utilisateur.id}_{uuid.uuid4().hex[:8]}"

            return LoginUser(
                utilisateur=utilisateur,
                success=True,
                token=token
            )

        except Exception as e:
            return LoginUser(success=False, errors=[str(e)])

class LogoutUser(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info):
        try:
            # Dans une vraie application, vous pourriez invalider le token ici
            # Pour l'instant, on retourne juste un succès
            return LogoutUser(
                success=True,
                message="Déconnexion réussie"
            )
        except Exception as e:
            return LogoutUser(success=False, message=str(e))

class ChangePassword(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        old_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, user_id, old_password, new_password):
        try:
            utilisateur = Utilisateur.objects.get(pk=user_id)

            # Vérifier l'ancien mot de passe
            if not utilisateur.check_password(old_password):
                return ChangePassword(
                    success=False,
                    errors=["Ancien mot de passe incorrect"]
                )

            # Validation du nouveau mot de passe
            if len(new_password) < 6:
                return ChangePassword(
                    success=False,
                    errors=["Le nouveau mot de passe doit contenir au moins 6 caractères"]
                )

            # Changer le mot de passe
            utilisateur.set_password(new_password)
            utilisateur.save()

            return ChangePassword(success=True)

        except Utilisateur.DoesNotExist:
            return ChangePassword(success=False, errors=["Utilisateur non trouvé"])
        except Exception as e:
            return ChangePassword(success=False, errors=[str(e)])

class ResetPasswordRequest(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    errors = graphene.List(graphene.String)

    def mutate(self, info, email):
        try:
            utilisateur = Utilisateur.objects.get(email=email)

            # Dans une vraie application, vous enverriez un email ici
            # Pour l'instant, on simule juste le processus

            return ResetPasswordRequest(
                success=True,
                message="Un email de réinitialisation a été envoyé à votre adresse"
            )

        except Utilisateur.DoesNotExist:
            return ResetPasswordRequest(
                success=False,
                errors=["Aucun utilisateur trouvé avec cet email"]
            )
        except Exception as e:
            return ResetPasswordRequest(success=False, errors=[str(e)])

# Mutations pour les galeries d'images
class CreateCircuitImage(graphene.Mutation):
    class Arguments:
        circuit_id = graphene.ID(required=True)
        image = Upload(required=True)
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    circuit_image = graphene.Field(CircuitImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, circuit_id, image, titre=None, description=None, ordre=0):
        try:
            circuit = Circuit.objects.get(pk=circuit_id)
            circuit_image = CircuitImage.objects.create(
                circuit=circuit,
                image=image,
                titre=titre,
                description=description,
                ordre=ordre
            )
            return CreateCircuitImage(circuit_image=circuit_image, success=True)
        except Circuit.DoesNotExist:
            return CreateCircuitImage(success=False, errors=["Circuit non trouvé"])
        except Exception as e:
            return CreateCircuitImage(success=False, errors=[str(e)])

class UpdateCircuitImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        image = Upload()
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    circuit_image = graphene.Field(CircuitImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            circuit_image = CircuitImage.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(circuit_image, field, value)
            circuit_image.save()
            return UpdateCircuitImage(circuit_image=circuit_image, success=True)
        except CircuitImage.DoesNotExist:
            return UpdateCircuitImage(success=False, errors=["Image de circuit non trouvée"])
        except Exception as e:
            return UpdateCircuitImage(success=False, errors=[str(e)])

class DeleteCircuitImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            circuit_image = CircuitImage.objects.get(pk=id)
            circuit_image.delete()
            return DeleteCircuitImage(success=True)
        except CircuitImage.DoesNotExist:
            return DeleteCircuitImage(success=False, errors=["Image de circuit non trouvée"])
        except Exception as e:
            return DeleteCircuitImage(success=False, errors=[str(e)])

class CreateVehiculeImage(graphene.Mutation):
    class Arguments:
        vehicule_id = graphene.ID(required=True)
        image = Upload(required=True)
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    vehicule_image = graphene.Field(VehiculeImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, vehicule_id, image, titre=None, description=None, ordre=0):
        try:
            vehicule = Vehicule.objects.get(pk=vehicule_id)
            vehicule_image = VehiculeImage.objects.create(
                vehicule=vehicule,
                image=image,
                titre=titre,
                description=description,
                ordre=ordre
            )
            return CreateVehiculeImage(vehicule_image=vehicule_image, success=True)
        except Vehicule.DoesNotExist:
            return CreateVehiculeImage(success=False, errors=["Véhicule non trouvé"])
        except Exception as e:
            return CreateVehiculeImage(success=False, errors=[str(e)])

class UpdateVehiculeImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        image = Upload()
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    vehicule_image = graphene.Field(VehiculeImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            vehicule_image = VehiculeImage.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(vehicule_image, field, value)
            vehicule_image.save()
            return UpdateVehiculeImage(vehicule_image=vehicule_image, success=True)
        except VehiculeImage.DoesNotExist:
            return UpdateVehiculeImage(success=False, errors=["Image de véhicule non trouvée"])
        except Exception as e:
            return UpdateVehiculeImage(success=False, errors=[str(e)])

class DeleteVehiculeImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            vehicule_image = VehiculeImage.objects.get(pk=id)
            vehicule_image.delete()
            return DeleteVehiculeImage(success=True)
        except VehiculeImage.DoesNotExist:
            return DeleteVehiculeImage(success=False, errors=["Image de véhicule non trouvée"])
        except Exception as e:
            return DeleteVehiculeImage(success=False, errors=[str(e)])

class CreateDestinationImage(graphene.Mutation):
    class Arguments:
        destination_id = graphene.ID(required=True)
        image = Upload(required=True)
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    destination_image = graphene.Field(DestinationImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, destination_id, image, titre=None, description=None, ordre=0):
        try:
            destination = Destination.objects.get(pk=destination_id)
            destination_image = DestinationImage.objects.create(
                destination=destination,
                image=image,
                titre=titre,
                description=description,
                ordre=ordre
            )
            return CreateDestinationImage(destination_image=destination_image, success=True)
        except Destination.DoesNotExist:
            return CreateDestinationImage(success=False, errors=["Destination non trouvée"])
        except Exception as e:
            return CreateDestinationImage(success=False, errors=[str(e)])

class UpdateDestinationImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        image = Upload()
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    destination_image = graphene.Field(DestinationImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            destination_image = DestinationImage.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(destination_image, field, value)
            destination_image.save()
            return UpdateDestinationImage(destination_image=destination_image, success=True)
        except DestinationImage.DoesNotExist:
            return UpdateDestinationImage(success=False, errors=["Image de destination non trouvée"])
        except Exception as e:
            return UpdateDestinationImage(success=False, errors=[str(e)])

class DeleteDestinationImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            destination_image = DestinationImage.objects.get(pk=id)
            destination_image.delete()
            return DeleteDestinationImage(success=True)
        except DestinationImage.DoesNotExist:
            return DeleteDestinationImage(success=False, errors=["Image de destination non trouvée"])
        except Exception as e:
            return DeleteDestinationImage(success=False, errors=[str(e)])

class CreateBlogImage(graphene.Mutation):
    class Arguments:
        blog_id = graphene.ID(required=True)
        image = Upload(required=True)
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    blog_image = graphene.Field(BlogImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, blog_id, image, titre=None, description=None, ordre=0):
        try:
            blog = Blog.objects.get(pk=blog_id)
            blog_image = BlogImage.objects.create(
                blog=blog,
                image=image,
                titre=titre,
                description=description,
                ordre=ordre
            )
            return CreateBlogImage(blog_image=blog_image, success=True)
        except Blog.DoesNotExist:
            return CreateBlogImage(success=False, errors=["Blog non trouvé"])
        except Exception as e:
            return CreateBlogImage(success=False, errors=[str(e)])

class UpdateBlogImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        image = Upload()
        titre = graphene.String()
        description = graphene.String()
        ordre = graphene.Int()

    blog_image = graphene.Field(BlogImageType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id, **kwargs):
        try:
            blog_image = BlogImage.objects.get(pk=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(blog_image, field, value)
            blog_image.save()
            return UpdateBlogImage(blog_image=blog_image, success=True)
        except BlogImage.DoesNotExist:
            return UpdateBlogImage(success=False, errors=["Image de blog non trouvée"])
        except Exception as e:
            return UpdateBlogImage(success=False, errors=[str(e)])

class DeleteBlogImage(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, id):
        try:
            blog_image = BlogImage.objects.get(pk=id)
            blog_image.delete()
            return DeleteBlogImage(success=True)
        except BlogImage.DoesNotExist:
            return DeleteBlogImage(success=False, errors=["Image de blog non trouvée"])
        except Exception as e:
            return DeleteBlogImage(success=False, errors=[str(e)])

class CheckVehicleAvailability(graphene.Mutation):
    class Arguments:
        vehicule_id = graphene.ID(required=True)
        date_depart = graphene.Date(required=True)
        date_fin = graphene.Date(required=False)

    disponible = graphene.Boolean()
    message = graphene.String()
    reservationsExistantes = graphene.List(ReservationType)
    def mutate(self, info, vehicule_id, date_depart, date_fin):
        reservation = Reservation.objects.filter(vehicule_id=vehicule_id, date_depart=date_depart)
        if reservation:
            return CheckVehicleAvailability(disponible=False, message=f"Le vehicule n'est pas disponnible entre {date_depart} et {date_fin}", reservationsExistantes=reservation)
        return CheckVehicleAvailability(disponible=True, message=f"Le vehicule est pas disponnible ", reservationsExistantes=None)

class CreateVehiculeReservation(graphene.Mutation):
    class Arguments:
        vehiculeId = graphene.ID(required=True)
        dateDebut = graphene.Date(required=True)
        dateFin = graphene.Date(required=True)
        nombrePersonnes = graphene.Int(required=True)
        prixTotal = graphene.Float(required=False)
        commentaires = graphene.String(required=False)

    id = graphene.ID()
    dateReservation = graphene.Date()
    dateDebut = graphene.Date()
    dateFin= graphene.Date()
    nombrePersonnes = graphene.Int()
    prixTotal = graphene.Float()
    statut  = graphene.String()
    vehicule = graphene.Field(VehiculeType)

    

# Classe principale des mutations
class Mutation(graphene.ObjectType):
    # Mutations d'authentification
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    logout_user = LogoutUser.Field()
    change_password = ChangePassword.Field()
    reset_password_request = ResetPasswordRequest.Field()

    # Mutations utilisateurs
    create_utilisateur = CreateUtilisateur.Field()
    update_utilisateur = UpdateUtilisateur.Field()
    delete_utilisateur = DeleteUtilisateur.Field()

    # Mutations destinations
    create_destination = CreateDestination.Field()
    update_destination = UpdateDestination.Field()
    delete_destination = DeleteDestination.Field()

    # Mutations saisons
    create_saison = CreateSaison.Field()
    update_saison = UpdateSaison.Field()
    delete_saison = DeleteSaison.Field()

    # Mutations circuits
    create_circuit = CreateCircuit.Field()
    update_circuit = UpdateCircuit.Field()
    delete_circuit = DeleteCircuit.Field()

    # Mutations véhicules
    create_vehicule = CreateVehicule.Field()
    update_vehicule = UpdateVehicule.Field()
    create_type_vehicule = CreateTypeVehicule.Field()
    create_capacite = CreateCapacite.Field()

    # Mutations réservations
    create_reservation = CreateReservation.Field()
    update_reservation_status = UpdateReservationStatus.Field()

    # Mutations messages
    create_message = CreateMessage.Field()
    update_message = UpdateMessage.Field()
    delete_message = DeleteMessage.Field()

    # Mutations blogs
    create_blog = CreateBlog.Field()
    update_blog = UpdateBlog.Field()
    delete_blog = DeleteBlog.Field()
    create_blog_commentaire = CreateBlogCommentaire.Field()
    delete_blog_commentaire = DeleteBlogCommentaire.Field()

    # Mutations FAQs
    create_faq = CreateFaq.Field()
    update_faq = UpdateFaq.Field()
    delete_faq = DeleteFaq.Field()

    # Mutations pour les galeries d'images
    create_circuit_image = CreateCircuitImage.Field()
    update_circuit_image = UpdateCircuitImage.Field()
    delete_circuit_image = DeleteCircuitImage.Field()

    create_vehicule_image = CreateVehiculeImage.Field()
    update_vehicule_image = UpdateVehiculeImage.Field()
    delete_vehicule_image = DeleteVehiculeImage.Field()

    create_destination_image = CreateDestinationImage.Field()
    update_destination_image = UpdateDestinationImage.Field()
    delete_destination_image = DeleteDestinationImage.Field()

    create_blog_image = CreateBlogImage.Field()
    update_blog_image = UpdateBlogImage.Field()
    delete_blog_image = DeleteBlogImage.Field()
    check_vehicle_availability = CheckVehicleAvailability.Field()

