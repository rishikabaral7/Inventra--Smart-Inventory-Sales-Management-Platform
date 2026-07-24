from datetime import datetime

from sqlalchemy.orm import Session

from app.models import (
    Purchase,
    PurchaseItem,
    InventoryTransaction,
)

from app.graphql.input.purchase_input import PurchaseInput

from app.repositories.purchase_repository import PurchaseRepository
from app.repositories.purchase_item_repository import PurchaseItemRepository
from app.repositories.product_repository import ProductRepository
from app.repositories.supplier_repository import SupplierRepository
from app.repositories.inventory_repository import InventoryRepository


class PurchaseService:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

        self.purchase_repository = PurchaseRepository()

        self.purchase_item_repository = PurchaseItemRepository()

        self.product_repository = ProductRepository()

        self.supplier_repository = SupplierRepository()

        self.inventory_repository = InventoryRepository()

    def generate_invoice_number(
        self,
    ):
        timestamp = datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        return f"PUR-{timestamp}"

    def calculate_total(
        self,
        items: list,
    ):
        total = 0

        for item in items:

            total += (
                item.price
                * item.quantity
            )

        return total

    def validate_supplier(
        self,
        supplier_id: int,
    ):
        supplier = self.supplier_repository.get_by_id(
            self.db,
            supplier_id,
        )

        if not supplier:

            raise ValueError(
                "Supplier does not exist."
            )

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

            if item.price <= 0:

                raise ValueError(
                    "Price must be greater than zero."
                )

    def process_purchase(
        self,
        purchase_input: PurchaseInput,
    ):
        try:

            self.validate_supplier(
                purchase_input.supplier_id,
            )

            self.validate_products(
                purchase_input.items,
            )

            total_amount = self.calculate_total(
                purchase_input.items,
            )

            invoice_number = self.generate_invoice_number()

            purchase = Purchase(
                invoice_number=invoice_number,
                supplier_id=purchase_input.supplier_id,
                total_amount=total_amount,
            )

            self.purchase_repository.create(
                self.db,
                purchase,
            )

            for item in purchase_input.items:

                product = self.product_repository.get_by_id(
                    self.db,
                    item.product_id,
                )

                purchase_item = PurchaseItem(
                    purchase_id=purchase.id,
                    product_id=product.id,
                    quantity=item.quantity,
                    price=item.price,
                )

                self.purchase_item_repository.create(
                    self.db,
                    purchase_item,
                )

                product.quantity += item.quantity

                inventory_transaction = InventoryTransaction(
                    product_id=product.id,
                    quantity=item.quantity,
                    transaction_type="PURCHASE",
                )

                self.inventory_repository.create(
                    self.db,
                    inventory_transaction,
                )

            self.db.commit()

            self.db.refresh(
                purchase,
            )

            return purchase

        except Exception:

            self.db.rollback()

            raise

    def get_purchase(
        self,
        purchase_id: int,
    ):
        return self.purchase_repository.get_by_id(
            self.db,
            purchase_id,
        )

    def get_all_purchases(
        self,
    ):
        return self.purchase_repository.get_all(
            self.db,
        )