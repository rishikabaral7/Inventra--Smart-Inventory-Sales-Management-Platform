import strawberry
from strawberry.types import Info

from app.graphql.input.product_input import ProductInput
from app.graphql.types.product_type import ProductType
from app.services.product_service import ProductService


@strawberry.type
class ProductMutation:

    @strawberry.mutation
    def create_product(
        self,
        info: Info,
        input: ProductInput,
    ) -> ProductType:

        db = info.context["db"]

        product = ProductService.create_product(
            db=db,
            name=input.name,
            sku=input.sku,
            description=input.description,
            price=input.price,
            quantity=input.quantity,
        )

        return ProductType(
            id=product.id,
            name=product.name,
            sku=product.sku,
            description=product.description,
            price=product.price,
            quantity=product.quantity,
        )
        
        