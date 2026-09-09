"use client";

import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/store/useModalStore";
import { CameraIcon } from "@heroicons/react/24/outline";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function UploadModal() {
  const { Open, setOpen } = useModalStore();
  const { data: session } = useSession();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

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

  function closeModal() {
    setOpen(false);
    setSelectedFile(null);
    setPreview(null);
    setCaption("");
  }

  async function handleUpload() {
    if (!selectedFile || !session?.user?.uid) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      console.log("Uploaded:", imageUrl);
      // Next step: save { uid, username, caption, image: imageUrl, timestamp } to Firestore here

      await addDoc(collection(db, "posts"), {
        uid: session.user.uid,
        username: session.user.username,
        caption,
        image: imageUrl,
        timestamp: serverTimestamp(),
      });

      console.log("Post saved to Firestore!");

      closeModal();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <ReactModal
      isOpen={Open}
      onRequestClose={closeModal}
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
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={150}
          placeholder="Please enter your caption..."
          className="m-4 border-none text-center w-full focus:ring-0"
        />
        <button
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
          className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:cursor-not-allowed disabled:bg-gray-300
          disabled:hover:brightness-100"
        >
          {uploading ? "Uploading..." : "Upload Post"}
        </button>
      </div>
    </ReactModal>
  );
}
