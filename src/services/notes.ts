import type { Note } from "../interfaces/interfaces";

interface CreateNotePayload {
  body: string;
}

const apiUrlWithSession = import.meta.env.VITE_API_URL_WITH_SESSION;

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch(`${apiUrlWithSession}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await fetch(`${apiUrlWithSession}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
}

export async function updateNote(
  id: number,
  payload: CreateNotePayload,
): Promise<Note> {
  const response = await fetch(`${apiUrlWithSession}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
}

export async function fetchSingleNote(id: number): Promise<Note> {
  const response = await fetch(`${apiUrlWithSession}/notes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch note");
  }
  return response.json();
}
