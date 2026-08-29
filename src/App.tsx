import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { DifficultySelector } from './components/DifficultySelector';
import { HangmanDrawing } from './components/HangmanDrawing';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { ScoreBoard } from './components/ScoreBoard';
import { HintButton } from './components/HintButton';
import { GameOverModal } from './components/GameOverModal';
import { StatisticsModal } from './components/StatisticsModal';
import { HowToPlayModal } from './components/HowToPlayModal';

export default function App() {
  const {
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
  } = useGame();

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  const isGameOver = gameState.status === 'won' || gameState.status === 'lost';

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header bar */}
      <Header
        status={gameState.status}
        soundEnabled={settings.soundEnabled}
        onToggleSound={toggleSound}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onHome={goToLanding}
        onNewGame={() => startNewGame()}
        onChangeDifficulty={goToDifficultySelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 w-full max-w-5xl mx-auto">
        {/* VIEW 1: LANDING SCREEN */}
        {gameState.status === 'landing' && (
          <LandingScreen
            stats={stats}
            onPlayGame={goToDifficultySelect}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenStatistics={() => setIsStatsOpen(true)}
          />
        )}

        {/* VIEW 2: DIFFICULTY & CATEGORY SELECTION */}
        {gameState.status === 'selecting_difficulty' && (
          <DifficultySelector
            selectedDifficulty={gameState.difficulty}
            selectedCategory={gameState.selectedCategory}
            onSelectDifficulty={setDifficulty}
            onSelectCategory={setCategory}
            onStartGame={() => startNewGame()}
            onBack={goToLanding}
          />
        )}

        {/* VIEW 3: ACTIVE GAMEPLAY & ROUND RESULTS */}
        {(gameState.status === 'playing' || isGameOver) && (
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full animate-in fade-in duration-300">
            {/* Top Score and Streak Bar */}
            <ScoreBoard
              score={gameState.score}
              currentStreak={gameState.currentStreak}
              bestStreak={gameState.bestStreak}
              remainingLives={gameState.remainingLives}
              maxLives={gameState.maxLives}
              difficulty={gameState.difficulty}
            />

            {/* Main Stage Grid (Left: Hangman SVG, Right: Word & Keyboard) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-center justify-center">
              {/* Left Column: Hangman Illustration */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <HangmanDrawing
                  maxLives={gameState.maxLives}
                  remainingLives={gameState.remainingLives}
                  status={gameState.status}
                />
              </div>

              {/* Right Column: Word Slots, Clues, and Virtual Keyboard */}
              <div className="lg:col-span-7 flex flex-col items-center w-full gap-3 sm:gap-4">
                {/* Word Display with letter slots */}
                <WordDisplay
                  currentWord={gameState.currentWord}
                  guessedLetters={gameState.guessedLetters}
                  revealedHintLetters={gameState.revealedHintLetters}
                  status={gameState.status}
                  selectedCategory={gameState.selectedCategory}
                />

                {/* Hint Button & Clue Card */}
                <HintButton
                  hintsRemaining={gameState.hintsRemaining}
                  hintsUsed={gameState.hintsUsed}
                  showHintClue={gameState.showHintClue}
                  currentWord={gameState.currentWord}
                  status={gameState.status}
                  onUseHint={useHint}
                />

                {/* On-screen Keyboard */}
                <Keyboard
                  guessedLetters={gameState.guessedLetters}
                  incorrectGuesses={gameState.incorrectGuesses}
                  onGuess={guessLetter}
                  status={gameState.status}
                  layout={settings.keyboardLayout}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-900/80 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>Hangman Challenge • CodeAlpha Internship</span>
          <span className="hidden sm:inline">•</span>
          <span>Web Audio API Synthesizer</span>
          <span className="hidden sm:inline">•</span>
          <span>Vercel Deployable</span>
        </div>
      </footer>

      {/* MODALS */}
      {/* Game Over Dialog (Won / Lost) */}
      {isGameOver && (
        <GameOverModal
          status={gameState.status === 'won' ? 'won' : 'lost'}
          word={gameState.currentWord}
          score={gameState.score}
          currentStreak={gameState.currentStreak}
          bestStreak={gameState.bestStreak}
          difficulty={gameState.difficulty}
          scoreBreakdown={gameState.scoreBreakdown}
          onPlayAgain={() => startNewGame()}
          onChangeDifficulty={goToDifficultySelect}
          onHome={goToLanding}
        />
      )}

      {/* Statistics Modal */}
      <StatisticsModal
        stats={stats}
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        onStatsUpdated={refreshStats}
      />

      {/* How To Play Guide Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
}
