import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl">
      {/* Left */}
      <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZXGoyoafkc5fy6FbTMmIUaL8pMbnwebAVBsssELqwA&s=10"
          layout="fill"
          className="object-contain"
          alt="instagram"
        />
      </div>
      <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWpidznw6EtlGaj7MIfNrsSJANyKluOYUq1F5zPbulQ&s"
          layout="fill"
          className="object-contain"
          alt="instagram"
        />
      </div>
      <h1>Right Sides</h1>

      {/* Middle */}
      {/* Right */}
    </div>
  );
}
