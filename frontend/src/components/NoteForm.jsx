// src/components/NoteForm.jsx
import React, { useEffect, useState } from "react";

const emptyNote = { title: "", content: "" };

function NoteForm({ onSave, editingNote, onCancel }) {
  const [note, setNote] = useState(emptyNote);

  useEffect(() => {
    if (editingNote) {
      setNote({
        title: editingNote.title ?? "",
        content: editingNote.content ?? "",
      });
    } else {
      setNote(emptyNote);
    }
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title.trim()) return;
    onSave(note);
    setNote(emptyNote);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{editingNote ? "Edit Note" : "New Note"}</h2>

      <label>
        Title
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Note title"
          required
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Write something..."
          rows={4}
        />
      </label>

      <div className="form-actions">
        <button type="submit">
          {editingNote ? "Update" : "Add"}
        </button>
        {editingNote && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
