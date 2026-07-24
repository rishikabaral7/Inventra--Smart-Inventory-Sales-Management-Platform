from datetime import datetime

from sqlalchemy import extract, func
from sqlalchemy.orm import Session

from app.models import (
    Product,
    Purchase,
    Sale,
    SaleItem,
    Supplier,
)


class ReportRepository:

    @staticmethod
    def total_products(
        db: Session,
    ):
        return (
            db.query(
                func.count(Product.id)
            )
            .scalar()
            or 0
        )

    @staticmethod
    def total_suppliers(
        db: Session,
    ):
        return (
            db.query(
                func.count(Supplier.id)
            )
            .scalar()
            or 0
        )

    @staticmethod
    def total_sales(
        db: Session,
    ):
        return (
            db.query(
                func.count(Sale.id)
            )
            .scalar()
            or 0
        )

    @staticmethod
    def total_purchases(
        db: Session,
    ):
        return (
            db.query(
                func.count(Purchase.id)
            )
            .scalar()
            or 0
        )

    @staticmethod
    def total_revenue(
        db: Session,
    ):
        return (
            db.query(
                func.sum(Sale.total_amount)
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_today_revenue(
        db: Session,
    ):
        today = datetime.utcnow().date()

        return (
            db.query(
                func.sum(Sale.total_amount)
            )
            .filter(
                func.date(Sale.created_at) == today
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_monthly_revenue(
        db: Session,
    ):
        current_month = datetime.utcnow().month
        current_year = datetime.utcnow().year

        return (
            db.query(
                func.sum(Sale.total_amount)
            )
            .filter(
                extract(
                    "month",
                    Sale.created_at,
                )
                == current_month
            )
            .filter(
                extract(
                    "year",
                    Sale.created_at,
                )
                == current_year
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_revenue_by_date_range(
        db: Session,
        start_date: datetime = None,
        end_date: datetime = None,
    ):
        query = db.query(func.sum(Sale.total_amount))
        
        if start_date:
            query = query.filter(Sale.created_at >= start_date)
        if end_date:
            query = query.filter(Sale.created_at <= end_date)
        
        return query.scalar() or 0

    @staticmethod
    def get_purchase_amount_by_date_range(
        db: Session,
        start_date: datetime = None,
        end_date: datetime = None,
    ):
        query = db.query(func.sum(Purchase.total_amount))
        
        if start_date:
            query = query.filter(Purchase.created_at >= start_date)
        if end_date:
            query = query.filter(Purchase.created_at <= end_date)
        
        return query.scalar() or 0

    @staticmethod
    def get_total_purchases(
        db: Session,
    ):
        return (
            db.query(
                func.count(
                    Purchase.id
                )
            )
            .scalar()
            or 0
        )

    @staticmethod
    def total_purchase_amount(
        db: Session,
    ):
        return (
            db.query(
                func.sum(
                    Purchase.total_amount
                )
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_total_purchase_amount(
        db: Session,
    ):
        return ReportRepository.total_purchase_amount(db)

    @staticmethod
    def inventory_value(
        db: Session,
    ):
        return (
            db.query(
                func.sum(
                    Product.quantity *
                    Product.price
                )
            )
            .scalar()
            or 0
        )

    @staticmethod
    def low_stock_products(
        db: Session,
        threshold: int = 10,
    ):
        return (
            db.query(Product)
            .filter(Product.quantity <= threshold)
            .all()
        )

    @staticmethod
    def get_inventory_summary(
        db: Session,
    ):
        return {

            "total_products":
            db.query(
                func.count(
                    Product.id
                )
            )
            .scalar()
            or 0,

            "total_quantity":
            db.query(
                func.sum(
                    Product.quantity
                )
            )
            .scalar()
            or 0,

            "total_inventory_value":
            db.query(
                func.sum(
                    Product.quantity *
                    Product.price
                )
            )
            .scalar()
            or 0,
        }

    @staticmethod
    def get_monthly_sales(
        db: Session,
    ):
        return (
            db.query(
                extract(
                    "month",
                    Sale.created_at,
                ).label("month"),

                func.count(
                    Sale.id
                ).label("total_sales"),

                func.sum(
                    Sale.total_amount
                ).label("revenue"),
            )
            .group_by("month")
            .order_by("month")
            .all()
        )

    @staticmethod
    def get_top_selling_products(
        db: Session,
        limit: int = 10,
    ):
        return (
            db.query(
                Product.name,

                func.sum(
                    SaleItem.quantity
                ).label("total_quantity"),

                func.sum(
                    SaleItem.quantity *
                    SaleItem.price
                ).label("total_revenue"),
            )
            .join(
                SaleItem,
                Product.id == SaleItem.product_id,
            )
            .group_by(
                Product.name
            )
            .order_by(
                func.sum(
                    SaleItem.quantity
                ).desc()
            )
            .limit(limit)
            .all()
        )