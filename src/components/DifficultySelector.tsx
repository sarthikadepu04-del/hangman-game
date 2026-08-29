import React from 'react';
import { Category, Difficulty } from '../types/game';
import { CATEGORIES, DIFFICULTY_CONFIGS } from '../data/words';
import { Shield, Zap, Flame, Play, ArrowLeft, Layers } from 'lucide-react';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  selectedCategory: Category | 'All';
  onSelectDifficulty: (diff: Difficulty) => void;
  onSelectCategory: (cat: Category | 'All') => void;
  onStartGame: () => void;
  onBack: () => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  selectedCategory,
  onSelectDifficulty,
  onSelectCategory,
  onStartGame,
  onBack,
}) => {
  const difficulties: { id: Difficulty; icon: React.ReactNode }[] = [
    { id: 'easy', icon: <Shield className="w-5 h-5 text-emerald-400" /> },
    { id: 'medium', icon: <Zap className="w-5 h-5 text-sky-400" /> },
    { id: 'hard', icon: <Flame className="w-5 h-5 text-rose-400" /> },
  ];

  return (
    <div
      id="difficulty-selector-screen"
      className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-6 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Top navigation */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          id="diff-back-btn"
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Game Configuration
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white text-center tracking-tight mb-2">
        Choose Difficulty
      </h2>
      <p className="text-sm text-slate-400 text-center max-w-md mb-8">
        Select a challenge level and category before starting your word guessing run.
      </p>

      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
        {difficulties.map(({ id, icon }) => {
          const config = DIFFICULTY_CONFIGS[id];
          const isSelected = selectedDifficulty === id;

          return (
            <button
              key={id}
              id={`difficulty-card-${id}`}
              type="button"
              onClick={() => onSelectDifficulty(id)}
              className={`relative flex flex-col p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                  {icon}
                </div>
                <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  {config.multiplier}x Pts
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{config.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {config.description}
              </p>

              <div className="mt-auto pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-300">
                <span>{config.lives} Lives</span>
                <span>{config.maxHints} Hints</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Category Filter Selection */}
      <div className="w-full mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Word Category</span>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            id="cat-chip-all"
            onClick={() => onSelectCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            All Categories (Mixed)
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-chip-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Start Game Action */}
      <button
        id="start-game-btn"
        type="button"
        onClick={onStartGame}
        className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>START GAME</span>
      </button>
    </div>
  );
};
