import React from 'react';
import { GameStatus } from '../types/game';
import { Check, X } from 'lucide-react';

interface KeyboardProps {
  guessedLetters: string[];
  incorrectGuesses: string[];
  onGuess: (letter: string) => void;
  status: GameStatus;
  layout?: 'qwerty' | 'alphabetical';
}

const QWERTY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const ALPHABETICAL_ROWS = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

export const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  incorrectGuesses,
  onGuess,
  status,
  layout = 'qwerty',
}) => {
  const rows = layout === 'qwerty' ? QWERTY_ROWS : ALPHABETICAL_ROWS;
  const isGameDisabled = status !== 'playing';

  return (
    <div
      id="on-screen-keyboard"
      className="flex flex-col items-center gap-1.5 sm:gap-2 w-full max-w-2xl mx-auto px-1 select-none"
      role="group"
      aria-label="Hangman Virtual Keyboard"
    >
      {rows.map((row, rowIdx) => (
        <div
          key={`kb-row-${rowIdx}`}
          className="flex items-center justify-center gap-1 sm:gap-1.5 w-full"
        >
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isIncorrect = incorrectGuesses.includes(letter);
            const isCorrect = isGuessed && !isIncorrect;
            const isDisabled = isGuessed || isGameDisabled;

            let keyStyle =
              'bg-slate-800/90 text-slate-100 hover:bg-slate-700 hover:border-slate-500 border-slate-700/80 active:scale-95 shadow-sm';

            if (isCorrect) {
              keyStyle =
                'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold shadow-emerald-900/20';
            } else if (isIncorrect) {
              keyStyle =
                'bg-slate-900/60 border-slate-800 text-slate-600 line-through opacity-60 cursor-not-allowed';
            } else if (isGameDisabled) {
              keyStyle = 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed';
            }

            return (
              <button
                key={`key-${letter}`}
                id={`keyboard-key-${letter}`}
                type="button"
                disabled={isDisabled}
                onClick={() => onGuess(letter)}
                aria-label={`Letter ${letter}${
                  isCorrect ? ', correctly guessed' : isIncorrect ? ', incorrect guess' : ''
                }`}
                className={`relative flex items-center justify-center h-10 sm:h-12 flex-1 max-w-[42px] sm:max-w-[52px] rounded-lg sm:rounded-xl text-sm sm:text-base font-bold font-mono border transition-all duration-150 touch-manipulation focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${keyStyle}`}
              >
                <span>{letter}</span>
                {isCorrect && (
                  <Check className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-emerald-400 opacity-80" />
                )}
                {isIncorrect && (
                  <X className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-rose-500/80" />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
