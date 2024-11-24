from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, unique=True, index=True, nullable=False, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    notes = relationship('Note', back_populates='user')
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())

class BlacklistedToken(Base):
    __tablename__ = 'blacklisted_tokens'

    id = Column(Integer, primary_key=True, unique=True, index=True, nullable=False, autoincrement=True)
    token = Column(String(250), unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
