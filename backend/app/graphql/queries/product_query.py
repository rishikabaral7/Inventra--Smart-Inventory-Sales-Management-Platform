import strawberry
from strawberry.types import Info

from app.graphql.types.product_type import ProductType
from app.graphql.types.category_type import CategoryType
from app.services.product_service import ProductService
from app.auth.dependencies import require_authentication


@strawberry.type
class ProductQuery:

    @strawberry.field
    def products(self, info: Info) -> list[ProductType]:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        products = ProductService.get_all_products(db)

        result = []
        for product in products:
            cat = None
            if product.category:
                cat = CategoryType(
                    id=product.category.id,
                    name=product.category.name,
                    description=product.category.description,
                )
            result.append(
                ProductType(
                    id=product.id,
                    name=product.name,
                    sku=product.sku,
                    description=product.description or "",
                    price=product.price,
                    quantity=product.quantity,
                    category=cat,
                )
            )
        return result