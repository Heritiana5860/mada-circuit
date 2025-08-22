import graphene
from graphene_file_upload.scalars import Upload
from django.contrib.auth import authenticate
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.db import transaction
from decimal import Decimal
import logging

from .email_helper import (
    message, 
    confirmation_message, 
    objet_message, 
    objet_confirmation_message, 
    site_mail, 
    objet_message_sur_mesure, 
    sur_mesure_message, 
    confirmation_message_sur_mesure,
    objet_confirmation_message_sur_mesure)

from .models import (
    Utilisateur, Circuit, Itineraire, Vehicule, Reservation, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, BlogImage,
    EtatVehicule, Testimonia, ContactUsModele, Personnel, SurMesure, LieuAVisiter, SurMesureActivite
)
from .model_types import (
    UtilisateurType, CircuitType, VehiculeType,
    ReservationType, BlogType,
    BlogCommentaireType, FaqType,
    CircuitImageType, VehiculeImageType, BlogImageType, TestimoniaType, ContactUsType, PersonnelType, SurMesureType
)
from graphql_relay import from_global_id

logger = logging.getLogger("myapp") 
logger.setLevel(logging.INFO)

# Mutations pour les utilisateurs
class CreateUtilisateur(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        telephone = graphene.String()
        role = graphene.String()
        profileImage = Upload()

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, email, password, nom, prenom, telephone=None, role=None, profileImage=None):
        try:
            with transaction.atomic():
                if Utilisateur.objects.filter(email=email).exists():
                    return CreateUtilisateur(success=False, errors=["Un utilisateur avec cet email existe déjà"])
                
                # Validation de la photo si fournie
                if profileImage:
                    # Vérifier la taille du fichier (max 5MB)
                    if profileImage.size > 5 * 1024 * 1024:
                        return CreateUtilisateur(success=False, errors=["L'image ne doit pas dépasser 5MB"])
                    
                    # Vérifier le type de fichier
                    if not profileImage.content_type.startswith('image/'):
                        return CreateUtilisateur(success=False, errors=["Le fichier doit être une image"])
                    
                # Créer l'utilisateur avec tous les champs
                utilisateur_data = {
                    'username': email,
                    'email': email,
                    'password': password,
                    'nom': nom,
                    'prenom': prenom,
                    'telephone': telephone,
                    'role': role or 'CLIENT',
                }
                
                # Ajouter la photo si elle est fournie
                if profileImage:
                    utilisateur_data['profileImage'] = profileImage
                    
                utilisateur = Utilisateur.objects.create_user(**utilisateur_data)
                    
                return CreateUtilisateur(utilisateur=utilisateur, success=True, errors=[])
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

    @classmethod
    def mutate(cls, root, info, id):
        try:
            type_name, real_utilisateur_id = from_global_id(id)
            utilisateur = Utilisateur.objects.get(id=real_utilisateur_id)
            
            utilisateur.delete()
            return DeleteUtilisateur(success=True, errors=[])
        except Utilisateur.DoesNotExist:
            return DeleteUtilisateur(success=False, errors=["Utilisateur non trouvé"])
        except Exception as e:
            return DeleteUtilisateur(success=False, errors=[str(e)])

class ItineraireInput(graphene.InputObjectType):
    jour = graphene.Int(required=True, description="Jour de l'itinéraire (ex: 1, 2, ...)")
    lieu_depart = graphene.String(required=True, description="Lieu de départ")
    lieu_arrivee = graphene.String(required=False, description="Lieu d'arrivée")
    distance_km = graphene.Float(required=False, description="Distance en kilomètres")
    duree_trajet = graphene.Float(required=False, description="Durée du trajet en heures")
    description = graphene.String(required=False, description="Description de l'itinéraire")

# Mutations pour les circuits
class CreateCircuit(graphene.Mutation):
    class Arguments:
        titre = graphene.String(required=True)
        description = graphene.String(required=True)
        duree = graphene.Int(required=True)
        prix = graphene.Int(required=True)
        type = graphene.String(required=True)
        transport = graphene.String(required=True)
        inclus = graphene.String()
        non_inclus = graphene.String()
        images = graphene.List(Upload, required=False)
        difficulte = graphene.String(required=True)
        destination = graphene.String(required=True)
        region = graphene.String(required=True)
        saison = graphene.String(required=True)
        itineraires = graphene.List(ItineraireInput, required=True, description="Liste des itinéraires")

    circuit = graphene.Field(CircuitType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(
        self,
        info,
        titre,
        description,
        duree,
        prix,
        type,
        transport,
        inclus,
        non_inclus,
        difficulte,
        destination,
        region,
        saison,
        itineraires,
        images=None
    ):
        try:
            with transaction.atomic():

                # Créer le circuit
                circuit = Circuit.objects.create(
                    titre=titre,
                    description=description,
                    duree=duree,
                    prix=Decimal(str(prix)),
                    type=type,
                    transport=transport,
                    inclus=inclus,
                    non_inclus=non_inclus,
                    difficulte=difficulte,
                    destination=destination,
                    region=region,
                    saison=saison,
                )

                # Créer les itinéraires et les associer au circuit
                for itineraire_data in itineraires:
                    Itineraire.objects.create(
                        circuit=circuit,
                        jour=itineraire_data["jour"],
                        lieu_depart=itineraire_data["lieu_depart"],
                        lieu_arrivee=itineraire_data.get("lieu_arrivee"),
                        distance_km=itineraire_data.get("distance_km"),
                        duree_trajet=itineraire_data.get("duree_trajet"),
                        description=itineraire_data.get("description"),
                    )
                    
                if images:
                    for idx, img in enumerate(images):
                        CircuitImage.objects.create(
                            circuit=circuit,
                            image=img,
                            ordre=idx,
                        )

                return CreateCircuit(circuit=circuit, success=True)
        except Exception as e:
            return CreateCircuit(success=False, errors=[str(e)])

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
        type = graphene.String(required=True)
        capacite = graphene.Int(required=True)
        prix = graphene.Float(required=True)
        etat = graphene.String()
        images = graphene.List(Upload, required=False)

    vehicule = graphene.Field(VehiculeType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, immatriculation, marque, modele, annee, type, capacite, prix, etat="DISPONIBLE", images=None):
        try:
            with transaction.atomic():
                if Vehicule.objects.filter(immatriculation=immatriculation).exists():
                    return CreateVehicule(success=False, errors=["Un véhicule avec cette immatriculation existe déjà"])

                vehicule = Vehicule.objects.create(
                    immatriculation=immatriculation,
                    marque=marque,
                    modele=modele,
                    annee=annee,
                    type=type,
                    capacite=capacite,
                    prix=Decimal(str(prix)),
                    etat=etat,
                )
                
                if images:
                    for idx, img in enumerate(images):
                        VehiculeImage.objects.create(
                            vehicule=vehicule,
                            image=img,
                            ordre=idx,
                        )
                return CreateVehicule(vehicule=vehicule, success=True)
        except Exception as e:
            return CreateVehicule(success=False, errors=[str(e)])

# Mutations pour les réservations
class CreateReservation(graphene.Mutation):
    class Arguments:
        utilisateur_id = graphene.ID(required=True)
        circuit_id = graphene.ID()
        vehicule_id = graphene.ID() 
        date_depart = graphene.Date(required=True)
        date_fin = graphene.Date(required=True)
        nombre_personnes = graphene.Int(required=True)
        budget = graphene.String()
        commentaire = graphene.String()
        

    reservation = graphene.Field(ReservationType)
    success = graphene.Boolean()
    message = graphene.String()
    errors = graphene.List(graphene.String)

    def mutate(self, info, utilisateur_id, date_depart, date_fin, nombre_personnes,
               circuit_id=None, vehicule_id=None, budget=None, commentaire=None):

        try:
            with transaction.atomic():
                
                # Validation : au moins un des deux ID doit être fourni
                if not circuit_id and not vehicule_id:
                    return CreateReservation(
                        reservation=None,
                        success=False,
                        errors=["Au moins un circuit_id ou vehicule_id doit être fourni"]
                    )
                
                # Décoder avec la fonction Relay
                utilisateur_type, real_utilisateur_id = from_global_id(utilisateur_id)
                
                # Récupération de l'utilisateur
                try:
                    utilisateur = Utilisateur.objects.get(id=real_utilisateur_id)
                except Utilisateur.DoesNotExist:
                    return CreateReservation(
                        reservation=None,
                        success=False,
                        errors=["Utilisateur introuvable"]
                    )
                
                # Variables pour les objets
                circuit = None
                vehicule = None
                reservation_type = None
                
                # Déterminer le type de réservation et récupérer les objets
                if vehicule_id and circuit_id:
                    # Les deux sont fournis - réservation véhicule avec circuit
                    try:
                        circuit_type, real_circuit_id = from_global_id(circuit_id)
                        circuit = Circuit.objects.get(id=real_circuit_id)
                        vehicule = Vehicule.objects.get(id=vehicule_id)
                        reservation_type = Reservation.ReservationType.VEHICULE
                    except Circuit.DoesNotExist:
                        return CreateReservation(
                            reservation=None,
                            success=False,
                            errors=["Circuit introuvable"]
                        )
                    except Vehicule.DoesNotExist:
                        return CreateReservation(
                            reservation=None,
                            success=False,
                            errors=["Véhicule introuvable"]
                        )
                        
                elif vehicule_id:
                    # Seulement véhicule - réservation véhicule seul
                    try:
                        vehicule = Vehicule.objects.get(id=vehicule_id)
                        reservation_type = Reservation.ReservationType.VEHICULE
                    except Vehicule.DoesNotExist:
                        return CreateReservation(
                            reservation=None,
                            success=False,
                            errors=["Véhicule introuvable"]
                        )
                        
                elif circuit_id:
                    # Seulement circuit - réservation circuit seul
                    try:
                        circuit_type, real_circuit_id = from_global_id(circuit_id)
                        circuit = Circuit.objects.get(id=real_circuit_id)
                        reservation_type = Reservation.ReservationType.CIRCUIT
                    except Circuit.DoesNotExist:
                        return CreateReservation(
                            reservation=None,
                            success=False,
                            errors=["Circuit introuvable"]
                        )

                # Calcul de la durée
                duree = (date_fin - date_depart).days
                    

                # Création de la réservation
                reservation = Reservation.objects.create(
                    type=reservation_type,
                    utilisateur=utilisateur,
                    vehicule=vehicule,
                    circuit=circuit,
                    date_depart=date_depart,
                    date_fin=date_fin,
                    duree=duree,
                    nombre_personnes=nombre_personnes,
                    budget=budget,
                    nom=utilisateur.nom,
                    prenom=utilisateur.prenom,
                    telephone=utilisateur.telephone,
                    email=utilisateur.email,
                    commentaire=commentaire,
                    date_reservation=timezone.now(),
                    statut=Reservation.ReservationStatus.EN_ATTENTE
                )
                
                # Configuration des emails selon le type
                site_email = site_mail()
                is_vehicule = reservation_type == Reservation.ReservationType.VEHICULE
                email_subject = objet_message("location voiture") if is_vehicule else objet_message("circuit")

                # Envoi au site
                send_mail(
                    subject=email_subject,
                    message=message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, vehicule, circuit),
                    from_email=utilisateur.email,
                    recipient_list=[site_email],
                    fail_silently=False,
                )
                
                # Envoi de confirmation au client            
                send_mail(
                    subject=objet_confirmation_message(),
                    message=confirmation_message(
                        utilisateur, date_depart, date_fin, duree, 
                        nombre_personnes, budget, commentaire, 
                        type_circuit=not is_vehicule
                    ),
                    from_email=site_email,
                    recipient_list=[utilisateur.email],
                    fail_silently=False,
                )
                

                return CreateReservation(
                    reservation=reservation,
                    success=True,
                    errors=[]
                )

        except Exception as e:
            return CreateReservation(
                reservation=None,
                success=False,
                errors=[f"Erreur lors de la création de la réservation: {str(e)}"]
            )

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
                if statut == Reservation.ReservationStatus.ANNULEE and old_statut != Reservation.ReservationStatus.ANNULEE:
                    reservation.vehicule.etat = EtatVehicule.DISPONIBLE
                    reservation.vehicule.save()
                elif statut == Reservation.ReservationStatus.CONFIRMEE and old_statut != Reservation.ReservationStatus.CONFIRMEE:
                    reservation.vehicule.etat = EtatVehicule.RESERVE
                    reservation.vehicule.save()

                return UpdateReservationStatus(reservation=reservation, success=True)
        except Reservation.DoesNotExist:
            return UpdateReservationStatus(success=False, errors=["Réservation non trouvée"])
        except Exception as e:
            return UpdateReservationStatus(success=False, errors=[str(e)])

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
        faq_type = graphene.String(required=True)

    faq = graphene.Field(FaqType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, question, reponse, faq_type):
        try:
            faq = Faq.objects.create(
                question=question,
                reponse=reponse,
                faq_type=faq_type,
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

# Mutations d'authentification
class RegisterUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        telephone = graphene.String()
        image = Upload(required=True)

    utilisateur = graphene.Field(UtilisateurType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()

    def mutate(self, info, email, password, nom, prenom, image, telephone=None):
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
                
                # Créer l'utilisateur avec tous les champs
                utilisateur = Utilisateur(
                    username=email,
                    email=email,
                    password=password,
                    nom=nom,
                    prenom=prenom,
                    telephone=telephone,
                    role='CLIENT',
                    image=image,
                )
                
                utilisateur.set_password(password)
                utilisateur.save()

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
        vehicule_id = graphene.ID(required=True)
        utilisateur_id = graphene.ID(required=True) 
        date_depart = graphene.Date(required=True)
        date_fin = graphene.Date(required=True)
        nombre_personnes = graphene.Int(required=True)
        budget = graphene.String(required=False)
        commentaire = graphene.String(required=False)

    # Champs de retour
    reservation = graphene.Field(ReservationType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, vehicule_id, utilisateur_id, date_depart, date_fin, nombre_personnes,
               budget=None, commentaire=None):

        try:
            
            # Décoder avec la fonction Relay
            utilisateur_type, real_utilisateur_id = from_global_id(utilisateur_id)
            
            # Récupération des objets nécessaires
            vehicule = Vehicule.objects.get(id=vehicule_id)
            utilisateur = Utilisateur.objects.get(id=real_utilisateur_id)

            duree = date_fin - date_depart

            # Création de la réservation avec le type VEHICULE
            reservation = Reservation.objects.create(
                type=Reservation.ReservationType.VEHICULE,
                utilisateur=utilisateur,
                vehicule=vehicule,
                circuit=None,
                date_depart=date_depart,
                date_fin=date_fin,
                duree=duree.days,
                nombre_personnes=nombre_personnes,
                budget=budget,
                nom=utilisateur.nom,
                prenom=utilisateur.prenom,
                telephone=utilisateur.telephone,
                email=utilisateur.email,
                commentaire=commentaire,
                date_reservation=timezone.now(),
                statut=Reservation.ReservationStatus.EN_ATTENTE
            )
            
            site_email = site_mail()
            
            # Envoi au site
            send_mail(
                subject=objet_message("location voiture"),
                message=message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, vehicule, circuit=None),
                from_email= utilisateur.email,
                recipient_list=[site_email],
                fail_silently=False,
            )
            
            # Envoi de confirmation au client            
            send_mail(
                subject=objet_confirmation_message(),
                message=confirmation_message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, type_circuit=False),
                from_email=site_email,
                recipient_list=[utilisateur.email],
                fail_silently=False,
            )
            

            return CreateVehiculeReservation(
                reservation=reservation,
                success=True,
                message="Réservation de véhicule créée avec succès"
            )

        except Vehicule.DoesNotExist:
            return CreateVehiculeReservation(
                reservation=None,
                success=False,
                message="Véhicule introuvable"
            )

        except Utilisateur.DoesNotExist:
            return CreateVehiculeReservation(
                reservation=None,
                success=False,
                message="Utilisateur introuvable"
            )

        except Exception as e:
            return CreateVehiculeReservation(
                reservation=None,
                success=False,
                message=f"Erreur lors de la création de la réservation: {str(e)}"
            )
            
        except Vehicule.DoesNotExist:
            raise Exception('Véhicule non trouvé')
        except Exception as e:
            raise Exception(f'Erreur lors de la création de la réservation: {str(e)}')

# Testimonia 
class CreateTestimonia(graphene.Mutation):
    class Arguments:
        score = graphene.Int(required=True)
        description = graphene.String(required=True)
        type = graphene.String(required=True)
        utilisateur_id = graphene.ID(required=True)
        
    # Champs de retour
    testimonia = graphene.Field(TestimoniaType)
    success = graphene.Boolean()
    message = graphene.String() 
    
    def mutate(self, info, score, description, type, utilisateur_id):
        
        try:
            # Décoder avec la fonction Relay
            _, real_utilisateur_id = from_global_id(utilisateur_id)
            utilisateur = Utilisateur.objects.get(id=real_utilisateur_id)
            
            new_testimonia = Testimonia.objects.create(
                score=score,
                description=description,
                type=type,
                utilisateur=utilisateur,
            )

            return CreateTestimonia(
                testimonia=new_testimonia, 
                success=True,
                message="Temoignage créée avec succès")
            
        except Utilisateur.DoesNotExist:
            return CreateTestimonia(
                success=False,
                message="Utilisateur introuvable"
            )
        except Exception as e:
            return CreateTestimonia(
                success=False,
                message=f"Erreur lors de la création du témoignage : {str(e)}"
            )
class UpdateTestimoniaStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        status = graphene.Boolean(required=True)

    testimonia = graphene.Field(TestimoniaType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id, status):
        try:
            # Récupérer le témoignage
            testimonia = Testimonia.objects.get(id=id)

            # Mettre à jour le status
            testimonia.status = status
            testimonia.save()

            return UpdateTestimoniaStatus(
                testimonia=testimonia,
                success=True,
                message="Statut du témoignage mis à jour avec succès"
            )

        except Testimonia.DoesNotExist:
            return UpdateTestimoniaStatus(
                success=False,
                message="Témoignage introuvable"
            )
        except Exception as e:
            return UpdateTestimoniaStatus(
                success=False,
                message=f"Erreur lors de la mise à jour : {str(e)}"
            )
class DeleteTestimonia(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    
    def mutate(self, info, id):
        try:
            # Récupérer le témoignage
            testimonia = Testimonia.objects.get(id=id)

            testimonia.delete()

            return DeleteTestimonia(success=True, errors=[])
        except Testimonia.DoesNotExist:
            return DeleteTestimonia(success=False, errors=["Temoignage non trouvé"])
        except Exception as e:
            return DeleteTestimonia(success=False, errors=[str(e)])
    
            
# Create Contact us
class CreateContactUsMutation(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        email = graphene.String(required=True)
        contact = graphene.String(required=True)
        objet = graphene.String(required=True)
        message = graphene.String(required=True)
    
    # Champs de retour
    contact_us = graphene.Field(ContactUsType)
    success = graphene.Boolean()
    message = graphene.String() 
    
    def mutate(self, info, nom, prenom, email, contact, objet, message):
        try:
            
            new_contact = ContactUsModele.objects.create(
                nom=nom,
                prenom=prenom,
                email=email,
                tel=contact,
                objet=objet,
                message=message,
            )
            
            site_mail = "info@madagascar-voyagesolidaire.com"
            
            email_body = (
                f"📩 Un client souhaite vous contacter\n\n"
                f"Informations du client :\n"
                f"- Nom : {nom}\n"
                f"- Prénom : {prenom}\n"
                f"- Email : {email}\n"
                f"- Téléphone : {contact}\n\n"
                f"📌 Objet : {objet}\n"
                f"💬 Message :\n{message}\n\n"
                f"Veuillez répondre à ce client pour plus d'informations.\n\n"
                f"Cordialement,\n"
                f"Madagascar Voyage Solidaire"
            )
            
            send_mail(
                subject= "📩 Nouveau message via le formulaire de contact",
                message= email_body,
                from_email= email,
                recipient_list=[site_mail],
                fail_silently=False,
            )
            
            return CreateContactUsMutation(contact_us=new_contact, success=True, message="Contact us créée avec succès")
        
        except Utilisateur.DoesNotExist:
            return CreateTestimonia(
                success=False,
                message="Utilisateur introuvable"
            )
        except Exception as e:
            return CreateTestimonia(
                success=False,
                message=f"Erreur lors de la création du témoignage : {str(e)}"
            )
        
  # Creation des Personnels
class CreatePersonnel(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        contact = graphene.String(required=True)
        email = graphene.String(required=True)
        adresse = graphene.String(required=True)
        specialite = graphene.String(required=True) 
        langues = graphene.String(required=True) 
        biographie = graphene.String(required=True) 
        status = graphene.String(required=True)
        photo = Upload(required=True)
        
    personnel = graphene.Field(PersonnelType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
        
    def mutate(self, info, nom, prenom, contact, email, adresse, specialite, langues, biographie, status, photo): 
        try:
            
            with transaction.atomic():
                personnel = Personnel.objects.create(
                    nom=nom,
                    prenom=prenom,
                    contact=contact,
                    email=email,
                    adresse=adresse,
                    specialite=specialite,
                    langues=langues,
                    biographie=biographie,
                    status=status,
                    photo=photo,
                )
                
                return CreatePersonnel(personnel=personnel, success=True)
                
        except Exception as e:
            return CreatePersonnel(success=False, errors=[str(e)])
        
# Mutation pour la création de circuit sur mesure
class CreateSurMesure(graphene.Mutation):
    class Arguments:
        point_depart = graphene.String(required=True)
        point_arrivee = graphene.String(required=True)
        date_debut = graphene.Date(required=True)
        date_fin = graphene.Date(required=True)
        duree = graphene.Int()
        nombre_de_personne = graphene.Int(required=True)
        hebergement = graphene.String(required=True)
        budget = graphene.String(required=True)
        nom = graphene.String(required=True)
        prenom = graphene.String(required=True)
        email = graphene.String(required=True)
        contact = graphene.String(required=True)
        commentaire = graphene.String()
        
        lieu_visiter = graphene.List(graphene.String)
        activite = graphene.List(graphene.String)
        
    sur_mesure = graphene.Field(SurMesureType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    
    def mutate(self, info, point_depart, point_arrivee, date_debut, date_fin, 
               nombre_de_personne, hebergement, budget, nom, prenom, email, contact,
               duree=None, lieu_visiter=None, activite=None, commentaire=""):
        
        errors = []
        
        try:
            
            if errors:
                return CreateSurMesure(success=False, errors=errors)
            
            with transaction.atomic():
                sur_mesure = SurMesure.objects.create(
                    point_depart=point_depart,
                    point_arrivee=point_arrivee,
                    date_debut=date_debut,
                    date_fin=date_fin,
                    duree=duree,
                    nombre_de_personne=nombre_de_personne,
                    hebergement=hebergement,
                    budget=budget,
                    nom=nom,
                    prenom=prenom,
                    email=email,
                    contact=contact,
                    commentaire=commentaire or "",
                )
                
                if lieu_visiter:
                    lieux_objets = []
                    for lieu_nom in lieu_visiter:
                        if lieu_nom.strip():  
                            lieu, created = LieuAVisiter.objects.get_or_create(
                                nom=lieu_nom.strip()
                            )
                            lieux_objets.append(lieu)
                    
                    sur_mesure.lieu_visiter.set(lieux_objets)
                
                if activite:
                    activites_objets = []
                    for activite_nom in activite:
                        if activite_nom.strip():
                            activite_obj, created = SurMesureActivite.objects.get_or_create(
                                nom=activite_nom.strip()
                            )
                            activites_objets.append(activite_obj)
                    
                    sur_mesure.activite.set(activites_objets)
                
                sur_mesure.full_clean()
                
                site_email = site_mail()
                send_mail(
                    subject=objet_message_sur_mesure,
                    message=sur_mesure_message(
                        point_depart, 
                        point_arrivee, 
                        lieu_visiter,
                        activite, 
                        date_debut, 
                        date_fin, 
                        duree, 
                        nombre_de_personne, 
                        hebergement, 
                        budget, 
                        nom, 
                        prenom, 
                        email, 
                        contact, 
                        commentaire
                        ),
                    from_email=email,
                    recipient_list=[site_email],
                    fail_silently=False,
                )
                
                # Envoi de confirmation au client            
                send_mail(
                    subject=objet_confirmation_message_sur_mesure(),
                    message=confirmation_message_sur_mesure(
                        point_depart, 
                        point_arrivee, 
                        lieu_visiter, 
                        activite,
                        date_debut, 
                        date_fin, 
                        duree, 
                        nombre_de_personne, 
                        hebergement, 
                        budget, 
                        prenom, 
                        commentaire
                        ),
                    from_email=site_email,
                    recipient_list=[email],
                    fail_silently=False,
                )
                
                return CreateSurMesure(sur_mesure=sur_mesure, success=True, errors=[])
            
        except ValidationError as e:
            error_messages = []
            if hasattr(e, 'message_dict'):
                for field, messages in e.message_dict.items():
                    error_messages.extend([f"{field}: {msg}" for msg in messages])
            else:
                error_messages.append(str(e))
            
            return CreateSurMesure(success=False, errors=error_messages)
        
        except Exception as e:
            return CreateSurMesure(success=False, errors=[f"Erreur inattendue: {str(e)}"])
            
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

    # Mutations circuits
    create_circuit = CreateCircuit.Field()
    delete_circuit = DeleteCircuit.Field()

    # Mutations véhicules
    create_vehicule = CreateVehicule.Field()

    # Mutations réservations
    create_reservation = CreateReservation.Field()
    update_reservation_status = UpdateReservationStatus.Field()
    create_vehicule_reservation = CreateVehiculeReservation.Field()

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

    create_blog_image = CreateBlogImage.Field()
    update_blog_image = UpdateBlogImage.Field()
    delete_blog_image = DeleteBlogImage.Field()
    check_vehicle_availability = CheckVehicleAvailability.Field()
    
    # Add mutation Testimonia
    create_testimonia = CreateTestimonia.Field()
    update_testimonia_status = UpdateTestimoniaStatus.Field()
    delete_testimonia = DeleteTestimonia.Field()
    
    # Create contact us
    create_contact_us_mutation = CreateContactUsMutation.Field()

    # Create personnal
    create_personnel = CreatePersonnel.Field()
    
    # Create sur mesure
    create_sur_mesure = CreateSurMesure.Field()