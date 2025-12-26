'use client'

import { sidebar } from "@/utils/constants";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const pathname = usePathname()

  return (
    <aside className="md:hidden p-1 bg-black mx-auto w-4/5 border border-gray-500 rounded-xl mb-2">
      <ul className="flex gap-8 items-center justify-center">
        {sidebar.map((info) => (
          <li key={info.id} className={`${pathname === info.path ? 'bg-btn-blue p-2 rounded-full' : ''}`}>
            <info.icon className="size-4" />
          </li>
        ))}
      </ul>
    </aside>
  );
}
