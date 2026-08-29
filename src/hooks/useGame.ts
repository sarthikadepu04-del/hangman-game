import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Category, Difficulty, GameState, WordItem } from '../types/game';
import { getRandomWord, DIFFICULTY_CONFIGS } from '../data/words';
import { soundFx } from '../utils/audio';
import {
  loadStatistics,
  loadUserSettings,
  recordGameResult,
  saveUserSettings,
} from '../utils/storage';
import { calculateGameScore } from '../utils/scoring';

export function useGame() {
  const [settings, setSettings] = useState(loadUserSettings);
  const [stats, setStats] = useState(loadStatistics);

  const [gameState, setGameState] = useState<GameState>(() => {
    const diff = settings.selectedDifficulty || 'medium';
    const config = DIFFICULTY_CONFIGS[diff];
    return {
      currentWord: null,
      selectedCategory: 'All',
      difficulty: diff,
      guessedLetters: [],
      incorrectGuesses: [],
      remainingLives: config.lives,
      maxLives: config.lives,
      score: 0,
      currentStreak: stats.currentStreak,
      bestStreak: stats.bestStreak,
      status: 'landing',
      hintsRemaining: config.maxHints,
      hintsUsed: 0,
      revealedHintLetters: [],
      showHintClue: false,
      gameStartTime: null,
      gameEndTime: null,
      scoreBreakdown: undefined,
    };
  });

  // Sync sound settings with audio synthesizer
  useEffect(() => {
    soundFx.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  const toggleSound = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      saveUserSettings(next);
      soundFx.setMuted(!next.soundEnabled);
      if (next.soundEnabled) {
        soundFx.playClick();
      }
      return next;
    });
  }, []);

  const setDifficulty = useCallback((diff: Difficulty) => {
    setSettings((prev) => {
      const next = { ...prev, selectedDifficulty: diff };
      saveUserSettings(next);
      return next;
    });
    setGameState((prev) => ({
      ...prev,
      difficulty: diff,
      maxLives: DIFFICULTY_CONFIGS[diff].lives,
      remainingLives: DIFFICULTY_CONFIGS[diff].lives,
      hintsRemaining: DIFFICULTY_CONFIGS[diff].maxHints,
    }));
  }, []);

  const setCategory = useCallback((category: Category | 'All') => {
    setGameState((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
  }, []);

  /**
   * Start a new game round
   */
  const startNewGame = useCallback(
    (overrideCategory?: Category | 'All', overrideDifficulty?: Difficulty) => {
      const categoryToUse = overrideCategory ?? gameState.selectedCategory;
      const difficultyToUse = overrideDifficulty ?? gameState.difficulty;
      const config = DIFFICULTY_CONFIGS[difficultyToUse];

      const newWord = getRandomWord(
        categoryToUse,
        difficultyToUse,
        gameState.currentWord?.id
      );

      soundFx.playClick();

      setGameState((prev) => ({
        ...prev,
        currentWord: newWord,
        selectedCategory: categoryToUse,
        difficulty: difficultyToUse,
        guessedLetters: [],
        incorrectGuesses: [],
        remainingLives: config.lives,
        maxLives: config.lives,
        score: 0,
        status: 'playing',
        hintsRemaining: config.maxHints,
        hintsUsed: 0,
        revealedHintLetters: [],
        showHintClue: false,
        gameStartTime: Date.now(),
        gameEndTime: null,
        scoreBreakdown: undefined,
      }));
    },
    [gameState.selectedCategory, gameState.difficulty, gameState.currentWord?.id]
  );

  /**
   * Letters in the target word that need to be guessed (A-Z)
   */
  const uniqueLettersInWord = useMemo(() => {
    if (!gameState.currentWord) return new Set<string>();
    const cleaned = gameState.currentWord.word.toUpperCase().replace(/[^A-Z]/g, '');
    return new Set(cleaned.split(''));
  }, [gameState.currentWord]);

  /**
   * Handle letter guess (from on-screen keyboard or physical keyboard)
   */
  const guessLetter = useCallback(
    (rawLetter: string) => {
      const letter = rawLetter.toUpperCase();

      // Ignore invalid or already guessed letters or if game is not active
      if (gameState.status !== 'playing' || !gameState.currentWord) return;
      if (!/^[A-Z]$/.test(letter)) return;
      if (gameState.guessedLetters.includes(letter)) return;

      const isCorrect = uniqueLettersInWord.has(letter);
      const newGuessedLetters = [...gameState.guessedLetters, letter];

      if (isCorrect) {
        soundFx.playCorrect();

        // Check if all unique letters are now guessed (WIN condition)
        const allLettersGuessed = Array.from(uniqueLettersInWord).every((l) =>
          newGuessedLetters.includes(l)
        );

        if (allLettersGuessed) {
          // Player won!
          const breakdown = calculateGameScore({
            correctLettersGuessedCount: newGuessedLetters.filter((l) =>
              uniqueLettersInWord.has(l)
            ).length,
            incorrectGuessesCount: gameState.incorrectGuesses.length,
            isWon: true,
            hintsUsedCount: gameState.hintsUsed,
            currentStreak: gameState.currentStreak + 1,
            difficulty: gameState.difficulty,
          });

          const { stats: updatedStats, currentStreak, bestStreak } = recordGameResult(
            true,
            breakdown.finalScore,
            gameState.currentWord.category,
            gameState.difficulty
          );

          setStats(updatedStats);
          soundFx.playWin();

          // Confetti celebration
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24'],
            });
          } catch {
            // Ignore if canvas is not ready
          }

          setGameState((prev) => ({
            ...prev,
            guessedLetters: newGuessedLetters,
            score: breakdown.finalScore,
            currentStreak,
            bestStreak,
            status: 'won',
            gameEndTime: Date.now(),
            scoreBreakdown: breakdown,
          }));
          return;
        }

        // Letter was correct but word not yet complete
        setGameState((prev) => ({
          ...prev,
          guessedLetters: newGuessedLetters,
          score: Math.max(
            0,
            prev.score +
              Math.round(10 * DIFFICULTY_CONFIGS[prev.difficulty].multiplier)
          ),
        }));
      } else {
        // Incorrect guess
        soundFx.playIncorrect();
        const newIncorrect = [...gameState.incorrectGuesses, letter];
        const newLives = gameState.remainingLives - 1;

        if (newLives <= 0) {
          // Player lost!
          const breakdown = calculateGameScore({
            correctLettersGuessedCount: newGuessedLetters.filter((l) =>
              uniqueLettersInWord.has(l)
            ).length,
            incorrectGuessesCount: newIncorrect.length,
            isWon: false,
            hintsUsedCount: gameState.hintsUsed,
            currentStreak: 0,
            difficulty: gameState.difficulty,
          });

          const { stats: updatedStats, currentStreak, bestStreak } = recordGameResult(
            false,
            breakdown.finalScore,
            gameState.currentWord.category,
            gameState.difficulty
          );

          setStats(updatedStats);
          soundFx.playLose();

          setGameState((prev) => ({
            ...prev,
            guessedLetters: newGuessedLetters,
            incorrectGuesses: newIncorrect,
            remainingLives: 0,
            score: breakdown.finalScore,
            currentStreak,
            bestStreak,
            status: 'lost',
            gameEndTime: Date.now(),
            scoreBreakdown: breakdown,
          }));
          return;
        }

        // Lost a life but still playing
        setGameState((prev) => ({
          ...prev,
          guessedLetters: newGuessedLetters,
          incorrectGuesses: newIncorrect,
          remainingLives: newLives,
          score: Math.max(0, prev.score - 5),
        }));
      }
    },
    [
      gameState.status,
      gameState.currentWord,
      gameState.guessedLetters,
      gameState.incorrectGuesses,
      gameState.remainingLives,
      gameState.hintsUsed,
      gameState.currentStreak,
      gameState.difficulty,
      uniqueLettersInWord,
    ]
  );

  /**
   * Request a hint: reveals an unguessed letter and unveils the hint description
   */
  const useHint = useCallback(() => {
    if (
      gameState.status !== 'playing' ||
      !gameState.currentWord ||
      gameState.hintsRemaining <= 0
    ) {
      return;
    }

    // Find unguessed letters in word
    const unguessed = Array.from(uniqueLettersInWord).filter(
      (l) => !gameState.guessedLetters.includes(l)
    );

    if (unguessed.length === 0) return;

    // Pick random unguessed letter
    const hintLetter = unguessed[Math.floor(Math.random() * unguessed.length)];
    soundFx.playHint();

    // Guess this letter automatically
    const newGuessedLetters = [...gameState.guessedLetters, hintLetter];
    const newHintsRemaining = gameState.hintsRemaining - 1;
    const newHintsUsed = gameState.hintsUsed + 1;
    const newRevealedHints = [...gameState.revealedHintLetters, hintLetter];

    // Check if this hint triggered the win
    const allLettersGuessed = Array.from(uniqueLettersInWord).every((l) =>
      newGuessedLetters.includes(l)
    );

    if (allLettersGuessed) {
      const breakdown = calculateGameScore({
        correctLettersGuessedCount: newGuessedLetters.filter((l) =>
          uniqueLettersInWord.has(l)
        ).length,
        incorrectGuessesCount: gameState.incorrectGuesses.length,
        isWon: true,
        hintsUsedCount: newHintsUsed,
        currentStreak: gameState.currentStreak + 1,
        difficulty: gameState.difficulty,
      });

      const { stats: updatedStats, currentStreak, bestStreak } = recordGameResult(
        true,
        breakdown.finalScore,
        gameState.currentWord.category,
        gameState.difficulty
      );

      setStats(updatedStats);
      soundFx.playWin();

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback ignore
      }

      setGameState((prev) => ({
        ...prev,
        guessedLetters: newGuessedLetters,
        hintsRemaining: newHintsRemaining,
        hintsUsed: newHintsUsed,
        revealedHintLetters: newRevealedHints,
        showHintClue: true,
        score: breakdown.finalScore,
        currentStreak,
        bestStreak,
        status: 'won',
        gameEndTime: Date.now(),
        scoreBreakdown: breakdown,
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      guessedLetters: newGuessedLetters,
      hintsRemaining: newHintsRemaining,
      hintsUsed: newHintsUsed,
      revealedHintLetters: newRevealedHints,
      showHintClue: true,
      score: Math.max(0, prev.score - 10),
    }));
  }, [
    gameState.status,
    gameState.currentWord,
    gameState.hintsRemaining,
    gameState.hintsUsed,
    gameState.guessedLetters,
    gameState.revealedHintLetters,
    gameState.incorrectGuesses,
    gameState.currentStreak,
    gameState.difficulty,
    uniqueLettersInWord,
  ]);

  /**
   * Listen to global physical keyboard inputs
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture inputs if user is focusing an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }

      if (e.key === 'Escape') {
        return;
      }

      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter) && gameState.status === 'playing') {
        e.preventDefault();
        guessLetter(letter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.status, guessLetter]);

  const goToLanding = useCallback(() => {
    soundFx.playClick();
    setGameState((prev) => ({
      ...prev,
      status: 'landing',
    }));
  }, []);

  const goToDifficultySelect = useCallback(() => {
    soundFx.playClick();
    setGameState((prev) => ({
      ...prev,
      status: 'selecting_difficulty',
    }));
  }, []);

  const refreshStats = useCallback(() => {
    setStats(loadStatistics());
  }, []);

  return {
    gameState,
    settings,
    stats,
    toggleSound,
    setDifficulty,
    setCategory,
    startNewGame,
    guessLetter,
    useHint,
    goToLanding,
    goToDifficultySelect,
    refreshStats,
  };
}
