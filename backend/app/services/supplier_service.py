from sqlalchemy.orm import Session

from app.models import Supplier
from app.repositories.supplier_repository import SupplierRepository
from app.graphql.input.supplier_input import SupplierInput


class SupplierService:

    @staticmethod
    def create_supplier(
        db: Session,
        supplier_input: SupplierInput,
    ):
        supplier = Supplier(
            name=supplier_input.name,
            email=supplier_input.email,
            phone=supplier_input.phone,
            address=supplier_input.address,
        )

        return SupplierRepository.create(
            db,
            supplier,
        )

    @staticmethod
    def get_supplier(
        db: Session,
        supplier_id: int,
    ):
        return SupplierRepository.get_by_id(
            db,
            supplier_id,
        )

    @staticmethod
    def get_all_suppliers(
        db: Session,
    ):
        return SupplierRepository.get_all(
            db,
        )

    @staticmethod
    def update_supplier(
        db: Session,
        supplier_id: int,
        supplier_input: SupplierInput,
    ):
        supplier = SupplierRepository.get_by_id(
            db,
            supplier_id,
        )

        if not supplier:
            raise ValueError("Supplier not found.")

        supplier.name = supplier_input.name
        supplier.email = supplier_input.email
        supplier.phone = supplier_input.phone
        supplier.address = supplier_input.address

        return SupplierRepository.update(
            db,
            supplier,
        )

    @staticmethod
    def delete_supplier(
        db: Session,
        supplier_id: int,
    ):
        supplier = SupplierRepository.get_by_id(
            db,
            supplier_id,
        )

        if not supplier:
            raise ValueError("Supplier not found.")

        SupplierRepository.delete(
            db,
            supplier,
        )

        return True