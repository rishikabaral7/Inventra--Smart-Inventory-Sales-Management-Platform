from datetime import datetime

from sqlalchemy.orm import Session

from app.repositories.sale_repository import SaleRepository
from app.repositories.sale_item_repository import SaleItemRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.inventory_repository import InventoryRepository
from app.models import Sale, SaleItem, InventoryTransaction
from app.graphql.input.sale_input import SaleInput


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

    def calculate_total(
        self,
        items: list,
    ):
        total = 0

        for item in items:
            product = self.product_repository.get_by_id(
                self.db,
                item.product_id,
            )

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

    def process_sale(
        self,
        sale_input: SaleInput,
    ):
        try:

            self.validate_products(
                sale_input.items,
            )

            total_amount = self.calculate_total(
                sale_input.items,
            )

            invoice_number = self.generate_invoice_number()

            sale = Sale(
                invoice_number=invoice_number,
                total_amount=total_amount,
            )

            self.sale_repository.create(
                self.db,
                sale,
            )

            for item in sale_input.items:

                product = self.product_repository.get_by_id(
                    self.db,
                    item.product_id,
                )

                sale_item = SaleItem(
                    sale_id=sale.id,
                    product_id=product.id,
                    quantity=item.quantity,
                    price=product.price,
                )

                self.sale_item_repository.create(
                    self.db,
                    sale_item,
                )

                product.quantity -= item.quantity

                inventory_transaction = InventoryTransaction(
                    product_id=product.id,
                    quantity=item.quantity,
                    transaction_type="SALE",
                )

                self.inventory_repository.create(
                    self.db,
                    inventory_transaction,
                )

            self.db.commit()

            self.db.refresh(sale)

            return sale

        except Exception:
            self.db.rollback()
            raise


    def get_all_sales(self):

        return self.sale_repository.get_all(
            self.db,
        )


    def get_sale_by_id(
        self,
        sale_id: int,
    ):

        return self.sale_repository.get_by_id(
            self.db,
            sale_id,
        )