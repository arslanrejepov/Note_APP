from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..crud.note_crud import (
    noteCreate,
    getNote,
    getNotes,
    updateNote,
    deleteNote
)
from ..schemas.note_schemas import NoteCreate, NoteResponse, NoteUpdate

router=APIRouter(prefix="/notes", tags=["Notes"])
@router.post("/",response_model=NoteResponse)
def create_new_note(note_data:NoteCreate,db : Session =Depends(get_db)):
    note = noteCreate(db,note_data)
    return note

@router.get("/",response_model=list[NoteResponse])
def read_notes(db: Session=Depends(get_db)):
    return getNotes(db)

@router.get("/{ID}",response_model=NoteResponse)
def read_note(ID : int, db : Session = Depends(get_db)):
    note = getNote(db,ID)
    if not note:
        raise HTTPException(status_code=404,detail="Note not found")
    return note

@router.put("/{ID}",response_model=NoteResponse)
def update_note(ID : int, note_data = NoteUpdate, db: Session=Depends(get_db)):
    note= updateNote(db,ID,note_data)
    if not note:
        raise HTTPException(status_code=404,detail="Note not Found")
    return note

@router.delete("/{ID}")
def delete_note(ID:int, db:Session=Depends(get_db)):
    result=deleteNote(db,ID)
    if not result:
        raise HTTPException(status_code=404,detail="Note not Found")
    return {"message":"Note Deleted"}