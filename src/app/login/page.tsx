"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  // ------------------------------------------------Login Manually------------------------------------------------

  const login = async () => {
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      cookies.set("auth-token", user.user.refreshToken);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      } else {
        console.error("Unknown error signing out");
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

  // ------------------------------------------------Password Reset------------------------------------------------

 const resetPassword = async () => {
  if (!loginEmail) {
    alert("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, loginEmail);
    alert("Password reset email sent to " + loginEmail);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        alert("Email not registered. Please sign up first.");
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
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/*Form */}
      <main className="flex-2 flex items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex justify-center mb-4">
            <Image src="/images.png" alt="Logo" width={150} height={40} />
          </div>
              <h1 className="text-center text-xl font-semibold text-gray-900">
            𝕀𝕟𝕥𝕖𝕣𝕟 𝕀𝕟𝕥𝕖𝕝𝕝𝕚𝕘𝕖𝕟𝕔𝕖 𝕃𝕠𝕘𝕚𝕟 ℙ𝔸𝔾𝔼
          </h1>

          <h2 className="text-center text-xl font-semibold text-gray-900">
            Login
          </h2>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
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
              if (!loginEmail || !loginPassword) {
                alert("Please fill in both email and password.");
                return;
              }
              login();
            }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                className="w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Remember"
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  id="Remember"
                  name="Remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-blue-600"
                />
                Remember me
              </label>
              <button
                disabled={!loginEmail}
                onClick={(e) => {
                  e.preventDefault();
                  resetPassword();
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold"
            >
              Login
            </button>
          </form>

          {/*---------------------------------------------- Form end---------------------------------------------- */}

          <span className="flex justify-center-safe items-center-safe">
            Don&apos;t have an account?
            <Link
              href="/sign_up"
              className="text-blue-600 hover:underline text-sm"
            >
              Sign up
            </Link>
          </span>
        </div>
      </main>

      {/* ------------------------------------------------Background Image Section------------------------------------ */}
      
      <aside className="hidden md:flex flex-1 bg-[url('/right.png')] bg-cover bg-center items-center justify-center"></aside>
    </div>
  );
}
