from sqlalchemy.orm import Session, joinedload

from app.models import Purchase


class PurchaseRepository:

    @staticmethod
    def create(
        db: Session,
        purchase: Purchase,
    ):
        db.add(purchase)
        db.flush()

        return purchase

    @staticmethod
    def get_by_id(
        db: Session,
        purchase_id: int,
    ):
        return (
            db.query(Purchase)
            .options(joinedload(Purchase.purchase_items))
            .filter(Purchase.id == purchase_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):
        return (
            db.query(Purchase)
            .options(joinedload(Purchase.purchase_items))
            .all()
        )