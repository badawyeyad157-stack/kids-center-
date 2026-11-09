import React, { useState } from 'react';
import {
  AddSubSettings,
  MultiplicationSettings,
  DivisionSettings,
  MixedSettings
} from '../types';
import { sounds } from '../utils/audio';
import { Plus, Minus, X, Divide, Play, Clock, Hash, Layers, Flame, SlidersHorizontal, Check } from 'lucide-react';

interface MathTrainingArenaProps {
  onStartQuiz: (
    type: 'add-sub' | 'multiplication' | 'division' | 'mixed',
    settings: AddSubSettings | MultiplicationSettings | DivisionSettings | MixedSettings,
    categoryName: string
  ) => void;
}

export const MathTrainingArena: React.FC<MathTrainingArenaProps> = ({ onStartQuiz }) => {
  // Mode switch: Single Operation or Mixed Multi-Operation
  const [arenaMode, setArenaMode] = useState<'single' | 'mixed'>('single');

  // Box 1: Addition & Subtraction (user types freely)
  const [addSubNumbers, setAddSubNumbers] = useState<number>(3);
  const [addSubDigits, setAddSubDigits] = useState<number>(2);
  const [addSubQuestions, setAddSubQuestions] = useState<number>(10);
  const [addSubTime, setAddSubTime] = useState<number>(30);
  const [addSubHasDecimals, setAddSubHasDecimals] = useState<boolean>(false);
  const [addSubDecimalPlaces, setAddSubDecimalPlaces] = useState<number>(1);

  // Box 2: Multiplication (user types freely)
  const [multDigits1, setMultDigits1] = useState<number>(2);
  const [multDigits2, setMultDigits2] = useState<number>(1);
  const [multQuestions, setMultQuestions] = useState<number>(10);
  const [multTime, setMultTime] = useState<number>(30);
  const [multHasDecimals, setMultHasDecimals] = useState<boolean>(false);
  const [multDecimalPlaces, setMultDecimalPlaces] = useState<number>(1);

  // Box 3: Division (user types freely)
  const [divDividendDigits, setDivDividendDigits] = useState<number>(3);
  const [divDivisorDigits, setDivDivisorDigits] = useState<number>(1);
  const [divQuestions, setDivQuestions] = useState<number>(10);
  const [divTime, setDivTime] = useState<number>(30);
  const [divHasDecimals, setDivHasDecimals] = useState<boolean>(false);
  const [divDecimalPlaces, setDivDecimalPlaces] = useState<number>(1);

  // Mixed Mode Settings (integrated right on the main screen)
  const [mixedAddSubActive, setMixedAddSubActive] = useState<boolean>(true);
  const [mixedAddSubCount, setMixedAddSubCount] = useState<number>(10);
  const [mixedAddSubNumbers, setMixedAddSubNumbers] = useState<number>(3);
  const [mixedAddSubDigits, setMixedAddSubDigits] = useState<number>(2);
  const [mixedAddSubHasDecimals, setMixedAddSubHasDecimals] = useState<boolean>(false);
  const [mixedAddSubDecimalPlaces, setMixedAddSubDecimalPlaces] = useState<number>(1);

  const [mixedMultActive, setMixedMultActive] = useState<boolean>(true);
  const [mixedMultCount, setMixedMultCount] = useState<number>(10);
  const [mixedMultDigits1, setMixedMultDigits1] = useState<number>(2);
  const [mixedMultDigits2, setMixedMultDigits2] = useState<number>(1);
  const [mixedMultHasDecimals, setMixedMultHasDecimals] = useState<boolean>(false);
  const [mixedMultDecimalPlaces, setMixedMultDecimalPlaces] = useState<number>(1);

  const [mixedDivActive, setMixedDivActive] = useState<boolean>(false);
  const [mixedDivCount, setMixedDivCount] = useState<number>(5);
  const [mixedDivDividendDigits, setMixedDivDividendDigits] = useState<number>(3);
  const [mixedDivDivisorDigits, setMixedDivDivisorDigits] = useState<number>(1);
  const [mixedDivHasDecimals, setMixedDivHasDecimals] = useState<boolean>(false);
  const [mixedDivDecimalPlaces, setMixedDivDecimalPlaces] = useState<number>(1);

  const [mixedTime, setMixedTime] = useState<number>(90);

  const startAddSub = () => {
    sounds.playKeyClick();
    onStartQuiz(
      'add-sub',
      {
        numbersCount: Math.max(2, addSubNumbers || 3),
        digitsCount: Math.max(1, addSubDigits || 1),
        questionCount: Math.max(1, addSubQuestions || 10),
        timeLimitSeconds: Math.max(0, addSubTime || 0),
        hasDecimals: addSubHasDecimals,
        decimalPlaces: addSubDecimalPlaces
      },
      addSubHasDecimals ? 'Mental Addition & Subtraction (Decimals)' : 'Mental Addition & Subtraction'
    );
  };

  const startMult = () => {
    sounds.playKeyClick();
    onStartQuiz(
      'multiplication',
      {
        digits1: Math.max(1, multDigits1 || 2),
        digits2: Math.max(1, multDigits2 || 1),
        questionCount: Math.max(1, multQuestions || 10),
        timeLimitSeconds: Math.max(0, multTime || 0),
        hasDecimals: multHasDecimals,
        decimalPlaces: multDecimalPlaces
      },
      multHasDecimals ? 'Multiplication Sprint (Decimals)' : 'Multiplication Sprint'
    );
  };

  const startDiv = () => {
    sounds.playKeyClick();
    const dividend = Math.max(2, divDividendDigits || 2);
    const divisor = Math.max(1, Math.min(dividend - 1, divDivisorDigits || 1));
    onStartQuiz(
      'division',
      {
        dividendDigits: dividend,
        divisorDigits: divisor,
        questionCount: Math.max(1, divQuestions || 10),
        timeLimitSeconds: Math.max(0, divTime || 0),
        hasDecimals: divHasDecimals,
        decimalPlaces: divDecimalPlaces
      },
      divHasDecimals ? 'Division Lightning (Decimals)' : 'Division Lightning'
    );
  };

  const startMixed = () => {
    sounds.playKeyClick();
    const settings: MixedSettings = {
      includeAddSub: mixedAddSubActive,
      addSubCount: mixedAddSubActive ? Math.max(1, mixedAddSubCount) : 0,
      addSubNumbers: Math.max(2, mixedAddSubNumbers),
      addSubDigits: Math.max(1, mixedAddSubDigits),
      addSubHasDecimals: mixedAddSubHasDecimals,
      addSubDecimalPlaces: mixedAddSubDecimalPlaces,

      includeMultiplication: mixedMultActive,
      multCount: mixedMultActive ? Math.max(1, mixedMultCount) : 0,
      multDigits1: Math.max(1, mixedMultDigits1),
      multDigits2: Math.max(1, mixedMultDigits2),
      multHasDecimals: mixedMultHasDecimals,
      multDecimalPlaces: mixedMultDecimalPlaces,

      includeDivision: mixedDivActive,
      divCount: mixedDivActive ? Math.max(1, mixedDivCount) : 0,
      divDividendDigits: Math.max(2, mixedDivDividendDigits),
      divDivisorDigits: Math.max(1, mixedDivDivisorDigits),
      divHasDecimals: mixedDivHasDecimals,
      divDecimalPlaces: mixedDivDecimalPlaces,

      timeLimitSeconds: Math.max(0, mixedTime || 0)
    };

    onStartQuiz('mixed', settings, 'Custom Mixed Multi-Operation Challenge');
  };

  const totalMixedQuestions =
    (mixedAddSubActive ? mixedAddSubCount : 0) +
    (mixedMultActive ? mixedMultCount : 0) +
    (mixedDivActive ? mixedDivCount : 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Mode Switcher Pill */}
      <div className="flex justify-center">
        <div className="bg-white border-2 border-neutral-900 rounded-2xl p-1.5 shadow-[0_4px_0_0_#171717] flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playKeyClick();
              setArenaMode('single');
            }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              arenaMode === 'single'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>⚡ Single Operation Arena</span>
          </button>

          <button
            onClick={() => {
              sounds.playKeyClick();
              setArenaMode('mixed');
            }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              arenaMode === 'mixed'
                ? 'bg-amber-400 text-neutral-900 shadow-sm'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Flame className="w-4 h-4 fill-amber-500 text-neutral-900" />
            <span>🔥 Custom Multi-Mix Mode</span>
          </button>
        </div>
      </div>

      {/* 1. SINGLE OPERATION MODE: The 3 Boxes */}
      {arenaMode === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BOX 1: ADDITION & SUBTRACTION */}
          <div className="bg-white border-2 border-neutral-900 rounded-3xl shadow-[0_8px_0_0_#171717] p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_0_#171717]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400 border-2 border-neutral-900 shadow-[0_2px_0_0_#171717] flex items-center justify-center font-black text-xl text-neutral-900">
                    <span className="flex items-center font-bold">
                      <Plus className="w-4 h-4 -mr-1" />
                      <Minus className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                      BOX 1 • Soroban
                    </span>
                    <h3 className="text-base font-black text-neutral-900">
                      Addition & Subtraction
                    </h3>
                  </div>
                </div>
              </div>

              {/* Special Rule Note */}
              <div className="my-3 p-2 bg-amber-50 border border-amber-300 rounded-xl text-[11px] font-semibold text-neutral-800">
                <span className="font-bold text-amber-900">Rule:</span> Exactly 1 subtraction row (smaller than numbers above). '+' signs are removed!
              </div>

              {/* Inputs */}
              <div className="space-y-3 my-3">
                <div>
                  <label className="flex items-center justify-between text-xs font-black uppercase text-neutral-700 mb-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-neutral-500" />
                      Rows / Numbers:
                    </span>
                    <span className="text-neutral-400 text-[11px]">Type freely</span>
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={addSubNumbers}
                    onChange={(e) => setAddSubNumbers(parseInt(e.target.value) || 2)}
                    className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-black uppercase text-neutral-700 mb-1">
                    <span className="flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-neutral-500" />
                      Digits Count:
                    </span>
                    <span className="text-neutral-400 text-[11px]">1, 2, 3...</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={addSubDigits}
                    onChange={(e) => setAddSubDigits(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      Questions:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={addSubQuestions}
                      onChange={(e) => setAddSubQuestions(parseInt(e.target.value) || 5)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs font-black uppercase text-neutral-700 mb-1">
                      <Clock className="w-3 h-3" /> Time (Sec):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="600"
                      value={addSubTime}
                      onChange={(e) => setAddSubTime(parseInt(e.target.value) || 0)}
                      placeholder="0 = Untimed"
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                </div>

                {/* Decimals Option (البوينت والعلامة العشرية) */}
                <div className="p-3 bg-neutral-50 border-2 border-neutral-900 rounded-2xl space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg border-2 border-neutral-900 flex items-center justify-center font-black text-sm bg-amber-400 text-neutral-900 shadow-xs">
                        .
                      </div>
                      <div>
                        <span className="text-xs font-black text-neutral-900 block leading-tight">
                          Decimal Point
                        </span>
                        <span className="text-[10px] text-neutral-500 font-semibold">
                          Enable decimal numbers in questions
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={addSubHasDecimals}
                      onChange={(e) => {
                        sounds.playKeyClick();
                        setAddSubHasDecimals(e.target.checked);
                      }}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                    />
                  </label>

                  {/* Shown when approved/checked: asks for decimal places */}
                  {addSubHasDecimals && (
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span className="text-[11px] font-black text-amber-900">
                        Decimal Places:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((places) => (
                          <button
                            key={places}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setAddSubDecimalPlaces(places);
                            }}
                            className={`w-8 h-7 rounded-xl border-2 border-neutral-900 text-xs font-black cursor-pointer transition-all ${
                              addSubDecimalPlaces === places
                                ? 'bg-amber-400 text-neutral-900 shadow-[0_2px_0_0_#171717] -translate-y-0.5'
                                : 'bg-white text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {places}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-3 border-t border-neutral-200 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
                <span>Earn up to:</span>
                <span className="font-mono text-amber-600 font-black">
                  🪙 ~{addSubQuestions * (12 + (addSubDigits - 1) * 6)} Coins
                </span>
              </div>

              <button
                onClick={startAddSub}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-2xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 text-xs transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-neutral-900" />
                <span>Start Addition & Subtraction</span>
              </button>
            </div>
          </div>

          {/* BOX 2: MULTIPLICATION */}
          <div className="bg-white border-2 border-neutral-900 rounded-3xl shadow-[0_8px_0_0_#171717] p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_0_#171717]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-300 border-2 border-neutral-900 shadow-[0_2px_0_0_#171717] flex items-center justify-center font-black text-xl text-neutral-900">
                    <X className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                      BOX 2 • Times Tables
                    </span>
                    <h3 className="text-base font-black text-neutral-900">
                      Multiplication
                    </h3>
                  </div>
                </div>
              </div>

              <div className="my-3 p-2 bg-sky-50 border border-sky-300 rounded-xl text-[11px] font-semibold text-neutral-800">
                <span className="font-bold text-sky-900">Format:</span> Digits of 1st number × Digits of 2nd number (e.g. 2D × 1D, 2D × 2D).
              </div>

              <div className="space-y-3 my-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      1st Num Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={multDigits1}
                      onChange={(e) => setMultDigits1(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      2nd Num Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={multDigits2}
                      onChange={(e) => setMultDigits2(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      Questions:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={multQuestions}
                      onChange={(e) => setMultQuestions(parseInt(e.target.value) || 5)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs font-black uppercase text-neutral-700 mb-1">
                      <Clock className="w-3 h-3" /> Time (Sec):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="600"
                      value={multTime}
                      onChange={(e) => setMultTime(parseInt(e.target.value) || 0)}
                      placeholder="0 = Untimed"
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                </div>

                {/* Decimals Option for Multiplication */}
                <div className="p-3 bg-neutral-50 border-2 border-neutral-900 rounded-2xl space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg border-2 border-neutral-900 flex items-center justify-center font-black text-sm bg-sky-300 text-neutral-900 shadow-xs">
                        .
                      </div>
                      <div>
                        <span className="text-xs font-black text-neutral-900 block leading-tight">
                          Decimal Point
                        </span>
                        <span className="text-[10px] text-neutral-500 font-semibold">
                          Enable decimal numbers in multiplication
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={multHasDecimals}
                      onChange={(e) => {
                        sounds.playKeyClick();
                        setMultHasDecimals(e.target.checked);
                      }}
                      className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
                    />
                  </label>

                  {/* Shown when approved/checked: asks for decimal places */}
                  {multHasDecimals && (
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span className="text-[11px] font-black text-sky-900">
                        Decimal Places:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((places) => (
                          <button
                            key={places}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setMultDecimalPlaces(places);
                            }}
                            className={`w-8 h-7 rounded-xl border-2 border-neutral-900 text-xs font-black cursor-pointer transition-all ${
                              multDecimalPlaces === places
                                ? 'bg-sky-300 text-neutral-900 shadow-[0_2px_0_0_#171717] -translate-y-0.5'
                                : 'bg-white text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {places}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
                <span>Earn up to:</span>
                <span className="font-mono text-amber-600 font-black">
                  🪙 ~{multQuestions * (10 + (multDigits1 + multDigits2 - 2) * 6)} Coins
                </span>
              </div>

              <button
                onClick={startMult}
                className="w-full py-3 bg-sky-300 hover:bg-sky-400 border-2 border-neutral-900 rounded-2xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 text-xs transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-neutral-900" />
                <span>Start Multiplication</span>
              </button>
            </div>
          </div>

          {/* BOX 3: DIVISION */}
          <div className="bg-white border-2 border-neutral-900 rounded-3xl shadow-[0_8px_0_0_#171717] p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_0_#171717]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-300 border-2 border-neutral-900 shadow-[0_2px_0_0_#171717] flex items-center justify-center font-black text-xl text-neutral-900">
                    <Divide className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                      BOX 3 • Clean Split
                    </span>
                    <h3 className="text-base font-black text-neutral-900">
                      Division
                    </h3>
                  </div>
                </div>
              </div>

              <div className="my-3 p-2 bg-emerald-50 border border-emerald-300 rounded-xl text-[11px] font-semibold text-neutral-800">
                <span className="font-bold text-emerald-900">Clean Division:</span> Whole-integer quotients without remainders for rapid mental calculation.
              </div>

              <div className="space-y-3 my-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      Dividend Digits:
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="6"
                      value={divDividendDigits}
                      onChange={(e) => setDivDividendDigits(parseInt(e.target.value) || 2)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      Divisor Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={divDivisorDigits}
                      onChange={(e) => setDivDivisorDigits(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-base text-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                      Questions:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={divQuestions}
                      onChange={(e) => setDivQuestions(parseInt(e.target.value) || 5)}
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs font-black uppercase text-neutral-700 mb-1">
                      <Clock className="w-3 h-3" /> Time (Sec):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="600"
                      value={divTime}
                      onChange={(e) => setDivTime(parseInt(e.target.value) || 0)}
                      placeholder="0 = Untimed"
                      className="w-full px-3 py-2 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900"
                    />
                  </div>
                </div>

                {/* Decimals Option for Division */}
                <div className="p-3 bg-neutral-50 border-2 border-neutral-900 rounded-2xl space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg border-2 border-neutral-900 flex items-center justify-center font-black text-sm bg-emerald-300 text-neutral-900 shadow-xs">
                        .
                      </div>
                      <div>
                        <span className="text-xs font-black text-neutral-900 block leading-tight">
                          Decimal Point
                        </span>
                        <span className="text-[10px] text-neutral-500 font-semibold">
                          Enable exact decimal division
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={divHasDecimals}
                      onChange={(e) => {
                        sounds.playKeyClick();
                        setDivHasDecimals(e.target.checked);
                      }}
                      className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                    />
                  </label>

                  {/* Shown when approved/checked: asks for decimal places */}
                  {divHasDecimals && (
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span className="text-[11px] font-black text-emerald-900">
                        Decimal Places:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2].map((places) => (
                          <button
                            key={places}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setDivDecimalPlaces(places);
                            }}
                            className={`w-8 h-7 rounded-xl border-2 border-neutral-900 text-xs font-black cursor-pointer transition-all ${
                              divDecimalPlaces === places
                                ? 'bg-emerald-300 text-neutral-900 shadow-[0_2px_0_0_#171717] -translate-y-0.5'
                                : 'bg-white text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {places}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
                <span>Earn up to:</span>
                <span className="font-mono text-amber-600 font-black">
                  🪙 ~{divQuestions * (10 + (divDividendDigits - 1) * 7)} Coins
                </span>
              </div>

              <button
                onClick={startDiv}
                className="w-full py-3 bg-emerald-300 hover:bg-emerald-400 border-2 border-neutral-900 rounded-2xl font-black text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 text-xs transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-neutral-900" />
                <span>Start Division</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOM MULTI-MIX WORKOUT (Integrated on Main Screen) */}
      {arenaMode === 'mixed' && (
        <div className="bg-white border-2 border-neutral-900 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_0_#171717] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-neutral-900 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="font-black text-xl text-neutral-900">
                  Custom Multi-Operation Mix Builder
                </h3>
              </div>
              <p className="text-xs font-semibold text-neutral-600">
                Combine operations into one exam! Choose how many from each operation you want.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-amber-100 border border-neutral-900 px-3.5 py-1.5 rounded-xl font-mono font-black text-xs text-neutral-900">
              <span>Total: {totalMixedQuestions} Questions</span>
            </div>
          </div>

          {/* Operation Checkboxes & Inputs */}
          <div className="space-y-4">
            {/* 1. Addition & Subtraction Segment */}
            <div
              className={`p-4 rounded-2xl border-2 border-neutral-900 transition-all ${
                mixedAddSubActive ? 'bg-amber-50 shadow-[0_3px_0_0_#171717]' : 'bg-neutral-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className="flex items-center gap-2.5 cursor-pointer font-black text-sm text-neutral-900">
                  <input
                    type="checkbox"
                    checked={mixedAddSubActive}
                    onChange={(e) => setMixedAddSubActive(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-neutral-900 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                  <span>1. Addition & Subtraction (with 1 subtraction step)</span>
                </label>
                {mixedAddSubActive && (
                  <span className="text-xs font-black text-amber-700 bg-amber-200 px-2.5 py-0.5 rounded-lg border border-neutral-900">
                    Active
                  </span>
                )}
              </div>

              {mixedAddSubActive && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-200">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Questions Count:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={mixedAddSubCount}
                      onChange={(e) => setMixedAddSubCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Rows / Numbers:
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={mixedAddSubNumbers}
                      onChange={(e) => setMixedAddSubNumbers(parseInt(e.target.value) || 2)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Digits Count:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={mixedAddSubDigits}
                      onChange={(e) => setMixedAddSubDigits(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>

                  {/* Mixed AddSub Decimals Option */}
                  <div className="sm:col-span-3 pt-2 border-t border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mixedAddSubHasDecimals}
                        onChange={(e) => {
                          sounds.playKeyClick();
                          setMixedAddSubHasDecimals(e.target.checked);
                        }}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                      />
                      <span className="text-xs font-black text-neutral-800">
                        Decimal Point
                      </span>
                    </label>
                    {mixedAddSubHasDecimals && (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <span className="text-[11px] font-bold text-amber-900">Decimal Places:</span>
                        {[1, 2, 3].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setMixedAddSubDecimalPlaces(p);
                            }}
                            className={`w-7 h-6 rounded-lg border border-neutral-900 text-xs font-black cursor-pointer ${
                              mixedAddSubDecimalPlaces === p ? 'bg-amber-400 text-neutral-900 shadow-xs' : 'bg-white text-neutral-700'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Multiplication Segment */}
            <div
              className={`p-4 rounded-2xl border-2 border-neutral-900 transition-all ${
                mixedMultActive ? 'bg-sky-50 shadow-[0_3px_0_0_#171717]' : 'bg-neutral-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className="flex items-center gap-2.5 cursor-pointer font-black text-sm text-neutral-900">
                  <input
                    type="checkbox"
                    checked={mixedMultActive}
                    onChange={(e) => setMixedMultActive(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-neutral-900 text-sky-500 focus:ring-0 cursor-pointer"
                  />
                  <span>2. Multiplication</span>
                </label>
                {mixedMultActive && (
                  <span className="text-xs font-black text-sky-700 bg-sky-200 px-2.5 py-0.5 rounded-lg border border-neutral-900">
                    Active
                  </span>
                )}
              </div>

              {mixedMultActive && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-sky-200">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Questions Count:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={mixedMultCount}
                      onChange={(e) => setMixedMultCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      1st Num Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={mixedMultDigits1}
                      onChange={(e) => setMixedMultDigits1(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      2nd Num Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={mixedMultDigits2}
                      onChange={(e) => setMixedMultDigits2(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>

                  {/* Mixed Mult Decimals Option */}
                  <div className="sm:col-span-3 pt-2 border-t border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mixedMultHasDecimals}
                        onChange={(e) => {
                          sounds.playKeyClick();
                          setMixedMultHasDecimals(e.target.checked);
                        }}
                        className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                      />
                      <span className="text-xs font-black text-neutral-800">
                        Decimal Point
                      </span>
                    </label>
                    {mixedMultHasDecimals && (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <span className="text-[11px] font-bold text-sky-900">Decimal Places:</span>
                        {[1, 2, 3].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setMixedMultDecimalPlaces(p);
                            }}
                            className={`w-7 h-6 rounded-lg border border-neutral-900 text-xs font-black cursor-pointer ${
                              mixedMultDecimalPlaces === p ? 'bg-sky-300 text-neutral-900 shadow-xs' : 'bg-white text-neutral-700'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Division Segment */}
            <div
              className={`p-4 rounded-2xl border-2 border-neutral-900 transition-all ${
                mixedDivActive ? 'bg-emerald-50 shadow-[0_3px_0_0_#171717]' : 'bg-neutral-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className="flex items-center gap-2.5 cursor-pointer font-black text-sm text-neutral-900">
                  <input
                    type="checkbox"
                    checked={mixedDivActive}
                    onChange={(e) => setMixedDivActive(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-neutral-900 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span>3. Division</span>
                </label>
                {mixedDivActive && (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-200 px-2.5 py-0.5 rounded-lg border border-neutral-900">
                    Active
                  </span>
                )}
              </div>

              {mixedDivActive && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-emerald-200">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Questions Count:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={mixedDivCount}
                      onChange={(e) => setMixedDivCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Dividend Digits:
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="6"
                      value={mixedDivDividendDigits}
                      onChange={(e) => setMixedDivDividendDigits(parseInt(e.target.value) || 2)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-700 mb-1">
                      Divisor Digits:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={mixedDivDivisorDigits}
                      onChange={(e) => setMixedDivDivisorDigits(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-1.5 bg-white border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm"
                    />
                  </div>

                  {/* Mixed Div Decimals Option */}
                  <div className="sm:col-span-3 pt-2 border-t border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mixedDivHasDecimals}
                        onChange={(e) => {
                          sounds.playKeyClick();
                          setMixedDivHasDecimals(e.target.checked);
                        }}
                        className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                      />
                      <span className="text-xs font-black text-neutral-800">
                        Decimal Point
                      </span>
                    </label>
                    {mixedDivHasDecimals && (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <span className="text-[11px] font-bold text-emerald-900">Decimal Places:</span>
                        {[1, 2].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              sounds.playKeyClick();
                              setMixedDivDecimalPlaces(p);
                            }}
                            className={`w-7 h-6 rounded-lg border border-neutral-900 text-xs font-black cursor-pointer ${
                              mixedDivDecimalPlaces === p ? 'bg-emerald-300 text-neutral-900 shadow-xs' : 'bg-white text-neutral-700'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mixed Footer: Total Time Limit & Launch */}
          <div className="pt-4 border-t-2 border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-xs font-black uppercase text-neutral-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-600" />
                Combined Time Limit (Sec):
              </label>
              <input
                type="number"
                min="0"
                max="600"
                value={mixedTime}
                onChange={(e) => setMixedTime(parseInt(e.target.value) || 0)}
                placeholder="0 = Untimed"
                className="w-28 px-3 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-center"
              />
            </div>

            <button
              onClick={startMixed}
              disabled={totalMixedQuestions === 0}
              className={`w-full sm:w-auto px-8 py-3.5 border-2 border-neutral-900 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_0_0_#171717] active:translate-y-0.5 transition-all ${
                totalMixedQuestions > 0
                  ? 'bg-amber-400 hover:bg-amber-500 text-neutral-900'
                  : 'bg-neutral-200 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none'
              }`}
            >
              <Play className="w-4 h-4 fill-neutral-900" />
              <span>Launch Mixed Challenge ({totalMixedQuestions} Questions)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
