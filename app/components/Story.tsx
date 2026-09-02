interface StoryProps {
  img: string;
  username: string;
}

export default function Story({ img, username }: StoryProps) {
  return (
    <div>
      <img src={img} alt={username} />
      <p>{username}</p>
    </div>
  );
}
