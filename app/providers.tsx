"use client";

import { SessionProvider } from "next-auth/react";
import FirebaseAuthSync from "./components/FirebaseAuthSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FirebaseAuthSync />
      {children}
    </SessionProvider>
  );
}
