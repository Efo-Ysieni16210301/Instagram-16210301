"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSearchStore } from "@/store/useSearchStore";

interface PostData {
  id: string;
  uid: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { searchTerm } = useSearchStore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const postsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            uid: data.uid ?? "",
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

  const filteredPosts = searchTerm.trim()
    ? posts.filter((post) => {
        const term = searchTerm.toLowerCase();
        return (
          post.username.toLowerCase().includes(term) ||
          post.caption.toLowerCase().includes(term)
        );
      })
    : posts;

  return (
    <div>
      {searchTerm.trim() && filteredPosts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No posts found for &quot;{searchTerm}&quot;
        </p>
      )}

      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          uid={post.uid}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
