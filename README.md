# Hangman Challenge 🎯

A modern, full-featured interactive Hangman word guessing game developed with **React, TypeScript, Vite, Tailwind CSS, and Web Audio API**. Built for the **CodeAlpha Internship Project** and architected for seamless zero-config deployment on **Vercel**.

![Hangman Challenge Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- **🎮 3 Dynamic Difficulty Modes**:
  - **Easy**: 8 Lives, Common vocabulary, 3 Hints, 1.0x score multiplier.
  - **Medium**: 6 Lives, Moderate vocabulary, 2 Hints, 1.5x score multiplier.
  - **Hard**: 5 Lives, Challenging vocabulary, 1 Hint, 2.0x score multiplier.
- **📚 9 Rich Word Categories**: Technology, Programming, Animals, Countries, Sports, Movies, Food, Science, and General Knowledge with contextual clues and fun facts.
- **💡 Smart Hint System**: Reveals an unguessed letter and unveils the contextual clue with a fair score deduction (-10 pts).
- **📈 Comprehensive Statistics & Streak Engine**:
  - Tracks Games Played, Won, Lost, Win Rate %, Best Score, Current Streak, and Best Streak.
  - Category and difficulty breakdown metrics.
  - Safe, error-resilient `localStorage` persistence with in-memory fallbacks.
- **🎨 Responsive SVG Hangman Stage**:
  - Pure SVG/CSS vector rendering that dynamically maps mistake counts to anatomical stages across 8, 6, and 5-life modes.
  - Dynamic facial expressions: curious, sweating/worried when lives $\le 2$, happy wink on victory, and dizzy $X\_X$ eyes on defeat.
- **🔊 Web Audio API Sound Synthesizer**:
  - Real-time synthesized chimes for correct guesses, mistakes, hints, win fanfare, and game-over cadences.
  - Zero external mp3/audio file dependencies.
  - User-configurable Sound ON/OFF toggle (default OFF).
- **⌨️ Dual Input Support**: Full on-screen virtual keyboard with instant visual states (available, correct emerald, incorrect strike-through) and physical hardware keyboard listener.
- **⚡ Vercel-Ready Architecture**: Client-side first architecture with companion serverless endpoint (`/api/words.ts`) ready for cloud deployment.
- **✨ Confetti Victory Blast**: Interactive celebratory particle burst on word completion.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (v4)
- **Icons**: Lucide React
- **Audio**: Web Audio API (native browser audio synthesis)
- **Effects**: Canvas Confetti
- **Deployment**: Vercel (Single-Page App + Serverless Function)

---

## 📊 Scoring System

| Action | Score Value |
|---|---|
| **Correct Letter Guess** | `+10 points` |
| **Incorrect Letter Guess** | `-5 points` |
| **Word Solved Bonus** | `+50 points` |
| **Hint Used** | `-10 points` |
| **Active Streak Multiplier** | `+10 points per streak level` |
| **Difficulty Multiplier** | Easy `1.0x` • Medium `1.5x` • Hard `2.0x` |

*Note: The score is protected against negative totals.*

---

## 📂 Project Structure

```
hangman-challenge/
├── api/
│   └── words.ts                # Vercel Serverless Function endpoint
├── public/
├── src/
│   ├── components/
│   │   ├── DifficultySelector.tsx  # Difficulty & Category selection
│   │   ├── GameOverModal.tsx       # Win/loss breakdown dialog
│   │   ├── HangmanDrawing.tsx      # Precision SVG illustration engine
│   │   ├── Header.tsx              # Brand bar & global quick controls
│   │   ├── HintButton.tsx          # Hint reveal & clue card
│   │   ├── HowToPlayModal.tsx      # Interactive guide modal
│   │   ├── Keyboard.tsx            # Virtual & physical keyboard handler
│   │   ├── LandingScreen.tsx       # Start screen with hero stats
│   │   ├── ScoreBoard.tsx          # Real-time score, streak & lives bar
│   │   ├── StatisticsModal.tsx     # Player history & lifetime metrics
│   │   └── WordDisplay.tsx         # Responsive letter slots & reveal FX
│   ├── data/
│   │   └── words.ts                # Local categorized word database
│   ├── hooks/
│   │   └── useGame.ts              # Core game state machine & engine
│   ├── types/
│   │   └── game.ts                 # Strict TypeScript schemas
│   ├── utils/
│   │   ├── audio.ts                # Web Audio API synthesizer
│   │   ├── scoring.ts              # Pure scoring calculation engine
│   │   └── storage.ts              # Safe localStorage manager
│   ├── App.tsx                     # Main application container
│   ├── index.css                   # Tailwind styles & custom typography
│   └── main.tsx                    # React application entry point
├── index.html                      # HTML5 entry with meta & fonts
├── metadata.json                   # Project metadata
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # Strict TypeScript compiler options
├── vercel.json                     # Vercel deployment & routing config
└── vite.config.ts                  # Vite build configuration
```

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/hangman-challenge.git
cd hangman-challenge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## ☁️ How to Deploy on Vercel

1. Push your code to a **GitHub repository**.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your `hangman-challenge` repository.
4. Framework Preset: **Vite** (detected automatically).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**.

---

## 🔮 Future Improvements

- [ ] Daily Challenge Mode with global seed words
- [ ] Time Attack / Speed Round mode
- [ ] Custom Word Creator mode to challenge friends via shareable URL
- [ ] Multiple language word packs (Spanish, French, German)

---

## 🎓 CodeAlpha Internship Project

Developed with passion as part of the **CodeAlpha Internship Program**.
Designed for portfolio presentation, GitHub showcase, and interactive web gaming.
