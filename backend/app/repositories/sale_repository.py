from sqlalchemy.orm import Session

from app.models import Sale


class SaleRepository:

    @staticmethod
    def create(
        db: Session,
        sale: Sale,
    ):
        db.add(sale)
        db.flush()

        return sale

    @staticmethod
    def get_by_id(
        db: Session,
        sale_id: int,
    ):
        return (
            db.query(Sale)
            .filter(Sale.id == sale_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):
        return db.query(Sale).all()