"use client";
import React, {
  ChangeEvent,
  FormEvent,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import { Input, InputProps } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  CircleCheck,
  CircleXIcon,
} from "lucide-react";

interface CustomInputProps extends InputProps {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  value: string;
  label?: string;
  error?: string;
  changeHandler: (e: any) => void;
}

type AuthFormProps = {
  inputList: CustomInputProps[];
  btnName: string;
  loading: boolean;
  submitHandler: (e: FormEvent) => void;
};

export default function AuthForm({
  inputList,
  btnName,
  loading = false,
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
              className={input.error && "border-destructive"}
              role="input"
              aria-description="Gets input from user"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <EyeClosedIcon fontSize={16} />
                ) : (
                  <EyeOpenIcon fontSize={16} />
                )}
              </span>
            )}
            {(input.name === "username" || input.name === "email") && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all">
                {input.error == undefined ? (
                  ""
                ) : input.error === "" ? (
                  <CircleCheck className="text-primary" size={20} />
                ) : (
                  <CircleXIcon className="text-destructive" size={20} />
                )}
              </span>
            )}
          </div>
          <span className="error text-sm text-red-500">{input.error}</span>
        </div>
      ))}
      <Button className={`w-full`} type="submit" disabled={loading}>
        {loading && (
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        {btnName}
      </Button>
    </form>
  );
}
