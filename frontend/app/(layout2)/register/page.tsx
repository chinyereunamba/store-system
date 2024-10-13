"use client";
import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

function RegisterPage() {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <>
        <div className="text-center mb-4">
          <h1>Register</h1>
          <p>Sign up with us</p>
        </div>
        <AuthForm
          submitHandler={submitHandler}
          btnName="Sign up"
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
              type: "text",
              placeholder: "johndoe",
              name: "username",
              label: "Username",
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
            {
              type: "password",
              placeholder: "***********",
              name: "rePassword",
              label: "Retype password",
              value: loginInfo.password,
              changeHandler(e) {
                setLoginInfo({ ...loginInfo, password: e.currentTarget.value });
              },
            },
          ]}
        />
        <small className="text-left  my-2">
          Already have an account? <Link href={"/login"}>Login</Link>
        </small>
      </>
    </main>
  );
}

export default RegisterPage;
