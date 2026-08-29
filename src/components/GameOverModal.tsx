import React from 'react';
import { Difficulty, GameScoreBreakdown, WordItem } from '../types/game';
import { Trophy, RefreshCw, Home, Sliders, Flame, Sparkles, AlertCircle } from 'lucide-react';

interface GameOverModalProps {
  status: 'won' | 'lost';
  word: WordItem | null;
  score: number;
  currentStreak: number;
  bestStreak: number;
  difficulty: Difficulty;
  scoreBreakdown?: GameScoreBreakdown;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  word,
  score,
  currentStreak,
  bestStreak,
  scoreBreakdown,
  onPlayAgain,
  onChangeDifficulty,
  onHome,
}) => {
  const isWon = status === 'won';

  return (
    <div
      id="game-over-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-over-title"
    >
      <div
        id="game-over-dialog"
        className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center"
      >
        {/* Outcome Header Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${
            isWon
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {isWon ? (
            <Trophy className="w-8 h-8 animate-bounce" />
          ) : (
            <AlertCircle className="w-8 h-8" />
          )}
        </div>

        {/* Title */}
        <h2
          id="game-over-title"
          className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white tracking-tight mb-1"
        >
          {isWon ? '🎉 YOU WON!' : 'GAME OVER'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-5">
          {isWon
            ? 'Impressive vocabulary and deduction skills!'
            : 'You ran out of lives this time. Keep practicing!'}
        </p>

        {/* Revealed Word Showcase */}
        {word && (
          <div className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              The Word Was
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-widest text-indigo-300 block mb-1">
              {word.word}
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium text-slate-400 bg-slate-900 border border-slate-800">
              {word.category}
            </span>
            {word.funFact && (
              <p className="text-xs text-slate-400 mt-2.5 pt-2 border-t border-slate-800/60 italic text-left">
                💡 <span className="text-slate-300">{word.funFact}</span>
              </p>
            )}
          </div>
        )}

        {/* Score & Streak Summary */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Final Score</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5">
              {score}
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Flame
                className={`w-3 h-3 ${
                  currentStreak > 0 ? 'text-orange-400' : 'text-slate-600'
                }`}
              />
              <span>Streak</span>
            </div>
            <span
              className={`text-2xl font-bold font-mono mt-0.5 ${
                currentStreak > 0 ? 'text-orange-300' : 'text-slate-500'
              }`}
            >
              {currentStreak}
              <span className="text-xs text-slate-500 font-normal ml-1">
                (Best: {bestStreak})
              </span>
            </span>
          </div>
        </div>

        {/* Detailed Score Breakdown if won */}
        {isWon && scoreBreakdown && (
          <div className="w-full p-3 mb-6 rounded-xl bg-slate-950/40 border border-slate-800/60 text-left text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Correct Letters:</span>
              <span className="text-slate-200 font-mono">+{scoreBreakdown.correctLettersScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Word Solved Bonus:</span>
              <span className="text-slate-200 font-mono">+{scoreBreakdown.wordBonus}</span>
            </div>
            {scoreBreakdown.streakBonus > 0 && (
              <div className="flex justify-between text-orange-400">
                <span>Streak Bonus:</span>
                <span className="font-mono">+{scoreBreakdown.streakBonus}</span>
              </div>
            )}
            {scoreBreakdown.incorrectPenalties > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Mistakes Penalty:</span>
                <span className="font-mono">-{scoreBreakdown.incorrectPenalties}</span>
              </div>
            )}
            {scoreBreakdown.hintPenalties > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Hints Used:</span>
                <span className="font-mono">-{scoreBreakdown.hintPenalties}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-slate-800 font-semibold text-indigo-300">
              <span>Difficulty Multiplier:</span>
              <span className="font-mono">{scoreBreakdown.difficultyMultiplier}x</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            id="modal-play-again-btn"
            type="button"
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-98 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isWon ? 'PLAY AGAIN' : 'TRY AGAIN'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              id="modal-change-diff-btn"
              type="button"
              onClick={onChangeDifficulty}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Difficulty</span>
            </button>

            <button
              id="modal-home-btn"
              type="button"
              onClick={onHome}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
