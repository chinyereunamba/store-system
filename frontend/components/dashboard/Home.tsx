"use client";
import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 max-sm:p-2 border rounded-lg m-4 max-sm:m-2 flex flex-col gap-4 h-full">
      {children}
    </main>
  );
}
