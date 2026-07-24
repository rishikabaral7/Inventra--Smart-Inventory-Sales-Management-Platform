from sqlalchemy.orm import Session

from app.models import PurchaseItem


class PurchaseItemRepository:

    @staticmethod
    def create(
        db: Session,
        purchase_item: PurchaseItem,
    ):
        db.add(
            purchase_item,
        )

        db.flush()

        return purchase_item

    @staticmethod
    def get_by_purchase(
        db: Session,
        purchase_id: int,
    ):
        return (
            db.query(
                PurchaseItem,
            )
            .filter(
                PurchaseItem.purchase_id == purchase_id,
            )
            .all()
        )