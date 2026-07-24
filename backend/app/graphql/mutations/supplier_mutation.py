import strawberry
from strawberry.types import Info

from app.graphql.input.supplier_input import SupplierInput
from app.graphql.types.supplier_type import SupplierType
from app.services.supplier_service import SupplierService
from app.auth.dependencies import require_authentication


@strawberry.type
class SupplierMutation:

    @strawberry.mutation
    def create_supplier(
        self,
        info: Info,
        supplier_input: SupplierInput,
    ) -> SupplierType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        supplier = SupplierService.create_supplier(
            db,
            supplier_input,
        )

        return SupplierType.from_model(
            supplier,
        )

    @strawberry.mutation
    def update_supplier(
        self,
        info: Info,
        supplier_id: int,
        supplier_input: SupplierInput,
    ) -> SupplierType:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        supplier = SupplierService.update_supplier(
            db,
            supplier_id,
            supplier_input,
        )

        return SupplierType.from_model(
            supplier,
        )

    @strawberry.mutation
    def delete_supplier(
        self,
        info: Info,
        supplier_id: int,
    ) -> bool:

        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        return SupplierService.delete_supplier(
            db,
            supplier_id,
        )