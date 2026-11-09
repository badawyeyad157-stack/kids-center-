import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/audio';
import { MathRobloxLogo } from './MathRobloxLogo';
import { Lock, Mail, User, ArrowRight, GraduationCap, Eye, EyeOff, Sparkles, KeyRound } from 'lucide-react';

interface AuthGateProps {
  onSuccess: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onSuccess }) => {
  const { login, register, teacherLogin, loginGuest } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'teacher'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [teacherPasscode, setTeacherPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = login(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg(res.message);
      sounds.playCorrect();
      setTimeout(onSuccess, 500);
    }
  };

  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = register(email, password, nickname);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg(res.message);
      sounds.playCorrect();
      setTimeout(onSuccess, 500);
    }
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = teacherLogin(teacherPasscode);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg('Teacher Portal Access Granted!');
      sounds.playUnlock();
      setTimeout(onSuccess, 500);
    }
  };

  const handleGuestQuickStart = () => {
    sounds.playKeyClick();
    loginGuest();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
      {/* Background Cyber Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 right-1/4 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white border-3 border-neutral-900 rounded-3xl shadow-[0_16px_0_0_#171717] overflow-hidden flex flex-col relative z-10 my-4 animate-in zoom-in-95 duration-200">
        {/* Animated Top Gradient Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-rose-500 to-yellow-400" />

        {/* Card Header with MathRobloxLogo */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-amber-50 to-white text-center border-b-2 border-neutral-200">
          <div className="flex justify-center mb-2">
            <MathRobloxLogo size="xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
            Kids Center <span className="text-amber-600">Pro Games</span>
          </h1>
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
            50 Football Stars • 15 Ballon d'Or Legends • Mental Math
          </p>
        </div>

        {/* Mode Switcher Tabs (All in English) */}
        <div className="grid grid-cols-3 border-b-2 border-neutral-900 bg-neutral-100 text-xs font-black">
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-3 text-center transition-all cursor-pointer border-r border-neutral-300 ${
              authMode === 'login'
                ? 'bg-white text-neutral-900 shadow-sm border-b-2 border-b-amber-400'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-3 text-center transition-all cursor-pointer border-r border-neutral-300 ${
              authMode === 'register'
                ? 'bg-white text-neutral-900 shadow-sm border-b-2 border-b-amber-400'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('teacher');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-3 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'teacher'
                ? 'bg-neutral-900 text-amber-400 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-7 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-100 border-2 border-neutral-900 rounded-2xl text-xs font-black text-rose-950 flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-100 border-2 border-neutral-900 rounded-2xl text-xs font-black text-emerald-950 flex items-center gap-2">
              <span>🎉</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Student Login Form */}
          {authMode === 'login' && (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Student Email:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@kidscenter.com"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Password:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-2xl font-black text-sm uppercase tracking-wider text-neutral-900 cursor-pointer shadow-[0_4px_0_0_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Enter Math Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2. Create Account Form */}
          {authMode === 'register' && (
            <form onSubmit={handleStudentRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Player Nickname:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. Math Ace Omar or Lightning Sarah"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@kidscenter.com"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Password:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-2xl text-[11px] font-bold text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Instantly receive 450 Bonus Coins + Free Bloxy Prodigy Hero!</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-500 border-2 border-neutral-900 rounded-2xl font-black text-sm uppercase tracking-wider text-neutral-900 cursor-pointer shadow-[0_4px_0_0_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Create Account & Start Playing 🚀</span>
              </button>
            </form>
          )}

          {/* 3. Teacher Access Passcode Form */}
          {authMode === 'teacher' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div className="p-3 bg-neutral-900 text-amber-300 border-2 border-neutral-900 rounded-2xl text-xs font-bold leading-relaxed">
                👨‍🏫 <span className="font-black text-white">Private Teacher Portal:</span> Monitor live student performance, question accuracy, streaks, and award bonus homework tokens.
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Secret Teacher Passcode:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={teacherPasscode}
                    onChange={(e) => setTeacherPasscode(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 focus:bg-white border-2 border-neutral-900 rounded-2xl font-mono font-bold text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border-2 border-neutral-900 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer shadow-[0_4px_0_0_#171717] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Access Teacher Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Guest Start Divider */}
          <div className="pt-2 border-t border-neutral-200">
            <button
              type="button"
              onClick={handleGuestQuickStart}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-900 rounded-2xl text-xs font-black text-neutral-800 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>🎮 Quick Demo Access (Guest Mode)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
