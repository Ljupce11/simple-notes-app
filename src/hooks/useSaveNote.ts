import { useCallback, useState } from "react";
import { updateNote } from "../services/notes";

export const useSaveNote = (noteId: string | undefined) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const saveNote = useCallback(
    async (body: string) => {
      try {
        setIsSaving(true);
        await updateNote(Number(noteId), { body });
      } catch (error) {
        console.error("Failed to update note:", error);
        setError("Failed to update note");
      } finally {
        setIsSaving(false);
      }
    },
    [noteId],
  );

  return {
    saveNote,
    isSaving,
    error,
  };
};
