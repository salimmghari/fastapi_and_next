from pydantic import BaseModel
from datetime import datetime
from api.users.schemas import UserSchema

class NoteSchema(BaseModel):
    id: int
    title: str
    body: str
    user: UserSchema
    created_at: datetime

    class Config:
        from_attributes = True

class NewNoteSchema(BaseModel):
    title: str
    body: str

    class Config:
        from_attributes = False
