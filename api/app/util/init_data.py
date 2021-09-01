from sqlalchemy import engine
from app.models import models
from app.db.database import SessionLocal
from app.models.models import Card
from app.db import crud
from app.db.database import get_db
from fastapi.param_functions import Depends
from sqlalchemy.orm.session import Session
import sys

# Function to create cards initially
def create_cards():
    try:
        db = SessionLocal()
        crud.create_card(db=db, card=Card(
            position=0, type="bank-draft", title="Bank Draft"))

        crud.create_card(db=db, card=Card(
            position=1, type="bill-of-lading", title="Bill of Lading"))

        crud.create_card(db=db, card=Card(
            position=2, type="invoice", title="Invoice"))

        crud.create_card(db=db, card=Card(
            position=3, type="bank-draft-2", title="Bank Draft 2"))

        crud.create_card(db=db, card=Card(
            position=4, type="bill-of-lading-2", title="Bill of Lading 2"))
    except:
        print('Error while creating initial data : ', sys.exc_info()[0])
