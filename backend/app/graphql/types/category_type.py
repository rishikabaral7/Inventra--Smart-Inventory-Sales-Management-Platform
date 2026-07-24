import strawberry
from typing import Optional


@strawberry.type
class CategoryType:
    id: int
    name: str
    description: Optional[str] = None
