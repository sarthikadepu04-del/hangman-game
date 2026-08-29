import { GameStatistics, UserSettings, Difficulty } from '../types/game';

const STATS_STORAGE_KEY = 'hangman_challenge_statistics_v1';
const SETTINGS_STORAGE_KEY = 'hangman_challenge_settings_v1';
const STREAK_STORAGE_KEY = 'hangman_challenge_streak_v1';

export const INITIAL_STATISTICS: GameStatistics = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  winRate: 0,
  bestScore: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalScoreEarned: 0,
  categoryStats: {},
  difficultyStats: {
    easy: { played: 0, won: 0 },
    medium: { played: 0, won: 0 },
    hard: { played: 0, won: 0 },
  },
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  soundEnabled: false, // Default sound off per requirements
  hapticFeedback: true,
  keyboardLayout: 'qwerty',
  autoOpenHintClue: false,
  selectedDifficulty: 'medium',
};

// In-memory memory fallback in case localStorage throws (e.g. strict private mode or sandboxed iframe)
const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // localStorage restricted
  }
  return memoryStore[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // localStorage restricted
  }
  memoryStore[key] = value;
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // localStorage restricted
  }
  delete memoryStore[key];
}

/**
 * Load persisted statistics
 */
export function loadStatistics(): GameStatistics {
  const raw = safeGetItem(STATS_STORAGE_KEY);
  if (!raw) return INITIAL_STATISTICS;

  try {
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATISTICS,
      ...parsed,
      difficultyStats: {
        ...INITIAL_STATISTICS.difficultyStats,
        ...(parsed.difficultyStats || {}),
      },
    };
  } catch {
    return INITIAL_STATISTICS;
  }
}

/**
 * Save updated statistics
 */
export function saveStatistics(stats: GameStatistics): void {
  const sanitized: GameStatistics = {
    ...stats,
    winRate: stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0,
  };
  safeSetItem(STATS_STORAGE_KEY, JSON.stringify(sanitized));
}

/**
 * Reset all statistics
 */
export function clearStatistics(): GameStatistics {
  safeRemoveItem(STATS_STORAGE_KEY);
  safeRemoveItem(STREAK_STORAGE_KEY);
  return INITIAL_STATISTICS;
}

/**
 * Load user settings
 */
export function loadUserSettings(): UserSettings {
  const raw = safeGetItem(SETTINGS_STORAGE_KEY);
  if (!raw) return DEFAULT_USER_SETTINGS;

  try {
    return {
      ...DEFAULT_USER_SETTINGS,
      ...JSON.parse(raw),
    };
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
}

/**
 * Save user settings
 */
export function saveUserSettings(settings: UserSettings): void {
  safeSetItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Record round outcome and update statistics safely
 */
export function recordGameResult(
  won: boolean,
  roundScore: number,
  category: string,
  difficulty: Difficulty
): { stats: GameStatistics; currentStreak: number; bestStreak: number } {
  const stats = loadStatistics();

  const gamesPlayed = stats.gamesPlayed + 1;
  const gamesWon = won ? stats.gamesWon + 1 : stats.gamesWon;
  const gamesLost = won ? stats.gamesLost : stats.gamesLost + 1;
  const winRate = Math.round((gamesWon / gamesPlayed) * 100);

  const currentStreak = won ? stats.currentStreak + 1 : 0;
  const bestStreak = Math.max(stats.bestStreak, currentStreak);
  const bestScore = Math.max(stats.bestScore, roundScore);
  const totalScoreEarned = stats.totalScoreEarned + Math.max(0, roundScore);

  // Category stats update
  const catStats = { ...(stats.categoryStats || {}) };
  const currentCat = catStats[category] || { played: 0, won: 0 };
  catStats[category] = {
    played: currentCat.played + 1,
    won: won ? currentCat.won + 1 : currentCat.won,
  };

  // Difficulty stats update
  const diffStats = { ...(stats.difficultyStats || INITIAL_STATISTICS.difficultyStats) };
  const currentDiff = diffStats[difficulty] || { played: 0, won: 0 };
  diffStats[difficulty] = {
    played: currentDiff.played + 1,
    won: won ? currentDiff.won + 1 : currentDiff.won,
  };

  const updated: GameStatistics = {
    gamesPlayed,
    gamesWon,
    gamesLost,
    winRate,
    bestScore,
    currentStreak,
    bestStreak,
    totalScoreEarned,
    categoryStats: catStats,
    difficultyStats: diffStats,
  };

  saveStatistics(updated);
  return { stats: updated, currentStreak, bestStreak };
}
