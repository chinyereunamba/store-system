import Register from "@/components/auth/Register";
import React from "react";
import { FaUserCircle } from "react-icons/fa";



export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="profile self-center">
        <h1>Anol</h1>
        <FaUserCircle size={35}/>
      </div>
      <Register />
    </div>
  );
}
