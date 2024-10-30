"use client";
import { Command, CommandInput } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomButton } from "./Button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Search() {
  const router = useRouter();
  const { data: session } = useSession();
  const initial = String(session?.user?.account?.username)[0].toLocaleUpperCase();
  return (
    <div className="max-sm:w-full w-2/4 flex gap-2 shadow-none">
      <Command className="rounded-lg border">
        <CommandInput placeholder="Search..." />
      </Command>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
