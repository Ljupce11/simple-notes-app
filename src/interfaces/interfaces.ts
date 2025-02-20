export interface Note {
  id: number;
  body: string;
}

export interface NotesContextType {
  notes: Note[];
  updateAllNotes: (notes: Note[]) => void;
  getNote: (id: number) => Note | undefined;
}

export interface UsersContextType {
  users: string[];
  setUsers: (users: string[]) => void;
}
