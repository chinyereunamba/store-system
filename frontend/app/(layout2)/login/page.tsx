"use client";
import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    passwordError: "",
    email: "",
  });

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Invalid password" }),
  });

  const [loading, setLoading] = useState(false);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    try {
      const email = loginInfo.email;
      const password = loginInfo.password;

      const validate = formSchema.safeParse(loginInfo);

      if (validate.success) {
        setLoading(true);
        signIn("credentials", { redirect: true, email, password });
      return redirect("/");

      } else {
        const fieldErrors = validate.error.flatten().fieldErrors;
        setError({
          email: fieldErrors.email?.[0] || "",
          passwordError: fieldErrors.password?.[0] || "",
        });
      }
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
          loading={loading}
          inputList={[
            {
              type: "email",
              placeholder: "johndoe@mail.com",
              name: "email",
              label: "Email",
              value: loginInfo.email,
              required: true,
              error: error.email,
              changeHandler(e) {
                loginInfo.email == "" &&
                  setError({ ...error, email: "This field is required" });
                setLoginInfo({ ...loginInfo, email: e.currentTarget.value });
              },
            },
            {
              type: "password",
              placeholder: "***********",
              name: "password",
              label: "Password",
              value: loginInfo.password,
              required: true,
              error: error.passwordError,
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
