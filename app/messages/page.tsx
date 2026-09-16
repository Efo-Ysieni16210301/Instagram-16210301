// Messages page list all the messages for the user. It shows a list of conversations with other users, and clicking on a conversation will take the user to the chat page with that user.
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "../components/Header";

interface ConversationData {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantImages: Record<string, string>;
  lastMessage: string;
  lastMessageTimestamp: Timestamp | null;
}

function formatTimeAgo(timestamp: Timestamp | null): string {
  if (!timestamp) return "";
  const seconds = Math.floor(
    (Date.now() - timestamp.toDate().getTime()) / 1000,
  );
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  useEffect(() => {
    if (!session?.user?.uid) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", session.user.uid),
      orderBy("lastMessageTimestamp", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          participants: d.participants ?? [],
          participantNames: d.participantNames ?? {},
          participantImages: d.participantImages ?? {},
          lastMessage: d.lastMessage ?? "",
          lastMessageTimestamp: d.lastMessageTimestamp ?? null,
        };
      });
      setConversations(data);
    });

    return () => unsubscribe();
  }, [session?.user?.uid]);

  if (!session) {
    return (
      <div>
        <Header />
        <p className="text-center mt-20 text-gray-500">
          Sign in to view your messages.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto mt-10 bg-white border rounded-md">
        <h1 className="text-xl font-bold p-5 border-b">Messages</h1>

        {conversations.length === 0 && (
          <p className="text-center text-gray-400 p-10">
            No conversations yet.
          </p>
        )}

        {conversations.map((c) => {
          const otherUid = c.participants.find(
            (uid) => uid !== session.user.uid,
          );
          if (!otherUid) return null;

          const otherName = c.participantNames[otherUid] ?? "Unknown";
          const otherImage = c.participantImages[otherUid];

          return (
            <Link
              key={c.id}
              href={`/messages/${c.id}`}
              className="flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition"
            >
              {otherImage && (
                <img
                  src={otherImage}
                  alt={otherName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{otherName}</p>
                <p className="text-sm text-gray-500 truncate">
                  {c.lastMessage}
                </p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTimeAgo(c.lastMessageTimestamp)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
