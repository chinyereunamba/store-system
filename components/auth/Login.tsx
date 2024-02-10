import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <>
      <form action="" className="flex flex-col gap-3 w-96">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 rounded-md"
          />
        </div>
        <button type="submit" className="border-2 border-black p-2 rounded-md">
          Login
        </button>
        <div className="flex flex-col">
          <p>
            <Link className="hover:underline" href={"/"}>
              Forgot password?
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link className="hover:underline" href={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
