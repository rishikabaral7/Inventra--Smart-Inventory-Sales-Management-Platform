import strawberry

from app.graphql.types.product_type import ProductType
from app.graphql.types.sale_type import SaleType


@strawberry.type
class DashboardType:

    total_products: int

    total_categories: int

    total_sales: int

    total_inventory_quantity: int

    total_inventory_value: float

    recent_sales: list[SaleType]

    low_stock_products: list[ProductType]