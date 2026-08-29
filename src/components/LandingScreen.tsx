import React from 'react';
import { GameStatistics } from '../types/game';
import { Play, BookOpen, BarChart3, Trophy, Flame, Target, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  stats: GameStatistics;
  onPlayGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenStatistics: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  stats,
  onPlayGame,
  onOpenHowToPlay,
  onOpenStatistics,
}) => {
  return (
    <div
      id="landing-screen"
      className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 py-8 text-center animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Decorative Brand Emblem */}
      <div className="relative mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/10">
          <svg
            viewBox="0 0 64 64"
            className="w-12 h-12 stroke-indigo-400 fill-none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 56 L52 56" className="stroke-slate-700" />
            <path d="M22 56 L22 10 L44 10 L44 20" />
            <circle cx="44" cy="27" r="7" className="stroke-sky-300 fill-sky-400/20" />
            <path d="M44 34 L44 46" className="stroke-sky-300" />
            <path d="M44 38 L36 44" className="stroke-sky-300" />
            <path d="M44 38 L52 44" className="stroke-sky-300" />
          </svg>
        </div>
        <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white uppercase tracking-wider shadow-md">
          v1.0
        </div>
      </div>

      {/* Hero Title & Tagline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Outfit'] text-white tracking-tight mb-2">
        HANGMAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">CHALLENGE</span>
      </h1>
      <p className="text-base sm:text-lg text-slate-300 font-medium tracking-wide mb-8">
        &ldquo;Guess the word. Beat the streak.&rdquo;
      </p>

      {/* Mini Stats Summary Pill */}
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-md mb-8 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-0.5">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Best Score</span>
          </div>
          <span className="text-lg font-bold font-mono text-white">
            {stats.bestScore}
          </span>
        </div>

        <div className="flex flex-col items-center border-x border-slate-800">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-0.5">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>Best Streak</span>
          </div>
          <span className="text-lg font-bold font-mono text-orange-300">
            {stats.bestStreak}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-0.5">
            <Target className="w-3 h-3 text-emerald-400" />
            <span>Win Rate</span>
          </div>
          <span className="text-lg font-bold font-mono text-emerald-400">
            {stats.gamesPlayed > 0 ? `${stats.winRate}%` : '--'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          id="landing-play-btn"
          type="button"
          onClick={onPlayGame}
          className="group flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-98 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white group-hover:translate-x-0.5 transition-transform" />
          <span>PLAY GAME</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            id="landing-how-to-play-btn"
            type="button"
            onClick={onOpenHowToPlay}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>How to Play</span>
          </button>

          <button
            id="landing-stats-btn"
            type="button"
            onClick={onOpenStatistics}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>Statistics</span>
          </button>
        </div>
      </div>

      {/* CodeAlpha Project Tag */}
      <div className="mt-10 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400/70" />
        <span>CodeAlpha Internship Project • Vercel Ready</span>
      </div>
    </div>
  );
};
