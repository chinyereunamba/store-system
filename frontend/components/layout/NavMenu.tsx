"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";



const links: { title: string; link: string }[] = [
  { title: "Overview", link: "/" },
  { title: "Products", link: "/products" },
  { title: "Sales", link: "/sales" },
  { title: "Purchases", link: "/purchase" },
  { title: "Settings", link: "/settings" },
];

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link, index) => (
          <NavigationMenuItem key={index+1}>
            <Link href={link.link} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:text-accent  focus:text-accent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
