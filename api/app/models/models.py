from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base

# SQLAlchemy Entity for Card
class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    position = Column(Integer, unique=True)
    type = Column(String)
    title = Column(String)
