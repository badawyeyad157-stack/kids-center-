import React from 'react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/audio';
import { Trophy, Flame, Target, Award, Calendar, Clock, Sparkles } from 'lucide-react';
import { CHARACTERS, getPlayerPhotoUrl } from '../data/characters';

export const StatsHistoryView: React.FC = () => {
  const { user } = useAuth();

  const totalSolved = user?.stats.totalSolved || 0;
  const totalCorrect = user?.stats.totalCorrect || 0;
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
  const totalCoins = user?.stats.totalCoinsEarned || 0;
  const bestStreak = user?.stats.bestStreak || 0;
  const unlockedCharsCount = user?.unlockedCharacters.length || 1;

  const equippedChar = CHARACTERS.find(c => c.id === user?.equippedCharacterId) || CHARACTERS[0];

  const badges = [
    {
      id: 'first-step',
      name: 'First Math Step',
      desc: 'Solve your first mental math problem',
      achieved: totalSolved >= 1,
      icon: '🌱'
    },
    {
      id: 'century',
      name: 'Century Club',
      desc: 'Solve 100 mental arithmetic problems',
      achieved: totalSolved >= 100,
      icon: '💯'
    },
    {
      id: 'sharp-aim',
      name: 'Sharpshooter',
      desc: 'Achieve 90%+ overall accuracy',
      achieved: totalSolved >= 20 && accuracy >= 90,
      icon: '🎯'
    },
    {
      id: 'fire-streak',
      name: 'Fire Streak',
      desc: 'Get 10 consecutive correct answers in a row',
      achieved: bestStreak >= 10,
      icon: '🔥'
    },
    {
      id: 'collector',
      name: 'Hero Recruiter',
      desc: 'Unlock 5 legendary 3D characters',
      achieved: unlockedCharsCount >= 5,
      icon: '⭐'
    },
    {
      id: 'gold-tycoon',
      name: 'Math Tycoon',
      desc: 'Earn 3,000 career coins',
      achieved: totalCoins >= 3000,
      icon: '👑'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Hero Stats Card */}
      <div className="bg-white border-2 border-neutral-900 rounded-3xl p-6 shadow-[0_8px_0_0_#171717]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-neutral-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-3 border-neutral-900 shadow-[0_4px_0_0_#171717] overflow-hidden shrink-0 relative bg-neutral-900">
              <img
                src={getPlayerPhotoUrl(equippedChar)}
                alt={equippedChar.name}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 bg-neutral-900/90 text-amber-300 font-mono text-[9px] font-black px-1 rounded-tl">
                #{equippedChar.jerseyNumber || '★'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                Player Profile
              </span>
              <h2 className="text-2xl font-black text-neutral-900">
                {user?.nickname || 'Math Champion'}
              </h2>
              <span className="text-xs font-bold text-neutral-600">
                Active Hero: {equippedChar.name} ({equippedChar.title})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-amber-100 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] flex items-center gap-1.5 font-mono font-black text-neutral-900">
              <span className="text-lg">🪙</span>
              <span className="text-base">{user?.coins.toLocaleString()} Coins</span>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-neutral-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] text-center">
            <span className="text-[10px] font-black uppercase text-neutral-500 block">
              Problems Solved
            </span>
            <span className="font-mono text-2xl font-black text-neutral-900">
              {totalSolved}
            </span>
          </div>

          <div className="p-4 bg-emerald-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] text-center">
            <span className="text-[10px] font-black uppercase text-neutral-500 block">
              Accuracy
            </span>
            <span className="font-mono text-2xl font-black text-emerald-700">
              {accuracy}%
            </span>
          </div>

          <div className="p-4 bg-rose-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] text-center">
            <span className="text-[10px] font-black uppercase text-neutral-500 block">
              Best Streak
            </span>
            <span className="font-mono text-2xl font-black text-rose-700">
              {bestStreak}x 🔥
            </span>
          </div>

          <div className="p-4 bg-sky-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] text-center">
            <span className="text-[10px] font-black uppercase text-neutral-500 block">
              3D Heroes Owned
            </span>
            <span className="font-mono text-2xl font-black text-sky-700">
              {unlockedCharsCount} / 20
            </span>
          </div>
        </div>
      </div>

      {/* Badges / Achievements */}
      <div className="bg-white border-2 border-neutral-900 rounded-3xl p-6 shadow-[0_8px_0_0_#171717] space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-black text-lg text-neutral-900">
            Trophy Case & Badges
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3.5 rounded-2xl border-2 border-neutral-900 flex items-center gap-3 transition-all ${
                b.achieved
                  ? 'bg-amber-50 shadow-[0_3px_0_0_#171717]'
                  : 'bg-neutral-100 opacity-60 border-neutral-400'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-900 flex items-center justify-center text-xl shadow-xs">
                {b.icon}
              </div>
              <div>
                <h4 className="font-black text-xs text-neutral-900 flex items-center gap-1.5">
                  <span>{b.name}</span>
                  {b.achieved && (
                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase">✓</span>
                  )}
                </h4>
                <p className="text-[10px] font-semibold text-neutral-600 leading-tight mt-0.5">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Match History */}
      <div className="bg-white border-2 border-neutral-900 rounded-3xl p-6 shadow-[0_8px_0_0_#171717] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-neutral-700" />
            <h3 className="font-black text-lg text-neutral-900">
              Recent Training Sessions
            </h3>
          </div>
          <span className="text-xs font-bold text-neutral-500">
            Last {user?.history.length || 0} matches
          </span>
        </div>

        {(!user?.history || user.history.length === 0) ? (
          <div className="text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-200">
            <p className="font-bold text-xs text-neutral-500">
              No recent match history yet. Go to Math Arena and complete your first challenge!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {user.history.map((sess) => (
              <div
                key={sess.id}
                className="p-3 bg-neutral-50 border-2 border-neutral-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-bold"
              >
                <div>
                  <span className="font-black text-neutral-900 block">{sess.categoryTitle}</span>
                  <span className="text-[11px] font-medium text-neutral-500">
                    {sess.date} • {sess.timeSpentSeconds}s duration ({sess.averageTimePerQuestion}s / Q)
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="text-emerald-700 font-black">
                    {sess.correctAnswers} / {sess.totalQuestions} ({sess.accuracy}%)
                  </span>
                  <span className="text-amber-700 font-black bg-amber-100 px-2 py-1 rounded-lg border border-neutral-900">
                    🪙 +{sess.coinsEarned}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
