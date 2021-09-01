from fastapi import APIRouter

from app.routes import cards

# We specify all our routes here
router = APIRouter()

# We have one one router, for Cards
router.include_router(cards.router, tags=["cards"], prefix="/cards")
