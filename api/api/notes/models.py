from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Note(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True, unique=True, index=True, nullable=False, autoincrement=True)
    title = Column(String(100), unique=True, nullable=False)
    body = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id')) 
    user = relationship('User', back_populates='notes')
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
