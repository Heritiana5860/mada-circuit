from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.contrib.auth.admin import UserAdmin
from .models import (
    Utilisateur, Destination, Saison, Circuit, PointInteret,
    TypeVehicule, Capacite, Vehicule, Reservation, Guide,
    Message, Blog, BlogCommentaire, Faq,
    CircuitImage, VehiculeImage, DestinationImage, BlogImage, Itineraire
)


# Configuration de l'admin pour l'utilisateur personnalisé
@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):
    list_display = ('email', 'nom', 'prenom', 'role', 'is_active', 'date_inscription')
    list_filter = ('role', 'is_active', 'is_staff', 'date_inscription')
    search_fields = ('email', 'nom', 'prenom', 'telephone')
    ordering = ('-date_inscription',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Informations personnelles', {
            'fields': ('nom', 'prenom', 'telephone', 'role')
        }),
        ('Dates importantes', {
            'fields': ('date_inscription',)
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informations personnelles', {
            'fields': ('email', 'nom', 'prenom', 'telephone', 'role')
        }),
    )
    
    readonly_fields = ('date_inscription',)


# Inline pour les images de destination (défini avant DestinationAdmin)
class DestinationImageInline(admin.TabularInline):
    model = DestinationImage
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('image', 'titre', 'description', 'ordre', 'image_preview')
    ordering = ('ordre',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('nom', 'region', 'pays', 'image_preview', 'nombre_circuits')
    list_filter = ('region', 'pays')
    search_fields = ('nom', 'region', 'description')
    readonly_fields = ('image_preview',)
    inlines = [DestinationImageInline]
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"
    
    def nombre_circuits(self, obj):
        return obj.circuits.count()
    nombre_circuits.short_description = "Circuits"


@admin.register(Saison)
class SaisonAdmin(admin.ModelAdmin):
    list_display = ('nom', 'date_debut', 'date_fin', 'nombre_circuits')
    list_filter = ('date_debut', 'date_fin')
    search_fields = ('nom',)
    date_hierarchy = 'date_debut'
    
    def nombre_circuits(self, obj):
        return obj.circuits.count()
    nombre_circuits.short_description = "Circuits"
    
    
class ItineraireInline(admin.TabularInline):
    model = Itineraire
    extra = 1
    fields = ('titre', 'description')
    
@admin.register(Itineraire)
class ItineraireAdmin(admin.ModelAdmin):
    list_display = ('titre', 'description', 'circuit', 'nombre_circuits')

    def nombre_circuits(self, obj):
        return 1 if obj.circuit else 0
    nombre_circuits.short_description = "Circuits"

class PointInteretInline(admin.TabularInline):
    model = PointInteret
    extra = 1
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="30" height="30" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


# Inlines pour les galeries d'images
class CircuitImageInline(admin.TabularInline):
    model = CircuitImage
    extra = 1
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
    fields = ('image', 'titre', 'description', 'ordre', 'image_preview')
    ordering = ('ordre',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 3px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


@admin.register(Circuit)
class CircuitAdmin(admin.ModelAdmin):
    list_display = ('titre', 'destination', 'duree', 'prix', 'difficulte', 'saison', 'image_preview', 'nombre_reservations')
    list_filter = ('difficulte', 'destination', 'saison')
    search_fields = ('titre', 'description')
    readonly_fields = ('image_preview',)
    inlines = [PointInteretInline, CircuitImageInline, ItineraireInline]
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('titre', 'description', 'destination', 'saison')
        }),
        ('Détails du circuit', {
            'fields': ('duree', 'prix', 'difficulte')
        }),
        ('Image', {
            'fields': ('image', 'image_preview')
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"
    
    def nombre_reservations(self, obj):
        return obj.reservations.count()
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


@admin.register(TypeVehicule)
class TypeVehiculeAdmin(admin.ModelAdmin):
    list_display = ('libelle', 'nombre_vehicules')
    search_fields = ('libelle',)
    
    def nombre_vehicules(self, obj):
        return obj.vehicules.count()
    nombre_vehicules.short_description = "Véhicules"


@admin.register(Capacite)
class CapaciteAdmin(admin.ModelAdmin):
    list_display = ('nombre_places', 'description', 'nombre_vehicules')
    ordering = ('nombre_places',)
    
    def nombre_vehicules(self, obj):
        return obj.vehicules.count()
    nombre_vehicules.short_description = "Véhicules"


@admin.register(Vehicule)
class VehiculeAdmin(admin.ModelAdmin):
    list_display = ('immatriculation', 'marque', 'modele', 'annee', 'type', 'capacite', 'prix', 'etat')
    list_filter = ('etat', 'type', 'capacite', 'marque')
    search_fields = ('immatriculation', 'marque', 'modele')
    readonly_fields = ('image_preview',)
    inlines = [VehiculeImageInline]
    
    fieldsets = (
        ('Informations du véhicule', {
            'fields': ('immatriculation', 'marque', 'modele', 'annee')
        }),
        ('Classification', {
            'fields': ('type', 'capacite')
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
    list_display = ('id', 'nom', 'prenom', 'circuit', 'vehicule', 'date_depart', 'statut', 'nombre_personnes', 'date_reservation')
    list_filter = ('statut', 'hebergement', 'activite', 'date_reservation', 'date_depart')
    search_fields = ('nom', 'prenom', 'email', 'telephone', 'circuit__titre')
    date_hierarchy = 'date_reservation'
    readonly_fields = ('date_reservation',)
    
    fieldsets = (
        ('Informations client', {
            'fields': ('utilisateur', 'nom', 'prenom', 'email', 'telephone')
        }),
        ('Détails de la réservation', {
            'fields': ('circuit', 'vehicule', 'date_depart', 'duree', 'nombre_personnes')
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


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'specialite', 'disponibilite', 'photo_preview', 'age')
    list_filter = ('disponibilite', 'specialite')
    search_fields = ('nom', 'prenom', 'specialite', 'biographie')
    readonly_fields = ('photo_preview', 'age')
    
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('nom', 'prenom', 'date_naissance', 'age')
        }),
        ('Informations professionnelles', {
            'fields': ('specialite', 'langues', 'biographie', 'disponibilite')
        }),
        ('Photo', {
            'fields': ('photo', 'photo_preview')
        }),
    )
    
    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.photo.url)
        return "Pas de photo"
    photo_preview.short_description = "Aperçu"
    
    def age(self, obj):
        from datetime import date
        today = date.today()
        return today.year - obj.date_naissance.year - ((today.month, today.day) < (obj.date_naissance.month, obj.date_naissance.day))
    age.short_description = "Âge"


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'sujet', 'date_envoi', 'lu', 'utilisateur')
    list_filter = ('lu', 'date_envoi')
    search_fields = ('nom', 'prenom', 'sujet', 'contenu')
    date_hierarchy = 'date_envoi'
    readonly_fields = ('date_envoi',)
    
    fieldsets = (
        ('Expéditeur', {
            'fields': ('utilisateur', 'nom', 'prenom', 'telephone')
        }),
        ('Message', {
            'fields': ('sujet', 'contenu', 'date_envoi')
        }),
        ('Statut', {
            'fields': ('lu',)
        }),
    )
    
    actions = ['marquer_lu', 'marquer_non_lu']
    
    def marquer_lu(self, request, queryset):
        queryset.update(lu=True)
        self.message_user(request, f"{queryset.count()} message(s) marqué(s) comme lu(s).")
    marquer_lu.short_description = "Marquer comme lu"
    
    def marquer_non_lu(self, request, queryset):
        queryset.update(lu=False)
        self.message_user(request, f"{queryset.count()} message(s) marqué(s) comme non lu(s).")
    marquer_non_lu.short_description = "Marquer comme non lu"


class BlogCommentaireInline(admin.TabularInline):
    model = BlogCommentaire
    extra = 0
    readonly_fields = ('date_commentaire',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('titre', 'auteur', 'datePublication', 'image_preview', 'nombre_commentaires')
    list_filter = ('datePublication', 'auteur')
    search_fields = ('titre', 'contenu', 'auteur')
    date_hierarchy = 'datePublication'
    readonly_fields = ('image_preview', 'datePublication')
    inlines = [BlogCommentaireInline, BlogImageInline]
    
    fieldsets = (
        ('Contenu', {
            'fields': ('titre', 'contenu', 'auteur')
        }),
        ('Métadonnées', {
            'fields': ('tags', 'datePublication')
        }),
        ('Image', {
            'fields': ('image', 'image_preview')
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"
    
    def nombre_commentaires(self, obj):
        return obj.commentaires.count()
    nombre_commentaires.short_description = "Commentaires"


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
    list_display = ('question', 'categorie', 'order_affichage', 'active')
    list_filter = ('active', 'categorie')
    search_fields = ('question', 'reponse', 'categorie')
    list_editable = ('order_affichage', 'active')
    ordering = ('order_affichage',)
    
    fieldsets = (
        ('Question et réponse', {
            'fields': ('question', 'reponse')
        }),
        ('Organisation', {
            'fields': ('categorie', 'order_affichage', 'active')
        }),
    )
    
    actions = ['activer', 'desactiver']
    
    def activer(self, request, queryset):
        queryset.update(active=True)
        self.message_user(request, f"{queryset.count()} FAQ activée(s).")
    activer.short_description = "Activer"
    
    def desactiver(self, request, queryset):
        queryset.update(active=False)
        self.message_user(request, f"{queryset.count()} FAQ désactivée(s).")
    desactiver.short_description = "Désactiver"


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


@admin.register(DestinationImage)
class DestinationImageAdmin(admin.ModelAdmin):
    list_display = ('destination', 'titre', 'ordre', 'image_preview')
    list_filter = ('destination',)
    search_fields = ('titre', 'description', 'destination__nom')
    list_editable = ('ordre',)
    ordering = ('destination', 'ordre')
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
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="border-radius: 5px;" />', obj.image.url)
        return "Pas d'image"
    image_preview.short_description = "Aperçu"


# Configuration globale de l'admin
admin.site.site_header = "Administration Tourisme Madagascar"
admin.site.site_title = "Admin Tourisme"
admin.site.index_title = "Tableau de bord"