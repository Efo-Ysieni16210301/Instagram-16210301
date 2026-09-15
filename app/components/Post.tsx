"use client";
import React, { useState, useEffect } from "react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import {
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PostProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

interface CommentData {
  id: string;
  comment: string;
  username: string;
  userImage: string;
  timestamp: Timestamp | null;
}

function formatTimeAgo(timestamp: Timestamp | null): string {
  if (!timestamp) return "Just now";

  const seconds = Math.floor(
    (Date.now() - timestamp.toDate().getTime()) / 1000,
  );

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return timestamp.toDate().toLocaleDateString();
}

export default function Post({
  id,
  username,
  userImg,
  img,
  caption,
}: PostProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const hasLiked = session?.user?.uid
    ? likes.includes(session.user.uid)
    : false;

  useEffect(() => {
    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("timestamp", "asc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          comment: data.comment ?? "",
          username: data.username ?? "",
          userImage: data.userImage ?? "",
          timestamp: data.timestamp ?? null,
        };
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);
  async function likePost() {
    if (!session?.user?.uid) return;
    const likeRef = doc(db, "posts", id, "likes", session.user.uid);
    if (hasLiked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        username: session.user.username,
      });
    }
  }

  async function sendComment(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment.trim() || !session?.user) return;

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <div className="bg-white my-7 border border-gray-200 rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        {userImg && (
          <img
            className="h-12 rounded-full object-cover border p-1 mr-3  "
            src={userImg}
            alt={username}
          />
        )}
        <p className="font-bold text-sm flex-1 ">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* Post Image */}
      {img && <img className="object-cover w-full" src={img} alt={caption} />}
      {/* Post Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 items-center">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Likes Count */}
      {likes.length > 0 && (
        <p className="font-bold text-sm px-5 pt-2">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </p>
      )}

      {/* Post Caption */}
      <p className="text-sm p-5 truncate">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>

      {/* Comments list */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
          {comments.map((c) => (
            <div key={c.id} className="flex items-center space-x-2 mb-3">
              {c.userImage && (
                <img
                  src={c.userImage}
                  className="h-7 rounded-full"
                  alt={c.username}
                />
              )}
              <p className="text-sm flex-1">
                <span className="font-bold">{c.username}</span> {c.comment}
              </p>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTimeAgo(c.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Post Input Box */}
      {session && (
        <form onSubmit={sendComment} className="flex items-center p-4">
          <FaceSmileIcon className="h-7 cursor-pointer" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Enter your comment..."
            className="flex-1 border-none focus:ring-0 text-sm"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-bold text-blue-400 disabled:text-gray-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
