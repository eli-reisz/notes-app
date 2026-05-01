const API = "http://127.0.0.1:8000/api"

let allNotes = []

function renderNotes(notes) {
  const list = document.getElementById("notesList")
  list.innerHTML = ""
  notes.forEach(note => {
    const div = document.createElement("div")
    div.className = "note"
    div.innerHTML = `
      <p>${note.content}</p>
      <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
    `
    list.appendChild(div)
  })
}

async function loadNotes() {
  const res = await fetch(`${API}/notes`)
  allNotes = await res.json()
  const query = document.getElementById("searchInput").value.toLowerCase()
  renderNotes(allNotes.filter(n => n.content.toLowerCase().includes(query)))
}

async function addNote() {
  const input = document.getElementById("noteInput")
  const content = input.value.trim()
  if (!content) return
  await fetch(`${API}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  })
  input.value = ""
  loadNotes()
}

async function deleteNote(id) {
  await fetch(`${API}/notes/${id}`, { method: "DELETE" })
  loadNotes()
}

document.getElementById("addBtn").addEventListener("click", addNote)
document.getElementById("searchInput").addEventListener("input", () => {
  const query = document.getElementById("searchInput").value.toLowerCase()
  renderNotes(allNotes.filter(n => n.content.toLowerCase().includes(query)))
})

loadNotes()