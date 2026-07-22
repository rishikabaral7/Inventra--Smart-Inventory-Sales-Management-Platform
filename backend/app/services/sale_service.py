from datetime import datetime

from sqlalchemy.orm import Session

from app.repositories.sale_repository import SaleRepository
from app.repositories.sale_item_repository import SaleItemRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.inventory_repository import InventoryRepository


class SaleService:
    def __init__(self, db: Session):
        self.db = db
        self.sale_repository = SaleRepository()
        self.sale_item_repository = SaleItemRepository()
        self.product_repository = ProductRepository()
        self.inventory_repository = InventoryRepository()

    def generate_invoice_number(self):
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

        return f"INV-{timestamp}"
    
    def calculate_total(self, items:list,):
        total = 0
        for item in items:
            product = self.product_repository.get_by_id(self.db, item.product_id,)
            total += product.price * item.quantity
            return total
        
        
    def validate_products(
    self,
    items: list,
):
        for item in items:
            product = self.product_repository.get_by_id(
                self.db,
                item.product_id,
            )

            if not product:
                raise ValueError(
                    f"Product with ID {item.product_id} does not exist."
                )

            if item.quantity <= 0:
                raise ValueError(
                    "Quantity must be greater than zero."
                )

            if product.quantity < item.quantity:
                raise ValueError(
                    f"Not enough stock for product '{product.name}'."
                )