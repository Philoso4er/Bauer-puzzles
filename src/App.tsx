import { useState, useEffect, useCallback } from 'react';
import { PUZZLE_POOL } from './data/puzzles';
import { generateBrandNewPuzzle } from './data/generator';
import { AnyPuzzle, GameStats, PuzzleCategory } from './types';
import { Header } from './components/Header';
import { ScoreStreakBar } from './components/ScoreStreakBar';
import { TimerWidget } from './components/TimerWidget';
import { PuzzleCard } from './components/PuzzleCard';
import { EditorialQAChecklist } from './components/EditorialQAChecklist';
import { Footer } from './components/Footer';
import { Sparkles, Check } from 'lucide-react';

// Sound effect generator using standard Web Audio API (safe, no external files)
const playChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle cheerful high-pitched chime (arpeggio tone)
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // Gracefully ignore audio issues in restrictive environments
  }
};

export default function App() {
  // Master pool state that grows as user generates new puzzles
  const [puzzlePool, setPuzzlePool] = useState<AnyPuzzle[]>(() => PUZZLE_POOL);
  const [renewedCount, setRenewedCount] = useState<number>(0);
  const [renewToast, setRenewToast] = useState<string | null>(null);

  // Select initial puzzle randomly from the pool
  const [currentPuzzle, setCurrentPuzzle] = useState<AnyPuzzle>(() => {
    const randIdx = Math.floor(Math.random() * PUZZLE_POOL.length);
    return PUZZLE_POOL[randIdx];
  });

  // Timer states (60-second countdown)
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActiveTimer, setIsActiveTimer] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  // Cosmetic Stats & Streak state
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('bauer_puzzle_fix_stats');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      streak: 0,
      solvedCount: 0,
      bestTimeSeconds: null,
      history: [],
    };
  });

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bauer_puzzle_fix_stats', JSON.stringify(stats));
    } catch {
      // Ignore storage errors
    }
  }, [stats]);

  // Pick next puzzle from existing pool
  const handleNextPuzzle = useCallback(() => {
    let nextIndex = Math.floor(Math.random() * puzzlePool.length);
    if (puzzlePool.length > 1 && puzzlePool[nextIndex].id === currentPuzzle.id) {
      nextIndex = (nextIndex + 1) % puzzlePool.length;
    }
    setCurrentPuzzle(puzzlePool[nextIndex]);
    setTimeLeft(60);
    setIsActiveTimer(true);
    setIsSolved(false);
  }, [currentPuzzle.id, puzzlePool]);

  // Generate an entirely brand new puzzle on demand (Renew when user wants)
  const handleRenewPuzzle = useCallback((category?: PuzzleCategory) => {
    const freshPuzzle = generateBrandNewPuzzle(category);
    
    // Add to pool and immediately activate
    setPuzzlePool((prev) => [freshPuzzle, ...prev]);
    setCurrentPuzzle(freshPuzzle);
    setTimeLeft(60);
    setIsActiveTimer(true);
    setIsSolved(false);
    setRenewedCount((prev) => prev + 1);

    // Show temporary celebratory toast
    const catName = category
      ? category === 'cryptogram'
        ? 'Code Crack'
        : category === 'chain'
        ? 'The Chain'
        : category.toUpperCase()
      : 'teaser';
    setRenewToast(`✨ Brand new ${catName} puzzle generated! Ready to solve.`);
    setTimeout(() => {
      setRenewToast(null);
    }, 4000);
  }, []);

  // Filter or jump to category in pool, or generate if none match
  const handleSelectCategory = (cat: PuzzleCategory) => {
    const matching = puzzlePool.filter((p) => p.category === cat);
    if (matching.length > 0) {
      // Pick random one among matching
      const picked = matching[Math.floor(Math.random() * matching.length)];
      setCurrentPuzzle(picked);
      setTimeLeft(60);
      setIsActiveTimer(true);
      setIsSolved(false);
    } else {
      // If no puzzles exist of that category, renew one fresh
      handleRenewPuzzle(cat);
    }
  };

  // When solved
  const handlePuzzleSolved = (secondsTaken: number) => {
    setIsSolved(true);
    setIsActiveTimer(false);
    playChime();

    setStats((prev) => {
      const newStreak = prev.streak + 1;
      const newSolvedCount = prev.solvedCount + 1;
      const newBestTime =
        prev.bestTimeSeconds === null
          ? secondsTaken
          : Math.min(prev.bestTimeSeconds, secondsTaken);

      return {
        streak: newStreak,
        solvedCount: newSolvedCount,
        bestTimeSeconds: newBestTime,
        history: [
          ...prev.history,
          {
            puzzleId: currentPuzzle.id,
            secondsTaken,
            solved: true,
            timestamp: Date.now(),
          },
        ],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0E1428] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center">
        {/* Pitch line and branding masthead */}
        <Header
          onShuffle={handleNextPuzzle}
          onRenewPuzzle={handleRenewPuzzle}
          puzzleCount={puzzlePool.length}
          renewedCount={renewedCount}
        />

        {/* Floating toast notification when a brand new puzzle is renewed */}
        {renewToast && (
          <div className="w-full max-w-md -mt-2 mb-4 bg-emerald-950/90 border-2 border-emerald-500/80 rounded-xl px-4 py-2.5 shadow-xl flex items-center justify-between gap-3 text-emerald-200 text-xs font-semibold animate-fadeIn z-30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFE144] shrink-0" />
              <span>{renewToast}</span>
            </div>
            <button
              onClick={() => setRenewToast(null)}
              className="text-emerald-400 hover:text-white p-1"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Score and Running Streak Bar */}
        <ScoreStreakBar stats={stats} />

        {/* 60-Second Countdown Timer & Control Hook */}
        <div className="w-full mb-6">
          <TimerWidget
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isActive={isActiveTimer}
            setIsActive={setIsActiveTimer}
            isSolved={isSolved}
            totalSeconds={60}
          />
        </div>

        {/* The Central Interactive Puzzle Card */}
        <PuzzleCard
          key={currentPuzzle.id}
          puzzle={currentPuzzle}
          onNextPuzzle={handleNextPuzzle}
          onRenewPuzzle={handleRenewPuzzle}
          onSolved={handlePuzzleSolved}
          timeLeft={timeLeft}
          isActiveTimer={isActiveTimer}
          setIsActiveTimer={setIsActiveTimer}
          onSelectCategory={handleSelectCategory}
        />

        {/* Editorial QA Standards Checklist (from PDF page 8) */}
        <EditorialQAChecklist />
      </div>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
