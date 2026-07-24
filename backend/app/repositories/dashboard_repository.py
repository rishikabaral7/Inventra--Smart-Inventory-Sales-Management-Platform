from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Product, Category, Sale


class DashboardRepository:

    @staticmethod
    def get_total_products(
        db: Session,
    ):
        return (
            db.query(func.count(Product.id))
            .scalar()
        )

    @staticmethod
    def get_total_categories(
        db: Session,
    ):
        return (
            db.query(func.count(Category.id))
            .scalar()
        )

    @staticmethod
    def get_total_sales(
        db: Session,
    ):
        return (
            db.query(func.count(Sale.id))
            .scalar()
        )

    @staticmethod
    def get_total_inventory_quantity(
        db: Session,
    ):
        return (
            db.query(func.sum(Product.quantity))
            .scalar()
            or 0
        )

    @staticmethod
    def get_total_inventory_value(
        db: Session,
    ):
        return (
            db.query(
                func.sum(
                    Product.quantity * Product.price
                )
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_recent_sales(
        db: Session,
        limit: int = 5,
    ):
        return (
            db.query(Sale)
            .order_by(Sale.id.desc())
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_low_stock_products(
        db: Session,
        threshold: int = 5,
    ):
        return (
            db.query(Product)
            .filter(
                Product.quantity <= threshold
            )
            .order_by(Product.quantity.asc())
            .all()
        )