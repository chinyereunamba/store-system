"use client";
import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 border rounded-lg mt-4 flex flex-col gap-4 h-full">
      {children}
    </main>
  );
}
