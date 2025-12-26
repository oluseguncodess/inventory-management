import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 md:p-12 w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* Logo SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="24" height="16" rx="3" fill="#2563eb" />
          <rect x="8" y="12" width="16" height="8" rx="2" fill="#fff" />
          <path d="M12 16h8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-bold md:text-xl">InvPulse</span>
      </div>
      <Link href="/auth/sign-in" className="bg-btn-blue py-1 px-3 rounded-md text-sm font-bold md:py-2 md:px-5 cursor-pointer ">Login</Link>
    </header>
  );
}