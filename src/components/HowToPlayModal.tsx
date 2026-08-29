import React from 'react';
import { X, BookOpen, CheckCircle, ShieldAlert, Sparkles, Keyboard as KeyboardIcon, HelpCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="how-to-play-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
    >
      <div
        id="how-to-play-dialog"
        className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-how-to-play-btn"
          type="button"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close how to play modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 id="how-to-play-title" className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              How to Play
            </h2>
            <p className="text-xs text-slate-400">
              Master the mechanics and climb the streak leaderboard
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3.5 mb-6">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold text-slate-200">
                Choose Difficulty & Category
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select between Easy (8 lives), Medium (6 lives), or Hard (5 lives). You can pick a specific category or play a random mix.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold text-slate-200">
                Guess Hidden Letters
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Type letters using your <span className="text-indigo-300">physical keyboard</span> or tap the on-screen buttons. Correct letters reveal their positions immediately.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold text-slate-200">
                Manage Lives & Mistakes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Each wrong letter costs 1 life and adds a limb to the Hangman illustration. If lives drop to zero, the game ends.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold text-slate-200">
                Use Hints Strategically
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stuck on a tricky word? Tap the Hint button to reveal an unguessed letter and unlock the contextual clue (-10 score penalty).
              </p>
            </div>
          </div>
        </div>

        {/* Scoring Table */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Scoring Rules
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/80">
              <span className="text-slate-400">Correct Letter:</span>
              <span className="font-mono text-emerald-400 font-bold">+10 pts</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/80">
              <span className="text-slate-400">Mistake:</span>
              <span className="font-mono text-rose-400 font-bold">-5 pts</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/80">
              <span className="text-slate-400">Solve Word:</span>
              <span className="font-mono text-indigo-300 font-bold">+50 bonus</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-900/80">
              <span className="text-slate-400">Hint Used:</span>
              <span className="font-mono text-amber-400 font-bold">-10 pts</span>
            </div>
          </div>
        </div>

        {/* Controls info */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 mb-6">
          <KeyboardIcon className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            Pro tip: Type any letter A–Z directly on your hardware keyboard for fast-paced gameplay.
          </span>
        </div>

        {/* Close button */}
        <button
          id="close-how-to-play-footer-btn"
          type="button"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
};
