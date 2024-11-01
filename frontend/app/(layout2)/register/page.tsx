"use client";
import AuthForm from "@/components/forms/AuthForm";
import { axiosInstance } from "@/lib/utils";
import Link from "next/link";
import { z } from "zod";

import React, { FormEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useUsers } from "@/store/context";

function RegisterPage() {
  const [signUp, setSignUp] = useState({
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const userList = () => {
    let list: string[] = [];
    users.forEach((user) => {
      list.push(user.username);
    });
    return list;
  };
  const findUsername = (username: string) => {
    let list = userList()
    if(list.find(user=>user===username)) return true
  };
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    passwordError: "",
    rePasswordError: "",
    username: "",
    email: "",
  });

  // Define the schema for form validation
  const formSchema = z
    .object({
      email: z.string().email({ message: "Invalid email format" }),
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(16, { message: "Password must be no more than 16 characters" }),
      rePassword: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: "Passwords do not match",
    });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setError({
      passwordError: "",
      rePasswordError: "",
      username: "",
      email: "",
    });
    try {
      const parsedData = formSchema.safeParse(signUp);
      // If validation is successful, submit the form data
      if (parsedData.success) {
        setLoading(true);
        const data = {
          email: signUp.email,
          username: signUp.username,
          password1: signUp.password,
          password2: signUp.rePassword,
        };

        axiosInstance.post("/user/registration/", data);
        return redirect("/login");
      } else {
        const fieldErrors = parsedData.error.flatten().fieldErrors;
        setError({
          email: fieldErrors.email?.[0] || "",
          username: fieldErrors.username?.[0] || "",
          passwordError: fieldErrors.password?.[0] || "",
          rePasswordError: fieldErrors.rePassword?.[0] || "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));

    const parsedData = formSchema.safeParse({
      ...signUp,
      [name]: value,
    });
    
    // const usernameInput = if (name == 'username') return value
    // findUsername(usernameInput)

    if (!parsedData.success) {
      // Map Zod errors to the error state for the current field
      const fieldErrors = parsedData.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      setError((prevError) => ({
        ...prevError,
        [name]: fieldErrors[name]?.[0] || "",
      }));
    } else {
      // Clear the error for the current field if validation passes
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center mb-4">
        <h1>Register</h1>
        <p>Sign up with us</p>
      </div>
      <AuthForm
        submitHandler={submitHandler}
        btnName="Sign up"
        loading={loading}
        inputList={[
          {
            type: "email",
            placeholder: "johndoe@mail.com",
            name: "email",
            label: "Email",
            value: signUp.email,
            changeHandler: (e) => handleChange(e),
            error: error.email,
          },
          {
            type: "text",
            placeholder: "johndoe",
            name: "username",
            label: "Username",
            value: signUp.username,
            changeHandler: (e) => handleChange(e),
            error: error.username,
          },
          {
            type: "password",
            placeholder: "***********",
            name: "password",
            label: "Password",
            value: signUp.password,
            changeHandler: (e) => handleChange(e),
            error: error.passwordError,
          },
          {
            type: "password",
            placeholder: "***********",
            name: "rePassword",
            label: "Retype password",
            value: signUp.rePassword,
            changeHandler(e) {
              setSignUp({ ...signUp, rePassword: e.currentTarget.value });
              if (signUp.password !== e.currentTarget.value) {
                setError({
                  ...error,
                  rePasswordError: "Passwords do not match",
                });
              } else {
                setError({ ...error, rePasswordError: "" });
              }
            },
            error: error.rePasswordError,
          },
        ]}
      />
      <small className="text-left my-2">
        Already have an account? <Link href={"/login"}>Login</Link>
      </small>
    </main>
  );
}

export default RegisterPage;
