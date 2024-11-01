"use client";

import * as React from "react";

import Search from "../utils/Search";
import { NavMenu } from "./NavMenu";

function Nav() {
  return (
    <nav className="p-2 px-4 m-4 max-sm:m-2 rounded-lg border flex justify-between items-center">
      <NavMenu />
      <Search />
    </nav>
  );
}

export default Nav;
