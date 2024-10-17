"use client";
import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const email = loginInfo.email;
    const password = loginInfo.password;

    try {
      signIn("credentials", { redirect: true, email, password })
      return redirect("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <>
        <div className="text-center mb-4">
          <h1>Login</h1>
          <p>Sign into your account</p>
        </div>
        <AuthForm
          submitHandler={submitHandler}
          btnName="Login"
          inputList={[
            {
              type: "email",
              placeholder: "johndoe@mail.com",
              name: "email",
              label: "Email",
              value: loginInfo.email,
              changeHandler(e) {
                setLoginInfo({ ...loginInfo, email: e.currentTarget.value });
              },
            },
            {
              type: "password",
              placeholder: "***********",
              name: "password",
              label: "Password",
              value: loginInfo.password,
              changeHandler(e) {
                setLoginInfo({ ...loginInfo, password: e.currentTarget.value });
              },
            },
          ]}
        />
        <small className="text-left  my-2">
          Don&apos;t have an account? <Link href={"/register"}>Sign up</Link>
        </small>
      </>
    </main>
  );
}

export default LoginPage;
