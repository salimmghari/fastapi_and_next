from typing import List
from fastapi import APIRouter, Depends, status, Request, Response, Path
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import require_access_token
from api.notes.schemas import NoteSchema, NewNoteSchema
from api.notes.models import Note

api_router = APIRouter(prefix='/api/notes', tags=['notes'])

@api_router.get('/', response_model=List[NoteSchema], status_code=status.HTTP_200_OK)
async def read(request: Request, response: Response, db: Session=Depends(get_db)):
    user_id = require_access_token(request, db)
    return db.query(Note).filter(Note.user_id == user_id).all()

@api_router.post('/', response_model=NoteSchema, status_code=status.HTTP_201_CREATED)
async def create(request: Request, response: Response, note_schema: NewNoteSchema, db: Session=Depends(get_db)):
    user_id = require_access_token(request, db)
    note = Note(title=note_schema.title, body=note_schema.body, user_id=user_id)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@api_router.put('/{id}/', response_model=NoteSchema, status_code=status.HTTP_200_OK)
async def update(request: Request, response: Response, note_schema: NewNoteSchema, id: int=Path(..., title="Note id"), db: Session=Depends(get_db)):    
    user_id = require_access_token(request, db)
    note = db.query(Note).filter(Note.id == id, Note.user_id == user_id).first()    
    note.title = note_schema.title
    note.body = note_schema.body
    db.commit()
    db.refresh(note)
    return note

@api_router.delete('/{id}/', status_code=status.HTTP_204_NO_CONTENT)
async def delete(request: Request, response: Response, id: int=Path(..., title='Note id'), db: Session=Depends(get_db)):
    user_id = require_access_token(request, db)
    note = db.query(Note).filter(Note.id == id, Note.user_id == user_id).first()
    db.delete(note)
    db.commit()
