import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import { PlayerPhotoShowcase } from './PlayerPhotoShowcase';
import { sounds } from '../utils/audio';
import { MathRobloxLogo } from './MathRobloxLogo';
import { ArrowRight, Trophy } from 'lucide-react';

interface CinematicIntroSplashProps {
  onComplete: () => void;
}

export const CinematicIntroSplash: React.FC<CinematicIntroSplashProps> = ({ onComplete }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  // Feature the Ballon d'Or King Harry Kane in the intro
  const defaultHero = CHARACTERS.find((c) => c.id === 'kane-9') || CHARACTERS[0];

  useEffect(() => {
    sounds.playStreak();

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playKeyClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none animate-in fade-in duration-300">
      {/* Background Soft Ambient Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Clean Card (Simple & Minimal) */}
      <div className="w-full max-w-4xl bg-neutral-900 border-2 sm:border-3 border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden">
        {/* Subtle Top 5s Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-800">
          <div
            className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
            style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column: Kids Center Pro Games */}
          <div className="md:col-span-7 space-y-5 text-white">
            <div className="flex items-center gap-3">
              <MathRobloxLogo size="lg" />
              <div className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-black uppercase text-amber-400 tracking-wider">
                Math Champions Arena
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Kids Center <br />
                <span className="text-amber-400">Pro Games</span>
              </h1>
              <p className="text-sm font-semibold text-neutral-400 max-w-md leading-relaxed">
                Speed mental arithmetic training, real-time student leaderboards, and 50 official football stars with authentic Ballon d'Or powers.
              </p>
            </div>

            {/* Countdown & Enter Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleSkip}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-2xl border-2 border-neutral-900 shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer flex items-center gap-2 transition-all"
              >
                <span>Enter Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Auto-starting in {secondsLeft}s...</span>
              </div>
            </div>
          </div>

          {/* Right Column: Player Photo Showcase */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-xs">
              <PlayerPhotoShowcase
                character={defaultHero}
                isCompact={true}
                showDetailsOverlay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
