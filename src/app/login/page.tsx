"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function LoginPage() {
  const { handleSubmit, control, getValues } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onLogin: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", data);
      if (res.status === 400) {
        throw new Error("Login failed");
      } else {
        toast.success("Login Success");
        router.push("/profile");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>{loading ? "Processing" : "Login"}</h2>
        <hr />
        <label htmlFor="email">email</label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: { value: true, message: "Email is required!" },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid Email",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="email"
              />
              <span>{error?.message}</span>
            </>
          )}
        />
        <label htmlFor="password">password</label>

        <Controller
          control={control}
          name="password"
          rules={{
            required: { value: true, message: "Password is required!" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="password"
              />
              <span>{error?.message}</span>
            </>
          )}
        />
        
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-black bg-blue-500 hover:bg-blue-60 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Login
        </button>
        <Link href="/signup">Visit Signup Page</Link>
      </div> */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-md bg-neutral-700 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 items-center text-center">
            {loading ? "Processing" : "Login"}
          </h2>
          <hr className="mb-4" />
          <label htmlFor="email" className="flex mb-5 font-medium">
            Email
          </label>
          <Controller
            // ... rest of the Controller code for email input
            control={control}
            name="email"
            rules={{
              required: { value: true, message: "Email is required!" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid Email",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  className="flex p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="email"
                />
                <span>{error?.message}</span>
              </>
            )}
          />
          <label htmlFor="password" className="flex mt-4 mb-2 font-medium">
            Password
          </label>
          <Controller
            // ... rest of the Controller code for password input
            control={control}
            name="password"
            rules={{
              required: { value: true, message: "Password is required!" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  className="flex p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="password"
                />
                <span>{error?.message}</span>
              </>
            )}
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing" : "Login"}
          </button>
          <p className="mt-4">
            <Link href="/signup" className="text-blue-500 hover:underline">
              Visit Signup Page
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
