"use client";
import React from "react";

export default function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="px-8 py-3 border border-t-0 rounded-ee-md flex flex-col gap-4">
      {children}
    </section>
  );
}
