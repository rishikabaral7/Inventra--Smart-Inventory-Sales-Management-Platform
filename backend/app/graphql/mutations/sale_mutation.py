import strawberry
from strawberry.types import Info

from app.graphql.input.sale_input import SaleInput
from app.graphql.types.sale_type import SaleType
from app.services.sale_service import SaleService
from app.auth.dependencies import require_authentication


@strawberry.type
class SaleMutation:

    @strawberry.mutation
    def create_sale(
        self,
        info: Info,
        sale_input: SaleInput,
    ) -> SaleType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        sale_service = SaleService(
            db,
        )

        sale = sale_service.process_sale(
            sale_input,
        )

        return SaleType.from_model(
            sale,
        )