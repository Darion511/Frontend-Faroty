"use client";

import { useEffect, useState } from "react";

interface ParticleProps {
  index: number;
}

export default function Particle({ index }: ParticleProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
    ];

    setStyle({
      left: `${Math.random() * 100}%`,
      width: `${6 + Math.random() * 8}px`,
      height: `${6 + Math.random() * 8}px`,
      backgroundColor: colors[index % colors.length],
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    });
  }, [index]);

  return (
    <div
      className="absolute top-0 rounded-full opacity-0 animate-fall"
      style={style}
    />
  );
}
