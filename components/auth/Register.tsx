import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <>
      <form action="" className="flex flex-col gap-3 w-96">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            className="p-3 rounded-md"
            placeholder="admin"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-3 rounded-md"
            placeholder="admin@gmail.com"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-3 rounded-md"
            placeholder="*********"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="repassword">Re-enter Password</label>
          <input
            type="password"
            name="password"
            id="repassword"
            className="p-3 rounded-md"
            placeholder="**********"
          />
        </div>
        <button type="submit" className="border-2 border-black p-3 rounded-md">
          Sign up
        </button>
        <div className="flex">
          <p className="capitalize">
            already have an account? <Link className="hover:underline" href={"/login"}>Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}
