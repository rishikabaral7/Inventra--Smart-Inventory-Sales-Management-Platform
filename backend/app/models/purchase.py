from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Numeric,
    DateTime,
)

from sqlalchemy.orm import relationship

from app.database.base import Base


class Purchase(Base):

    __tablename__ = "purchases"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    invoice_number = Column(
        String,
        unique=True,
        nullable=False,
    )

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id"),
        nullable=False,
    )

    total_amount = Column(
        Numeric(10, 2),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    supplier = relationship(
        "Supplier",
        backref="purchases",
    )

    purchase_items = relationship(
        "PurchaseItem",
        back_populates="purchase",
        cascade="all, delete-orphan",
    )