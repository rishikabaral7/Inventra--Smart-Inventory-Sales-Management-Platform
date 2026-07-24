import strawberry
from strawberry.types import Info

from app.graphql.types.purchase_type import PurchaseType
from app.services.purchase_service import PurchaseService
from app.auth.dependencies import require_authentication


@strawberry.type
class PurchaseQuery:

    @strawberry.field
    def purchases(
        self,
        info: Info,
    ) -> list[PurchaseType]:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        purchase_service = PurchaseService(
            db,
        )

        purchases = purchase_service.get_all_purchases()

        return [
            PurchaseType.from_model(
                purchase,
            )
            for purchase in purchases
        ]

    @strawberry.field
    def purchase(
        self,
        info: Info,
        purchase_id: int,
    ) -> PurchaseType | None:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        purchase_service = PurchaseService(
            db,
        )

        purchase = purchase_service.get_purchase(
            purchase_id,
        )

        if purchase is None:
            return None

        return PurchaseType.from_model(
            purchase,
        )