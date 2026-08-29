import React from 'react';
import { GameStatus } from '../types/game';

interface HangmanDrawingProps {
  maxLives: number;
  remainingLives: number;
  status: GameStatus;
}

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  maxLives,
  remainingLives,
  status,
}) => {
  const mistakes = Math.max(0, maxLives - remainingLives);

  // Map mistakes according to maxLives (8 for Easy, 6 for Medium, 5 for Hard) to 6 standard body parts
  // 1: Head, 2: Body, 3: Left Arm, 4: Right Arm, 5: Left Leg, 6: Right Leg
  const getVisiblePartsCount = (): number => {
    if (mistakes === 0) return 0;
    if (mistakes >= maxLives) return 6; // Fully revealed when out of lives

    if (maxLives === 8) {
      // 8 mistakes scale to 6 parts
      // 1: none/rope, 2: head, 3: body, 4: left arm, 5: right arm, 6: left leg, 7: right leg, 8: complete
      return Math.min(6, Math.floor((mistakes / maxLives) * 7));
    } else if (maxLives === 6) {
      // 1:1 mapping
      return mistakes;
    } else if (maxLives === 5) {
      // 5 mistakes scale to 6 parts (reveals head, body, left arm, right arm, legs)
      if (mistakes === 1) return 1; // Head
      if (mistakes === 2) return 2; // Body
      if (mistakes === 3) return 3; // Left Arm
      if (mistakes === 4) return 4; // Right Arm
      if (mistakes === 5) return 6; // Both legs
      return 0;
    }
    return mistakes;
  };

  const visibleParts = getVisiblePartsCount();
  const isGameOverLost = status === 'lost' || remainingLives === 0;
  const isWon = status === 'won';
  const isNearDeath = remainingLives <= 2 && !isGameOverLost && !isWon;

  return (
    <div
      id="hangman-stage"
      className="relative flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-sm w-full max-w-[320px] sm:max-w-[360px] mx-auto transition-all duration-300"
    >
      {/* Visual Status Tag */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border border-slate-800 bg-slate-950/60">
        <span
          className={`w-2 h-2 rounded-full ${
            isWon
              ? 'bg-emerald-400 animate-pulse'
              : isGameOverLost
              ? 'bg-rose-500'
              : isNearDeath
              ? 'bg-amber-400 animate-ping'
              : 'bg-indigo-400'
          }`}
        />
        <span className="text-slate-300">
          {isWon
            ? 'Survived!'
            : isGameOverLost
            ? 'Defeated'
            : `${remainingLives} / ${maxLives} Lives`}
        </span>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 240 260"
        className="w-full h-auto max-h-[240px] stroke-slate-200 fill-none select-none transition-all duration-300"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Base Hill / Platform */}
        <path
          d="M 20 240 L 220 240"
          className="stroke-slate-700 transition-colors duration-300"
          strokeWidth="4"
        />
        <path
          d="M 35 240 L 85 240"
          className="stroke-indigo-500/80"
          strokeWidth="5"
        />

        {/* Gallows Vertical Post */}
        <path
          d="M 60 240 L 60 30"
          className="stroke-slate-600 transition-colors duration-300"
          strokeWidth="4.5"
        />

        {/* Diagonal Support Strut */}
        <path
          d="M 60 70 L 95 30"
          className="stroke-slate-700"
          strokeWidth="3"
        />

        {/* Gallows Top Beam */}
        <path
          d="M 58 30 L 165 30"
          className="stroke-slate-600"
          strokeWidth="4.5"
        />

        {/* Hanging Noose / Rope */}
        <path
          d="M 165 30 L 165 65"
          className={`transition-all duration-300 ${
            mistakes > 0 ? 'stroke-amber-400/90' : 'stroke-slate-700'
          }`}
          strokeWidth="3"
          strokeDasharray={mistakes === 0 ? '4 3' : undefined}
        />

        {/* 1. HEAD */}
        {visibleParts >= 1 && (
          <g className="transition-all duration-500 animate-in fade-in zoom-in-75">
            {/* Head circle */}
            <circle
              cx="165"
              cy="85"
              r="20"
              className={`${
                isWon
                  ? 'stroke-emerald-400 fill-emerald-500/10'
                  : isGameOverLost
                  ? 'stroke-rose-400 fill-rose-500/10'
                  : 'stroke-sky-400 fill-sky-500/10'
              }`}
              strokeWidth="3"
            />

            {/* Face Expressions */}
            {isWon ? (
              // Happy / Winning Face
              <g className="stroke-emerald-300" strokeWidth="2">
                <path d="M 158 82 Q 161 79 164 82" />
                <path d="M 168 82 Q 171 79 174 82" />
                <path d="M 158 92 Q 165 99 172 92" />
              </g>
            ) : isGameOverLost ? (
              // X_X Dizzy Eyes on Defeat
              <g className="stroke-rose-400" strokeWidth="2">
                {/* Left eye X */}
                <path d="M 157 80 L 163 86" />
                <path d="M 163 80 L 157 86" />
                {/* Right eye X */}
                <path d="M 167 80 L 173 86" />
                <path d="M 173 80 L 167 86" />
                {/* Sad wavy mouth */}
                <path d="M 159 95 Q 165 89 171 95" />
              </g>
            ) : isNearDeath ? (
              // Worried / Sweating Face
              <g className="stroke-amber-300" strokeWidth="2">
                <circle cx="159" cy="83" r="1.5" className="fill-amber-300" />
                <circle cx="171" cy="83" r="1.5" className="fill-amber-300" />
                {/* O-mouth */}
                <ellipse cx="165" cy="93" rx="3" ry="2" />
                {/* Sweat droplet */}
                <path
                  d="M 183 75 Q 186 78 183 81 Q 180 78 183 75"
                  className="fill-sky-400 stroke-sky-400"
                />
              </g>
            ) : (
              // Normal Curious Face
              <g className="stroke-sky-300" strokeWidth="2">
                <circle cx="159" cy="83" r="1.5" className="fill-sky-300" />
                <circle cx="171" cy="83" r="1.5" className="fill-sky-300" />
                <path d="M 161 93 L 169 93" />
              </g>
            )}
          </g>
        )}

        {/* 2. BODY */}
        {visibleParts >= 2 && (
          <path
            d="M 165 105 L 165 160"
            className={`${
              isWon
                ? 'stroke-emerald-400'
                : isGameOverLost
                ? 'stroke-rose-400'
                : 'stroke-sky-400'
            } transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
            strokeWidth="3.5"
          />
        )}

        {/* 3. LEFT ARM */}
        {visibleParts >= 3 && (
          <path
            d={isWon ? 'M 165 120 L 138 98' : 'M 165 120 L 138 142'}
            className={`${
              isWon
                ? 'stroke-emerald-400'
                : isGameOverLost
                ? 'stroke-rose-400'
                : 'stroke-sky-400'
            } transition-all duration-300 animate-in fade-in`}
            strokeWidth="3.5"
          />
        )}

        {/* 4. RIGHT ARM */}
        {visibleParts >= 4 && (
          <path
            d={isWon ? 'M 165 120 L 192 98' : 'M 165 120 L 192 142'}
            className={`${
              isWon
                ? 'stroke-emerald-400'
                : isGameOverLost
                ? 'stroke-rose-400'
                : 'stroke-sky-400'
            } transition-all duration-300 animate-in fade-in`}
            strokeWidth="3.5"
          />
        )}

        {/* 5. LEFT LEG */}
        {visibleParts >= 5 && (
          <path
            d="M 165 160 L 140 205"
            className={`${
              isWon
                ? 'stroke-emerald-400'
                : isGameOverLost
                ? 'stroke-rose-400'
                : 'stroke-sky-400'
            } transition-all duration-300 animate-in fade-in`}
            strokeWidth="3.5"
          />
        )}

        {/* 6. RIGHT LEG */}
        {visibleParts >= 6 && (
          <path
            d="M 165 160 L 190 205"
            className={`${
              isWon
                ? 'stroke-emerald-400'
                : isGameOverLost
                ? 'stroke-rose-400'
                : 'stroke-sky-400'
            } transition-all duration-300 animate-in fade-in`}
            strokeWidth="3.5"
          />
        )}
      </svg>

      {/* Progress Bar of Mistakes */}
      <div className="w-full mt-2 bg-slate-950/70 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-300 ${
            isGameOverLost
              ? 'bg-rose-500'
              : isNearDeath
              ? 'bg-amber-400'
              : 'bg-indigo-500'
          }`}
          style={{
            width: `${Math.min(100, (mistakes / maxLives) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
};
