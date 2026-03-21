"use client";

import { useState } from "react";
import Image from "next/image";

export default function PositionFinder() {
  const [clicks, setClicks] = useState<{ x: number; y: number; label: string }[]>([]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const label = prompt("Label this point (e.g. Export, Bot, Confidence, Report):") || `Point ${clicks.length + 1}`;
    setClicks((prev) => [...prev, { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, label }]);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Click on the screenshot to mark positions</h1>
      <p className="text-text-muted text-sm mb-6">Click exactly on each element (Export button, Bot column, Confidence column, Report panel). Coordinates will appear below.</p>

      <div className="relative inline-block cursor-crosshair" onClick={handleClick}>
        <Image
          src="/product-screenshot.png"
          alt="Product screenshot"
          width={1920}
          height={1080}
          className="w-full max-w-[1400px]"
        />
        {clicks.map((c, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <div className="h-2 w-2 rounded-full" style={{ background: "#00FF96", boxShadow: "0 0 6px #00FF96", opacity: 0.7 }} />
          </div>
        ))}
      </div>

      {clicks.length > 0 && (
        <div className="mt-8 bg-bg-card border border-white/10 rounded-xl p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-foreground mb-4">Coordinates (copy these back to me):</h2>
          {clicks.map((c, i) => (
            <p key={i} className="text-sm text-foreground font-mono mb-1">
              {c.label}: x={c.x}%, y={c.y}%
            </p>
          ))}
          <button
            onClick={() => setClicks([])}
            className="mt-4 text-xs text-text-muted underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
