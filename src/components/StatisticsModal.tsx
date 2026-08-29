import React, { useState } from 'react';
import { GameStatistics } from '../types/game';
import { clearStatistics } from '../utils/storage';
import { soundFx } from '../utils/audio';
import {
  X,
  Trophy,
  Flame,
  Target,
  Gamepad2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface StatisticsModalProps {
  stats: GameStatistics;
  isOpen: boolean;
  onClose: () => void;
  onStatsUpdated: () => void;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({
  stats,
  isOpen,
  onClose,
  onStatsUpdated,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    soundFx.playClick();
    clearStatistics();
    onStatsUpdated();
    setShowResetConfirm(false);
  };

  return (
    <div
      id="statistics-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stats-modal-title"
    >
      <div
        id="statistics-modal-dialog"
        className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-stats-btn"
          type="button"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close statistics modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 id="stats-modal-title" className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              Player Statistics
            </h2>
            <p className="text-xs text-slate-400">
              Track your lifetime record and performance history
            </p>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          <div className="flex flex-col p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Played</span>
            </div>
            <span className="text-xl font-bold font-mono text-white mt-1">
              {stats.gamesPlayed}
            </span>
          </div>

          <div className="flex flex-col p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Won</span>
            </div>
            <span className="text-xl font-bold font-mono text-emerald-300 mt-1">
              {stats.gamesWon}
            </span>
          </div>

          <div className="flex flex-col p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Lost</span>
            </div>
            <span className="text-xl font-bold font-mono text-rose-400 mt-1">
              {stats.gamesLost}
            </span>
          </div>

          <div className="flex flex-col p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              <span>Win Rate</span>
            </div>
            <span className="text-xl font-bold font-mono text-sky-300 mt-1">
              {stats.gamesPlayed > 0 ? `${stats.winRate}%` : '0%'}
            </span>
          </div>
        </div>

        {/* Streaks and High Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <div className="flex flex-col p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Current Streak
            </span>
            <span className="text-2xl font-bold font-mono text-orange-300 mt-1">
              {stats.currentStreak}
            </span>
          </div>

          <div className="flex flex-col p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Best Streak
            </span>
            <span className="text-2xl font-bold font-mono text-amber-300 mt-1">
              {stats.bestStreak}
            </span>
          </div>

          <div className="flex flex-col p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Best Score
            </span>
            <span className="text-2xl font-bold font-mono text-indigo-300 mt-1">
              {stats.bestScore}
            </span>
          </div>
        </div>

        {/* Difficulty Records */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Performance By Difficulty
          </h3>
          <div className="space-y-2.5">
            {(['easy', 'medium', 'hard'] as const).map((diff) => {
              const diffData = stats.difficultyStats?.[diff] || { played: 0, won: 0 };
              const rate =
                diffData.played > 0
                  ? Math.round((diffData.won / diffData.played) * 100)
                  : 0;

              return (
                <div key={diff} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize font-medium text-slate-300">{diff}</span>
                    <span className="text-slate-400 font-mono">
                      {diffData.won} / {diffData.played} won ({rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        diff === 'easy'
                          ? 'bg-emerald-400'
                          : diff === 'medium'
                          ? 'bg-sky-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Section */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          {!showResetConfirm ? (
            <button
              id="request-reset-stats-btn"
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Statistics</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-300">Are you sure?</span>
              <button
                id="confirm-reset-stats-btn"
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1 rounded-md text-xs text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            id="close-stats-footer-btn"
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
