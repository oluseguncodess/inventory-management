"use client";

import { useSession } from "@/lib/auth-client";

function Userskeleton() {
  return (
    <div className={`flex items-center gap-4 animate-pulse`}>
      <span className="bg-gray-600 size-10 rounded-full flex justify-center items-center"></span>
      <div className="flex flex-col gap-2 w-40">
        <span className="p-1.5 rounded-md bg-gray-600"></span>
        <span className="p-1.5 rounded-md bg-gray-600"></span>
      </div>
    </div>
  );
}

export default function User() {
  const { data, isPending} = useSession();

  if (isPending) {
    return <Userskeleton />;
  }

  return (
    <div className={`flex items-center gap-4`}>
      <div className="bg-btn-blue size-10 rounded-full flex justify-center items-center">
        <span className="font-bold capitalize">
          {data?.user.email.charAt(0).toUpperCase() || 'o'}
        </span>
      </div>
      <div className="flex flex-col">
        <p className="text-[0.890rem] capitalize">
          {data?.user.name || 'user'}
        </p>
        <span className="text-[0.75rem] text-gray-500 lowercase">
          {data?.user.email || 'user@gmail.com'}
        </span>
      </div>
    </div>
  );
}
