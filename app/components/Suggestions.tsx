"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import minifaker from "minifaker";
import "minifaker/locales/en";
interface Suggestion {
  id: number;
  username: string;
  jobTitle: string;
}

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  useEffect(() => {
    const suggestions = minifaker.array(5, (i: number) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestions For You</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          className="flex items-center justify-between mb-4"
          key={suggestion.id}
        >
          <img
            src={`https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`}
            alt=""
            className=" h-10 rounded-full border p-0.5"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.username}</h2>
            <h3 className="text-xs text-gray-500 truncate w-57.5">
              {suggestion.jobTitle}
            </h3>
          </div>
          <button className="text-blue-400 text-sm font-semibold cursor-pointer">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
