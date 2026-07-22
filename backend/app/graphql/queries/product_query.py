import strawberry
from strawberry.types import Info

from app.graphql.types.product_type import ProductType
from app.services.product_service import ProductService


@strawberry.type
class ProductQuery:

    @strawberry.field
    def products(self, info: Info) -> list[ProductType]:

        db = info.context["db"]

        products = ProductService.get_all_products(db)

        return [
            ProductType(
                id=product.id,
                name=product.name,
                sku=product.sku,
                description=product.description,
                price=product.price,
                quantity=product.quantity,
            )
            for product in products
        ]