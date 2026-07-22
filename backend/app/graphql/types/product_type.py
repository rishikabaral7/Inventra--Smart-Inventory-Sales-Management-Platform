import strawberry

@strawberry.type
class ProductType:
    id: int
    name: str
    sku: str
    description: str
    price: float
    quantity: int