from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from schema_root import schema
from graphene_file_upload.django import FileUploadGraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),

    # GraphQL routes avec support d'upload
    path('graphql/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True, schema=schema))),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
