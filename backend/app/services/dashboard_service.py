from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_dashboard_data(
        db: Session,
    ):

        return {

            "total_products": DashboardRepository.get_total_products(
                db,
            ),

            "total_categories": DashboardRepository.get_total_categories(
                db,
            ),

            "total_sales": DashboardRepository.get_total_sales(
                db,
            ),

            "total_inventory_quantity":
            DashboardRepository.get_total_inventory_quantity(
                db,
            ),

            "total_inventory_value":
            DashboardRepository.get_total_inventory_value(
                db,
            ),

            "recent_sales":
            DashboardRepository.get_recent_sales(
                db,
            ),

            "low_stock_products":
            DashboardRepository.get_low_stock_products(
                db,
            ),

        }