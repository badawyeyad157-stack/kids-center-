import React, { useState, useEffect, useRef } from 'react';
import { MathProblem, QuizSessionSummary } from '../types';
import { calculateProblemReward } from '../utils/mathGenerator';
import { sounds } from '../utils/audio';
import { useAuth } from '../context/AuthContext';
import { CHARACTERS, getPlayerPhotoUrl } from '../data/characters';
import { Clock, Flame, Check, X, ArrowRight, CornerDownLeft, Delete, PauseCircle, Shield, Sparkles, Compass, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActiveQuizPlayerProps {
  problems: MathProblem[];
  categoryTitle: string;
  timeLimitTotalSeconds: number; // 0 = untimed
  onFinishQuiz: (session: QuizSessionSummary) => void;
  onExit: () => void;
}

export const ActiveQuizPlayer: React.FC<ActiveQuizPlayerProps> = ({
  problems: initialProblems,
  categoryTitle,
  timeLimitTotalSeconds,
  onFinishQuiz,
  onExit
}) => {
  const { user } = useAuth();
  const equippedHero = CHARACTERS.find((c) => c.id === user?.equippedCharacterId);
  const heroPower = equippedHero?.ballonDorPower;

  const [problems, setProblems] = useState<MathProblem[]>(initialProblems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [streak, setStreak] = useState(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; coinsWon: number; shielded?: boolean } | null>(null);

  // Timers & Time Freeze Power
  const [timeLeft, setTimeLeft] = useState(timeLimitTotalSeconds);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [freezeSecondsLeft, setFreezeSecondsLeft] = useState(0);
  const [freezeChargesLeft, setFreezeChargesLeft] = useState(heroPower?.chargesPerQuiz || 1);

  // Shield of Mercy Power (Converts errors into correct answers)
  const [shieldChargesLeft, setShieldChargesLeft] = useState(
    heroPower?.type === 'shield-mercy' ? heroPower.chargesPerQuiz || 1 : 0
  );

  // Radar Hint Power (Rodri)
  const [hintsLeft, setHintsLeft] = useState(heroPower?.type === 'hint-vision' ? 3 : 0);
  const [activeHintText, setActiveHintText] = useState('');

  const [powerAlertMsg, setPowerAlertMsg] = useState('');

  const questionStartTimeRef = useRef(Date.now());
  const sessionStartTimeRef = useRef(Date.now());

  const currentProblem = problems[currentIndex];

  // Global time countdown if time limit > 0
  useEffect(() => {
    if (timeLimitTotalSeconds <= 0) return;

    const timer = setInterval(() => {
      // If time is frozen by Kane or Modric, don't decrement quiz clock!
      if (isTimeFrozen) {
        setFreezeSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimeFrozen(false);
            sounds.playKeyClick();
            setPowerAlertMsg('Time freeze expired! Keep solving.');
            setTimeout(() => setPowerAlertMsg(''), 2500);
            return 0;
          }
          return prev - 1;
        });
        return;
      }

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimitTotalSeconds, isTimeFrozen]);

  // Reset input and reset question start time on index change
  useEffect(() => {
    setInputVal('');
    setFeedback(null);
    setActiveHintText('');
    questionStartTimeRef.current = Date.now();
  }, [currentIndex]);

  // Activate Time Freeze Power (Kane / Modric / Nedved)
  const handleTriggerTimeFreeze = () => {
    if (freezeChargesLeft <= 0 || isTimeFrozen) return;
    sounds.playStreak();
    setFreezeChargesLeft((prev) => prev - 1);
    const duration = heroPower?.durationSeconds || 15;
    setIsTimeFrozen(true);
    setFreezeSecondsLeft(duration);
    setPowerAlertMsg(`❄️ Time Freeze Active! Exam timer paused for ${duration}s by ${equippedHero?.name}!`);
    setTimeout(() => setPowerAlertMsg(''), 3000);
  };

  // Activate Radar Clue (Rodri / Cruyff)
  const handleTriggerRadarHint = () => {
    if (hintsLeft <= 0) return;
    sounds.playUnlock();
    setHintsLeft((prev) => prev - 1);
    const ans = currentProblem.correctAnswer;
    const firstDigit = String(Math.abs(ans))[0];
    const hint = `📡 Tactical Radar: Answer starts with (${firstDigit}) and is between ${Math.floor(ans - 5)} and ${Math.ceil(ans + 5)}`;
    setActiveHintText(hint);
  };

  // Physical keyboard support (numbers 0-9 and decimal point)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback !== null) return;

      if ((e.key >= '0' && e.key <= '9') || e.key === '.' || e.key === ',') {
        sounds.playKeyClick();
        const char = e.key === ',' ? '.' : e.key;
        setInputVal((prev) => {
          if (char === '.' && prev.includes('.')) return prev;
          if (char === '.' && prev === '') return '0.';
          return prev.length < 10 ? prev + char : prev;
        });
      } else if (e.key === 'Backspace') {
        sounds.playKeyClick();
        setInputVal((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputVal, feedback, currentIndex, shieldChargesLeft]);

  const handleKeypadPress = (val: string) => {
    if (feedback !== null) return;
    sounds.playKeyClick();

    if (val === 'backspace') {
      setInputVal((prev) => prev.slice(0, -1));
    } else if (val === 'clear') {
      setInputVal('');
    } else if (val === '.') {
      setInputVal((prev) => {
        if (prev.includes('.')) return prev;
        if (prev === '') return '0.';
        return prev + '.';
      });
    } else {
      setInputVal((prev) => (prev.length < 10 ? prev + val : prev));
    }
  };

  const handleSubmit = () => {
    if (!inputVal.trim() || feedback !== null) return;

    const parsedAnswer = parseFloat(inputVal);
    const timeTaken = (Date.now() - questionStartTimeRef.current) / 1000;
    let isCorrect = !isNaN(parsedAnswer) && Math.abs(parsedAnswer - currentProblem.correctAnswer) < 0.001;
    let shieldUsed = false;

    // SHIELD OF MERCY POWER INTERVENTION (CR7 / Zidane / Cannavaro / Cruyff)
    if (!isCorrect && heroPower?.type === 'shield-mercy' && shieldChargesLeft > 0) {
      isCorrect = true;
      shieldUsed = true;
      setShieldChargesLeft((prev) => prev - 1);
      sounds.playStreak();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#ffffff']
        });
      } catch {}
      setPowerAlertMsg(`🛡️ Shield of Mercy! Wrong answer converted to 100% correct by ${equippedHero?.name}! (${shieldChargesLeft - 1} remaining)`);
      setTimeout(() => setPowerAlertMsg(''), 3500);
    }

    // STREAK SURGE POWER (Benzema KB9 / Van Basten)
    let nextStreak = streak;
    if (isCorrect) {
      if (heroPower?.type === 'streak-surge') {
        const bonus = heroPower.streakBonus || 3;
        nextStreak = streak + bonus;
      } else {
        nextStreak = streak + 1;
      }
    } else {
      nextStreak = 0;
    }
    setStreak(nextStreak);

    // Update problem record
    const updatedProblem: MathProblem = {
      ...currentProblem,
      userAnswer: shieldUsed ? currentProblem.correctAnswer : parsedAnswer,
      isCorrect,
      timeTakenSeconds: timeTaken
    };

    const newProblems = [...problems];
    newProblems[currentIndex] = updatedProblem;
    setProblems(newProblems);

    // Calculate coins with Ballon d'Or multipliers!
    const reward = calculateProblemReward(updatedProblem, timeTaken, streak);
    let coinsWon = reward.coins;

    // COIN MULTIPLIER POWERS (Lionel Messi 100K 2X, Ronaldinho/R9/Kaká/Rivaldo)
    if (heroPower?.type === 'double-coins') {
      coinsWon = Math.round(coinsWon * 2);
    } else if (heroPower?.type === 'samba-fever') {
      const mult = heroPower.multiplier || 1.5;
      coinsWon = Math.round(coinsWon * mult);
    }

    if (isCorrect) {
      sounds.playCorrect();
      sounds.playCoin();
      if (nextStreak > 0 && nextStreak % 3 === 0) {
        sounds.playStreak();
      }
      setSessionCoins((prev) => prev + coinsWon);
    } else {
      sounds.playWrong();
    }

    setFeedback({ isCorrect, coinsWon, shielded: shieldUsed });

    // Transition after brief delay
    setTimeout(() => {
      if (currentIndex + 1 < problems.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        finalizeSession(newProblems, sessionCoins + (isCorrect ? coinsWon : 0));
      }
    }, 750);
  };

  const finalizeSession = (finalProblems = problems, finalCoins = sessionCoins) => {
    const timeSpent = Math.max(1, Math.round((Date.now() - sessionStartTimeRef.current) / 1000));
    const correctCount = finalProblems.filter((p) => p.isCorrect).length;
    const accuracy = Math.round((correctCount / finalProblems.length) * 100);

    const summary: QuizSessionSummary = {
      id: `session-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      categoryTitle,
      totalQuestions: finalProblems.length,
      correctAnswers: correctCount,
      accuracy,
      coinsEarned: finalCoins,
      timeSpentSeconds: timeSpent,
      averageTimePerQuestion: parseFloat((timeSpent / finalProblems.length).toFixed(1)),
      problems: finalProblems
    };

    onFinishQuiz(summary);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Ballon d'Or Super Power Banner (If Equipped) */}
      {heroPower && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-2 border-neutral-900 rounded-2xl p-2.5 shadow-[0_3px_0_0_#171717] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl border border-neutral-900 overflow-hidden shrink-0 bg-neutral-900 shadow-xs">
              <img
                src={getPlayerPhotoUrl(equippedHero)}
                alt={equippedHero?.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-neutral-900 bg-white/80 px-1.5 py-0.2 rounded">
                  {equippedHero?.name}
                </span>
                <span className="text-xs font-black text-neutral-950">
                  {heroPower.name}
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-800 hidden sm:inline">
                {heroPower.badge}
              </span>
            </div>
          </div>

          {/* Interactive Trigger Buttons for active powers */}
          {heroPower.type === 'time-freeze' && (
            <button
              onClick={handleTriggerTimeFreeze}
              disabled={freezeChargesLeft <= 0 || isTimeFrozen}
              className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-neutral-900 cursor-pointer shadow-xs transition-all flex items-center gap-1 ${
                isTimeFrozen
                  ? 'bg-sky-400 text-neutral-900 animate-pulse'
                  : freezeChargesLeft > 0
                  ? 'bg-neutral-900 text-amber-300 hover:bg-neutral-800'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <PauseCircle className="w-3.5 h-3.5" />
              <span>
                {isTimeFrozen ? `تجميد (${freezeSecondsLeft}s)` : `تجميد الوقت (${freezeChargesLeft})`}
              </span>
            </button>
          )}

          {heroPower.type === 'shield-mercy' && (
            <div className="flex items-center gap-1 bg-neutral-900 text-emerald-400 border border-neutral-900 px-2.5 py-1 rounded-xl text-xs font-black">
              <Shield className="w-3.5 h-3.5 fill-emerald-400" />
              <span>درع الرحمة: {shieldChargesLeft} شحنة</span>
            </div>
          )}

          {heroPower.type === 'double-coins' && (
            <div className="flex items-center gap-1 bg-neutral-900 text-amber-300 border border-neutral-900 px-2.5 py-1 rounded-xl text-xs font-black animate-pulse">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>مضاعفة 2X كوينات مفعلة!</span>
            </div>
          )}

          {heroPower.type === 'hint-vision' && (
            <button
              onClick={handleTriggerRadarHint}
              disabled={hintsLeft <= 0}
              className="px-2.5 py-1 bg-neutral-900 text-indigo-300 hover:bg-neutral-800 border-2 border-neutral-900 rounded-xl text-xs font-black cursor-pointer shadow-xs flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>رادار الحل ({hintsLeft})</span>
            </button>
          )}
        </div>
      )}

      {powerAlertMsg && (
        <div className="p-2.5 bg-neutral-900 text-amber-300 border-2 border-amber-400 rounded-xl text-center text-xs font-black animate-bounce shadow-md">
          {powerAlertMsg}
        </div>
      )}

      {/* Top Status Bar: Progress, Timer, Streak, Coins */}
      <div className="bg-white border-2 border-neutral-900 rounded-2xl p-3 sm:p-4 shadow-[0_5px_0_0_#171717] flex items-center justify-between gap-2">
        {/* Progress & Exit */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playKeyClick();
              if (window.confirm('Do you want to exit the current math match?')) {
                onExit();
              }
            }}
            className="px-2.5 py-1 text-xs font-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-900 rounded-xl cursor-pointer"
          >
            ✕ Exit
          </button>
          <div className="font-mono text-xs sm:text-sm font-black text-neutral-800">
            Q {currentIndex + 1} / {problems.length}
          </div>
        </div>

        {/* Global Timer if active (Supports Time Freeze) */}
        {timeLimitTotalSeconds > 0 && (
          <div
            className={`flex items-center gap-1.5 font-mono text-xs sm:text-sm font-black px-2.5 py-1 rounded-xl border-2 ${
              isTimeFrozen
                ? 'bg-sky-200 text-sky-950 border-sky-600 animate-pulse'
                : timeLeft <= 10
                ? 'bg-rose-100 text-rose-700 border-rose-500 animate-pulse'
                : 'bg-neutral-100 text-neutral-900 border-neutral-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>
              {isTimeFrozen
                ? `❄️ مجمد (${freezeSecondsLeft}s)`
                : `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
            </span>
          </div>
        )}

        {/* Streak & Live Coins */}
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <div className="flex items-center gap-1 bg-rose-100 border border-rose-400 text-rose-700 px-2 py-0.5 rounded-xl text-xs font-black animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              <span>{streak}x</span>
            </div>
          )}
          <div className="flex items-center gap-1 font-mono font-black text-xs sm:text-sm bg-amber-100 border border-neutral-900 px-2.5 py-1 rounded-xl">
            <span>🪙</span>
            <span>+{sessionCoins}</span>
          </div>
        </div>
      </div>

      {/* Radar Clue Display if activated */}
      {activeHintText && (
        <div className="p-2 bg-indigo-50 border-2 border-indigo-300 rounded-xl text-center text-xs font-black text-indigo-950 animate-in fade-in duration-150">
          {activeHintText}
        </div>
      )}

      {/* Math Card Display Area */}
      <div className="relative bg-white border-3 border-neutral-900 rounded-3xl p-5 sm:p-8 shadow-[0_10px_0_0_#171717] min-h-[260px] sm:min-h-[290px] flex flex-col justify-center items-center">
        {/* Flash Feedback Popover */}
        {feedback && (
          <div
            className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl border-2 border-neutral-900 font-black text-xs flex items-center gap-1 shadow-md animate-in zoom-in duration-150 ${
              feedback.isCorrect ? 'bg-emerald-300 text-emerald-950' : 'bg-rose-300 text-rose-950'
            }`}
          >
            {feedback.isCorrect ? (
              <>
                <Check className="w-4 h-4 text-emerald-900 stroke-[3]" />
                <span>
                  {feedback.shielded ? '🛡️ SHIELDED! CORRECT!' : 'CORRECT!'} +{feedback.coinsWon} 🪙
                </span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-rose-900 stroke-[3]" />
                <span>INCORRECT (Answer: {currentProblem.correctAnswer})</span>
              </>
            )}
          </div>
        )}

        {/* 1. Addition & Subtraction Soroban Mental Math Vertical Style */}
        {currentProblem.type === 'add-sub' && currentProblem.terms && (
          <div className="flex flex-col items-end my-2">
            <div className="space-y-1.5 pr-2">
              {currentProblem.terms.map((term, tIdx) => {
                const isSubtracted = term < 0;
                return (
                  <div
                    key={tIdx}
                    className="flex items-center justify-end gap-3 font-mono text-3xl sm:text-4xl font-black text-neutral-900 tracking-wider"
                  >
                    <span className="w-6 text-center text-rose-600 font-black text-3xl">
                      {isSubtracted ? '−' : ''}
                    </span>
                    <span className={isSubtracted ? 'text-rose-600' : 'text-neutral-900'}>
                      {Math.abs(term)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Answer line divider */}
            <div className="w-44 sm:w-56 h-1 bg-neutral-900 my-3 rounded-full" />

            {/* Input Display box */}
            <div className="w-44 sm:w-56 h-14 sm:h-16 bg-neutral-50 border-3 border-neutral-900 rounded-2xl flex items-center justify-end px-4 font-mono text-3xl font-black text-neutral-900 shadow-inner">
              {inputVal || <span className="text-neutral-300">?</span>}
            </div>
          </div>
        )}

        {/* 2. Multiplication & Division Horizontal Style */}
        {(currentProblem.type === 'multiplication' || currentProblem.type === 'division') && (
          <div className="flex flex-col items-center my-4 space-y-5">
            <div className="flex items-center justify-center gap-3 font-mono text-3xl sm:text-4xl font-black text-neutral-900">
              <span>{currentProblem.numA}</span>
              <span className="text-amber-500 text-4xl">{currentProblem.symbol}</span>
              <span>{currentProblem.numB}</span>
              <span className="text-neutral-400">=</span>
            </div>

            {/* Input Display box */}
            <div className="w-44 sm:w-56 h-14 sm:h-16 bg-neutral-50 border-3 border-neutral-900 rounded-2xl flex items-center justify-center px-4 font-mono text-3xl font-black text-neutral-900 shadow-inner">
              {inputVal || <span className="text-neutral-300">?</span>}
            </div>
          </div>
        )}
      </div>

      {/* On-screen Numeric Keypad for fast tablet/mobile input */}
      <div className="bg-white border-2 border-neutral-900 rounded-3xl p-3 sm:p-4 shadow-[0_5px_0_0_#171717]">
        <div className="flex items-center justify-between max-w-sm mx-auto mb-2 px-1">
          <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider">
            Numeric Keypad
          </span>
          <button
            type="button"
            onClick={() => handleKeypadPress('clear')}
            className="text-xs font-black text-rose-600 hover:text-rose-700 underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeypadPress(digit)}
              className="h-12 sm:h-13 bg-neutral-50 hover:bg-neutral-100 border-2 border-neutral-900 rounded-2xl font-mono text-2xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all"
            >
              {digit}
            </button>
          ))}

          {/* Decimal Point button */}
          <button
            type="button"
            onClick={() => handleKeypadPress('.')}
            className="h-12 sm:h-13 bg-amber-100 hover:bg-amber-200 border-2 border-neutral-900 rounded-2xl font-mono text-3xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer flex items-center justify-center transition-all"
            title="Decimal Point (.)"
          >
            .
          </button>

          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="h-12 sm:h-13 bg-neutral-50 hover:bg-neutral-100 border-2 border-neutral-900 rounded-2xl font-mono text-2xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer"
          >
            0
          </button>

          <button
            type="button"
            onClick={() => handleKeypadPress('backspace')}
            className="h-12 sm:h-13 bg-neutral-200 hover:bg-neutral-300 border-2 border-neutral-900 rounded-2xl flex items-center justify-center text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer"
            title="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Big Submit Button */}
        <div className="max-w-sm mx-auto mt-3">
          <button
            onClick={handleSubmit}
            disabled={!inputVal.trim() || feedback !== null}
            className={`w-full py-3 sm:py-3.5 border-2 border-neutral-900 rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_0_0_#171717] active:translate-y-0.5 transition-all ${
              !inputVal.trim()
                ? 'bg-neutral-200 text-neutral-400 border-neutral-400 shadow-none cursor-not-allowed'
                : 'bg-emerald-400 hover:bg-emerald-500 text-neutral-900'
            }`}
          >
            <span>Submit Answer</span>
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
