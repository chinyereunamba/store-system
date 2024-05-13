// Importing required modules
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

// Defining types
type UserContextProviderProps = {
  children: React.ReactNode;
};

type CustomSession = {
  user: {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    is_active: boolean;
    phone_number: string | null;
    address: string;
  };
  access_token: string;
  refresh_token: string;
  ref: number;
  is_admin: boolean;
  iat?: number;
  exp?: number;
  jti?: string;
};

type UseSessionData = {
  data: CustomSession | null;
  update: any;
  status: "authenticated" | "unauthenticated" | "loading";
};

type User = {
  user: CustomSession["user"];
  access_token: string;
  refresh_token: string;
  ref: number;
  is_admin: boolean;
  iat?: number;
  exp?: number;
  jti?: string;
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
  const { data: session } = useSession() as UseSessionData;

  useEffect(() => {
    if (session) {
      setUser({
        user: session.user as any, // Assuming session.user is the structure you need
        access_token: session.user?.access,
        refresh_token: session.user?.refresh,
        ref: session.ref,
        is_admin: session.is_admin,
        iat: session.iat,
        exp: session.exp,
        jti: session.jti,
      });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
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
