from sqlalchemy.orm import Session

from app.models import Product
from app.repositories.product_repository import ProductRepository


class ProductService:

    @staticmethod
    def create_product(
        db: Session,
        name: str,
        sku: str,
        description: str,
        price: float,
        quantity: int,
    ):
        existing_product = ProductRepository.get_by_sku(
            db,
            sku,
        )

        if existing_product:
            raise Exception("SKU already exists")

        product = Product(
            name=name,
            sku=sku,
            description=description,
            price=price,
            quantity=quantity,
        )

        return ProductRepository.create(
            db,
            product,
        )
        
    @staticmethod
    def get_all_products(db):
        return ProductRepository.get_all(db)