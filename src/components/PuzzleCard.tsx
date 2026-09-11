import React, { useState, useEffect, useRef } from 'react';
import { AnyPuzzle, PuzzleCategory } from '../types';
import { WordsearchView } from './puzzles/WordsearchView';
import { CodeCrackView } from './puzzles/CodeCrackView';
import { LogicSnippetView } from './puzzles/LogicSnippetView';
import { ArithmeticView } from './puzzles/ArithmeticView';
import { TheChainView } from './puzzles/TheChainView';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Eye,
  RotateCcw,
  Sparkles,
  Zap,
  Wand2,
} from 'lucide-react';

interface PuzzleCardProps {
  puzzle: AnyPuzzle;
  onNextPuzzle: () => void;
  onRenewPuzzle: (category?: PuzzleCategory) => void;
  onSolved: (secondsTaken: number) => void;
  timeLeft: number;
  isActiveTimer: boolean;
  setIsActiveTimer: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectCategory: (category: PuzzleCategory) => void;
}

export const PuzzleCard: React.FC<PuzzleCardProps> = ({
  puzzle,
  onNextPuzzle,
  onRenewPuzzle,
  onSolved,
  timeLeft,
  isActiveTimer,
  setIsActiveTimer,
  onSelectCategory,
}) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset local state when puzzle changes
  useEffect(() => {
    setUserInput('');
    setFeedback('idle');
    setShowHint(false);
    setRevealed(false);
    setShake(false);
    // Focus input on new puzzle
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [puzzle.id]);

  // Clean and check answer
  const checkAnswer = (customVal?: string) => {
    const rawAnswer = (customVal !== undefined ? customVal : userInput).trim().toUpperCase();
    if (!rawAnswer) return;

    let isCorrect = false;

    if (puzzle.category === 'wordsearch') {
      isCorrect =
        rawAnswer === puzzle.targetWord.toUpperCase() ||
        rawAnswer.includes(puzzle.targetWord.toUpperCase());
    } else if (puzzle.category === 'cryptogram') {
      isCorrect = puzzle.acceptedAnswers.some(
        (ans) =>
          rawAnswer === ans.toUpperCase() ||
          rawAnswer.replace(/\s+/g, '') === ans.replace(/\s+/g, '').toUpperCase()
      );
    } else if (puzzle.category === 'logic') {
      isCorrect =
        rawAnswer === puzzle.correctAnswer.toUpperCase() ||
        rawAnswer.includes(puzzle.correctAnswer.toUpperCase());
    } else if (puzzle.category === 'arithmetic') {
      isCorrect = puzzle.acceptedAnswers.some(
        (ans) => rawAnswer === ans.toUpperCase()
      );
    } else if (puzzle.category === 'chain') {
      isCorrect = puzzle.acceptedAnswers.some(
        (ans) =>
          rawAnswer === ans.toUpperCase() ||
          rawAnswer.replace(/\s+/g, '') === ans.replace(/\s+/g, '').toUpperCase()
      );
    }

    if (isCorrect) {
      setFeedback('correct');
      const timeTaken = 60 - timeLeft;
      onSolved(Math.max(1, timeTaken));
    } else {
      setFeedback('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback === 'correct' || revealed) {
      onNextPuzzle();
      return;
    }
    checkAnswer();
  };

  const handleRevealSolution = () => {
    setRevealed(true);
    setFeedback('idle');
    setIsActiveTimer(false);
  };

  const isSolved = feedback === 'correct' || revealed;

  return (
    <div
      id="puzzle-card-container"
      className="w-full bg-[#161F3F] border-2 border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden mb-8 transition-all"
    >
      {/* Signature PDF-inspired Header Banner (Yellow block on left + Deep Navy bar) */}
      <div className="flex w-full items-stretch bg-[#0F162E] border-b-2 border-slate-700">
        {/* Yellow Accent Block matching the PDF header */}
        <div className="w-3.5 sm:w-4 bg-[#FFE144] shrink-0" />

        {/* Navy Header Content */}
        <div className="flex-1 py-3 px-4 sm:px-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
                {puzzle.title}
              </h2>
              <span className="text-[11px] font-bold text-[#121832] bg-[#FFE144] px-2 py-0.5 rounded uppercase tracking-wide">
                {puzzle.subtitle}
              </span>
              {puzzle.id.includes('dynamic') && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Brand New Generated</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-800 text-slate-300 font-semibold px-2 py-1 rounded border border-slate-700">
              {puzzle.difficulty}
            </span>
            <span className="text-slate-400 font-mono hidden sm:inline">
              ~{puzzle.timeEstimateSeconds}s fix
            </span>
          </div>
        </div>
      </div>

      {/* Category Quick Filter Pills & Quick Renewal */}
      <div className="px-4 py-2.5 bg-[#121933] border-b border-slate-700/60 flex items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium whitespace-nowrap text-[11px] hidden sm:inline">
            Filter:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {[
              { id: 'wordsearch', label: 'Wordsearch' },
              { id: 'cryptogram', label: 'Code Crack' },
              { id: 'logic', label: 'Logic' },
              { id: 'arithmetic', label: 'Arithmetic' },
              { id: 'chain', label: 'The Chain' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as PuzzleCategory)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  puzzle.category === cat.id
                    ? 'bg-[#FFE144] text-[#121832] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRenewPuzzle(puzzle.category)}
          className="text-xs font-semibold text-[#FFE144] hover:text-white bg-[#1A254B] hover:bg-[#233166] px-2.5 py-1 rounded-md border border-[#FFE144]/30 flex items-center gap-1 shrink-0 transition-all active:scale-95"
          title={`Generate a brand new ${puzzle.category} puzzle`}
        >
          <Wand2 className="w-3 h-3 text-[#FFE144]" />
          <span className="hidden sm:inline">Renew {puzzle.category}</span>
          <span className="sm:hidden">Renew</span>
        </button>
      </div>

      {/* Puzzle Body & Instructions */}
      <div className="p-4 sm:p-6 flex flex-col items-center">
        <p className="text-sm text-slate-300 mb-5 text-center max-w-xl leading-relaxed">
          {puzzle.instructions}
        </p>

        {/* Dynamic Puzzle View */}
        <div className="w-full flex justify-center mb-6">
          {puzzle.category === 'wordsearch' && (
            <WordsearchView
              puzzle={puzzle}
              isSolved={isSolved}
              onSolveDirect={() => {
                setUserInput(puzzle.targetWord);
                checkAnswer(puzzle.targetWord);
              }}
            />
          )}

          {puzzle.category === 'cryptogram' && (
            <CodeCrackView
              puzzle={puzzle}
              isSolved={isSolved}
            />
          )}

          {puzzle.category === 'logic' && (
            <LogicSnippetView
              puzzle={puzzle}
              isSolved={isSolved}
              selectedOption={userInput}
              onSelectOption={(opt) => {
                setUserInput(opt);
                checkAnswer(opt);
              }}
            />
          )}

          {puzzle.category === 'arithmetic' && (
            <ArithmeticView
              puzzle={puzzle}
              isSolved={isSolved}
            />
          )}

          {puzzle.category === 'chain' && (
            <TheChainView
              puzzle={puzzle}
              isSolved={isSolved}
            />
          )}
        </div>

        {/* Answer Input and Form */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md flex flex-col gap-3 transition-transform ${
            shake ? 'animate-shake' : ''
          }`}
        >
          <div className="flex items-stretch gap-2">
            <input
              ref={inputRef}
              id="puzzle-answer-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isSolved}
              placeholder={
                puzzle.category === 'wordsearch'
                  ? 'Type hidden word...'
                  : puzzle.category === 'cryptogram'
                  ? 'Type decoded words...'
                  : puzzle.category === 'arithmetic'
                  ? 'Type missing number...'
                  : 'Enter solution...'
              }
              className={`flex-1 bg-[#0F162E] border-2 rounded-xl px-4 py-2.5 text-base font-bold font-mono tracking-wider text-white placeholder:text-slate-500 placeholder:font-normal placeholder:tracking-normal focus:outline-none transition-all ${
                feedback === 'correct' || revealed
                  ? 'border-emerald-500 bg-emerald-950/20'
                  : feedback === 'wrong'
                  ? 'border-rose-500 bg-rose-950/20 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-700 focus:border-[#FFE144] focus:ring-2 focus:ring-[#FFE144]/20'
              }`}
              autoComplete="off"
              autoCapitalize="characters"
            />

            {!isSolved ? (
              <button
                type="submit"
                id="submit-answer-btn"
                className="bg-[#FFE144] hover:bg-[#FACC15] text-[#121832] font-black text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <span>Check</span>
                <Zap className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  id="next-puzzle-btn"
                  onClick={onNextPuzzle}
                  className="bg-[#FFE144] hover:bg-[#FACC15] text-[#121832] font-black text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-1.5 shrink-0"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onRenewPuzzle()}
                  className="bg-emerald-500 hover:bg-emerald-400 text-[#121832] font-black text-sm px-3.5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-1.5 shrink-0"
                  title="Generate an entirely brand new puzzle on the fly"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Renew New</span>
                </button>
              </div>
            )}
          </div>

          {/* Secondary Action Buttons (Hint / Reveal / Skip / Renew) */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-slate-400 hover:text-[#FFE144] transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>

            {!isSolved && (
              <button
                type="button"
                onClick={handleRevealSolution}
                className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal Answer</span>
              </button>
            )}

            <button
              type="button"
              onClick={onNextPuzzle}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Skip / Next</span>
            </button>

            <button
              type="button"
              onClick={() => onRenewPuzzle()}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              title="Generate a brand new puzzle right now"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Renew Brand New</span>
            </button>
          </div>
        </form>

        {/* Hint Box */}
        {showHint && !isSolved && (
          <div className="w-full max-w-md mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-[#FFE144] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FFE144]">HINT: </strong>
              <span>{puzzle.hint}</span>
            </div>
          </div>
        )}

        {/* Instant Right Feedback Card */}
        {feedback === 'correct' && (
          <div
            id="correct-feedback-box"
            className="w-full max-w-md mt-4 p-4 bg-emerald-950/40 border-2 border-emerald-500/80 rounded-xl text-emerald-200 animate-fadeIn shadow-lg"
          >
            <div className="flex items-center gap-2 font-black text-sm text-emerald-300 mb-1">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>SPOT ON! SOLVED IN {Math.max(1, 60 - timeLeft)}s</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed mt-1">
              {puzzle.explanation}
            </p>
            <div className="mt-3 pt-2.5 border-t border-emerald-500/30 flex items-center justify-between gap-2">
              <span className="text-[11px] text-emerald-300/80">Want another fresh challenge?</span>
              <button
                type="button"
                onClick={() => onRenewPuzzle()}
                className="text-xs font-bold text-[#FFE144] hover:text-white flex items-center gap-1 transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Renew Brand New Puzzle →</span>
              </button>
            </div>
          </div>
        )}

        {/* Instant Wrong Feedback Card */}
        {feedback === 'wrong' && (
          <div
            id="wrong-feedback-box"
            className="w-full max-w-md mt-4 p-3.5 bg-rose-950/40 border border-rose-500/60 rounded-xl text-rose-200 text-xs flex items-center justify-between gap-3 animate-fadeIn"
          >
            <div className="flex items-center gap-2 font-medium">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Not quite — check your spelling or try another guess!</span>
            </div>
            <button
              type="button"
              onClick={handleRevealSolution}
              className="text-amber-300 underline font-bold whitespace-nowrap hover:text-white"
            >
              Reveal
            </button>
          </div>
        )}

        {/* Solution Revealed Card */}
        {revealed && (
          <div
            id="revealed-solution-box"
            className="w-full max-w-md mt-4 p-4 bg-slate-800/80 border-2 border-[#FFE144]/60 rounded-xl text-slate-200 animate-fadeIn shadow-md"
          >
            <div className="flex items-center gap-2 font-black text-xs text-[#FFE144] uppercase tracking-wider mb-1">
              <Eye className="w-4 h-4" />
              <span>EDITORIAL SOLUTION REVEALED</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed mt-1">
              {puzzle.explanation}
            </p>
            <div className="mt-3 pt-2.5 border-t border-slate-700 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onNextPuzzle}
                className="text-xs text-slate-300 hover:text-white font-medium"
              >
                Next in pool
              </button>
              <button
                type="button"
                onClick={() => onRenewPuzzle()}
                className="text-xs font-bold text-[#FFE144] hover:text-white flex items-center gap-1 transition-colors"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Renew with Brand New Puzzle →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
