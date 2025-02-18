import { createContext } from "react";

import type { Note } from "../interfaces/interfaces";

export interface NotesContextType {
  notes: Note[];
  updateAllNotes: (notes: Note[]) => void;
  getNote: (id: number) => Note | undefined;
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined,
);
