import strawberry

from app.graphql.types.purchase_item_type import PurchaseItemType


@strawberry.type
class PurchaseType:

    id: int

    invoice_number: str

    supplier_id: int

    total_amount: float

    items: list[PurchaseItemType]

    @classmethod
    def from_model(
        cls,
        purchase,
    ):
        return cls(
            id=purchase.id,
            invoice_number=purchase.invoice_number,
            supplier_id=purchase.supplier_id,
            total_amount=float(purchase.total_amount),
            items=[
                PurchaseItemType.from_model(item)
                for item in purchase.purchase_items
            ],
        )