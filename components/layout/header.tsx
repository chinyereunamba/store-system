import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="title">
        <h3>Dashboard</h3>
      </div>
      <div className="search flex items-center">
        <input type="text" placeholder="Search Products" />
        <span>
          <FaSearch />
        </span>
      </div>
      <div className="profile flex gap-4 items-center">
        <div className="user">Chinyere</div>
        <div className="settings">Settings</div>
      </div>
    </header>
  );
}
