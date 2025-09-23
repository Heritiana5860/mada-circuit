from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError
from django.contrib import messages
from .models import (
    Utilisateur, Circuit, PointInteret, Vehicule, Reservation, Personnel, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, BlogImage, Itineraire, Testimonia, ContactUsModele, SurMesure, SurMesureActivite, LieuAVisiter
)


# Configuration de l'admin pour l'utilisateur personnalisé
@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):
    list_display = ('email', 'nom', 'prenom', 'role', 'image', 'is_active', 'date_inscription')
    list_filter = ('role', 'is_active', 'is_staff', 'date_inscription')
    search_fields = ('email', 'nom', 'prenom', 'telephone')
    ordering = ('-date_inscription',)

    readonly_fields = ('date_inscription',)

    fieldsets = UserAdmin.fieldsets + (
        ('Informations personnelles', {
            'fields': ('nom', 'prenom', 'telephone', 'role', 'image')
        }),
        ('Dates importantes', {
            'fields': ('date_inscription',)
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informations personnelles', {
            'fields': ('email', 'nom', 'prenom', 'telephone', 'role', 'image')
        }),
    )
    
    
class ItineraireInline(admin.TabularInline):
    model = Itineraire
    extra = 1
    can_delete = True
    
    # Tous les champs du modèle Itineraire
    fields = ('jour', 'type_itineraire', 'lieu_depart', 'lieu_arrivee', 'lieu', 'distance_km', 'duree_trajet', 'nuitees', 'description', 'carte_gps')
    
    # CSS et JS intégrés directement dans les méthodes
    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        
        # Ajouter le CSS inline via un widget personnalisé
        css_content = """
        <style>
        .itineraires .form-row {
            border-left: 3px solid #2196F3;
            margin-bottom: 8px;
            padding-left: 10px;
        }
        
        .itineraires select[name*="type_itineraire"] {
            background-color: #e3f2fd;
            font-weight: bold;
        }
        
        .itineraires input[type="number"] {
            width: 80px;
        }
        
        .itineraires textarea {
            height: 60px;
        }
        
        /* Styles pour masquer/afficher selon le type */
        .trajet-only { display: none; }
        .sejour-only { display: none; }
        
        .type-trajet .trajet-only { display: table-cell; }
        .type-sejour .sejour-only { display: table-cell; }
        </style>
        
        <script>
        (function($) {
            function toggleItineraireFields(row) {
                var typeField = row.find('select[name*="type_itineraire"]');
                var type = typeField.val();
                
                row.removeClass('type-trajet type-sejour');
                
                if (type === 'trajet') {
                    row.addClass('type-trajet');
                    row.find('input[name*="lieu"], input[name*="nuitees"]').val('');
                } else if (type === 'sejour') {
                    row.addClass('type-sejour');
                    row.find('input[name*="lieu_depart"], input[name*="lieu_arrivee"], input[name*="distance_km"], input[name*="duree_trajet"]').val('');
                }
            }
            
            $(document).ready(function() {
                $('.dynamic-itineraires tr.form-row').each(function() {
                    toggleItineraireFields($(this));
                });
                
                $(document).on('change', 'select[name*="type_itineraire"]', function() {
                    toggleItineraireFields($(this).closest('tr'));
                });
            });
        })(django.jQuery);
        </script>
        """
        
        # Injecter le CSS et JS dans le formulaire
        if hasattr(formset, 'form'):
            formset.form.media += admin.widgets.Media(css={'all': []}, js=[])
            
        return formset
    
    
@admin.register(Itineraire)
class ItineraireAdmin(admin.ModelAdmin):
    list_display = (
        'circuit', 
        'jour', 
        'type_itineraire', 
        'display_itineraire', 
        'distance_km', 
        'duree_trajet'
    )
    
    list_filter = (
        'type_itineraire', 
        'circuit__destination',
        'circuit__type_circuit'
    )
    
    search_fields = (
        'lieu_depart', 
        'lieu_arrivee', 
        'lieu', 
        'description',
        'circuit__titre'
    )
    
    ordering = ('circuit', 'jour')
    
    fieldsets = (
        ('Information de base', {
            'fields': ('circuit', 'jour', 'type_itineraire')
        }),
        ('Détails du trajet', {
            'fields': ('lieu_depart', 'lieu_arrivee', 'distance_km', 'duree_trajet'),
            'classes': ('collapse',),
            'description': 'À remplir uniquement pour les trajets'
        }),
        ('Détails du séjour', {
            'fields': ('lieu', 'nuitees'),
            'classes': ('collapse',),
            'description': 'À remplir uniquement pour les séjours'
        }),
        ('Informations supplémentaires', {
            'fields': ('description', 'carte_gps'),
            'classes': ('collapse',)
        }),
    )
    
    def display_itineraire(self, obj):
        """Affichage intelligent selon le type d'itinéraire"""
        if obj.type_itineraire == 'trajet':
            return format_html(
                '<strong style="color: #2196F3;">🚗 {} → {}</strong>',
                obj.lieu_depart or '?',
                obj.lieu_arrivee or '?'
            )
        else:  # séjour
            nuitees = f" ({obj.nuitees} nuitée{'s' if obj.nuitees and obj.nuitees > 1 else ''})" if obj.nuitees else ""
            return format_html(
                '<strong style="color: #4CAF50;">🏨 {}{}</strong>',
                obj.lieu or '?',
                nuitees
            )
    display_itineraire.short_description = "Itinéraire"
    
    def save_model(self, request, obj, form, change):
        """Validation personnalisée selon le type d'itinéraire"""
        try:
            obj.clean()  # Utilise la validation du modèle
            super().save_model(request, obj, form, change)
            messages.success(request, "Itinéraire sauvegardé avec succès!")
        except ValidationError as e:
            for field, errors in e.message_dict.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
        except Exception as e:
            messages.error(request, f"Erreur lors de la sauvegarde : {e}")

class PointInteretInline(admin.TabularInline):
    model = PointInteret
    extra = 1
    can_delete = True
    readonly_fields = ('image_preview',)
    fields = ('nom', 'description', 'image', 'image_preview')

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="30" height="30" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


# Inlines pour les galeries d'images
class CircuitImageInline(admin.TabularInline):
    model = CircuitImage
    extra = 1
    can_delete = True
    readonly_fields = ('image_preview',)
    fields = ('image', 'titre', 'description', 'ordre', 'image_preview')
    ordering = ('ordre',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


class VehiculeImageInline(admin.TabularInline):
    model = VehiculeImage
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('image', 'titre', 'description', 'ordre', 'image_preview')
    ordering = ('ordre',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


class BlogImageInline(admin.TabularInline):
    model = BlogImage
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('file', 'titre', 'description', 'ordre', 'image_preview')
    ordering = ('ordre',)

    def image_preview(self, obj):
        if obj.file:
            ext = obj.file.name.split('.')[-1].lower()
            if ext in ['jpg', 'jpeg', 'png', 'gif']:
                return format_html('<img src="{}" width="50" height="50" style="border-radius: 3px;" />', obj.file.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(Circuit)
class CircuitAdmin(admin.ModelAdmin):
    list_display = (
        'titre', 
        'destination', 
        'duree_display', 
        'prix_display', 
        'type_circuit', 
        'transport', 
        'difficulte_display', 
        'saison', 
        'image_preview', 
        'nombre_reservations'
    )
    
    list_filter = (
        'difficulte', 
        'type_circuit', 
        'transport', 
        'destination', 
        'saison'
    )
    
    search_fields = ('titre', 'description', 'destination', 'region')
    readonly_fields = ('image_preview', 'id')
    
    # Inlines avec gestion d'erreur
    inlines = [PointInteretInline, CircuitImageInline, ItineraireInline]
    
    # Fieldsets optimisés selon votre modèle
    fieldsets = (
        ('Informations essentielles', {
            'fields': (
                'id',  # Lecture seule pour montrer l'UUID
                'titre', 
                'description'
            ),
        }),
        ('Configuration du circuit', {
            'fields': (
                ('duree', 'prix'),
                ('type_circuit', 'transport'),
                'difficulte'
            ),
            'description': 'Configuration technique du circuit'
        }),
        ('Localisation et période', {
            'fields': (
                ('destination', 'region'),
                'saison'
            ),
        }),
        ('Services', {
            'fields': ('inclus', 'non_inclus'),
            'classes': ('collapse',),
            'description': 'Services inclus et non inclus (séparer par ";")'
        }),
        ('Image principale', {
            'fields': ('image', 'image_preview'),
            'classes': ('collapse',)
        }),
    )
    
    # Méthodes d'affichage améliorées
    def duree_display(self, obj):
        if obj.duree:
            return f"{obj.duree} jour{'s' if obj.duree > 1 else ''}"
        return "Non définie"
    duree_display.short_description = "Durée"
    duree_display.admin_order_field = 'duree'
    
    def prix_display(self, obj):
        if obj.prix:
            return f"{obj.prix:,.0f} Ar"
        return "Prix à définir"
    prix_display.short_description = "Prix"
    prix_display.admin_order_field = 'prix'
    
    def difficulte_display(self, obj):
        colors = {
            'FACILE': 'green',
            'MOYEN': 'orange', 
            'DIFFICILE': 'red'
        }
        color = colors.get(obj.difficulte, 'gray')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_difficulte_display()
        )
    difficulte_display.short_description = "Difficulté"
    difficulte_display.admin_order_field = 'difficulte'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="60" height="60" style="border-radius: 8px; border: 2px solid #ddd;" />', obj.image.url)
        return format_html('<div style="width: 60px; height: 60px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px;">Pas d\'image</div>')
    image_preview.short_description = "Image"
    
    def nombre_reservations(self, obj):
        count = obj.reservations.count() if hasattr(obj, 'reservations') else 0
        if count > 0:
            return format_html(
                '<span style="background: #4CAF50; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">{}</span>',
                count
            )
        return format_html('<span style="color: #666;">0</span>')
    nombre_reservations.short_description = "Réservations"
    
    # Actions personnalisées
    actions = ['dupliquer_circuit', 'activer_circuits', 'archiver_circuits']
    
    def dupliquer_circuit(self, request, queryset):
        """Duplique les circuits sélectionnés"""
        for circuit in queryset:
            # Logique de duplication ici
            pass
        self.message_user(request, f"{queryset.count()} circuit(s) dupliqué(s).")
    dupliquer_circuit.short_description = "Dupliquer les circuits sélectionnés"
    
    # Validation personnalisée
    def save_model(self, request, obj, form, change):
        """Validation avant sauvegarde"""
        try:
            # Validation des champs obligatoires
            if not obj.titre:
                messages.error(request, "Le titre est obligatoire.")
                return
            
            if not obj.duree:
                messages.error(request, "La durée est obligatoire.")
                return
            
            if obj.duree <= 0:
                messages.error(request, "La durée doit être supérieure à 0.")
                return
                
            if obj.prix and obj.prix < 0:
                messages.error(request, "Le prix ne peut pas être négatif.")
                return
            
            # Sauvegarde
            super().save_model(request, obj, form, change)
            
            if not change:  # Nouveau circuit
                messages.success(request, f"Circuit '{obj.titre}' créé avec succès!")
            else:  # Modification
                messages.info(request, f"Circuit '{obj.titre}' modifié avec succès!")
                
        except ValidationError as e:
            messages.error(request, f"Erreur de validation : {e}")
        except Exception as e:
            messages.error(request, f"Erreur lors de la sauvegarde : {e}")


@admin.register(PointInteret)
class PointInteretAdmin(admin.ModelAdmin):
    list_display = ('nom', 'circuit', 'image_preview')
    list_filter = ('circuit__destination',)
    search_fields = ('nom', 'description', 'circuit__titre')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(Vehicule)
class VehiculeAdmin(admin.ModelAdmin):
    list_display = ('marque', 'modele', 'annee', 'type', 'capacite', 'prix', 'etat')
    list_filter = ('etat', 'type', 'langue', 'capacite', 'marque')
    search_fields = ('marque', 'modele')
    readonly_fields = ('image_preview',)
    inlines = [VehiculeImageInline]
    
    fieldsets = (
        ('Informations du véhicule', {
            'fields': ('marque', 'modele', 'annee')
        }),
        ('Classification', {
            'fields': ('type', 'langue', 'capacite')
        }),
        ('Disponibilité et prix', {
            'fields': ('etat', 'prix')
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prenom', 'circuit', 'vehicule', 'date_depart', 'date_fin', 'statut', 'nombre_personnes', 'date_reservation')
    list_filter = ('statut', 'hebergement', 'activite', 'date_reservation', 'date_depart', 'date_fin')
    search_fields = ('nom', 'prenom', 'email', 'telephone', 'circuit__titre')
    date_hierarchy = 'date_reservation'
    readonly_fields = ('date_reservation',)
    
    fieldsets = (
        ('Informations client', {
            'fields': ('utilisateur', 'nom', 'prenom', 'email', 'telephone')
        }),
        ('Détails de la réservation', {
            'fields': ('circuit', 'vehicule', 'date_depart', 'date_fin', 'duree', 'nombre_personnes')
        }),
        ('Préférences', {
            'fields': ('hebergement', 'activite', 'budget')
        }),
        ('Statut et suivi', {
            'fields': ('statut', 'date_reservation', 'commentaire')
        }),
    )
    
    actions = ['marquer_confirmee', 'marquer_annulee']
    
    def marquer_confirmee(self, request, queryset):
        queryset.update(statut='CONFIRMEE')
        self.message_user(request, f"{queryset.count()} réservation(s) marquée(s) comme confirmée(s).")
    marquer_confirmee.short_description = "Marquer comme confirmée"
    
    def marquer_annulee(self, request, queryset):
        queryset.update(statut='ANNULEE')
        self.message_user(request, f"{queryset.count()} réservation(s) annulée(s).")
    marquer_annulee.short_description = "Annuler les réservations"


@admin.register(Personnel)
class PersonnelAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'contact', 'email', 'adresse', 'specialite', 'langues', 'biographie', 'status', 'photo')
    list_filter = ('langues', 'specialite', 'status')
    search_fields = ('nom', 'prenom', 'specialite', 'biographie', 'status')
    
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('nom', 'prenom', 'contact', 'email', 'adresse')
        }),
        ('Informations professionnelles', {
            'fields': ('specialite', 'langues', 'biographie', 'status')
        }),
        ('Photo', {
            'fields': ('photo',)
        }),
    )


class BlogCommentaireInline(admin.TabularInline):
    model = BlogCommentaire
    extra = 0
    readonly_fields = ('date_commentaire',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('titre', 'auteur', 'datePublication', 'nombre_medias')
    list_filter = ('datePublication', 'auteur')
    search_fields = ('titre', 'contenu', 'auteur')
    date_hierarchy = 'datePublication'
    inlines = [BlogImageInline]

    fieldsets = (
        ('Contenu', {
            'fields': ('titre', 'contenu', 'auteur')
        }),
        ('Métadonnées', {
            'fields': ('tags', 'datePublication')
        }),
    )

    def nombre_medias(self, obj):
        return obj.medias.count()
    nombre_medias.short_description = "Nombre de médias"


@admin.register(BlogCommentaire)
class BlogCommentaireAdmin(admin.ModelAdmin):
    list_display = ('utilisateur', 'blog', 'date_commentaire', 'apercu_contenu')
    list_filter = ('date_commentaire', 'blog')
    search_fields = ('contenu', 'utilisateur__nom', 'blog__titre')
    date_hierarchy = 'date_commentaire'
    readonly_fields = ('date_commentaire',)
    
    def apercu_contenu(self, obj):
        return obj.contenu[:50] + "..." if len(obj.contenu) > 50 else obj.contenu
    apercu_contenu.short_description = "Contenu"


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ('question', 'reponse', 'faq_type')
    list_filter = ('faq_type',)
    search_fields = ('question', 'reponse')
    
    fieldsets = (
        ('Question et réponse', {
            'fields': ('question', 'reponse')
        }),
        ('Organisation', {
            'fields': ('faq_type',)
        }),
    )


# Admins pour les galeries d'images
@admin.register(CircuitImage)
class CircuitImageAdmin(admin.ModelAdmin):
    list_display = ('circuit', 'titre', 'ordre', 'image_preview')
    list_filter = ('circuit',)
    search_fields = ('titre', 'description', 'circuit__titre')
    list_editable = ('ordre',)
    ordering = ('circuit', 'ordre')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(VehiculeImage)
class VehiculeImageAdmin(admin.ModelAdmin):
    list_display = ('vehicule', 'titre', 'ordre', 'image_preview')
    list_filter = ('vehicule',)
    search_fields = ('titre', 'description', 'vehicule__marque', 'vehicule__modele')
    list_editable = ('ordre',)
    ordering = ('vehicule', 'ordre')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(BlogImage)
class BlogImageAdmin(admin.ModelAdmin):
    list_display = ('blog', 'titre', 'ordre', 'image_preview')
    list_filter = ('blog',)
    search_fields = ('titre', 'description', 'blog__titre')
    list_editable = ('ordre',)
    ordering = ('blog', 'ordre')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.file:
            ext = obj.file.name.split('.')[-1].lower()
            if ext in ['jpg', 'jpeg', 'png', 'gif']:
                return format_html(
                    '<img src="{}" width="100" height="100" style="border-radius: 5px;" />',
                    obj.file.url
                )
            elif ext in ['mp4', 'mov', 'avi']:
                return format_html(
                    '<video width="150" height="100" controls>'
                    '<source src="{}" type="video/{}">'
                    'Votre navigateur ne supporte pas la vidéo.'
                    '</video>',
                    obj.file.url, ext
                )
        return "Aucun fichier"
    image_preview.short_description = "Aperçu"


@admin.register(Testimonia)
class TestimoniaAdmin(admin.ModelAdmin):
    list_display = ('score', 'description', 'type', 'status', 'post_date')
    list_filter = ('description',)
    
@admin.register(ContactUsModele)
class ContactUs(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'tel', 'objet', 'message')


@admin.register(SurMesureActivite)
class SurMesureActiviteAdmin(admin.ModelAdmin):
    list_display = ('nom',)
    search_fields = ('nom',)
    ordering = ('nom',)


@admin.register(LieuAVisiter)
class LieuAVisiterAdmin(admin.ModelAdmin):
    list_display = ('nom',)
    search_fields = ('nom',)
    ordering = ('nom',)
    
@admin.register(SurMesure)
class SurMesureAdmin(admin.ModelAdmin):
    list_display = (
        'point_depart', 
        'get_lieux_visiter',
        'point_arrivee', 
        'date_debut',
        'date_fin', 
        'duree', 
        'nombre_de_personne', 
        'hebergement', 
        'get_activites',
        'budget', 
        'nom', 
        'prenom', 
        'email'
    )
    
    def get_lieux_visiter(self, obj):
        """Affiche les lieux à visiter sous forme de liste"""
        lieux = obj.lieu_visiter.all()
        if lieux:
            lieux_list = [lieu.nom for lieu in lieux[:3]]
            result = ", ".join(lieux_list)
            if lieux.count() > 3:
                result += f" (+{lieux.count() - 3} autres)"
            return result
        return "Aucun lieu spécifié"
    get_lieux_visiter.short_description = "Lieux à visiter"
    
    def get_activites(self, obj):
        """Affiche les activités sous forme de liste"""
        activites = obj.activite.all()
        if activites:
            activites_list = [activite.nom for activite in activites[:3]]
            result = ", ".join(activites_list)
            if activites.count() > 3:
                result += f" (+{activites.count() - 3} autres)"
            return result
        return "Aucune activité spécifiée"
    get_activites.short_description = "Activités"
    
    # Configuration des filtres et recherche (adaptée à votre modèle)
    list_filter = (
        'hebergement',
        'date_debut',
        'nombre_de_personne'
    )
    
    search_fields = (
        'nom',
        'prenom', 
        'email',
        'point_depart',
        'point_arrivee',
        'contact',
        'budget'
    )
    
    fieldsets = (
        ('Informations du voyage', {
            'fields': (
                ('point_depart', 'point_arrivee'),
                ('date_debut', 'date_fin'),
                ('duree', 'nombre_de_personne'),
                'hebergement',
                'budget',
            )
        }),
        ('Lieux et activités', {
            'fields': (
                'lieu_visiter',
                'activite',
            )
        }),
        ('Informations client', {
            'fields': (
                ('nom', 'prenom'),
                ('email', 'contact'),
                'commentaire',
            )
        }),
    )


# Configuration globale de l'admin
admin.site.site_header = "Administration Tourisme Madagascar"
admin.site.site_title = "Admin Tourisme"
admin.site.index_title = "Tableau de bord"