"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useModalStore } from "@/store/useModalStore";

export default function MobileMenu() {
  const { data: session } = useSession();
  const { setOpen: setUploadOpen } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  if (!session) return null;

  function go(path: string) {
    setShowMenu(false);
    router.push(path);
  }

  return (
    <>
      <button
        onClick={() => setShowMenu(true)}
        className="md:hidden p-1"
        aria-label="Menu"
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40 flex items-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full rounded-t-2xl pb-6 pt-2 animate-slide-up"
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center gap-3 px-5 pb-4 border-b">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-bold text-sm">{session.user?.username}</p>
                <p className="text-xs text-gray-400">{session.user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => go("/")}
              className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 ${
                pathname === "/" ? "font-semibold" : ""
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                setUploadOpen(true);
              }}
              className="w-full text-left px-5 py-3 text-sm hover:bg-gray-50"
            >
              New Post
            </button>

            <button
              onClick={() => go("/saved")}
              className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 ${
                pathname === "/saved" ? "font-semibold" : ""
              }`}
            >
              Saved Posts
            </button>

            <button
              onClick={() => go("/messages")}
              className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 ${
                pathname === "/messages" ? "font-semibold" : ""
              }`}
            >
              Messages
            </button>

            <div className="border-t mt-1">
              <button
                onClick={() => {
                  setShowMenu(false);
                  signOut();
                }}
                className="w-full text-left px-5 py-3 text-sm text-red-500 font-semibold hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>

            <button
              onClick={() => setShowMenu(false)}
              className="w-full text-center px-5 py-3 text-sm text-gray-400 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
