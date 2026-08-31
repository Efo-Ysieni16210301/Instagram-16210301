import Image from "next/image";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl ">
      {/* Left */}
      <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZXGoyoafkc5fy6FbTMmIUaL8pMbnwebAVBsssELqwA&s=10"
          fill
          sizes="96px"
          priority
          className="object-contain"
          alt="instagram"
        />
      </div>
      <div className="cursor-pointer h-24 w-10 relative lg:hidden">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWpidznw6EtlGaj7MIfNrsSJANyKluOYUq1F5zPbulQ&s"
          fill
          sizes="40px"
          priority
          className="object-contain"
          alt="instagram"
        />
      </div>

      {/* Middle */}
      <div className="relative mt-1">
        <MagnifyingGlassIcon className="absolute top-2 left-2 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-500 rounded-md pl-10 pr-3 py-1.5 text-sm w-64 focus:border-black focus:ring-black focus:outline-none"
        />
      </div>

      {/* Right */}
      <h1>Right sides</h1>
    </div>
  );
}
