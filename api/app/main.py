from fastapi import FastAPI

from app.routes.api import router as api_router
from app.core.config import API_PREFIX
from app.db.database import engine
from app.models import models
from app.util.init_data import create_cards

models.Base.metadata.create_all(bind=engine)


def get_application() -> FastAPI:
    application = FastAPI()

    application.include_router(api_router, prefix=API_PREFIX)

    create_cards()

    return application


app = get_application()
