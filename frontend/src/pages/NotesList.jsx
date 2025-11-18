import { useEffect, useState } from "react";
import api from "../services/api";

function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Notes</h1>

      {notes.length === 0 && <p>No notes yet...</p>}

      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
