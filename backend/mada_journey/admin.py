from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe
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
    
    fields = ('jour', 'type_itineraire', 'lieu_depart', 'lieu_arrivee', 'lieu', 'distance_km', 'duree_trajet', 'nuitees', 'description', 'carte_gps')
    
    # Ajout d'une classe CSS pour cibler spécifiquement cet inline
    classes = ['itineraires-inline']
    
    class Media:
        css = {
            'all': ('admin/css/itineraires.css',)  # Créer ce fichier dans static/admin/css/
        }
        js = ('admin/js/itineraires.js',)
    
    
@admin.register(Itineraire)
class ItineraireAdmin(admin.ModelAdmin):
    list_display = ('jour', 'lieu_depart', 'lieu_arrivee', 'distance_km', 'duree_trajet', 'description', 'type_itineraire', 'circuit', 'nombre_circuits')

    def nombre_circuits(self, obj):
        return 1 if obj.circuit else 0
    nombre_circuits.short_description = "Circuits"


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
    can_delete = True
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
    can_delete = True
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
    list_display = ('titre', 'destination', 'duree', 'prix', 'inclus', 'non_inclus', 'type_circuit', 'transport', 'difficulte', 'saison', 'image_preview', 'nombre_reservations')
    list_filter = ('difficulte', 'destination', 'saison')
    search_fields = ('titre', 'description')
    readonly_fields = ('image_preview',)
    inlines = [PointInteretInline, CircuitImageInline, ItineraireInline]
    
    fieldsets = (
        ('Informations obligatoires *', {
            'fields': ('titre', 'duree', 'type_circuit', 'transport', 'difficulte'),
            'description': 'Ces champs sont obligatoires'
        }),
        ('Informations complémentaires', {
            'fields': ('description', 'destination', 'region', 'saison', 'prix'),
            'classes': ('collapse',)
        }),
        ('Services', {
            'fields': ('inclus', 'non_inclus'),
            'classes': ('collapse',)
        }),
        ('Image', {
            'fields': ('image', 'image_preview'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"
    
    def nombre_reservations(self, obj):
        return obj.reservations.count() if hasattr(obj, 'reservations') else 0
    nombre_reservations.short_description = "Réservations"


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