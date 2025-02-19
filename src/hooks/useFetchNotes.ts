import { useEffect, useState } from "react";

import { fetchNotes } from "../services/notes";
import { useNotes } from "./useNotes";

export const useFetchNotes = () => {
  const { notes, updateAllNotes } = useNotes();
  const [isFetchingNotes, setIsFetchingNotes] = useState(notes.length === 0);

  useEffect(() => {
    const getNotes = async () => {
      try {
        setIsFetchingNotes(true);
        const data = await fetchNotes();
        updateAllNotes(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch notes");
      } finally {
        setIsFetchingNotes(false);
      }
    };
    getNotes();
  }, [updateAllNotes]);

  return {
    notes,
    isFetchingNotes,
    refetch: fetchNotes,
  };
};
