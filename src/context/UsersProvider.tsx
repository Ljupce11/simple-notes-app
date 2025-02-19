import { type ReactNode, useState } from "react";

import { UsersContext } from "./UsersContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UsersProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<string[]>([]);

  const value = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
