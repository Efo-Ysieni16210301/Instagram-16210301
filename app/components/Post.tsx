import React from "react";
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
    <div>
      <h1>{username}</h1>
    </div>
  );
}
