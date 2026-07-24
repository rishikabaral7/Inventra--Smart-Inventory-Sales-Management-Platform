from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    sku = Column(String, unique=True, nullable=False)

    description = Column(String)

    price = Column(Float, nullable=False)

    quantity = Column(Integer, default=0)
    category_id = Column(
    Integer,
    ForeignKey("categories.id"),
)
    category = relationship(
        "Category",
        back_populates="products",
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    transactions = relationship(
    "InventoryTransaction",
    back_populates="products",
    cascade="all, delete-orphan",
)
    saleItems = relationship("SaleItem", back_populates = "products")