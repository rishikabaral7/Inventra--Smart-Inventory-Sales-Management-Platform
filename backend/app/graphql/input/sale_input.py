import strawberry


@strawberry.input
class SaleItemInput:
    product_id: int
    quantity: int


@strawberry.input
class SaleInput:
    items: list[SaleItemInput]