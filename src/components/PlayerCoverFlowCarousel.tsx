import React, { useState, useEffect, useRef } from 'react';
import { CharacterItem } from '../types';
import { getPlayerPhotoUrl } from '../data/characters';
import { sounds } from '../utils/audio';
import { ChevronLeft, ChevronRight, Trophy, Sparkles, Check, Lock, Zap, Search, Shield, Star } from 'lucide-react';

interface PlayerCoverFlowCarouselProps {
  characters: CharacterItem[];
  selectedId: string;
  onSelect: (char: CharacterItem) => void;
  onEquipOrBuy: (char: CharacterItem) => void;
  userCoins: number;
  unlockedIds: string[];
  equippedId: string;
  isGoldTheme?: boolean;
}

export const PlayerCoverFlowCarousel: React.FC<PlayerCoverFlowCarouselProps> = ({
  characters,
  selectedId,
  onSelect,
  onEquipOrBuy,
  userCoins,
  unlockedIds,
  equippedId,
  isGoldTheme = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'ballondor' | 'mythic' | 'legendary' | 'epic'>('all');

  const filteredCharacters = characters.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterCategory === 'ballondor') return c.hasBallonDor;
    if (filterCategory === 'mythic') return c.tier === 'Mythic';
    if (filterCategory === 'legendary') return c.tier === 'Legendary';
    if (filterCategory === 'epic') return c.tier === 'Epic';
    return true;
  });

  // Keep track of current index in the filtered list
  const activeIndex = Math.max(
    0,
    filteredCharacters.findIndex((c) => c.id === selectedId)
  );

  const activeChar = filteredCharacters[activeIndex] || filteredCharacters[0] || characters[0];

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (filteredCharacters.length <= 1) return;
    sounds.playKeyClick();
    let newIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (newIndex < 0) newIndex = filteredCharacters.length - 1;
    if (newIndex >= filteredCharacters.length) newIndex = 0;

    const nextChar = filteredCharacters[newIndex];
    if (nextChar) {
      onSelect(nextChar);
    }
  };

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredCharacters]);

  // Touch & Mouse Drag Swipe Handling
  const touchStartXRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNavigate('prev');
      } else {
        handleNavigate('next');
      }
    }
    touchStartXRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartXRef.current === null) return;
    const deltaX = e.clientX - mouseStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNavigate('prev');
      } else {
        handleNavigate('next');
      }
    }
    mouseStartXRef.current = null;
  };

  const isUnlocked = unlockedIds.includes(activeChar.id);
  const isEquipped = equippedId === activeChar.id;
  const canAfford = userCoins >= activeChar.price;
  const coinsNeeded = Math.max(0, activeChar.price - userCoins);

  const overallRating = Math.min(
    99,
    Math.round((activeChar.stats.speed + activeChar.stats.power + activeChar.stats.focus) / 3)
  );

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      {/* 1. Filter Pills & Fast Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white border-2 sm:border-3 border-neutral-900 rounded-3xl p-3 sm:p-4 shadow-[0_6px_0_0_#171717]">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search star player..."
            className="w-full bg-neutral-100 border-2 border-neutral-900 rounded-2xl pl-9 pr-3 py-1.5 text-xs font-bold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
          {[
            { id: 'all', label: `All (${characters.length})` },
            { id: 'ballondor', label: '🏆 Ballon d\'Or' },
            { id: 'mythic', label: '⭐ Mythic' },
            { id: 'legendary', label: '👑 Legendary' },
            { id: 'epic', label: '⚡ Epic' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playKeyClick();
                setFilterCategory(cat.id as any);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-neutral-900 text-amber-300 shadow-xs'
                  : 'text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 3D COVER FLOW STAGE */}
      <div
        className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 border-3 sm:border-4 border-neutral-900 shadow-[0_16px_36px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ perspective: '1100px' }}
      >
        {/* Stadium Floodlights & Ambient Atmospheric Fog */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-950/80 via-emerald-950/30 to-transparent" />
          {/* Turf Pitch Lines */}
          <div className="absolute inset-x-12 bottom-6 h-0.5 bg-white/10" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-white/10 rounded-t-full" />
        </div>

        {/* Carousel Prev / Next Arrow Controls */}
        <button
          onClick={() => handleNavigate('prev')}
          className="absolute left-2 sm:left-6 z-40 p-2 sm:p-3.5 bg-white/90 hover:bg-white text-neutral-950 border-2 sm:border-3 border-neutral-900 rounded-2xl sm:rounded-3xl shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all hover:scale-105"
          title="Previous Player (ArrowLeft)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3]" />
        </button>

        <button
          onClick={() => handleNavigate('next')}
          className="absolute right-2 sm:right-6 z-40 p-2 sm:p-3.5 bg-white/90 hover:bg-white text-neutral-950 border-2 sm:border-3 border-neutral-900 rounded-2xl sm:rounded-3xl shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all hover:scale-105"
          title="Next Player (ArrowRight)"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3]" />
        </button>

        {/* 3D CARDS DISPLAY CONTAINER */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          {filteredCharacters.map((char, index) => {
            const offset = index - activeIndex;

            // Only render cards within a visible range of +/- 3 for optimal performance
            if (Math.abs(offset) > 3) return null;

            const isCenter = offset === 0;
            const isLeft = offset < 0;
            const isRight = offset > 0;
            const absOffset = Math.abs(offset);

            // Compute 3D translation & rotation
            const rotateY = isCenter ? 0 : isLeft ? 32 : -32;
            const translateX = offset * (window.innerWidth < 640 ? 110 : 200);
            const translateZ = -absOffset * 130;
            const scale = isCenter ? 1.0 : Math.max(0.72, 1 - absOffset * 0.16);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.32);
            const zIndex = 30 - absOffset * 5;

            const charPhoto = getPlayerPhotoUrl(char);
            const charOvr = Math.min(
              99,
              Math.round((char.stats.speed + char.stats.power + char.stats.focus) / 3)
            );

            return (
              <div
                key={char.id}
                onClick={() => {
                  sounds.playKeyClick();
                  onSelect(char);
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className={`absolute w-[230px] sm:w-[290px] h-[340px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer border-3 sm:border-4 ${
                  isCenter
                    ? char.hasBallonDor
                      ? 'border-amber-400 ring-4 ring-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.6)]'
                      : 'border-white ring-4 ring-amber-400/40 shadow-[0_16px_36px_rgba(0,0,0,0.8)]'
                    : 'border-neutral-700 shadow-xl brightness-75 hover:brightness-100'
                }`}
              >
                {/* Background Card Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950">
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 30%, ${char.accentColor || '#fbbf24'} 0%, transparent 70%)`
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/70 to-transparent" />
                </div>

                {/* Real Player Authentic Photo */}
                <div className="absolute inset-0 p-3 flex items-center justify-center">
                  <img
                    src={charPhoto}
                    alt={char.name}
                    className="w-full h-full object-cover object-top rounded-2xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                    loading="eager"
                  />
                </div>

                {/* Golden Ballon d'Or Trophy Badge (When applicable) */}
                {char.hasBallonDor && (
                  <>
                    <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-neutral-950 border border-neutral-900 rounded-xl font-black text-[11px] shadow-sm animate-pulse">
                        <Trophy className="w-3.5 h-3.5 fill-neutral-950" />
                        <span>Ballon d'Or 🏆</span>
                      </div>
                      {char.ballonDorPower && (
                        <span className="px-1.5 py-0.2 bg-neutral-900/90 text-amber-300 border border-amber-400/80 rounded text-[8px] font-black">
                          {char.ballonDorPower.badge}
                        </span>
                      )}
                    </div>

                    {/* Realistic Ballon d'Or Golden Trophy Watermark */}
                    <div className="absolute right-3 bottom-14 z-10 opacity-35 pointer-events-none drop-shadow-md">
                      <Trophy className="w-14 h-14 text-amber-400 fill-amber-400" />
                    </div>
                  </>
                )}

                {/* Top Left OVR Shield */}
                <div className="absolute top-3 left-3 z-20 flex flex-col items-center bg-neutral-900/95 border-2 border-amber-400 rounded-xl px-2 py-1 shadow-md">
                  <span className="font-mono text-base sm:text-xl font-black text-amber-400 leading-none">
                    {charOvr}
                  </span>
                  <span className="text-[8px] font-black uppercase text-white">OVR</span>
                  <div className="w-full h-0.5 bg-amber-400/40 my-0.5" />
                  <span className="font-mono text-[10px] font-black text-neutral-300">
                    #{char.jerseyNumber || '★'}
                  </span>
                </div>

                {/* Bottom Broadcast Overlay Banner */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-2.5 sm:p-3 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent">
                  <div className="bg-neutral-900/90 border border-neutral-700 rounded-xl p-2 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="overflow-hidden">
                        <span className="px-1.5 py-0.2 bg-amber-400 text-neutral-950 text-[8px] font-black uppercase rounded">
                          {char.tier}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm text-white tracking-tight truncate mt-0.5">
                          {char.name}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] font-black text-amber-400 shrink-0">
                        {unlockedIds.includes(char.id) ? 'OWNED' : `🪙 ${char.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE PLAYER DETAILS & INSTANT ACTION PANEL */}
      <div className="bg-white border-2 sm:border-3 border-neutral-900 rounded-3xl p-5 sm:p-7 shadow-[0_8px_0_0_#171717] space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-neutral-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl border-2 border-neutral-900 overflow-hidden shrink-0 bg-neutral-900 shadow-xs">
              <img
                src={getPlayerPhotoUrl(activeChar)}
                alt={activeChar.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-neutral-900 text-white font-black text-[10px] uppercase rounded-md">
                  {activeChar.tier} Tier
                </span>
                <span className="font-mono text-xs font-black text-amber-600 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                  OVR {overallRating}
                </span>
                {activeChar.hasBallonDor && (
                  <span className="px-2 py-0.5 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase rounded-md flex items-center gap-1 border border-neutral-900">
                    <Trophy className="w-3 h-3 fill-neutral-950" />
                    Ballon d'Or
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-0.5">
                {activeChar.name}
              </h2>
              <p className="text-xs font-bold text-neutral-500">
                {activeChar.title}
              </p>
            </div>
          </div>

          {/* Quick Counter Indicator */}
          <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-xs font-black text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-xl border border-neutral-300">
            <span>Player {activeIndex + 1} of {filteredCharacters.length}</span>
          </div>
        </div>

        {/* Superpower Highlight (If Ballon d'Or) */}
        {activeChar.ballonDorPower && (
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 border border-neutral-900 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 fill-neutral-950" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-800 block">
                Ballon d'Or Superpower:
              </span>
              <span className="text-xs sm:text-sm font-black text-neutral-900">
                {activeChar.ballonDorPower.name} — {activeChar.ballonDorPower.description}
              </span>
            </div>
          </div>
        )}

        {/* Real Attributes Progress Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-neutral-50 border border-neutral-300 rounded-2xl p-3">
            <div className="flex justify-between text-xs font-black mb-1">
              <span className="text-neutral-700">Sprint Speed</span>
              <span className="font-mono text-amber-600">{activeChar.stats.speed} / 100</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${activeChar.stats.speed}%` }}
              />
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-300 rounded-2xl p-3">
            <div className="flex justify-between text-xs font-black mb-1">
              <span className="text-neutral-700">Shot & Stamina</span>
              <span className="font-mono text-rose-600">{activeChar.stats.power} / 100</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${activeChar.stats.power}%` }}
              />
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-300 rounded-2xl p-3">
            <div className="flex justify-between text-xs font-black mb-1">
              <span className="text-neutral-700">Math IQ & Focus</span>
              <span className="font-mono text-emerald-600">{activeChar.stats.focus} / 100</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${activeChar.stats.focus}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Button (Equip / Unlock) */}
        <div className="pt-2">
          {isUnlocked ? (
            <button
              onClick={() => onEquipOrBuy(activeChar)}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer border-3 border-neutral-900 shadow-[0_5px_0_0_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
                isEquipped
                  ? 'bg-neutral-900 text-white'
                  : 'bg-emerald-400 hover:bg-emerald-500 text-neutral-900'
              }`}
            >
              {isEquipped ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Currently Equipped</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-neutral-900" />
                  <span>Equip {activeChar.name} as Active Player</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => onEquipOrBuy(activeChar)}
              disabled={!canAfford}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer border-3 border-neutral-900 shadow-[0_5px_0_0_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
                canAfford
                  ? 'bg-amber-400 hover:bg-amber-500 text-neutral-900'
                  : 'bg-neutral-200 text-neutral-400 border-neutral-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Lock className="w-5 h-5" />
              <span>
                {canAfford
                  ? `Unlock for 🪙 ${activeChar.price.toLocaleString()} Coins`
                  : `Locked (Need 🪙 ${coinsNeeded.toLocaleString()} More Coins)`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* 4. FAST SCROLL THUMBNAIL STRIP (Quick Jump to Any Player) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-neutral-600 px-1">
          <span>Quick Star Selector</span>
          <span>Click any star to bring to center</span>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {filteredCharacters.map((c) => {
            const isSelected = c.id === activeChar.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playKeyClick();
                  onSelect(c);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-amber-300 border-neutral-900 shadow-[0_3px_0_0_#171717] scale-105'
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
                }`}
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden border border-neutral-400 bg-neutral-900 shrink-0">
                  <img
                    src={getPlayerPhotoUrl(c)}
                    alt={c.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-xs font-black whitespace-nowrap">{c.name}</span>
                {c.hasBallonDor && <span>🏆</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
