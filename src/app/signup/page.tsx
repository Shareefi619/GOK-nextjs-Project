"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
interface ISignupForm {
  username: string;
  email: string;
  password: string;
  changePassword: string;
}

export default function SignupPage() {
  const { handleSubmit, control, getValues } = useForm<ISignupForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      changePassword: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSignup: SubmitHandler<ISignupForm> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", data);
      if (res.status === 400) {
        throw new Error("Signup failed");
      } else {
        toast.success("Signup Success");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignup)}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-md bg-neutral-700 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {loading ? "Processing" : "Signup"}
          </h2>
          <hr className="mb-4" />
          <label htmlFor="username" className="flex mb-2 font-medium">
            Username
          </label>
          <Controller
            // ... rest of the Controller code for username input
            control={control}
            name="username"
            rules={{
              required: { value: true, message: "Username is required!" },
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
                message: "Invalid Username",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  className="flex p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="username"
                />
                <span>{error?.message}</span>
              </>
            )}
          />
          <label htmlFor="email" className="flex mt-2 mb-2 font-medium">
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
          <label htmlFor="password" className="flex mt-1 mb-2 font-medium">
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
          <label
            htmlFor="confirmPassword"
            className="flex mt-4 mb-2 font-medium"
          >
            Confirm Password
          </label>
          <Controller
            // ... rest of the Controller code for confirmPassword input
            control={control}
            name="changePassword"
            rules={{
              required: { value: true, message: "Password is required!" },
              validate: {
                checkPassword: (value) =>
                  value === getValues("password") || "Password not match",
              },
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
            className={`flex px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "No signup" : "Signup"}
          </button>

          <p className="mt-4">
            <Link href="/login" className="text-blue-500 hover:underline">
              Visit Login Page
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
