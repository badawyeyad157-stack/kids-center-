import React from 'react';

interface MathRobloxLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MathRobloxLogo: React.FC<MathRobloxLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-[9px]',
    md: 'w-9 h-9 text-[11px]',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base'
  };

  const dim = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-300 hover:scale-105 ${dim} ${className}`}
      title="Kids Center Math Roblox"
    >
      {/* 3D Roblox Tilted Cube Icon Silhouette with Bevel and Shadow */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_3px_0_#171717] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Drop shadow back shape */}
        <rect
          x="12"
          y="16"
          width="76"
          height="76"
          rx="18"
          transform="rotate(-10 50 50)"
          className="fill-neutral-900"
        />

        {/* Outer Tilted Roblox Square (Vibrant Golden Amber) */}
        <rect
          x="10"
          y="10"
          width="76"
          height="76"
          rx="18"
          transform="rotate(-10 48 48)"
          className="fill-amber-400 stroke-neutral-900"
          strokeWidth="6"
        />

        {/* Inner Roblox Hollow Hole (Dark Charcoal Inset) */}
        <rect
          x="33"
          y="33"
          width="32"
          height="32"
          rx="8"
          transform="rotate(-10 49 49)"
          className="fill-neutral-950 stroke-neutral-900"
          strokeWidth="4"
        />

        {/* Top-left Bevel Highlight */}
        <path
          d="M 28 16 L 72 8 L 84 20 L 40 28 Z"
          fill="white"
          opacity="0.35"
        />

        {/* Front Bold "MATH" Lettering */}
        <text
          x="49"
          y="56"
          transform="rotate(-10 49 49)"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="0.5"
          fill="#fbbf24"
          stroke="#000000"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          className="font-black select-none pointer-events-none drop-shadow-sm"
        >
          MATH
        </text>
      </svg>
    </div>
  );
};
