/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthGate } from './components/AuthGate';
import { CinematicIntroSplash } from './components/CinematicIntroSplash';
import { Navbar, AppNavTab } from './components/Navbar';
import { MathTrainingArena } from './components/MathTrainingArena';
import { ActiveQuizPlayer } from './components/ActiveQuizPlayer';
import { QuizSummaryModal } from './components/QuizSummaryModal';
import { CharacterLockerStore } from './components/CharacterLockerStore';
import { TeacherPortal } from './components/TeacherPortal';
import { StatsHistoryView } from './components/StatsHistoryView';
import { BallonDorVault } from './components/BallonDorVault';
import { StudentLeaderboard } from './components/StudentLeaderboard';
import { AnimatedMathBackground } from './components/AnimatedMathBackground';
import { AuthModal } from './components/AuthModal';
import {
  AddSubSettings,
  MultiplicationSettings,
  DivisionSettings,
  MixedSettings,
  MathProblem,
  QuizSessionSummary
} from './types';
import { generateQuizProblems } from './utils/mathGenerator';
import { sounds } from './utils/audio';

function MainAppContent() {
  const { user, saveSession, isTeacher, logout } = useAuth();

  // Authentication gate state: persists cleanly across page reloads
  const [hasPassedAuthGate, setHasPassedAuthGate] = useState<boolean>(() => {
    const passed = localStorage.getItem('kids_center_passed_gate') === 'true';
    const email = localStorage.getItem('kids_center_active_email');
    return passed && !!email;
  });

  // Only reset if active email is gone or user explicitly logs out
  useEffect(() => {
    const email = localStorage.getItem('kids_center_active_email');
    if (!user && !email) {
      setHasPassedAuthGate(false);
    }
  }, [user]);

  // 5-second entrance splash state
  const [showCinematicSplash, setShowCinematicSplash] = useState<boolean>(() => {
    return localStorage.getItem('kids_center_saw_splash') !== 'true';
  });

  const [activeTab, setActiveTab] = useState<AppNavTab>('training');

  // Quiz state
  const [activeQuizProblems, setActiveQuizProblems] = useState<MathProblem[] | null>(null);
  const [activeQuizTitle, setActiveQuizTitle] = useState<string>('');
  const [activeQuizTime, setActiveQuizTime] = useState<number>(0);
  const [currentSessionSummary, setCurrentSessionSummary] = useState<QuizSessionSummary | null>(null);

  const handleAuthGateSuccess = () => {
    setHasPassedAuthGate(true);
    localStorage.setItem('kids_center_passed_gate', 'true');
    // Trigger 5-second intro splash
    setShowCinematicSplash(true);
  };

  const handleCinematicSplashComplete = () => {
    setShowCinematicSplash(false);
    localStorage.setItem('kids_center_saw_splash', 'true');
  };

  const startQuiz = (
    type: 'add-sub' | 'multiplication' | 'division' | 'mixed',
    settings: AddSubSettings | MultiplicationSettings | DivisionSettings | MixedSettings,
    categoryName: string
  ) => {
    const problems = generateQuizProblems(type, settings);
    setActiveQuizProblems(problems);
    setActiveQuizTitle(categoryName);
    setActiveQuizTime(settings.timeLimitSeconds || 0);
  };

  const handleFinishQuiz = (summary: QuizSessionSummary) => {
    saveSession(summary);
    setCurrentSessionSummary(summary);
    setActiveQuizProblems(null);
  };

  const handleExitQuiz = () => {
    setActiveQuizProblems(null);
  };

  const handlePlayAgainFromSummary = () => {
    if (!currentSessionSummary) return;
    const firstType = currentSessionSummary.problems[0]?.type || 'add-sub';
    const settings = {
      numbersCount: 3,
      digitsCount: 2,
      digits1: 2,
      digits2: 1,
      dividendDigits: 3,
      divisorDigits: 1,
      questionCount: currentSessionSummary.totalQuestions,
      timeLimitSeconds: currentSessionSummary.timeSpentSeconds
    };
    const newProblems = generateQuizProblems(firstType as any, settings as any);
    setCurrentSessionSummary(null);
    setActiveQuizProblems(newProblems);
    setActiveQuizTime(settings.timeLimitSeconds);
  };

  const handleGoToLockerFromSummary = () => {
    setCurrentSessionSummary(null);
    setActiveTab('locker');
  };

  // 1. Initial Login Gate Before Site Access (Strict: shown if not logged in or after logout)
  if (!hasPassedAuthGate || !user) {
    return <AuthGate onSuccess={handleAuthGateSuccess} />;
  }

  // 2. The 5-Second Cinematic Entrance Splash (disappears after 5 seconds!)
  if (showCinematicSplash) {
    return <CinematicIntroSplash onComplete={handleCinematicSplashComplete} />;
  }

  // 3. TEACHER-ONLY DEDICATED VIEW (Shown strictly when user is teacher, no student tabs)
  if (isTeacher) {
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col font-sans selection:bg-amber-300 selection:text-neutral-900 pb-12 relative animate-in fade-in duration-300">
        <AnimatedMathBackground />

        {/* Dedicated Teacher Top Navigation Bar */}
        <header className="sticky top-2 z-40 w-full px-2 py-1">
          <div className="w-[94%] sm:w-[88%] md:w-[82%] max-w-6xl mx-auto bg-neutral-900 border-3 border-neutral-900 text-white shadow-[0_6px_0_0_#000000] rounded-3xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-neutral-900 flex items-center justify-center font-black text-2xl text-neutral-900 shadow-sm">
                👨‍🏫
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white leading-none">
                    Kids Center Pro Games
                  </h1>
                  <span className="px-2 py-0.5 bg-amber-400 text-neutral-900 rounded font-black text-[10px] uppercase">
                    Teacher Mode
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-400">
                  Coach Portal • Real Live Student Accuracy & Stats Monitor
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playKeyClick();
                  logout();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white border-2 border-neutral-900 rounded-xl text-xs font-black cursor-pointer shadow-[0_2px_0_0_#000000] active:translate-y-0.5 transition-all flex items-center gap-1.5"
                title="Log Out and return to initial login screen"
              >
                <span>🚪 Log Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dedicated Teacher Portal View ONLY */}
        <main className="w-[94%] sm:w-[88%] md:w-[82%] max-w-6xl mx-auto mt-4 flex-1 relative z-10">
          <TeacherPortal />
        </main>
      </div>
    );
  }

  // 4. STUDENT PLATFORM (With Animated Math Background & All 5 Tabs)
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-amber-300 selection:text-neutral-900 pb-32 sm:pb-36 relative animate-in fade-in duration-300">
      {/* Animated Moving Mathematical Particles & Ambient Orbs Background */}
      <AnimatedMathBackground />

      {/* 80% Width Navbar with Animated Shimmer Line */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="w-[94%] sm:w-[88%] md:w-[82%] max-w-6xl mx-auto mt-4 flex-1 relative z-10">
        {/* If Active Quiz is Running */}
        {activeQuizProblems ? (
          <ActiveQuizPlayer
            problems={activeQuizProblems}
            categoryTitle={activeQuizTitle}
            timeLimitTotalSeconds={activeQuizTime}
            onFinishQuiz={handleFinishQuiz}
            onExit={handleExitQuiz}
          />
        ) : (
          <>
            {/* 1. Math Training Arena */}
            {activeTab === 'training' && <MathTrainingArena onStartQuiz={startQuiz} />}

            {/* 2. Harry Kane Ballon d'Or Vault (20,000 Coins) */}
            {activeTab === 'kane-vault' && (
              <BallonDorVault onGoToArena={() => setActiveTab('training')} />
            )}

            {/* 3. Student Leaderboard (Hall of Fame) */}
            {activeTab === 'leaderboard' && <StudentLeaderboard />}

            {/* 4. 50 3D Roblox Heroes Locker */}
            {activeTab === 'locker' && <CharacterLockerStore />}

            {/* 5. Personal Stats History */}
            {activeTab === 'history' && <StatsHistoryView />}
          </>
        )}
      </main>

      {/* Quiz Completion Summary Modal */}
      {currentSessionSummary && (
        <QuizSummaryModal
          summary={currentSessionSummary}
          onPlayAgain={handlePlayAgainFromSummary}
          onGoToLocker={handleGoToLockerFromSummary}
        />
      )}

      {/* Profile & Device Sync Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
