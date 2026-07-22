import strawberry

from app.graphql.mutations.user_mutation import UserMutation
from app.graphql.mutations.product_mutation import ProductMutation
from app.graphql.queries.product_query import ProductQuery


@strawberry.type
class Query(ProductQuery):
    pass


@strawberry.type
class Mutation(
    UserMutation,
    ProductMutation,
):
    pass


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)