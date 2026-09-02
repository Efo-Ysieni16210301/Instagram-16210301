"use client";

import { useEffect, useState } from "react";

// @ts-ignore
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";

interface StoryUser {
  id: number;
  username: string;
  img: string;
}

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);

  useEffect(() => {
    const storyUsers: StoryUser[] = minifaker.array(20, (i: number) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);

  return (
    <div className="">
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}
