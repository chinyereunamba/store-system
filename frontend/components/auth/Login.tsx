"use client";
import Link from "next/link";
import React, { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import style from "./auth.module.css";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const data = {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    };

    console.log(email, password);
    await signIn("credentials", data);
    return;
  };
  return (
    <section>
      <div className={`flex flex-col items-center mb-7 ${style.profile}`}>
        <FaUserCircle />
        <h1 className="my-2">Anol</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-96"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 rounded-md"
            ref={emailRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 rounded-md"
            ref={passwordRef}
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
            Don&apos;t have an account?{" "}
            <Link className="hover:underline" href={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
