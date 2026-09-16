// the button that opens a conversation with another user
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getConversationId } from "@/lib/chat";

interface MessageButtonProps {
  otherUid: string;
  otherName: string;
  otherImage: string;
}

export default function MessageButton({
  otherUid,
  otherName,
  otherImage,
}: MessageButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function startConversation() {
    if (!session?.user?.uid || session.user.uid === otherUid) return;

    const conversationId = getConversationId(session.user.uid, otherUid);
    const conversationRef = doc(db, "conversations", conversationId);
    const existing = await getDoc(conversationRef);

    if (!existing.exists()) {
      await setDoc(conversationRef, {
        participants: [session.user.uid, otherUid],
        participantNames: {
          [session.user.uid]: session.user.username,
          [otherUid]: otherName,
        },
        participantImages: {
          [session.user.uid]: session.user.image ?? "",
          [otherUid]: otherImage,
        },
        lastMessage: "",
        lastMessageTimestamp: serverTimestamp(),
      });
    }

    router.push(`/messages/${conversationId}`);
  }

  return (
    <button
      onClick={startConversation}
      className="text-sm font-semibold text-blue-500 hover:underline"
    >
      Message
    </button>
  );
}
