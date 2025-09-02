from pydantic import BaseModel
from typing import List

class BoundingBox(BaseModel):
    x: float
    y: float

class PIIItem(BaseModel):
    type: str  
    text: str
    bbox: List[BoundingBox]