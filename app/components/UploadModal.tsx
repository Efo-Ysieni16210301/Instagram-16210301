"use client";
import React from "react";
import { useModalStore } from "@/store/useModalStore";

export default function UploadModal() {
  const { Open, setOpen } = useModalStore();

  return (
    <div>
      {Open && <h1>Modal is Open</h1>}
      <h1>Upload Modal</h1>
    </div>
  );
}
