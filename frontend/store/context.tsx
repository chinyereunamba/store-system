// Importing required modules
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
// import SidebarContextProvider from "./sidebarContext";

// Defining types
type UserContextProviderProps = {
  children: React.ReactNode;
};

type CustomSession = {
  account: {
    email: string;
    is_superuser: boolean;
    pk: number;
    username: string;
  };
  access: string;
  refresh: string;
};

type User = {
  user: CustomSession["account"];
  access: string;
  refresh: string;
};

type UserContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

// Creating the context
const UserContext = createContext<UserContext | null>(null);

// Defining the provider component
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser({
        user: session.user?.account as any, // Assuming session.user is the structure you need
        access: session.user?.access,
        refresh: session.user?.refresh,
      });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      {/* <SidebarContextProvider>{children}</SidebarContextProvider> */}
    </UserContext.Provider>
  );
}

// Defining the hook to use the context
export function useUserContext() {
  const userContext = useContext(UserContext);

  if (userContext === null) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return userContext;
}

export default UserContext;
