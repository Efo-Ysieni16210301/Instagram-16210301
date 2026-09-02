import React from "react";

export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="h-16 rounded-full border p-0.5 mr-3 object-contain"
        src="https://media.licdn.com/dms/image/v2/D4E03AQGEX_vk_Qc6Qg/profile-displayphoto-crop_800_800/B4EZmkzGOjGcAI-/0/1759406484294?e=1789603200&v=beta&t=txjbCCMIpHP67XrZkEdNAI8v8k-Dj_gjpCeNpBLWTuk"
        alt=""
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">codewithgech16210301</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold cursor-pointer">
        Sign Out
      </button>
    </div>
  );
}
