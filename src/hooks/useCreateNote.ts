import { useState } from "react";

import { createNote } from "../services/notes";
import { useNotes } from "./useNotes";

export const useCreateNote = () => {
  const { notes, updateAllNotes } = useNotes();
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteBody, setNewNoteBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreatingNote(true);
      const newNote = await createNote({ body: newNoteBody });
      updateAllNotes([...notes, newNote]);
      setNewNoteBody("");
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsCreatingNote(false);
    }
  };

  return {
    newNoteBody,
    setNewNoteBody,
    isCreatingNote,
    error,
    createNote: handleCreateNote,
  };
};
