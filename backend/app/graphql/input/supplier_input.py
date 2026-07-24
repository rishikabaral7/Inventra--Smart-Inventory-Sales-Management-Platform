import strawberry


@strawberry.input
class SupplierInput:

    name: str

    email: str

    phone: str

    address: str