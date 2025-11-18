// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm.jsx";
import NotesList from "./components/NotesList.jsx";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/api.js";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = async (noteData) => {
    try {
      setLoading(true);
      if (editingNote) {
        const updated = await updateNote(editingNote.id, noteData);
        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
        setEditingNote(null);
      } else {
        const created = await createNote(noteData);
        setNotes((prev) => [created, ...prev]);
      }
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      setLoading(true);
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes App</h1>
        <span className="badge">{notes.length} notes</span>
      </header>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <div className="layout">
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
          onCancel={handleCancelEdit}
        />
        <NotesList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
