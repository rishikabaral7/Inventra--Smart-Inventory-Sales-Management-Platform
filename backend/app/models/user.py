from sqlalchemy import Column, Integer, String
from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100)
    )

    email = Column(
        String,
        nullable=False,
        unique=True
    )

    password = Column(
        String(255)
    )

    role = Column(
        String(20),
        nullable=False,
        default="USER"
    )