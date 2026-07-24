import strawberry
from typing import Optional

from app.graphql.types.category_type import CategoryType


@strawberry.type
class ProductType:
    id: int
    name: str
    sku: str
    description: str
    price: float
    quantity: int
    category: Optional[CategoryType] = None