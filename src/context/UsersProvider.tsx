import { type ReactNode, useState } from "react";

import type { UsersContextType } from "../interfaces/interfaces";
import { UsersContext } from "./UsersContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UsersProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UsersContextType["users"]>([]);

  const value = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
