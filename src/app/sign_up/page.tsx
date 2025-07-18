"use client";
import Image from "next/image";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { auth, provider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();
  const cookies = new Cookies();

  // ------------------------------------------------Signup  Manually------------------------------------------------

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      cookies.set("auth-token", userCredential.user.refreshToken);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert(
            "Email is already in use. Try logging in or use a different email."
          );
        } else if (error.message) {
          alert(error.message);
        } else {
          alert("An unknown error occurred.");
        }
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  // ------------------------------------------------Login with Google ------------------------------------------------

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      } else {
        console.error("Unknown error signing out");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ------------------------------------------------Sign Up Form------------------------------------------------ */}
      <main className="flex-2 flex items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex justify-center mb-4">
            <Image src="/images.png" alt="Logo" width={150} height={40} />
          </div>
          <h1 className="text-center text-xl font-semibold text-gray-900">
            𝕀𝕟𝕥𝕖𝕣𝕟 𝕀𝕟𝕥𝕖𝕝𝕝𝕚𝕘𝕖𝕟𝕔𝕖 𝕊𝕚𝕘𝕟 𝕦𝕡 ℙ𝔸𝔾𝔼
          </h1>

          <h2 className="text-center text-xl font-semibold text-gray-900">
            Sign up
          </h2>

          <button
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={signInWithGoogle}
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            Continue with Google
          </button>

          <div className="flex items-center justify-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/*---------------------------------------------- Form start---------------------------------------------- */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!registerEmail || !registerPassword) {
                alert("Please fill in both email and password.");
                return;
              }
              register();
            }}
            className="space-y-4"
          >
            {" "}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                className="w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold"
            >
              Join
            </button>
          </form>
          {/*---------------------------------------------- Form end---------------------------------------------- */}
          <span className="flex justify-center-safe items-center-safe">
            Already have an account?
            <Link
              href="/login"
              className="text-blue-600 hover:underline text-sm"
            >
              Login
            </Link>
          </span>
        </div>
      </main>
      {/* ------------------------------------------------Background Image Section------------------------------------ */}
      <aside className="hidden md:flex flex-1 bg-[url('/right.png')] bg-cover bg-center items-center justify-center"></aside>{" "}
    </div>
  );
}
