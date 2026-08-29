import React from 'react';
import { GameStatus, WordItem } from '../types/game';
import { Lightbulb, HelpCircle, Sparkles } from 'lucide-react';

interface HintButtonProps {
  hintsRemaining: number;
  hintsUsed: number;
  showHintClue: boolean;
  currentWord: WordItem | null;
  status: GameStatus;
  onUseHint: () => void;
}

export const HintButton: React.FC<HintButtonProps> = ({
  hintsRemaining,
  showHintClue,
  currentWord,
  status,
  onUseHint,
}) => {
  const isGameActive = status === 'playing';
  const canUseHint = isGameActive && hintsRemaining > 0;

  return (
    <div id="hint-system-container" className="flex flex-col items-center gap-2.5 w-full max-w-xl mx-auto my-1">
      {/* Action button */}
      <div className="flex items-center gap-3">
        <button
          id="hint-action-button"
          type="button"
          disabled={!canUseHint}
          onClick={onUseHint}
          aria-label="Use a hint to reveal a letter (-10 points)"
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 shadow-sm ${
            canUseHint
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:border-amber-400 active:scale-95 cursor-pointer'
              : 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
          }`}
        >
          <Lightbulb
            className={`w-4 h-4 ${
              canUseHint ? 'text-amber-400 group-hover:animate-bounce' : 'text-slate-600'
            }`}
          />
          <span>
            {hintsRemaining > 0
              ? `Use Hint (${hintsRemaining} left)`
              : 'No Hints Left'}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              canUseHint
                ? 'bg-amber-400/20 text-amber-300'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            -10 pts
          </span>
        </button>
      </div>

      {/* Clue Card */}
      {showHintClue && currentWord && (
        <div
          id="revealed-hint-card"
          className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm max-w-lg w-full transition-all animate-in fade-in slide-in-from-top-1 shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-amber-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Clue Revealed
            </span>
            <p className="text-slate-300 leading-relaxed">{currentWord.hint}</p>
          </div>
        </div>
      )}
    </div>
  );
};
