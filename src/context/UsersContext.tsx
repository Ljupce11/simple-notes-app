import { createContext } from "react";

export interface UsersContextType {
  users: string[];
  setUsers: (users: string[]) => void;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
);
