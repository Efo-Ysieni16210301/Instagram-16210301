"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/16/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useUnreadCount } from "@/lib/useUnreadCount";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession();
  const unreadCount = useUnreadCount();
  const { searchTerm, setSearchTerm } = useSearchStore();

  const { Open, setOpen } = useModalStore();
  const router = useRouter();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <div className="shadow-sm sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-3 sm:px-6 py-2">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer h-10 w-24 relative hidden lg:inline-grid"
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZXGoyoafkc5fy6FbTMmIUaL8pMbnwebAVBsssELqwA&s=10"
            fill
            sizes="96px"
            priority
            className="object-contain"
            alt="instagram"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer h-9 w-9 relative lg:hidden shrink-0"
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWpidznw6EtlGaj7MIfNrsSJANyKluOYUq1F5zPbulQ&s"
            fill
            sizes="36px"
            priority
            className="object-contain"
            alt="instagram"
          />
        </div>

        {/* Middle - hidden on mobile */}
        <div className="hidden sm:block relative flex-1 max-w-xs mx-4">
          <MagnifyingGlassIcon className="absolute top-2 left-2 h-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="bg-gray-50 border border-gray-500 rounded-md pl-10 pr-3 py-1.5 text-sm w-full focus:border-black focus:ring-black focus:outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <MagnifyingGlassIcon
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="h-6 cursor-pointer sm:hidden"
          />
          <MobileMenu />

          <HomeIcon
            onClick={() => router.push("/")}
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
          />
          <Link href="/messages" className="relative">
            <ChatBubbleLeftIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              />
              {session.user?.image && (
                <img
                  onClick={() => signOut()}
                  src={session.user.image}
                  alt="user-image"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full cursor-pointer object-cover"
                />
              )}
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold text-blue-500 cursor-pointer whitespace-nowrap"
            >
              Sign in
            </button>
          )}
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="sm:hidden px-3 pb-2 relative">
          <MagnifyingGlassIcon className="absolute top-4 left-6 h-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            autoFocus
            className="bg-gray-50 border border-gray-500 rounded-md pl-10 pr-3 py-1.5 text-sm w-full focus:border-black focus:ring-black focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
