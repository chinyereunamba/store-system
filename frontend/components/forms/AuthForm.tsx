"use client";
import React, { FormEvent, HTMLInputTypeAttribute, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type InputProps = {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  value: string;
  label?: string;
  changeHandler: (e: any) => void;
};

type AuthFormProps = {
  inputList: InputProps[];
  btnName: string;
  submitHandler: (e: FormEvent) => void;
};

export default function AuthForm({
  inputList,
  btnName,
  submitHandler,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      method="post"
      onSubmit={submitHandler}
      className="max-w-[450px] w-full"
    >
      {inputList.map((input, index) => (
        <div className="my-3" key={index}>
          {input.label && (
            <Label className="mb-3" htmlFor={input.name}>
              {input.label}
            </Label>
          )}
          <div className="relative">
            <Input
              type={
                input.type === "password" && showPassword ? "text" : input.type
              }
              placeholder={input.placeholder}
              name={input.name}
              id={input.name}
              value={input.value}
              onChange={input.changeHandler}
            />
            {input.type === "password" && (
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <EyeClosedIcon fontSize={16} />
                ) : (
                  <EyeOpenIcon fontSize={16} />
                )}
              </span>
            )}
          </div>
        </div>
      ))}
      <Button className="w-full" type="submit">
        {btnName}
      </Button>
    </form>
  );
}
