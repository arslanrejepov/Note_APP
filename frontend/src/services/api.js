// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // FastAPI server
});

// ---------- Notes API ----------
export const fetchNotes = async () => {
  const res = await api.get("/notes/");
  return res.data;
};

export const createNote = async (note) => {
  const res = await api.post("/notes/", note);
  return res.data;
};

export const updateNote = async (id, note) => {
  const res = await api.put(`/notes/${id}`, note);
  return res.data;
};

export const deleteNote = async (id) => {
  await api.delete(`/notes/${id}`);
};

export default api;
