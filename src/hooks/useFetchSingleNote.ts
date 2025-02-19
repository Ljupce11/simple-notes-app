import { useEffect, useState } from "react";

import { fetchSingleNote } from "../services/notes";
import { useNotes } from "./useNotes";

export const useFetchSingleNote = (id: string | undefined) => {
  const { getNote } = useNotes();
  const [noteBody, setNoteBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchNoteError, setFetchNoteError] = useState("");

  useEffect(() => {
    const noteId = Number(id);
    const cachedNote = getNote(noteId);

    if (cachedNote) {
      setNoteBody(cachedNote.body);
      setIsLoading(false);
    } else {
      const fetchNote = async () => {
        try {
          const response = await fetchSingleNote(noteId);
          setNoteBody(response.body);
        } catch (error) {
          console.error("Failed to fetch note:", error);
          setFetchNoteError("Failed to fetch note");
        } finally {
          setIsLoading(false);
        }
      };
      fetchNote();
    }
  }, [getNote, id]);

  return {
    noteBody,
    setNoteBody,
    isLoading,
    fetchNoteError,
  };
};
