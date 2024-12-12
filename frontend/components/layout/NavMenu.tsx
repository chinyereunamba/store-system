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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import { usePathname } from "next/navigation";

const links: { title: string; link: string }[] = [
  { title: "Overview", link: "/" },
  { title: "Products", link: "/products" },
  { title: "Sales", link: "/sales" },
  { title: "Purchases", link: "/purchase" },
  { title: "Settings", link: "/settings" },
];

export function NavMenu() {
  const [drawer, setDrawer] = React.useState(false);
  const path = usePathname().split("/")[1];

  return (
    <NavigationMenu>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <PanelLeft className="mr-4 sm:hidden" />
        </DrawerTrigger>
        <DrawerContent className="h-screen">
          <div className="mx-auto w-full max-w-sm">
            <DrawerTitle className="flex mt-4 justify-between items-center w-full p-4">
              <h3>Navigation menu</h3>
              <PanelLeftClose onClick={() => {}} />
            </DrawerTitle>
            <div className="p-4 pb-0">
              {links.map((link, index) => (
                <NavigationMenuItem
                  key={index + 1}
                  className={`list-none mb-2 
                    ${path == link.link && "data-[state=open]:bg-accent/50"}
                  `}
                >
                  <Link href={link.link} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <NavigationMenuList className="max-sm:hidden">
        {links.map((link, index) => (
          <NavigationMenuItem key={index + 1}>
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
