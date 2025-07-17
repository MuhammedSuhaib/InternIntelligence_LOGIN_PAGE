"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Image from "next/image";

const cookies = new Cookies(); 

export default function UserMenu() {
  const [user, setUser] = useState(auth.currentUser);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((u) => {
    if (!u) {
      window.location.href = "/"; // redirect if not logged in
    } else {
      setUser(u);
    }
  });

  return () => unsubscribe();
}, []);


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      window.location.href = "/"; // back to login
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Image
            src={user.photoURL || "/user.jpg"}
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-1">
          {user.displayName || "Anonymous"}
        </h1>

        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
