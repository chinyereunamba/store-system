import React from "react";

export default function BlockTitle({ title }: { title: string }) {
  return <h3 className="text-xl text-text capitalize">{title}</h3>;
}
