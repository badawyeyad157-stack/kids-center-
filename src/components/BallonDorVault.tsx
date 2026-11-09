import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CHARACTERS } from '../data/characters';
import { CharacterItem } from '../types';
import { PlayerCoverFlowCarousel } from './PlayerCoverFlowCarousel';
import { sounds } from '../utils/audio';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BallonDorVaultProps {
  onGoToArena: () => void;
}

export const BallonDorVault: React.FC<BallonDorVaultProps> = ({ onGoToArena }) => {
  const { user, unlockCharacter, equipCharacter } = useAuth();
  const [purchaseMsg, setPurchaseMsg] = useState('');

  // All 15 Ballon d'Or Legends sorted strictly from lowest to highest price (Kane at 20,000 -> Messi at 100,000 -> Ronaldo at 105,000)
  const ballonDorLegends = CHARACTERS.filter((c) => c.hasBallonDor).sort((a, b) => a.price - b.price);

  const [selectedLegendId, setSelectedLegendId] = useState<string>(
    user?.equippedCharacterId && ballonDorLegends.some((c) => c.id === user.equippedCharacterId)
      ? user.equippedCharacterId
      : 'ronaldo-7'
  );

  const selectedLegend = ballonDorLegends.find((c) => c.id === selectedLegendId) || ballonDorLegends[0];

  const handleUnlockOrEquip = (char: CharacterItem) => {
    sounds.playKeyClick();
    setSelectedLegendId(char.id);

    const alreadyUnlocked = user?.unlockedCharacters.includes(char.id);

    if (alreadyUnlocked) {
      equipCharacter(char.id);
      sounds.playUnlock();
      setPurchaseMsg(`🏆 ${char.name} equipped with active superpower: ${char.ballonDorPower?.name || 'Ballon d\'Or'}!`);
      setTimeout(() => setPurchaseMsg(''), 3000);
      return;
    }

    if ((user?.coins ?? 0) < char.price) {
      sounds.playWrong();
      const diff = char.price - (user?.coins ?? 0);
      setPurchaseMsg(`You need ${diff.toLocaleString()} more coins to unlock ${char.name}! Practice in the Math Arena to earn them.`);
      setTimeout(() => setPurchaseMsg(''), 3500);
      return;
    }

    const success = unlockCharacter(char.id, char.price);
    if (success) {
      sounds.playStreak();
      try {
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff', '#e11d48']
        });
      } catch {}
      setPurchaseMsg(`👑 Congratulations! You unlocked Ballon d'Or Legend ${char.name} and activated (${char.ballonDorPower?.name})!`);
      setTimeout(() => setPurchaseMsg(''), 4500);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Golden VIP Grand Showcase */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border-3 border-neutral-900 rounded-3xl p-5 sm:p-9 shadow-[0_10px_0_0_#171717] text-neutral-900">
        <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none text-neutral-900">
          <Trophy className="w-72 h-72 sm:w-96 sm:h-96" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-amber-300 border border-neutral-900 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_2px_0_0_#171717]">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>VIP Ballon d'Or Sanctuary • 15 Legendary Superpowers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            Ballon d'Or Legends <br />
            <span className="text-white drop-shadow-[0_2px_0_#171717]">
              Super Powers Showcase 🏆
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-bold text-neutral-900/90 leading-relaxed">
            All 15 Ballon d'Or legends holding the authentic trophy in hand! Each champion wields an active <span className="underline font-black decoration-neutral-900">gameplay superpower</span> in exams (including exam time freezing, 2X coin doubling, streak accelerators, and error shields!).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 bg-neutral-900 text-amber-400 border-2 border-neutral-900 rounded-2xl font-mono font-black text-xs sm:text-sm shadow-[0_3px_0_0_#171717] flex items-center gap-2">
              <span>Your Coins:</span>
              <span className="text-base font-extrabold text-white">🪙 {user?.coins.toLocaleString() ?? 0}</span>
            </div>

            <button
              onClick={() => {
                sounds.playKeyClick();
                onGoToArena();
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-neutral-100 border-2 border-neutral-900 rounded-2xl font-black text-xs text-neutral-900 shadow-[0_2px_0_0_#171717] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <span>Collect Coins in Arena ⚡</span>
            </button>
          </div>
        </div>
      </div>

      {purchaseMsg && (
        <div className="p-4 bg-amber-100 border-3 border-neutral-900 rounded-2xl text-center font-black text-neutral-900 text-xs sm:text-sm shadow-[0_4px_0_0_#171717] animate-bounce">
          {purchaseMsg}
        </div>
      )}

      {/* 3D Cover Flow Carousel for Ballon d'Or Legends */}
      <PlayerCoverFlowCarousel
        characters={ballonDorLegends}
        selectedId={selectedLegend.id}
        onSelect={(char) => setSelectedLegendId(char.id)}
        onEquipOrBuy={handleUnlockOrEquip}
        userCoins={user?.coins ?? 0}
        unlockedIds={user?.unlockedCharacters ?? []}
        equippedId={user?.equippedCharacterId ?? ''}
        isGoldTheme={true}
      />
    </div>
  );
};
