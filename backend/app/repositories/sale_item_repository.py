from sqlalchemy.orm import Session

from app.models import SaleItem


class SaleItemRepository:

    @staticmethod
    def create(
        db: Session,
        sale_item: SaleItem,
    ):
        db.add(sale_item)
        db.flush()

        return sale_item

    @staticmethod
    def get_by_sale(
        db: Session,
        sale_id: int,
    ):
        return (
            db.query(SaleItem)
            .filter(SaleItem.sale_id == sale_id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        sale_item_id: int,
    ):
        return (
            db.query(SaleItem)
            .filter(SaleItem.id == sale_item_id)
            .first()
        )