// context/UserContext.tsx
import { createContext } from "react";
import type { UserData } from "../type/Type";

export type UserContextType = {
  users: UserData[];
  addUser: (user: UserData) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => { },
});
