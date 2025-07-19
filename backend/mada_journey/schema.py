import graphene
from .queries import Query
from .mutations import Mutation

# Schéma principal de l'application
schema = graphene.Schema(query=Query, mutation=Mutation)
