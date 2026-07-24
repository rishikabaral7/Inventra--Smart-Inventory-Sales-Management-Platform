import strawberry
from strawberry.types import Info

from app.graphql.types.dashboard_type import DashboardType
from app.graphql.types.product_type import ProductType
from app.graphql.types.sale_type import SaleType

from app.services.dashboard_service import DashboardService


@strawberry.type
class DashboardQuery:

    @strawberry.field
    def dashboard(
        self,
        info: Info,
    ) -> DashboardType:

        db = info.context["db"]

        dashboard_data = DashboardService.get_dashboard_data(
            db,
        )

        return DashboardType(

            total_products=dashboard_data["total_products"],

            total_categories=dashboard_data["total_categories"],

            total_sales=dashboard_data["total_sales"],

            total_inventory_quantity=dashboard_data[
                "total_inventory_quantity"
            ],

            total_inventory_value=dashboard_data[
                "total_inventory_value"
            ],

            recent_sales=[
                SaleType.from_model(sale)
                for sale in dashboard_data["recent_sales"]
            ],

            low_stock_products=[
                ProductType(
                    id=product.id,
                    name=product.name,
                    sku=product.sku,
                    description=product.description,
                    price=product.price,
                    quantity=product.quantity,
                )
                for product in dashboard_data[
                    "low_stock_products"
                ]
            ],
        )