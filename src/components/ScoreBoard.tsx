import React from 'react';
import { Difficulty } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/words';
import { Flame, Trophy, Heart, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  currentStreak: number;
  bestStreak: number;
  remainingLives: number;
  maxLives: number;
  difficulty: Difficulty;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  currentStreak,
  bestStreak,
  remainingLives,
  maxLives,
  difficulty,
}) => {
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div
      id="game-scoreboard"
      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-2xl mx-auto"
    >
      {/* Score Tile */}
      <div
        id="stat-tile-score"
        className="flex flex-col p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Score</span>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {score}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">
            pts
          </span>
        </div>
      </div>

      {/* Current Streak */}
      <div
        id="stat-tile-streak"
        className="flex flex-col p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Streak</span>
          <Flame
            className={`w-3.5 h-3.5 ${
              currentStreak > 0
                ? 'text-orange-400 animate-pulse'
                : 'text-slate-600'
            }`}
          />
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span
            className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${
              currentStreak > 0 ? 'text-orange-300' : 'text-slate-400'
            }`}
          >
            {currentStreak}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            (Best: {bestStreak})
          </span>
        </div>
      </div>

      {/* Lives Gauge */}
      <div
        id="stat-tile-lives"
        className="flex flex-col p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Lives</span>
          <Heart
            className={`w-3.5 h-3.5 ${
              remainingLives <= 2 ? 'text-rose-500 animate-ping' : 'text-rose-400'
            }`}
          />
        </div>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: maxLives }).map((_, idx) => {
            const isAlive = idx < remainingLives;
            return (
              <span
                key={`life-heart-${idx}`}
                className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  isAlive
                    ? 'bg-rose-500 shadow-sm shadow-rose-500/50 scale-100'
                    : 'bg-slate-800 border border-slate-700 scale-75 opacity-40'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Difficulty & Multiplier */}
      <div
        id="stat-tile-difficulty"
        className="flex flex-col p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Mode</span>
          <Trophy className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-sm sm:text-base font-bold text-slate-200">
            {diffConfig.label}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {diffConfig.multiplier}x
          </span>
        </div>
      </div>
    </div>
  );
};
