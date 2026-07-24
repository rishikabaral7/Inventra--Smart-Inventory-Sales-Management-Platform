import strawberry


@strawberry.type
class PurchaseItemType:

    id: int

    product_id: int

    quantity: int

    price: float

    @classmethod
    def from_model(
        cls,
        purchase_item,
    ):
        return cls(
            id=purchase_item.id,
            product_id=purchase_item.product_id,
            quantity=purchase_item.quantity,
            price=float(purchase_item.price),
        )