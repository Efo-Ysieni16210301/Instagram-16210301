"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "../components/Header";
import Post from "../components/Post";

interface SavedPostData {
  id: string;
  uid: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export default function SavedPage() {
  const { data: session } = useSession();
  const [savedPosts, setSavedPosts] = useState<SavedPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.uid) return;

    const q = query(
      collection(db, "users", session.user.uid, "saved"),
      orderBy("savedAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postIds = snapshot.docs.map((d) => d.id);

      const posts = await Promise.all(
        postIds.map(async (postId) => {
          const postSnap = await getDoc(doc(db, "posts", postId));
          if (!postSnap.exists()) return null;

          const data = postSnap.data();
          return {
            id: postSnap.id,
            uid: data.uid ?? "",
            username: data.username ?? "",
            userImg: data.userImg ?? "",
            img: data.img ?? "",
            caption: data.caption ?? "",
          };
        }),
      );

      setSavedPosts(posts.filter((p): p is SavedPostData => p !== null));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session?.user?.uid]);

  if (!session) {
    return (
      <div>
        <Header />
        <p className="text-center mt-20 text-gray-500">
          Sign in to view your saved posts.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-xl font-bold mb-4">Saved Posts</h1>

        {loading && (
          <p className="text-center text-gray-400 mt-10">Loading...</p>
        )}

        {!loading && savedPosts.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No saved posts yet.</p>
        )}

        {savedPosts.map((post) => (
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
    </div>
  );
}
