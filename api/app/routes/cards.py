from app.models.schemas import Card
from app.db.database import get_db
from typing import List

from sqlalchemy.orm.session import Session
from app.models import schemas
from app.db import crud

from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

# Route for creating a new Card
@router.post("", response_model=schemas.Card)
def create_card(card: schemas.Card, db: Session = Depends(get_db)):
    db_card = crud.get_card(db, card_position=card.position)
    if db_card:
        raise HTTPException(status_code=400, detail="Card already exists")
    return crud.create_card(db=db, card=card)

# Route for getting all cards
@router.get("", response_model=List[schemas.Card])
def read_cards(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cards = crud.get_cards(db, skip=skip, limit=limit)
    return cards
