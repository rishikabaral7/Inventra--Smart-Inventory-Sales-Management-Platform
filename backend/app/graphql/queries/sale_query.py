import strawberry
from strawberry.types import Info
from typing import List, Optional

from app.graphql.types.sale_type import SaleType
from app.services.sale_service import SaleService
from app.auth.dependencies import require_authentication


@strawberry.type
class SaleQuery:

    @strawberry.field
    def sales(self, info: Info) -> List[SaleType]:
        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        service = SaleService(db)
        sales = service.get_all_sales()
        return [SaleType.from_model(sale) for sale in sales]

    @strawberry.field
    def sale(self, info: Info, id: int) -> Optional[SaleType]:
        db = info.context["db"]
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        require_authentication(authorization)

        service = SaleService(db)
        sale = service.get_sale_by_id(id)
        if sale is None:
            return None
        return SaleType.from_model(sale)