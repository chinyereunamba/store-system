import Register from "@/components/auth/Register";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="profile">
        <h1>Anol</h1>
        <FaUserCircle />
      </div>
      <Register />
    </div>
  );
}
