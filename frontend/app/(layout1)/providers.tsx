"use client";
import { UserContextProvider } from "@/store/context";
import ProductContextProvider from "@/store/productContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Provider({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <ProductContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ProductContextProvider>
    </SessionProvider>
  );
}
