"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "../../components/Header";

interface MessageData {
  id: string;
  senderId: string;
  text: string;
  timestamp: Timestamp | null;
}

export default function ConversationPage() {
  const { data: session } = useSession();
  const params = useParams();
  const conversationId = params.conversationId as string;

  const [messages, setMessages] = useState<MessageData[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          senderId: d.senderId ?? "",
          text: d.text ?? "",
          timestamp: d.timestamp ?? null,
        };
      });
      setMessages(data);
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (!conversationId || !session?.user?.uid) return;

    updateDoc(doc(db, "conversations", conversationId), {
      [`lastRead.${session.user.uid}`]: serverTimestamp(),
    }).catch(() => {});
  }, [conversationId, session?.user?.uid]);

  async function sendMessage(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() || !session?.user?.uid) return;

    const messageText = text;
    setText("");

    await addDoc(collection(db, "conversations", conversationId, "messages"), {
      senderId: session.user.uid,
      text: messageText,
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "conversations", conversationId), {
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
      lastMessageSenderId: session.user.uid,
    });
  }

  if (!session) {
    return (
      <div>
        <Header />
        <p className="text-center mt-20 text-gray-500">
          Sign in to view messages.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto max-w-lg mx-auto w-full p-4 space-y-2">
        {messages.map((m) => {
          const isMine = m.senderId === session.user.uid;
          return (
            <div
              key={m.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  isMine
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="max-w-lg mx-auto w-full flex items-center gap-2 p-4 border-t bg-white"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-blue-500 font-semibold disabled:text-gray-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
