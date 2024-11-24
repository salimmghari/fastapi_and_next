import jwt
from datetime import datetime, timedelta
from fastapi import Request, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.config import JWT_SECRET_KEY
from api.users.models import BlacklistedToken

crypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def verify_password(password: str, hashed_password: str):
    return crypt_context.verify(password, hashed_password)

def hash_password(password: str):
    return crypt_context.hash(password)

def create_access_token(user_id: int):
    return jwt.encode({'payload': {
        'user_id': user_id,
        'exp': (datetime.utcnow() + timedelta(minutes=10)).timestamp()
    }}, JWT_SECRET_KEY, algorithm='HS256')

def create_refresh_token(user_id: int):
    return jwt.encode({'payload': {
        'user_id': user_id,
        'exp': (datetime.utcnow() + timedelta(hours=1)).timestamp()
    }}, REFRESH_JWT_SECRET_KEY, algorithm='HS256')

def require_access_token(request: Request, db: Session=Depends(get_db)):
    authorization_header = request.headers.get('Authorization')
    if authorization_header is None:
        raise HTTPException(status_code=401, detail='Authorization header missing')
    access_token = authorization_header.split(' ')[1]
    if db.query(BlacklistedToken).filter(BlacklistedToken.token == access_token).first() is not None:
        raise HTTPException(status_code=401, detail='Blacklisted token')
    try:
        decoded_token = jwt.decode(access_token, JWT_SECRET_KEY, algorithms='HS256')
        return decoded_token['payload']['user_id']
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')
