"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

const cookies = new Cookies();

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      window.location.href = "/"; // back to login
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      } else {
        console.error("Unknown error signing out");
      }
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
        <h1 className="text-center text-xl font-semibold text-gray-900">
          𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕠 𝕀𝕟𝕥𝕖𝕣𝕟 𝕀𝕟𝕥𝕖𝕝𝕝𝕚𝕘𝕖𝕟𝕔𝕖
        </h1>

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
