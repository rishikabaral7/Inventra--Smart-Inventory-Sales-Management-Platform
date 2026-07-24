import strawberry


@strawberry.type
class SupplierType:

    id: int

    name: str

    email: str

    phone: str

    address: str

    @classmethod
    def from_model(
        cls,
        supplier,
    ):
        return cls(
            id=supplier.id,
            name=supplier.name,
            email=supplier.email,
            phone=supplier.phone,
            address=supplier.address,
        )