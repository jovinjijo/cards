from typing import List
import sqlalchemy

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

# Updates the DB with a list of given cards information
def update_cards(db: Session, cards: List[schemas.Card]):

    # Get the list of all IDs that are being updated
    ids = list(map(lambda card: card.id, cards))
    # Create a dictionary of IDs to objects for faster access
    dict_of_cards = dict(zip(ids, cards))
    # Set all positions of cards that are updated to NULL so that it can be updated in the next query
    # This is done because there is a Unique constraint on the position column
    db.query(models.Card).filter(models.Card.id.in_(ids)).update(
        {models.Card.position: sqlalchemy.null()})
    # Update all cards with the newer values
    db_cards = db.query(models.Card).filter(models.Card.id.in_(ids)).all()
    for card in db_cards:
        updated_card = dict_of_cards[card.id]
        card.position = updated_card.position
        card.title = updated_card.title
        card.type = updated_card.type
    db.commit()
    return db.query(models.Card).filter(models.Card.id.in_(ids)).all()
