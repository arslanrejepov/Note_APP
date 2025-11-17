from sqlalchemy.orm import Session
from ..models.note import Note
from ..schemas.note_schemas import NoteCreate, NoteUpdate

def noteCreate(db : Session, note_data:NoteCreate):
    new_note=Note(
        title=note_data.title,
        content=note_data.content
    )

    db.add(note_data)
    db.commit()
    db.refresh(note_data)
    return note_data

def getNotes(db:Session):
    return db.query(Note).all()

def getNote(db:Session,ID:int):
    return db.query(Note).filter(Note.id==ID).first()

def updateNote(db:Session, ID:int, note_data:NoteUpdate):
    note = getNote(db,ID)
    if not note:
        return None
    
    if note_data.title is not None:
        note.title=note_data.title
    if note_data.content is not None:
        note.content=note_data.content

    db.commit()
    db.refresh(note)
    return note

def deleteNote(db:Session,note_id:int):
    note=getNote(db,note_id)
    if not note:
        return None
    db.delete(note)
    db.commit()
    return True

