import strawberry
from strawberry.types import Info

from app.graphql.input.purchase_input import PurchaseInput
from app.graphql.types.purchase_type import PurchaseType
from app.services.purchase_service import PurchaseService
from app.auth.dependencies import require_authentication


@strawberry.type
class PurchaseMutation:

    @strawberry.mutation
    def create_purchase(
        self,
        info: Info,
        purchase_input: PurchaseInput,
    ) -> PurchaseType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        purchase_service = PurchaseService(
            db,
        )

        purchase = purchase_service.process_purchase(
            purchase_input,
        )

        return PurchaseType.from_model(
            purchase,
        )