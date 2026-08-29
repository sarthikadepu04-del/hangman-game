export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category = 
  | 'Technology'
  | 'Programming'
  | 'Animals'
  | 'Countries'
  | 'Sports'
  | 'Movies'
  | 'Food'
  | 'Science'
  | 'General Knowledge';

export interface WordItem {
  id: string;
  word: string; // Stored in uppercase, letters only or with spaces/hyphens
  category: Category;
  difficulty: Difficulty;
  hint: string;
  funFact?: string;
}

export type GameStatus = 'landing' | 'selecting_difficulty' | 'playing' | 'won' | 'lost';

export interface GameScoreBreakdown {
  correctLettersScore: number;
  incorrectPenalties: number;
  wordBonus: number;
  streakBonus: number;
  difficultyMultiplier: number;
  hintPenalties: number;
  finalScore: number;
}

export interface GameState {
  currentWord: WordItem | null;
  selectedCategory: Category | 'All';
  difficulty: Difficulty;
  guessedLetters: string[]; // Uppercase letters
  incorrectGuesses: string[]; // Uppercase letters
  remainingLives: number;
  maxLives: number;
  score: number;
  currentStreak: number;
  bestStreak: number;
  status: GameStatus;
  hintsRemaining: number;
  hintsUsed: number;
  revealedHintLetters: string[];
  showHintClue: boolean;
  gameStartTime: number | null;
  gameEndTime: number | null;
  scoreBreakdown?: GameScoreBreakdown;
}

export interface DifficultyConfig {
  id: Difficulty;
  label: string;
  lives: number;
  description: string;
  badgeColor: string;
  accentColor: string;
  multiplier: number;
  maxHints: number;
}

export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number; // percentage 0-100
  bestScore: number;
  currentStreak: number;
  bestStreak: number;
  totalScoreEarned: number;
  categoryStats: Record<string, { played: number; won: number }>;
  difficultyStats: Record<Difficulty, { played: number; won: number }>;
}

export interface UserSettings {
  soundEnabled: boolean;
  hapticFeedback: boolean;
  keyboardLayout: 'qwerty' | 'alphabetical';
  autoOpenHintClue: boolean;
  selectedDifficulty: Difficulty;
}
