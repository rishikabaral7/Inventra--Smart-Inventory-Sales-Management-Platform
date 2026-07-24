import strawberry

from app.models import SaleItem


@strawberry.type
class SaleItemType:
    id: int
    product_id: int
    quantity: int
    price: float

    @classmethod
    def from_model(
        cls,
        sale_item: SaleItem,
    ):
        return cls(
            id=sale_item.id,
            product_id=sale_item.product_id,
            quantity=sale_item.quantity,
            price=sale_item.price,
        )