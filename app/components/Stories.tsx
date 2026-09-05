"use client";

import { useEffect, useState } from "react";

// @ts-ignore
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";
import { useSession } from "next-auth/react";

interface StoryUser {
  id: number;
  username: string;
  img: string;
}

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const storyUsers: StoryUser[] = minifaker.array(20, (i: number) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none ">
      {session && (
        <Story
          img={session.user?.image ?? ""}
          username={session.user?.username ?? ""}
          isUser="true"
        />
      )}
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}
