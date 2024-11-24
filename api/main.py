import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.database import Base, engine
from app.config import SECRET_KEY
from api.users.routes import api_router as users_api_router
from api.notes.routes import api_router as notes_api_router

app = FastAPI()
            
app.add_middleware(CORSMiddleware, allow_origins=['*'])
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

Base.metadata.create_all(bind=engine)

app.include_router(users_api_router)
app.include_router(notes_api_router)

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    