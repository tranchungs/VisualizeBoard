"use client";
import { useState, useEffect } from "react";
import { Dashboard } from "./Dashboard";

export function Menu() {
  const [isPlay, setPlay] = useState(false);

  if (isPlay) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111] p-4 space-y-6">
      <h1
        className="text-2xl text-white mb-4"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Monad Chain Analytics
      </h1>

      <button
        className="w-64 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px" }}
        onClick={() => setPlay(true)}
      >
        View
      </button>
    </div>
  );
}
