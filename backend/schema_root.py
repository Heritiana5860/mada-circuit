import graphene 
from mada_journey.schema import Query as MadaJourneyQuery, Mutation as MadaJourneyMutation

class Query (MadaJourneyQuery, graphene.ObjectType):
    pass

class Mutation(MadaJourneyMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query = Query, mutation = Mutation)