# utils.py - Utilitaires pour l'administration Django

from django.utils.html import format_html
from django.contrib import admin
from PIL import Image
import os
import re


def image_preview_large(image_field, width=200, height=200):
    """
    Génère un aperçu d'image pour l'admin Django
    """
    def preview(obj):
        if image_field and hasattr(obj, image_field.name):
            image = getattr(obj, image_field.name)
            if image:
                return format_html(
                    '<img src="{}" width="{}" height="{}" style="border-radius: 5px; object-fit: cover;" />',
                    image.url, width, height
                )
        return "Pas d'image"
    
    preview.short_description = "Aperçu"
    preview.allow_tags = True
    return preview


def optimize_image(image_path, max_size=(800, 600), quality=85):
    """
    Optimise une image en la redimensionnant et en réduisant sa qualité
    """
    try:
        with Image.open(image_path) as img:
            # Convertir en RGB si nécessaire
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Redimensionner si nécessaire
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Sauvegarder avec compression
            img.save(image_path, 'JPEG', quality=quality, optimize=True)
            
    except Exception as e:
        print(f"Erreur lors de l'optimisation de l'image {image_path}: {e}")


class ImagePreviewMixin:
    """
    Mixin pour ajouter facilement des aperçus d'images dans l'admin
    """
    def get_image_preview(self, obj, field_name, width=50, height=50):
        field = getattr(obj, field_name)
        if field:
            return format_html(
                '<img src="{}" width="{}" height="{}" style="border-radius: 5px; object-fit: cover;" />',
                field.url, width, height
            )
        return "Pas d'image"


class ExportMixin:
    """
    Mixin pour ajouter des fonctionnalités d'export
    """
    def export_as_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta}.csv'
        writer = csv.writer(response)
        
        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])
            
        return response
    
    export_as_csv.short_description = "Exporter en CSV"


# Actions personnalisées pour l'admin
def make_active(modeladmin, request, queryset):
    """Action pour activer des éléments"""
    queryset.update(active=True)
    modeladmin.message_user(request, f"{queryset.count()} élément(s) activé(s).")

make_active.short_description = "Activer les éléments sélectionnés"


def make_inactive(modeladmin, request, queryset):
    """Action pour désactiver des éléments"""
    queryset.update(active=False)
    modeladmin.message_user(request, f"{queryset.count()} élément(s) désactivé(s).")

make_inactive.short_description = "Désactiver les éléments sélectionnés"


# Filtres personnalisés
class ImageFilter(admin.SimpleListFilter):
    """Filtre pour savoir si un objet a une image ou non"""
    title = 'Image'
    parameter_name = 'has_image'
    
    def lookups(self, request, model_admin):
        return (
            ('yes', 'Avec image'),
            ('no', 'Sans image'),
        )
    
    def queryset(self, request, queryset):
        if self.value() == 'yes':
            return queryset.exclude(image='')
        if self.value() == 'no':
            return queryset.filter(image='')


class DateRangeFilter(admin.SimpleListFilter):
    """Filtre par plage de dates"""
    title = 'Période'
    parameter_name = 'date_range'
    
    def lookups(self, request, model_admin):
        return (
            ('today', "Aujourd'hui"),
            ('week', 'Cette semaine'),
            ('month', 'Ce mois'),
            ('year', 'Cette année'),
        )
    
    def queryset(self, request, queryset):
        from datetime import datetime, timedelta
        from django.utils import timezone
        
        now = timezone.now()
        
        if self.value() == 'today':
            return queryset.filter(date_field__date=now.date())
        elif self.value() == 'week':
            start_week = now - timedelta(days=now.weekday())
            return queryset.filter(date_field__gte=start_week)
        elif self.value() == 'month':
            start_month = now.replace(day=1)
            return queryset.filter(date_field__gte=start_month)
        elif self.value() == 'year':
            start_year = now.replace(month=1, day=1)
            return queryset.filter(date_field__gte=start_year)
        
        
