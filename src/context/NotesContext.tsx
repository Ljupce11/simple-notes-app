import { createContext } from "react";

import type { NotesContextType } from "../interfaces/interfaces";

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined,
);
