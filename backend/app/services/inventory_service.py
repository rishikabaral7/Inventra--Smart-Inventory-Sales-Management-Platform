from sqlalchemy.orm import Session

from app.models import InventoryTransaction
from app.repositories.inventory_repository import InventoryRepository
from app.repositories.product_repository import ProductRepository


class InventoryService:

    @staticmethod
    def adjust_stock(
        db: Session,
        product_id: int,
        quantity: int,
        transaction_type: str,
    ):
        product = ProductRepository.get_by_id(
            db,
            product_id,
        )

        if not product:
            raise Exception("Product not found")

        product.quantity += quantity

        transaction = InventoryTransaction(
            product_id=product.id,
            transaction_type=transaction_type,
            quantity=quantity,
        )

        InventoryRepository.create(
            db,
            transaction,
        )
        db.commit()
        db.refresh(transaction)
        

        return transaction