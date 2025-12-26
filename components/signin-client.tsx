import Image from "next/image";
import google from "@/images/google.svg";
import AuthForm from "@/components/auth-form";
import signinImage from "@/images/signin.png";

export default function SignInClient() {
  return (
    <>
      <div className="flex md:items-center md:h-screen overflow-hidden">
        <div className="flex-1 flex justify-center">
          <div className="w-full md:w-4/5 p-4 flex flex-col gap-8 overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center mb-5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="8"
                    width="24"
                    height="16"
                    rx="3"
                    fill="#2563eb"
                  />
                  <rect x="8" y="12" width="16" height="8" rx="2" fill="#fff" />
                  <path
                    d="M12 16h8"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-bold md:text-xl">InvPulse</span>
              </div>
              <h1 className="font-bold text-2xl">Welcome back</h1>
              <p className="text-sm text-gray-400">
                Welcome back! Please log into your account.
              </p>
            </div>
            <div className="w-full">
              <button className="flex items-center py-2.5 px-8 gap-2 text-[0.75rem] border border-gray-600 rounded-[10px] bg-field-black w-full justify-center">
                <Image src={google} alt="google" className="w-3.5 h-3.5" />
                Google
              </button>
            </div>
            <AuthForm />
          </div>
        </div>
        <div className="flex-1 hidden md:flex h-full items-center justify-center">
          <div className="w-4/5 h-[90%] min-w-100 px-5">
            <Image
              src={signinImage}
              alt="black woman in warehouse"
              className="w-full h-full rounded-4xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
