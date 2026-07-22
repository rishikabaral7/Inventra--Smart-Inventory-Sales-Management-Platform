from sqlalchemy.orm import Session

from app.models import Product


class ProductRepository:

    @staticmethod
    def create(
        db: Session,
        product: Product,
    ):
        db.add(product)
        db.commit()
        db.refresh(product)

        return product

    @staticmethod
    def get_by_sku(
        db: Session,
        sku: str,
    ):
        return (
            db.query(Product)
            .filter(Product.sku == sku)
            .first()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        product_id: int,
    ):
        return (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):
        return db.query(Product).all()