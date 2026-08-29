import { Difficulty, GameScoreBreakdown } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/words';

export const SCORE_POINTS = {
  CORRECT_LETTER: 10,
  INCORRECT_PENALTY: 5,
  SOLVE_WORD_BONUS: 50,
  HINT_PENALTY: 10,
  STREAK_BONUS_PER_LEVEL: 10,
};

/**
 * Calculate dynamic score breakdown and total for a completed game
 */
export function calculateGameScore(params: {
  correctLettersGuessedCount: number;
  incorrectGuessesCount: number;
  isWon: boolean;
  hintsUsedCount: number;
  currentStreak: number;
  difficulty: Difficulty;
}): GameScoreBreakdown {
  const {
    correctLettersGuessedCount,
    incorrectGuessesCount,
    isWon,
    hintsUsedCount,
    currentStreak,
    difficulty,
  } = params;

  const config = DIFFICULTY_CONFIGS[difficulty];
  const difficultyMultiplier = config?.multiplier || 1.0;

  const correctLettersScore = correctLettersGuessedCount * SCORE_POINTS.CORRECT_LETTER;
  const incorrectPenalties = incorrectGuessesCount * SCORE_POINTS.INCORRECT_PENALTY;
  const wordBonus = isWon ? SCORE_POINTS.SOLVE_WORD_BONUS : 0;
  // Streak bonus applies on win for each active streak point
  const streakBonus = isWon ? Math.min(currentStreak * SCORE_POINTS.STREAK_BONUS_PER_LEVEL, 100) : 0;
  const hintPenalties = hintsUsedCount * SCORE_POINTS.HINT_PENALTY;

  const rawSubtotal = correctLettersScore + wordBonus + streakBonus - incorrectPenalties - hintPenalties;
  const multiplied = Math.round(Math.max(0, rawSubtotal) * difficultyMultiplier);

  return {
    correctLettersScore,
    incorrectPenalties,
    wordBonus,
    streakBonus,
    difficultyMultiplier,
    hintPenalties,
    finalScore: Math.max(0, multiplied),
  };
}
