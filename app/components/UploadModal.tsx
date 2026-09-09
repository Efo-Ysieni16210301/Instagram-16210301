"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";
import { useModalStore } from "@/store/useModalStore";

export default function UploadModal() {
  const { Open, setOpen } = useModalStore();

  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

  return (
    <ReactModal
      isOpen={Open}
      onRequestClose={() => setOpen(false)}
      className="max-w-lg w-[90%] h-75 bg-white absolute top-56 left-[50%] translate-x-[-50%] border-2 border-gray-300 rounded-md shadow-md p-6 focus:outline-none"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="font-bold text-lg mb-4">Upload a Photo</h2>
        {/* your post-upload form goes here */}
      </div>
    </ReactModal>
  );
}
