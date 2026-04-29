import json
import os

FILE = "data/notes.json"

def read_notes():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r") as f:
        return json.load(f)
    
def write_notes(notes):
    with open(FILE, "w") as f:
        json.dump(notes, f, indent=2)