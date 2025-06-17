"use client";

import { User } from "@/components/Home/User";
import { WalletActions } from "@/components/Home/WalletActions";
import { Dashboard } from "./Dashboard";

export function Demo() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-between p-4 relative overflow-hidden">
      <h1
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "2px 2px #2a1e32",
        }}
        className="mt-4 text-3xl sm:text-5xl text-yellow-400 leading-snug z-50 text-center"
      >
        <span className="italic block">DASHBOARDS</span>
        <span className="italic text-purple-600 block">MONAD</span>
      </h1>

      <div className="w-full h-full flex flex-col items-center justify-center">
        <Dashboard />
      </div>

      <div className="w-full max-w-4xl space-y-6 mb-6">
        <WalletActions />
      </div>
    </div>
  );
}
