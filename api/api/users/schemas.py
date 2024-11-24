from pydantic import BaseModel
from datetime import datetime

class UserSchema(BaseModel):
    username: str
    created_at: datetime

    class Config:
        from_attributes = True

class AuthUserSchema(BaseModel):
    username: str
    password: str

    class Config:
        from_attributes = False
