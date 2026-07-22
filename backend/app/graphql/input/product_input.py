import strawberry

@strawberry.input
class ProductInput:
    name: str
    sku: str
    description: str
    price: float
    quantity: int