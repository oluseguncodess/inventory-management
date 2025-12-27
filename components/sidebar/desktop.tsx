"use client";

import { sidebar } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./user";


export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="max-md:hidden w-1/5 min-w-65 h-[98%] p-3 my-auto ml-2 rounded-2xl  bg-sidebar-background justify-between flex flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex gap-3 items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="8" width="24" height="16" rx="3" fill="#2563eb" />
            <rect x="8" y="12" width="16" height="8" rx="2" fill="#fff" />
            <path
              d="M12 16h8"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="font-bold text-md">InvPulse</h3>
        </div>
        <ul className="flex flex-col gap-5">
          {sidebar.map((info) => (
            <Link
              key={info.id}
              href={info.path}
              className={`${
                pathname === info.path ? "bg-btn-blue rounded-md" : ""
              } cursor-pointer`}
            >
              <li className="flex gap-3 py-2 pl-2">
                <info.icon className="size-5" />
                <span className="text-sm">{info.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
          <hr className="border-t border-gray-600" />
          <User/>
        </div>
      </div>
    </aside>
  );
}
