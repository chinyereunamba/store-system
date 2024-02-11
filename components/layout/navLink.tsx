import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  to: string;
  name: string;
  icon: React.JSX.Element;
};

export default function NavLink({ to, name, icon }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <li className={pathname == to ? "bg-primary text-secondary" : ""}>
      <Link href={to}>
        {icon} {name}
      </Link>
    </li>
  );
}
