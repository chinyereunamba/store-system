"use client";
import React, { useState } from "react";
import style from "./layout.module.css";

function Move() {
  const [close, setClose] = useState<boolean | null>(false);
  const click = close ? style.close : style.open;
    return (
      <span>
          <input
            className={`${style.move} ${click}`}
            id="move"
            type="checkbox"
            onClick={() => setClose(!close)}
            />
            <label htmlFor="move">
                
            </label>
      </span>
      
  );
}

export default Move;
