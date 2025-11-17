from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    title: str
    content: str | None=None

class NoteUpdate(BaseModel):
    title: str | None=None
    content: str | None=None
    
class NoteResponse(BaseModel):
    id : int 
    title : str
    content : str | None=None
    created_at : datetime

    class Config:                   #rules of pydantic
        from_attributes = True
