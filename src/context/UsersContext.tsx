import { createContext } from "react";

import type { UsersContextType } from "../interfaces/interfaces";

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
);
