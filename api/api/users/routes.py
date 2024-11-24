from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import hash_password, verify_password, create_access_token, create_refresh_token
from api.users.schemas import AuthUserSchema
from api.users.models import User, BlacklistedToken

api_router = APIRouter(prefix='/api/users', tags=['users'])

@api_router.post('/signup/', status_code=status.HTTP_201_CREATED)
async def signup(request: Request, response: Response, user_schema: AuthUserSchema, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.username == user_schema.username).first()
    if user is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username already exists')
    user = User(username=user_schema.username, password=hash_password(user_schema.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {'access_token': create_access_token(user.id)}

@api_router.post('/login/', status_code=status.HTTP_200_OK)
async def login(request: Request, response: Response, user_schema: AuthUserSchema, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.username == user_schema.username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')    
    if verify_password(user_schema.password, user.password) is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid password')
    return {'access_token': create_access_token(user.id)}

@api_router.post('/logout/', status_code=status.HTTP_200_OK)
async def logout(request: Request, response: Response, db: Session=Depends(get_db)):
    authorization_header = request.headers.get('Authorization')
    if authorization_header is None:
        raise HTTPException(status_code=401, detail='Authorization header missing')
    access_token = authorization_header.split(' ')[1]
    blacklisted_token = BlacklistedToken(token=access_token)
    db.add(blacklisted_token)
    db.commit()
