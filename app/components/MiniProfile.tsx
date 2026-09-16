"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col ml-10 mt-14">
      <div className="flex items-center justify-between">
        {session?.user?.image && (
          <img
            className="h-16 rounded-full border p-0.5 mr-3 object-contain"
            src={session.user.image}
            alt=""
          />
        )}
        <div className="flex-1 ml-4">
          <h2 className="font-bold">{session?.user?.username}</h2>
          <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
        </div>
        <button
          onClick={() => signOut()}
          className="text-blue-400 text-sm font-semibold cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <Link href="/saved" className="text-sm text-blue-400 font-semibold mt-3">
        Saved Posts
      </Link>
    </div>
  );
}
