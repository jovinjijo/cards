from typing import List, Optional

from pydantic import BaseModel


class BaseCard(BaseModel):
    type: str
    position: int
    title: str

class Card(BaseCard):
    id: int

    class Config:
        orm_mode = True
