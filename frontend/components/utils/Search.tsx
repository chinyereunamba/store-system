"use client";
import { Command, CommandInput } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomButton } from "./Button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  return (
    <div className="w-96 flex gap-2 shadow-none">
      <Command className="rounded-lg border">
        <CommandInput placeholder="Search..." />
      </Command>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button onClick={() => router.push("/logout")}>Logout</Button>
    </div>
  );
}
