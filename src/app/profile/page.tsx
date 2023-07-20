"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/myuser");
    setData(res.data.data.username);
    console.log(res.data);
  };
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded ">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={onLogout}
        className=" p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        user Details
      </button>
    </div>
  );
}
