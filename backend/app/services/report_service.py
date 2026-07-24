from sqlalchemy.orm import Session

from app.repositories.report_repository import ReportRepository


class ReportService:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

        self.report_repository = ReportRepository()

    def get_dashboard_summary(
        self,
    ):
        return {

            "total_products":
            self.report_repository.total_products(
                self.db,
            ),

            "total_suppliers":
            self.report_repository.total_suppliers(
                self.db,
            ),

            "total_sales":
            self.report_repository.total_sales(
                self.db,
            ),

            "total_purchases":
            self.report_repository.total_purchases(
                self.db,
            ),

            "revenue":
            float(
                self.report_repository.total_revenue(
                    self.db,
                )
            ),

            "purchase_amount":
            float(
                self.report_repository.total_purchase_amount(
                    self.db,
                )
            ),

            "inventory_value":
            float(
                self.report_repository.inventory_value(
                    self.db,
                )
            ),

            "low_stock_products":
            self.report_repository.low_stock_products(
                self.db,
            ),
        }