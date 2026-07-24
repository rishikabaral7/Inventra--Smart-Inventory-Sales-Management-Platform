from sqlalchemy.orm import Session

from app.models import Supplier


class SupplierRepository:

    @staticmethod
    def create(
        db: Session,
        supplier: Supplier,
    ):
        db.add(supplier)
        db.commit()
        db.refresh(supplier)

        return supplier

    @staticmethod
    def get_by_id(
        db: Session,
        supplier_id: int,
    ):
        return (
            db.query(Supplier)
            .filter(Supplier.id == supplier_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):
        return (
            db.query(Supplier)
            .order_by(Supplier.id)
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        supplier: Supplier,
    ):
        db.commit()
        db.refresh(supplier)

        return supplier

    @staticmethod
    def delete(
        db: Session,
        supplier: Supplier,
    ):
        db.delete(supplier)
        db.commit()