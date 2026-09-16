"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  signInWithCustomToken,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function FirebaseAuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.firebaseToken) {
      signInWithCustomToken(auth, session.firebaseToken).catch((error) => {
        console.error("Firebase auth sync failed:", error);
      });
    } else if (status === "unauthenticated") {
      firebaseSignOut(auth).catch(() => {});
    }
  }, [status, session?.firebaseToken]);

  return null;
}
