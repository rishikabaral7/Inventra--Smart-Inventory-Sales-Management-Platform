import strawberry
from app.graphql.types.product_type import ProductType


@strawberry.type
class DashboardReportType:
    total_products: int
    total_suppliers: int
    total_sales: int
    total_purchases: int
    revenue: float
    purchase_amount: float
    inventory_value: float
    low_stock_products: list[ProductType]


@strawberry.type
class RevenueReportType:
    total_revenue: float
    today_revenue: float
    monthly_revenue: float


@strawberry.type
class PurchaseReportType:
    total_purchases: int
    total_purchase_amount: float


@strawberry.type
class InventoryReportType:
    total_products: int
    total_quantity: int
    total_inventory_value: float


@strawberry.type
class MonthlySalesType:
    month: str
    total_sales: int
    revenue: float


@strawberry.type
class TopSellingProductType:
    product_name: str
    total_quantity: int
    total_revenue: float