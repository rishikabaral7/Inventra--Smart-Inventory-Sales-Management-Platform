from sqlalchemy.orm import Session

from app.models import InventoryTransaction


class InventoryRepository:

    @staticmethod
    def create(
        db: Session,
        transaction: InventoryTransaction,
    ):
        db.add(transaction)
       

        return transaction

    @staticmethod
    def get_by_product(
        db: Session,
        product_id: int,
    ):
        return (
            db.query(InventoryTransaction)
            .filter(
                InventoryTransaction.product_id == product_id
            )
            .all()
        )