import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, QuizSessionSummary, StudentRosterRecord } from '../types';
import { CHARACTERS } from '../data/characters';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isTeacher: boolean;
  login: (email: string, pass: string) => { success: boolean; message: string };
  teacherLogin: (passcode: string) => { success: boolean; message: string };
  register: (email: string, pass: string, nickname: string) => { success: boolean; message: string };
  loginGuest: () => void;
  logout: () => void;
  addCoins: (amount: number) => void;
  unlockCharacter: (characterId: string, price: number) => boolean;
  equipCharacter: (characterId: string) => void;
  saveSession: (session: QuizSessionSummary) => void;
  exportSyncCode: () => string;
  importSyncCode: (code: string) => { success: boolean; message: string };
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  // Teacher roster actions
  studentRoster: StudentRosterRecord[];
  awardStudentCoins: (studentId: string, amount: number) => void;
}

const DEFAULT_USER: UserAccount = {
  email: 'champion@kidscenter.com',
  nickname: 'Math Champion',
  role: 'student',
  coins: 450, // Welcome bonus
  unlockedCharacters: ['rookie-champ'],
  equippedCharacterId: 'rookie-champ',
  stats: {
    totalSolved: 15,
    totalCorrect: 14,
    totalCoinsEarned: 450,
    bestStreak: 8
  },
  history: []
};

// Helper to extract real registered students from localStorage (no fake mock accounts)
const loadRealStudentsRoster = (): StudentRosterRecord[] => {
  try {
    const stored = localStorage.getItem('kids_center_roster');
    let roster: StudentRosterRecord[] = stored ? JSON.parse(stored) : [];

    // Purge any legacy simulated mock students
    const fakeEmails = [
      'omar.f@kidscenter.com',
      'youssef.a@kidscenter.com',
      'mariam.k@kidscenter.com',
      'adam.t@kidscenter.com',
      'nour.d@kidscenter.com',
      'salma.h@kidscenter.com'
    ];
    const fakeIds = ['std-1', 'std-2', 'std-3', 'std-4', 'std-5', 'std-6'];
    roster = roster.filter(
      (s) =>
        !fakeEmails.includes(s.email.toLowerCase()) &&
        !fakeIds.includes(s.id) &&
        s.email.toLowerCase() !== 'teacher@kidscenter.com'
    );

    // Sync from all registered student user accounts in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('kids_center_user_')) {
        const email = key.replace('kids_center_user_', '').toLowerCase();
        if (email !== 'teacher@kidscenter.com' && !fakeEmails.includes(email)) {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const parsed: UserAccount = JSON.parse(raw);
              if (parsed.role === 'student') {
                const existingIndex = roster.findIndex((r) => r.email.toLowerCase() === parsed.email.toLowerCase());
                const record: StudentRosterRecord = {
                  id: `std-${parsed.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
                  name: parsed.nickname || parsed.email.split('@')[0],
                  email: parsed.email,
                  grade: 'Active Player',
                  coins: parsed.coins || 0,
                  totalSolved: parsed.stats?.totalSolved || 0,
                  totalCorrect: parsed.stats?.totalCorrect || 0,
                  accuracy:
                    parsed.stats && parsed.stats.totalSolved > 0
                      ? Math.round((parsed.stats.totalCorrect / parsed.stats.totalSolved) * 100)
                      : 100,
                  bestStreak: parsed.stats?.bestStreak || 0,
                  equippedCharacterId: parsed.equippedCharacterId || 'rookie-champ',
                  lastActive: 'Active Now'
                };

                if (existingIndex >= 0) {
                  roster[existingIndex] = { ...roster[existingIndex], ...record };
                } else {
                  roster.push(record);
                }
              }
            } catch {}
          }
        }
      }
    }

    localStorage.setItem('kids_center_roster', JSON.stringify(roster));
    return roster;
  } catch {
    return [];
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const activeEmail = localStorage.getItem('kids_center_active_email');
      if (activeEmail) {
        if (activeEmail.toLowerCase() === 'teacher@kidscenter.com') {
          return {
            email: 'teacher@kidscenter.com',
            nickname: 'Coach Ahmed (Teacher)',
            role: 'teacher',
            coins: 99999,
            unlockedCharacters: CHARACTERS.map(c => c.id),
            equippedCharacterId: 'messi-10',
            stats: {
              totalSolved: 999,
              totalCorrect: 999,
              totalCoinsEarned: 99999,
              bestStreak: 100
            },
            history: []
          };
        }
        const stored = localStorage.getItem(`kids_center_user_${activeEmail.toLowerCase()}`);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [studentRoster, setStudentRoster] = useState<StudentRosterRecord[]>(() => loadRealStudentsRoster());

  // Keep roster synchronized
  useEffect(() => {
    try {
      const realRoster = loadRealStudentsRoster();
      setStudentRoster(realRoster);
    } catch {}
  }, []);

  const saveUser = (updated: UserAccount) => {
    setUser(updated);
    try {
      localStorage.setItem(`kids_center_user_${updated.email}`, JSON.stringify(updated));
      localStorage.setItem('kids_center_active_email', updated.email);

      // Keep roster updated with active student
      if (updated.role === 'student') {
        setStudentRoster(prev => {
          const exists = prev.find(s => s.email === updated.email);
          let newRoster: StudentRosterRecord[];
          if (exists) {
            newRoster = prev.map(s =>
              s.email === updated.email
                ? {
                    ...s,
                    coins: updated.coins,
                    totalSolved: updated.stats.totalSolved,
                    totalCorrect: updated.stats.totalCorrect,
                    accuracy:
                      updated.stats.totalSolved > 0
                        ? Math.round((updated.stats.totalCorrect / updated.stats.totalSolved) * 100)
                        : 100,
                    bestStreak: updated.stats.bestStreak,
                    equippedCharacterId: updated.equippedCharacterId,
                    lastActive: 'Just now'
                  }
                : s
            );
          } else {
            newRoster = [
              {
                id: `std-${Date.now()}`,
                name: updated.nickname,
                email: updated.email,
                grade: 'Grade 5 - Active Player',
                coins: updated.coins,
                totalSolved: updated.stats.totalSolved,
                totalCorrect: updated.stats.totalCorrect,
                accuracy:
                  updated.stats.totalSolved > 0
                    ? Math.round((updated.stats.totalCorrect / updated.stats.totalSolved) * 100)
                    : 100,
                bestStreak: updated.stats.bestStreak,
                equippedCharacterId: updated.equippedCharacterId,
                lastActive: 'Just now'
              },
              ...prev
            ];
          }
          localStorage.setItem('kids_center_roster', JSON.stringify(newRoster));
          return newRoster;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = (email: string, pass: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    try {
      const accountsJson = localStorage.getItem('kids_center_passwords');
      const accounts: Record<string, string> = accountsJson ? JSON.parse(accountsJson) : {};

      if (!accounts[cleanEmail]) {
        return { success: false, message: 'Account not found. Please register first!' };
      }

      if (accounts[cleanEmail] !== pass) {
        return { success: false, message: 'Incorrect password.' };
      }

      const stored = localStorage.getItem(`kids_center_user_${cleanEmail}`);
      if (stored) {
        saveUser(JSON.parse(stored));
      } else {
        const newProfile: UserAccount = {
          ...DEFAULT_USER,
          email: cleanEmail,
          nickname: cleanEmail.split('@')[0]
        };
        saveUser(newProfile);
      }
      setIsAuthModalOpen(false);
      return { success: true, message: `Welcome back, ${cleanEmail}!` };
    } catch {
      return { success: false, message: 'Login error.' };
    }
  };

  const teacherLogin = (passcode: string): { success: boolean; message: string } => {
    const cleanCode = passcode.trim();
    if (cleanCode === '01068545095' || cleanCode === '1234') {
      const teacherProfile: UserAccount = {
        email: 'teacher@kidscenter.com',
        nickname: 'Coach Ahmed (Teacher)',
        role: 'teacher',
        coins: 99999,
        unlockedCharacters: CHARACTERS.map(c => c.id),
        equippedCharacterId: 'messi-10',
        stats: {
          totalSolved: 999,
          totalCorrect: 999,
          totalCoinsEarned: 99999,
          bestStreak: 100
        },
        history: []
      };
      saveUser(teacherProfile);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Teacher Portal Access Granted!' };
    }
    return { success: false, message: 'Incorrect teacher passcode!' };
  };

  const register = (email: string, pass: string, nickname: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || cleanEmail.indexOf('@') === -1) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!pass || pass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    try {
      const accountsJson = localStorage.getItem('kids_center_passwords');
      const accounts: Record<string, string> = accountsJson ? JSON.parse(accountsJson) : {};

      if (accounts[cleanEmail]) {
        return { success: false, message: 'Account already exists. Please log in.' };
      }

      accounts[cleanEmail] = pass;
      localStorage.setItem('kids_center_passwords', JSON.stringify(accounts));

      const newProfile: UserAccount = {
        email: cleanEmail,
        nickname: nickname.trim() || cleanEmail.split('@')[0],
        role: 'student',
        coins: user ? Math.max(450, user.coins) : 450,
        unlockedCharacters: ['rookie-champ'],
        equippedCharacterId: 'rookie-champ',
        stats: {
          totalSolved: 0,
          totalCorrect: 0,
          totalCoinsEarned: 450,
          bestStreak: 0
        },
        history: []
      };

      saveUser(newProfile);
      setIsAuthModalOpen(false);
      return { success: true, message: `Welcome, ${newProfile.nickname}!` };
    } catch {
      return { success: false, message: 'Registration failed.' };
    }
  };

  const loginGuest = () => {
    saveUser(DEFAULT_USER);
    localStorage.setItem('kids_center_passed_gate', 'true');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('kids_center_active_email');
    localStorage.removeItem('kids_center_passed_gate');
    setUser(null);
    setIsAuthModalOpen(false);
  };

  const addCoins = (amount: number) => {
    if (!user) return;
    saveUser({
      ...user,
      coins: Math.max(0, user.coins + amount),
      stats: {
        ...user.stats,
        totalCoinsEarned: amount > 0 ? user.stats.totalCoinsEarned + amount : user.stats.totalCoinsEarned
      }
    });
  };

  const unlockCharacter = (characterId: string, price: number): boolean => {
    if (!user) return false;
    if (user.unlockedCharacters.includes(characterId)) return true;
    if (user.coins < price) return false;

    saveUser({
      ...user,
      coins: user.coins - price,
      unlockedCharacters: [...user.unlockedCharacters, characterId],
      equippedCharacterId: characterId
    });
    return true;
  };

  const equipCharacter = (characterId: string) => {
    if (!user) return;
    if (!user.unlockedCharacters.includes(characterId)) return;
    saveUser({
      ...user,
      equippedCharacterId: characterId
    });
  };

  const saveSession = (session: QuizSessionSummary) => {
    if (!user) return;
    saveUser({
      ...user,
      coins: user.coins + session.coinsEarned,
      stats: {
        totalSolved: user.stats.totalSolved + session.totalQuestions,
        totalCorrect: user.stats.totalCorrect + session.correctAnswers,
        totalCoinsEarned: user.stats.totalCoinsEarned + session.coinsEarned,
        bestStreak: Math.max(user.stats.bestStreak, session.correctAnswers)
      },
      history: [session, ...user.history.slice(0, 19)]
    });
  };

  const exportSyncCode = (): string => {
    if (!user) return '';
    try {
      return btoa(encodeURIComponent(JSON.stringify(user)));
    } catch {
      return '';
    }
  };

  const importSyncCode = (code: string): { success: boolean; message: string } => {
    try {
      const decoded = decodeURIComponent(atob(code.trim()));
      const parsed: UserAccount = JSON.parse(decoded);
      if (!parsed.email) return { success: false, message: 'Invalid code.' };
      saveUser(parsed);
      return { success: true, message: `Loaded profile: ${parsed.nickname}` };
    } catch {
      return { success: false, message: 'Invalid code format.' };
    }
  };

  const awardStudentCoins = (studentId: string, amount: number) => {
    setStudentRoster((prev) => {
      const updated = prev.map((s) => {
        if (s.id === studentId) {
          const newCoins = s.coins + amount;
          try {
            const userKey = `kids_center_user_${s.email.toLowerCase()}`;
            const stored = localStorage.getItem(userKey);
            if (stored) {
              const u: UserAccount = JSON.parse(stored);
              u.coins = (u.coins || 0) + amount;
              u.stats = {
                ...u.stats,
                totalCoinsEarned: (u.stats?.totalCoinsEarned || 0) + amount
              };
              localStorage.setItem(userKey, JSON.stringify(u));
              if (user && user.email.toLowerCase() === s.email.toLowerCase()) {
                setUser(u);
              }
            }
          } catch {}
          return { ...s, coins: newCoins };
        }
        return s;
      });
      localStorage.setItem('kids_center_roster', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.email !== DEFAULT_USER.email,
        isTeacher: user?.role === 'teacher',
        login,
        teacherLogin,
        register,
        loginGuest,
        logout,
        addCoins,
        unlockCharacter,
        equipCharacter,
        saveSession,
        exportSyncCode,
        importSyncCode,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isAuthModalOpen,
        studentRoster,
        awardStudentCoins
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
