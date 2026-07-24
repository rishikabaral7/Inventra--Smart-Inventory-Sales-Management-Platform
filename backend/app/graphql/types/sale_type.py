import strawberry
from datetime import datetime

from app.models import Sale
from app.graphql.types.sale_item_type import SaleItemType


@strawberry.type
class SaleType:
    id: int
    invoice_number: str
    total_amount: float
    sale_status: str
    created_at: datetime
    items: list[SaleItemType]

    @classmethod
    def from_model(
        cls,
        sale: Sale,
    ):
        return cls(
            id=sale.id,
            invoice_number=sale.invoice_number,
            total_amount=sale.total_amount,
            sale_status=sale.sale_status,
            created_at=sale.created_at,
            items=[
                SaleItemType.from_model(item)
                for item in sale.sale_items
            ],
        )