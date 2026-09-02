import React from "react";
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: "1",
      username: "codewithgech16210301",
      userImg:
        "https://media.licdn.com/dms/image/v2/D4E03AQGEX_vk_Qc6Qg/profile-displayphoto-crop_800_800/B4EZmkzGOjGcAI-/0/1759406484294?e=1789603200&v=beta&t=txjbCCMIpHP67XrZkEdNAI8v8k-Dj_gjpCeNpBLWTuk",
      img: "https://media.istockphoto.com/id/157193189/photo/bet-giorgis-lalibela-ethiopia.jpg?s=1024x1024&w=is&k=20&c=demoFNayxXxKdHj95WMAq4fOVeoVFH7XexqeD0H-wZs=",
      caption: "This is bete giorgis church in lalibela, ethiopia",
    },
    {
      id: "2",
      username: "farawnegn",
      userImg:
        "https://media.licdn.com/dms/image/v2/D4E03AQGEX_vk_Qc6Qg/profile-displayphoto-crop_800_800/B4EZmkzGOjGcAI-/0/1759406484294?e=1789603200&v=beta&t=txjbCCMIpHP67XrZkEdNAI8v8k-Dj_gjpCeNpBLWTuk",
      img: "https://images.unsplash.com/photo-1608634193723-1865aa4416ce?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Gonder castle",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
