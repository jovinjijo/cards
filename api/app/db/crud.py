from app.models import models, schemas
from sqlalchemy.orm import Session

# Get information about a single card
def get_card(db: Session, id: int):
    return db.query(models.Card).filter(models.Card.id == id).first()

# Get all Cards
def get_cards(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Card).offset(skip).limit(limit).all()

# Create a Card
def create_card(db: Session, card: schemas.Card):
    db_card = models.Card(
        type=card.type, position=card.position, title=card.title)
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card
