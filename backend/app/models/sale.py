from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    invoice_number = Column(
        String,
        unique=True,
        nullable=False,
    )

    total_amount = Column(
        Float,
        nullable=False,
        default=0,
    )

    sale_status = Column(
        String,
        nullable=False,
        default="COMPLETED",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    sale_items = relationship(
        "SaleItem",
        back_populates="sale",
        cascade="all, delete-orphan",
    )