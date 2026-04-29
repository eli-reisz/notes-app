from fastapi import APIRouter
from backend.storage import read_notes, write_notes
from pydantic import BaseModel
import uuid

router = APIRouter()

class Note(BaseModel):
    content: str

@router.get("/notes")
def get_notes():
    return read_notes()

@router.post("/notes")
def add_note(note: Note):
    notes = read_notes()
    new_note = {"id": str(uuid.uuid4()), "content": note.content}
    notes.append(new_note)
    write_notes(notes)
    return new_note

@router.delete("/notes/{note_id}")
def delete_note(note_id: str):
    notes = read_notes()
    notes = [n for n in notes if n["id"] != note_id]
    write_notes(notes)
    return {"message": "deleted"}