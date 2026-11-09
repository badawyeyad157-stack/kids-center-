import React, { useEffect } from 'react';
import { QuizSessionSummary } from '../types';
import { sounds } from '../utils/audio';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizSummaryModalProps {
  summary: QuizSessionSummary;
  onPlayAgain: () => void;
  onGoToLocker: () => void;
}

export const QuizSummaryModal: React.FC<QuizSummaryModalProps> = ({
  summary,
  onPlayAgain,
  onGoToLocker
}) => {
  useEffect(() => {
    sounds.playVictoryFanfare();

    // Burst confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 overflow-y-auto">
      <div className="w-full max-w-xl bg-white border-3 border-neutral-900 rounded-3xl shadow-[0_12px_0_0_#171717] overflow-hidden flex flex-col my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-6 bg-amber-400 border-b-2 border-neutral-900 text-center relative">
          <div className="inline-flex p-3 bg-white border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717] mb-2">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Challenge Completed!
          </h2>
          <p className="text-xs font-bold text-neutral-800 uppercase tracking-widest mt-1">
            {summary.categoryTitle}
          </p>
        </div>

        {/* Big Results Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-amber-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717]">
              <span className="text-[10px] font-black uppercase text-neutral-500 block">
                Coins Won
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-amber-700 flex items-center justify-center gap-1">
                <span>🪙</span>
                <span>+{summary.coinsEarned}</span>
              </span>
            </div>

            <div className="p-3 bg-emerald-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717]">
              <span className="text-[10px] font-black uppercase text-neutral-500 block">
                Score
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-emerald-700">
                {summary.correctAnswers} / {summary.totalQuestions}
              </span>
            </div>

            <div className="p-3 bg-sky-50 border-2 border-neutral-900 rounded-2xl shadow-[0_3px_0_0_#171717]">
              <span className="text-[10px] font-black uppercase text-neutral-500 block">
                Accuracy
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-sky-700">
                {summary.accuracy}%
              </span>
            </div>
          </div>

          {/* Problem-by-problem review */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
              Question Review:
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {summary.problems.map((p, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border-2 border-neutral-900 flex items-center justify-between text-xs font-bold ${
                    p.isCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-rose-50 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {p.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                    )}
                    <span>
                      {p.type === 'add-sub' && p.terms
                        ? `[ ${p.terms.map(t => (t < 0 ? `−${Math.abs(t)}` : `${t}`)).join(', ')} ]`
                        : `${p.numA} ${p.symbol} ${p.numB}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span>
                      Your: <span className="font-black">{p.userAnswer ?? '–'}</span>
                    </span>
                    {!p.isCorrect && (
                      <span className="text-emerald-700 font-black">
                        Correct: {p.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                sounds.playKeyClick();
                onPlayAgain();
              }}
              className="flex-1 py-3.5 bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-900 rounded-2xl font-black text-xs uppercase tracking-wider text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Train Again</span>
            </button>

            <button
              onClick={() => {
                sounds.playKeyClick();
                onGoToLocker();
              }}
              className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-2xl font-black text-xs uppercase tracking-wider text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Spend Coins in 3D Locker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
