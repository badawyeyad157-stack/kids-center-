import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/audio';
import { X, Lock, Mail, Smartphone, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    login,
    register,
    user,
    logout,
    exportSyncCode,
    importSyncCode
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'sync'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [syncInput, setSyncInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    const res = login(email, password);
    setMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setTimeout(() => {
        setMsg(null);
        closeAuthModal();
      }, 900);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    const res = register(email, password, nickname);
    setMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setTimeout(() => {
        setMsg(null);
        closeAuthModal();
      }, 900);
    }
  };

  const handleCopySyncCode = () => {
    sounds.playKeyClick();
    const code = exportSyncCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleImportSyncCode = () => {
    sounds.playKeyClick();
    if (!syncInput.trim()) return;
    const res = importSyncCode(syncInput);
    setMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setTimeout(() => {
        setMsg(null);
        closeAuthModal();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60">
      <div className="w-full max-w-md bg-white border-3 border-neutral-900 rounded-3xl shadow-[0_12px_0_0_#171717] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-300 border-b-2 border-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-neutral-900" />
            <h3 className="font-black text-lg text-neutral-900">
              Account & Phone Sync
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playKeyClick();
              closeAuthModal();
            }}
            className="w-8 h-8 rounded-lg bg-white border-2 border-neutral-900 flex items-center justify-center font-black hover:bg-neutral-100 cursor-pointer shadow-sm"
          >
            <X className="w-4 h-4 text-neutral-900" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b-2 border-neutral-900 bg-neutral-100 text-xs font-black">
          <button
            onClick={() => {
              sounds.playKeyClick();
              setMode('login');
              setMsg(null);
            }}
            className={`flex-1 py-3 text-center border-r-2 border-neutral-900 transition-colors cursor-pointer ${
              mode === 'login' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              sounds.playKeyClick();
              setMode('register');
              setMsg(null);
            }}
            className={`flex-1 py-3 text-center border-r-2 border-neutral-900 transition-colors cursor-pointer ${
              mode === 'register' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              sounds.playKeyClick();
              setMode('sync');
              setMsg(null);
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'sync' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            📱 Phone Sync
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {msg && (
            <div
              className={`mb-4 p-3 rounded-xl border-2 border-neutral-900 text-xs font-bold ${
                msg.error ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {msg.text}
            </div>
          )}

          {/* Current user status */}
          {user && (
            <div className="mb-4 p-3 bg-neutral-50 border border-neutral-300 rounded-xl flex items-center justify-between text-xs font-semibold">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Current Player</span>
                <span className="font-black text-neutral-900">{user.nickname}</span> ({user.email})
              </div>
              <div className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-md border border-neutral-900">
                🪙 {user.coins}
              </div>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-xl font-black text-neutral-900 shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer text-sm uppercase tracking-wider transition-all"
              >
                Sign In to My Account
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Hero Nickname
                </label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Leo The Prodigy"
                  className="w-full px-3 py-2 bg-white border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 bg-white border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Create Password (min 4 chars)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-white border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <p className="text-[11px] text-neutral-600 font-medium">
                Your coins, character purchases, and customized 3D items will be linked directly to your account.
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-500 border-2 border-neutral-900 rounded-xl font-black text-neutral-900 shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer text-sm uppercase tracking-wider transition-all"
              >
                Register & Save Progress
              </button>
            </form>
          )}

          {mode === 'sync' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 border-2 border-sky-300 rounded-xl text-xs font-semibold text-neutral-700">
                Open this app on your phone, tablet, or another browser and enter your sync code below to carry over all your coins & 3D unlocked heroes!
              </div>

              {/* Export passkey */}
              <div>
                <label className="block text-xs font-black uppercase text-neutral-800 mb-1">
                  Your Account Sync Passkey:
                </label>
                <button
                  type="button"
                  onClick={handleCopySyncCode}
                  className="w-full py-2.5 px-3 bg-white border-2 border-neutral-900 rounded-xl font-bold text-xs flex items-center justify-between hover:bg-neutral-100 shadow-[0_2px_0_0_#171717] cursor-pointer"
                >
                  <span className="truncate max-w-[240px] font-mono text-neutral-600">
                    {exportSyncCode().slice(0, 32)}...
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 font-black">
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </span>
                </button>
              </div>

              {/* Import passkey */}
              <div className="pt-2 border-t border-neutral-200">
                <label className="block text-xs font-black uppercase text-neutral-800 mb-1">
                  Restore from Phone / Another Device:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={syncInput}
                    onChange={(e) => setSyncInput(e.target.value)}
                    placeholder="Paste sync code here..."
                    className="flex-1 px-3 py-2 bg-white border-2 border-neutral-900 rounded-xl font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleImportSyncCode}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs rounded-xl border-2 border-neutral-900 cursor-pointer shadow-sm active:translate-y-0.5"
                  >
                    Load
                  </button>
                </div>
              </div>
            </div>
          )}

          {user && (
            <div className="mt-5 pt-4 border-t border-neutral-200 flex justify-between items-center">
              <span className="text-xs text-neutral-500 font-semibold">Active Session</span>
              <button
                type="button"
                onClick={() => {
                  sounds.playKeyClick();
                  logout();
                  setMsg({ text: 'Logged out successfully.', error: false });
                }}
                className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
