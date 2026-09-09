"use client";

import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useModalStore } from "@/store/useModalStore";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function UploadModal() {
  const { Open, setOpen } = useModalStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function addImageToPost(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

  return (
    <ReactModal
      isOpen={Open}
      onRequestClose={() => {
        setOpen(false);
        setSelectedFile(null);
        setPreview(null);
      }}
      className="max-w-lg w-[90%]  bg-white absolute top-56 left-[50%] translate-x-[-50%] border-2 border-gray-300 rounded-md shadow-md p-6 focus:outline-none"
    >
      <div className="flex flex-col items-center justify-center h-full">
        {preview ? (
          <img
            onClick={() => setPreview(null)}
            src={preview}
            className="w-full max-h-62.5 object-cover cursor-pointer"
            alt="preview"
          />
        ) : (
          <CameraIcon
            onClick={() => filePickerRef.current?.click()}
            className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500 "
          />
        )}
        <input
          type="file"
          hidden
          ref={filePickerRef}
          onChange={addImageToPost}
        />
        <input
          type="text"
          maxLength={150}
          placeholder="Please enter your caption..."
          className="m-4 border-none text-center w-full focus:ring-0"
        />
        <button
          disabled={!selectedFile}
          className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:cursor-not-allowed disabled:bg-gray-300
          disabled:hover:brightness-100"
        >
          Upload Post
        </button>
      </div>
    </ReactModal>
  );
}
