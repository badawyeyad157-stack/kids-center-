import React, { useState, useRef } from 'react';
import { CharacterItem } from '../types';
import { Trophy, Sparkles, Shield, Zap, Award, Star } from 'lucide-react';
import { getPlayerPhotoUrl } from '../data/characters';

interface PlayerPhotoShowcaseProps {
  character: CharacterItem;
  className?: string;
  isCompact?: boolean;
  showDetailsOverlay?: boolean;
}

export const PlayerPhotoShowcase: React.FC<PlayerPhotoShowcaseProps> = ({
  character,
  className = '',
  isCompact = false,
  showDetailsOverlay = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [imgError, setImgError] = useState(false);

  // Calculate Overall FIFA/EAFC-style rating
  const overallRating = Math.min(
    99,
    Math.round((character.stats.speed + character.stats.power + character.stats.focus) / 3)
  );

  const photoSrc = getPlayerPhotoUrl(character);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const getTierGlow = (tier: string) => {
    switch (tier) {
      case 'Mythic':
        return 'from-amber-500/30 via-rose-500/20 to-amber-600/30 ring-amber-400';
      case 'Legendary':
        return 'from-yellow-400/30 via-amber-300/20 to-yellow-500/30 ring-yellow-400';
      case 'Epic':
        return 'from-purple-500/30 via-pink-400/20 to-indigo-600/30 ring-purple-400';
      case 'Rare':
        return 'from-sky-500/30 via-blue-400/20 to-cyan-500/30 ring-sky-400';
      default:
        return 'from-emerald-500/30 via-teal-400/20 to-green-600/30 ring-emerald-400';
    }
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className={`relative w-full max-w-md rounded-3xl overflow-hidden border-3 sm:border-4 border-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-shadow duration-300 group ${
          isCompact ? 'aspect-[3/4]' : 'aspect-[4/5] min-h-[380px] sm:min-h-[460px]'
        }`}
      >
        {/* Pitch / Stadium Atmosphere Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
          {/* Stadium Floodlights & Beam Effects */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl" />
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, ${character.accentColor || '#fbbf24'} 0%, transparent 70%)`
            }}
          />
          {/* Subtle Turf Grid Pattern */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/60 to-transparent" />
        </div>

        {/* Real Player Photo */}
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
          {!imgError ? (
            <img
              src={photoSrc}
              alt={character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top rounded-2xl filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-102"
              loading="eager"
            />
          ) : (
            <div
              className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-white"
              style={{ backgroundColor: character.primaryColor }}
            >
              <span className="text-6xl font-black">{character.jerseyNumber || '★'}</span>
              <span className="text-xl font-bold mt-2">{character.name}</span>
            </div>
          )}
        </div>

        {/* Dynamic Holographic / Glare Sheen Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(251,191,36,0.3) 30%, transparent 70%)`
          }}
        />

        {/* Ballon d'Or Floating Golden Trophy (If Character is a Ballon d'Or Legend) */}
        {character.hasBallonDor && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-neutral-950 border-2 border-neutral-900 rounded-xl font-black text-[11px] sm:text-xs shadow-[0_3px_0_0_#171717] animate-pulse">
              <Trophy className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Ballon d'Or 🏆</span>
            </div>
            {character.ballonDorPower && (
              <span className="px-2 py-0.5 bg-neutral-900/90 text-amber-300 border border-amber-400/80 rounded-lg text-[9px] font-black backdrop-blur-xs">
                {character.ballonDorPower.badge}
              </span>
            )}
          </div>
        )}

        {/* Top Left Player Card OVR Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col items-center bg-neutral-900/90 border-2 border-amber-400 rounded-2xl px-2.5 py-1.5 shadow-[0_4px_0_0_#171717] backdrop-blur-xs">
          <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 leading-none">
            {overallRating}
          </span>
          <span className="text-[9px] font-black uppercase tracking-wider text-white">
            OVR
          </span>
          <div className="w-full h-0.5 bg-amber-400/50 my-0.5" />
          <span className="font-mono text-xs font-black text-neutral-300">
            #{character.jerseyNumber || '★'}
          </span>
        </div>

        {/* Bottom Broadcast Banner with Player Real Name & Title */}
        {showDetailsOverlay && (
          <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
            <div className="bg-neutral-900/90 border-2 border-neutral-700 rounded-2xl p-3 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-amber-400 text-neutral-950 text-[9px] font-black uppercase rounded">
                      {character.tier}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 truncate">
                      {character.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight truncate mt-0.5">
                    {character.name}
                  </h3>
                  <p className="text-[11px] font-bold text-amber-400 truncate">
                    {character.title}
                  </p>
                </div>

                {/* Rating Stars / Stat Pill */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 text-amber-400 justify-end mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-300">
                    SPD {character.stats.speed} • PWR {character.stats.power}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
