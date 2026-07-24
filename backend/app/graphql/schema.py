import strawberry

from app.graphql.mutations.user_mutation import UserMutation
from app.graphql.mutations.product_mutation import ProductMutation
from app.graphql.mutations.sale_mutation import SaleMutation
from app.graphql.queries.supplier_query import SupplierQuery
from app.graphql.mutations.supplier_mutation import SupplierMutation

from app.graphql.queries.product_query import ProductQuery
from app.graphql.queries.sale_query import SaleQuery
from app.graphql.queries.dashboard_query import DashboardQuery
from app.graphql.queries.purchase_query import PurchaseQuery
from app.graphql.mutations.purchase_mutation import PurchaseMutation
from app.graphql.queries.report_query import ReportQuery
from app.graphql.queries.user_query import UserQuery


@strawberry.type
class Query(

    ProductQuery,

    SaleQuery,

    SupplierQuery,

    PurchaseQuery,

    DashboardQuery,

    ReportQuery,

    UserQuery,

):
    pass


@strawberry.type
class Mutation(
    UserMutation,
    ProductMutation,
    SaleMutation,
    SupplierMutation,
    PurchaseMutation,
):
    pass


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)