"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useUnreadCount() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session?.user?.uid) {
      setUnreadCount(0);
      return;
    }

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", session.user.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let count = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const lastMessageSenderId = data.lastMessageSenderId;
        const lastMessageTimestamp: Timestamp | undefined =
          data.lastMessageTimestamp;
        const myLastRead: Timestamp | undefined =
          data.lastRead?.[session.user.uid];

        if (!lastMessageTimestamp) return;
        if (lastMessageSenderId === session.user.uid) return;

        const isUnread =
          !myLastRead ||
          myLastRead.toMillis() < lastMessageTimestamp.toMillis();

        if (isUnread) count++;
      });

      setUnreadCount(count);
    });

    return () => unsubscribe();
  }, [session?.user?.uid]);

  return unreadCount;
}
