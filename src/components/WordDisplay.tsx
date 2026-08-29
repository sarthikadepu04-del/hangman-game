import React from 'react';
import { Category, GameStatus, WordItem } from '../types/game';
import { Tag, Sparkles } from 'lucide-react';

interface WordDisplayProps {
  currentWord: WordItem | null;
  guessedLetters: string[];
  revealedHintLetters: string[];
  status: GameStatus;
  selectedCategory: Category | 'All';
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  currentWord,
  guessedLetters,
  revealedHintLetters,
  status,
}) => {
  if (!currentWord) return null;

  const rawWord = currentWord.word.toUpperCase();
  const wordsInPhrase = rawWord.split(' ');
  const isGameOver = status === 'won' || status === 'lost';
  const isLost = status === 'lost';

  return (
    <div id="word-display-container" className="flex flex-col items-center gap-3 w-full my-2">
      {/* Category and Clue Header */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          {currentWord.category}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800">
          {rawWord.replace(/[^A-Z]/g, '').length} Letters
        </span>
      </div>

      {/* Word Letter Slots (Responsive wrap for multi-word phrases) */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 max-w-full px-2 py-3">
        {wordsInPhrase.map((wordChunk, wordIdx) => (
          <div key={`word-chunk-${wordIdx}`} className="flex items-center gap-1.5 sm:gap-2">
            {wordChunk.split('').map((char, charIdx) => {
              const isLetter = /^[A-Z]$/.test(char);
              const isGuessed = guessedLetters.includes(char);
              const isHinted = revealedHintLetters.includes(char);

              // Non-alphabetic character (e.g. apostrophe, hyphen)
              if (!isLetter) {
                return (
                  <span
                    key={`non-char-${charIdx}`}
                    className="w-5 text-center text-xl sm:text-2xl font-mono text-slate-400"
                  >
                    {char}
                  </span>
                );
              }

              // Normal letter tile
              const showLetter = isGuessed || isGameOver;
              const isMissedOnLoss = isLost && !isGuessed;

              return (
                <div
                  key={`letter-${wordIdx}-${charIdx}`}
                  id={`letter-slot-${char}-${wordIdx}-${charIdx}`}
                  className={`relative flex items-center justify-center w-8 h-12 sm:w-11 sm:h-14 md:w-12 md:h-16 rounded-xl font-bold font-mono text-xl sm:text-2xl md:text-3xl transition-all duration-300 shadow-sm border-b-4 ${
                    isMissedOnLoss
                      ? 'bg-rose-950/40 border-rose-500/70 text-rose-300 animate-pulse'
                      : isHinted && showLetter
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                      : isGuessed
                      ? 'bg-slate-800/90 border-indigo-500 text-white shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-700 text-transparent'
                  }`}
                >
                  {/* Subtle Hint Star */}
                  {isHinted && showLetter && (
                    <Sparkles className="absolute top-1 right-1 w-2.5 h-2.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  )}

                  {/* Letter Character with pop animation */}
                  <span
                    className={`transition-all transform ${
                      showLetter
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                    }`}
                  >
                    {showLetter ? char : ''}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Helpful accessibility text */}
      <span className="sr-only">
        Current word progress:{' '}
        {rawWord
          .split('')
          .map((c) => (guessedLetters.includes(c) || !/^[A-Z]$/.test(c) ? c : 'blank'))
          .join(' ')}
      </span>
    </div>
  );
};
