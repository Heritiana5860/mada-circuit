from django.urls import path, include
from rest_framework.routers import DefaultRouter
from graphene_file_upload.django import FileUploadGraphQLView
from .views import BlogViewSet

# Configuration du routeur REST
router = DefaultRouter()
router.register(r'blogs', BlogViewSet)

urlpatterns = [
    # Conserver la route GraphQL pour la compatibilité
    path('graphql', FileUploadGraphQLView.as_view(graphiql=True)),
    
    # Nouvelles routes REST API
    path('', include(router.urls)),
]