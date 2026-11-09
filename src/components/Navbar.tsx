import React from 'react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/audio';
import { Calculator, Sparkles, GraduationCap, Trophy, Crown, Flame, LogOut, Volume2, VolumeX, User } from 'lucide-react';
import { CHARACTERS, getPlayerPhotoUrl } from '../data/characters';
import { MathRobloxLogo } from './MathRobloxLogo';

export type AppNavTab = 'training' | 'kane-vault' | 'leaderboard' | 'locker' | 'history' | 'teacher';

interface NavbarProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, openAuthModal, isAuthenticated, isTeacher, logout } = useAuth();

  const equippedChar = CHARACTERS.find((c) => c.id === user?.equippedCharacterId) || CHARACTERS[0];

  return (
    <>
      {/* 1. TOP HEADER (Desktop & Mobile: Clean Floating Brand & Controls Island) */}
      <header className="sticky top-0 sm:top-2 z-40 w-full px-2 sm:px-4 py-1.5">
        <div className="w-full lg:w-[86%] max-w-6xl mx-auto bg-white/95 backdrop-blur-md border-2 sm:border-3 border-neutral-900 shadow-[0_4px_0_0_#171717] sm:shadow-[0_6px_0_0_#171717] rounded-2xl sm:rounded-3xl px-3 sm:px-5 py-2 flex items-center justify-between gap-2 relative overflow-hidden">
          {/* Animated Subtle Shimmer Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 animate-pulse" />

          {/* Brand Logo & Title with Roblox MATH Logo */}
          <div
            onClick={() => {
              sounds.playKeyClick();
              setActiveTab('training');
            }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <MathRobloxLogo size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-base font-black tracking-tight text-neutral-900 leading-none">
                  Kids Center
                </h1>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                Pro Games • 50 Players
              </span>
            </div>
          </div>

          {/* Right side Controls (Compact & Clean on mobile) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Coins Badge */}
            <div
              onClick={() => {
                sounds.playCoin();
                setActiveTab('kane-vault');
              }}
              className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 border-2 border-neutral-900 px-2 sm:px-3 py-1 rounded-xl shadow-[0_2px_0_0_#171717] cursor-pointer transition-all active:translate-y-0.5"
              title="Click to view Ballon d'Or Vault!"
            >
              <span className="text-sm">🪙</span>
              <span className="font-black text-xs sm:text-sm text-neutral-900 font-mono">
                {user?.coins.toLocaleString() ?? 0}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                sounds.setEnabled(!sounds.isEnabled());
                sounds.playKeyClick();
              }}
              className="p-1 sm:p-1.5 bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-900 rounded-xl cursor-pointer text-neutral-800 shadow-[0_2px_0_0_#171717] active:translate-y-0.5 text-xs"
              title="Toggle Sound Effects"
            >
              {sounds.isEnabled() ? '🔊' : '🔇'}
            </button>

            {/* Account / Character Avatar Button */}
            <button
              onClick={() => {
                sounds.playKeyClick();
                openAuthModal();
              }}
              className="flex items-center gap-1.5 bg-white hover:bg-neutral-100 border-2 border-neutral-900 px-2 py-1 rounded-xl shadow-[0_2px_0_0_#171717] text-xs font-bold cursor-pointer transition-all active:translate-y-0.5"
              title="Account & Profile Settings"
            >
              <div className="w-5 h-5 rounded-full border border-neutral-900 overflow-hidden shrink-0 bg-neutral-900">
                <img
                  src={getPlayerPhotoUrl(equippedChar)}
                  alt={equippedChar.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="max-w-[60px] truncate text-neutral-900 hidden md:inline font-black text-[11px]">
                {user?.nickname || 'Player'}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                sounds.playKeyClick();
                logout();
              }}
              className="p-1 sm:px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-neutral-900 rounded-xl cursor-pointer shadow-[0_2px_0_0_#171717] active:translate-y-0.5 flex items-center gap-1 text-xs font-black transition-all"
              title="Log Out and Return to Login Gate"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden lg:inline text-[11px]">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. ERGONOMIC FLOATING BOTTOM NAVIGATION DOCK (Visible across all devices: Laptops, Desktops, Tablets & Phones) */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-2xl bg-white/95 backdrop-blur-xl border-2 sm:border-3 border-neutral-900 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-[0_6px_0_0_#171717] sm:shadow-[0_8px_0_0_#171717] flex items-center justify-around gap-1 sm:gap-2 select-none"
      >
        <div className="flex items-center justify-around gap-1 w-full">
          {/* 1. Arena */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              setActiveTab('training');
            }}
            className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 ${
              activeTab === 'training'
                ? 'bg-neutral-900 text-white shadow-xs scale-105'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
            <span className="text-[10px] sm:text-xs font-black leading-none">Arena</span>
          </button>

          {/* 2. Ballon d'Or Vault */}
          <button
            onClick={() => {
              sounds.playStreak();
              setActiveTab('kane-vault');
            }}
            className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 relative ${
              activeTab === 'kane-vault'
                ? 'bg-amber-400 text-neutral-900 font-black shadow-xs scale-105 border-2 border-neutral-900'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300/60'
            }`}
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 fill-amber-500 text-amber-600" />
            <span className="text-[10px] sm:text-xs font-black leading-none">Ballon d'Or</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </button>

          {/* 3. Leaderboard */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              setActiveTab('leaderboard');
            }}
            className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 ${
              activeTab === 'leaderboard'
                ? 'bg-neutral-900 text-white shadow-xs scale-105'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-amber-500" />
            <span className="text-[10px] sm:text-xs font-black leading-none">Ranks</span>
          </button>

          {/* 4. 50 3D Heroes */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              setActiveTab('locker');
            }}
            className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 ${
              activeTab === 'locker'
                ? 'bg-neutral-900 text-white shadow-xs scale-105'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-pink-500" />
            <span className="text-[10px] sm:text-xs font-black leading-none">50 Stars</span>
          </button>

          {/* 5. Stats History */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              setActiveTab('history');
            }}
            className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 ${
              activeTab === 'history'
                ? 'bg-neutral-900 text-white shadow-xs scale-105'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-rose-500" />
            <span className="text-[10px] sm:text-xs font-black leading-none">Stats</span>
          </button>

          {/* 6. Teacher Portal (If teacher) */}
          {isTeacher && (
            <button
              onClick={() => {
                sounds.playKeyClick();
                setActiveTab('teacher');
              }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex-1 ${
                activeTab === 'teacher'
                  ? 'bg-amber-400 text-neutral-900 font-black shadow-xs scale-105 border-2 border-neutral-900'
                  : 'text-neutral-700 bg-amber-100 hover:bg-amber-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
              <span className="text-[10px] sm:text-xs font-black leading-none">Teacher</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
