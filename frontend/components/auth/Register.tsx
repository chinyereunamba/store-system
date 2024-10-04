"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email: user.email,
      username: user.username,
      password1: user.password,
      password2: user.password,
    };

    const response =  fetch(
      `http://127.0.0.1:8000/api/user/registration/`, {
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    return router.push('/')

  };
  return (
    <form action="" className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="p-3 rounded-md"
          placeholder="admin@gmail.com"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          className="p-3 rounded-md"
          placeholder="admin"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.currentTarget.value })
          }
        />
      </div>{" "}
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-3 rounded-md"
          placeholder="*********"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.currentTarget.value })
          }
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
          already have an account?{" "}
          <Link className="hover:underline" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
