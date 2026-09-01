import Image from "next/image";
import React from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/16/solid";

export default function Header() {
  return (
    <div className="shadow-sm border-b-gray-700 sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4  ">
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
        <div className="flex space-x-4 items-center">
          <HomeIcon className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQGEX_vk_Qc6Qg/profile-displayphoto-crop_800_800/B4EZmkzGOjGcAI-/0/1759406484294?e=1789603200&v=beta&t=txjbCCMIpHP67XrZkEdNAI8v8k-Dj_gjpCeNpBLWTuk"
            alt="user-image"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
