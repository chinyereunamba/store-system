"use client";

import * as React from "react";

import Search from "../utils/Search";
import { NavMenu } from "./NavMenu";

function Nav() {
  return (
    <nav className="p-3 rounded-ss-md border flex justify-between items-center">
      <NavMenu />
      <Search />
    </nav>
  );
}

export default Nav;
