import { type ReactNode, useCallback, useState } from "react";

import type { NotesContextType } from "../interfaces/interfaces";
import { NotesContext } from "./NotesContext";

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<NotesContextType["notes"]>([]);

  const getNote = useCallback(
    (id: number) => {
      return notes.find((note) => note.id === id);
    },
    [notes],
  );

  const updateAllNotes = useCallback((notes: NotesContextType["notes"]) => {
    setNotes(notes);
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        updateAllNotes,
        getNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
