import Image from "next/image";

export default function SignUp() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sign Up Form */}
      <div className="flex-2 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex justify-center mb-4">
            <Image src="/images.png" alt="Logo" width={150} height={40} />
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-900">Sign up</h2>

          <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            Continue with Google
          </button>

          <div className="flex items-center justify-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
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
        </div>
      </div>
      {/* Background Image Section */}
      <div className="flex-1 bg-[url('/bird.webp')] bg-cover bg-center flex items-center justify-center">
      </div>
    </div>
  );
}