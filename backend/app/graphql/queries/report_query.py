import strawberry
from strawberry.types import Info

from app.graphql.types.report_type import (
    DashboardReportType,
    RevenueReportType,
    PurchaseReportType,
    InventoryReportType,
    MonthlySalesType,
    TopSellingProductType,
)
from app.graphql.types.product_type import ProductType

from app.services.report_service import ReportService
from app.repositories.report_repository import ReportRepository
from app.auth.dependencies import require_authentication


@strawberry.type
class ReportQuery:

    @strawberry.field
    def dashboard(
        self,
        info: Info,
    ) -> DashboardReportType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        report_service = ReportService(
            db,
        )

        report = report_service.get_dashboard_summary()

        return DashboardReportType(

            total_products=report["total_products"],

            total_suppliers=report["total_suppliers"],

            total_sales=report["total_sales"],

            total_purchases=report["total_purchases"],

            revenue=report["revenue"],

            purchase_amount=report["purchase_amount"],

            inventory_value=report["inventory_value"],

            low_stock_products=[
                ProductType(
                    id=product.id,
                    name=product.name,
                    sku=product.sku,
                    description=product.description,
                    price=product.price,
                    quantity=product.quantity,
                )
                for product in report["low_stock_products"]
            ],
        )

    @strawberry.field
    def revenue_report(
        self,
        info: Info,
        start_date: str = None,
        end_date: str = None,
    ) -> RevenueReportType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        from datetime import datetime

        start_dt = datetime.fromisoformat(start_date) if start_date else None
        end_dt = datetime.fromisoformat(end_date) if end_date else None

        return RevenueReportType(
            total_revenue=float(ReportRepository.get_revenue_by_date_range(db, start_dt, end_dt)),
            today_revenue=float(ReportRepository.get_today_revenue(db)),
            monthly_revenue=float(ReportRepository.get_monthly_revenue(db)),
        )

    @strawberry.field
    def purchase_report(
        self,
        info: Info,
        start_date: str = None,
        end_date: str = None,
    ) -> PurchaseReportType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        from datetime import datetime

        start_dt = datetime.fromisoformat(start_date) if start_date else None
        end_dt = datetime.fromisoformat(end_date) if end_date else None

        return PurchaseReportType(
            total_purchases=ReportRepository.get_total_purchases(db),
            total_purchase_amount=float(ReportRepository.get_purchase_amount_by_date_range(db, start_dt, end_dt)),
        )

    @strawberry.field
    def inventory_report(
        self,
        info: Info,
    ) -> InventoryReportType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        summary = ReportRepository.get_inventory_summary(db)

        return InventoryReportType(
            total_products=summary["total_products"],
            total_quantity=summary["total_quantity"],
            total_inventory_value=float(summary["total_inventory_value"]),
        )

    @strawberry.field
    def monthly_sales_report(
        self,
        info: Info,
    ) -> list[MonthlySalesType]:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        monthly_sales = ReportRepository.get_monthly_sales(db)

        return [
            MonthlySalesType(
                month=str(row.month),
                total_sales=row.total_sales,
                revenue=float(row.revenue),
            )
            for row in monthly_sales
        ]

    @strawberry.field
    def top_selling_products(
        self,
        info: Info,
        limit: int = 10,
    ) -> list[TopSellingProductType]:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        top_products = ReportRepository.get_top_selling_products(db, limit)

        return [
            TopSellingProductType(
                product_name=row.name,
                total_quantity=row.total_quantity,
                total_revenue=float(row.total_revenue),
            )
            for row in top_products
        ]