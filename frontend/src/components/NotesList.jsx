// src/components/NotesList.jsx
import React from "react";

function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return <p className="empty-state">No notes yet. Create one!</p>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <div className="note-header">
            <h3>{note.title}</h3>
            <span className="note-date">
              {new Date(note.created_at).toLocaleString()}
            </span>
          </div>
          {note.content && <p className="note-content">{note.content}</p>}

          <div className="note-actions">
            <button onClick={() => onEdit(note)}>Edit</button>
            <button
              className="danger"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
