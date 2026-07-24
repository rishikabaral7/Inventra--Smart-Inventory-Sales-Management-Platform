from sqlalchemy import Column, Integer, String, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    transaction_type =Column(String, nullable=False,)
    quantity = Column(Integer, nullable=False,)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),)
    products = relationship("Product",back_populates="transactions",)
    