import React from 'react';
import { GameStatus } from '../types/game';
import {
  Volume2,
  VolumeX,
  BarChart3,
  BookOpen,
  Home,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  status: GameStatus;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenHowToPlay: () => void;
  onHome: () => void;
  onNewGame: () => void;
  onChangeDifficulty: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  soundEnabled,
  onToggleSound,
  onOpenStats,
  onOpenHowToPlay,
  onHome,
  onNewGame,
  onChangeDifficulty,
}) => {
  const isPlayingOrFinished =
    status === 'playing' || status === 'won' || status === 'lost';

  return (
    <header
      id="app-header"
      className="w-full max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between border-b border-slate-800/80 mb-3"
    >
      {/* Brand / Logo */}
      <button
        type="button"
        onClick={onHome}
        className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 21v-17h10v4" />
            <path d="M14 8h-4" />
            <circle cx="10" cy="12" r="2" />
            <path d="M10 14v4" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold font-['Outfit'] text-base tracking-tight text-white flex items-center gap-1">
            HANGMAN <span className="text-indigo-400">CHALLENGE</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:inline">
            CodeAlpha Project
          </span>
        </div>
      </button>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Game Controls when in game */}
        {isPlayingOrFinished && (
          <>
            <button
              id="header-restart-btn"
              type="button"
              onClick={onNewGame}
              title="Start New Word"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              id="header-diff-btn"
              type="button"
              onClick={onChangeDifficulty}
              title="Change Difficulty"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Sound Toggle */}
        <button
          id="header-sound-toggle-btn"
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound (Web Audio)' : 'Unmute Sound'}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            soundEnabled
              ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30'
              : 'text-slate-500 bg-slate-900/80 border-slate-800 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-indigo-400" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* How to play */}
        <button
          id="header-how-to-play-btn"
          type="button"
          onClick={() => {
            soundFx.playClick();
            onOpenHowToPlay();
          }}
          title="How to Play"
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-sky-400" />
        </button>

        {/* Statistics */}
        <button
          id="header-stats-btn"
          type="button"
          onClick={() => {
            soundFx.playClick();
            onOpenStats();
          }}
          title="Player Statistics"
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-purple-400" />
        </button>

        {/* Home button when not on landing */}
        {status !== 'landing' && (
          <button
            id="header-home-btn"
            type="button"
            onClick={onHome}
            title="Go to Home Screen"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
