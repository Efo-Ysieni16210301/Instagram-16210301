import React from "react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
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
      {/* Post Buttons */}

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatBubbleOvalLeftEllipsisIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {/* Post Comments */}
      <p className="text-sm p-5 truncate">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>
      {/* Post Input Box */}
      <form action="" className="flex items-center p-4">
        <FaceSmileIcon className="h-7 cursor-pointer" />
        <input
          type="text"
          placeholder="Enter your comment..."
          className="flex-1 border-none focus:ring-0 text-sm"
        />
        <button className="font-bold text-blue-400">Post</button>
      </form>
    </div>
  );
}
