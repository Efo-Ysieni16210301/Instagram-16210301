"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PostData {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const postsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username ?? "",
            userImg: data.userImg ?? "",
            img: data.img ?? "",
            caption: data.caption ?? "",
          };
        });
        setPosts(postsData);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
