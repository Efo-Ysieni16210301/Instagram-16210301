import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
interface PostProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export default function Post({
  id,
  username,
  userImg,
  img,
  caption,
}: PostProps) {
  return (
    <div className="bg-white my-7 border border-gray-200 rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3  "
          src={userImg}
          alt={username}
        />
        <p className="font-bold text-sm flex-1 ">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* Post Image */}
      <img className="object-cover w-full" src={img} alt={caption} />
    </div>
  );
}
