import strawberry


@strawberry.input
class PurchaseItemInput:

    product_id: int

    quantity: int

    price: float


@strawberry.input
class PurchaseInput:

    supplier_id: int

    items: list[PurchaseItemInput]