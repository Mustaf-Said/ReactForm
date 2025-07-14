// context/UserProvider.tsx
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import type { UserData } from "../type/Type";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("userList");
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const addUser = (newUser: UserData) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
}
