"use client"
import React, { useState } from "react";
import style from "./layout.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Move() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
        className={style.move}>
      <input
        id={style.move}
        type="checkbox"
        checked={isOpen}
        onChange={handleToggle}
      />
      <label htmlFor={style.move}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </label>
    </div>
  );
}

export default Move;
