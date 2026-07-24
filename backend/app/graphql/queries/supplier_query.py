import strawberry
from strawberry.types import Info

from app.graphql.types.supplier_type import SupplierType
from app.services.supplier_service import SupplierService
from app.auth.dependencies import require_authentication


@strawberry.type
class SupplierQuery:

    @strawberry.field
    def suppliers(
        self,
        info: Info,
    ) -> list[SupplierType]:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        suppliers = SupplierService.get_all_suppliers(
            db,
        )

        return [
            SupplierType.from_model(
                supplier,
            )
            for supplier in suppliers
        ]

    @strawberry.field
    def supplier(
        self,
        info: Info,
        supplier_id: int,
    ) -> SupplierType | None:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        supplier = SupplierService.get_supplier(
            db,
            supplier_id,
        )

        if supplier is None:
            return None

        return SupplierType.from_model(
            supplier,
        )