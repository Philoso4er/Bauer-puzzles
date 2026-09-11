import React, { useState } from 'react';
import { Sparkles, Newspaper, RefreshCw, ChevronDown, Wand2 } from 'lucide-react';
import { PuzzleCategory } from '../types';

interface HeaderProps {
  onShuffle: () => void;
  onRenewPuzzle: (category?: PuzzleCategory) => void;
  puzzleCount: number;
  renewedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onShuffle,
  onRenewPuzzle,
  puzzleCount,
  renewedCount,
}) => {
  const [showRenewMenu, setShowRenewMenu] = useState(false);

  const categories: Array<{ id: PuzzleCategory; label: string }> = [
    { id: 'wordsearch', label: 'New Wordsearch' },
    { id: 'cryptogram', label: 'New Code Crack' },
    { id: 'logic', label: 'New Logic Snippet' },
    { id: 'arithmetic', label: 'New Arithmetic' },
    { id: 'chain', label: 'New The Chain' },
  ];

  const handleSelectRenew = (cat?: PuzzleCategory) => {
    onRenewPuzzle(cat);
    setShowRenewMenu(false);
  };

  return (
    <header className="w-full max-w-4xl mx-auto mb-6" id="app-header">
      {/* Pitch notice banner at the very top */}
      <div 
        id="bauer-pitch-banner"
        className="w-full bg-gradient-to-r from-[#1B2347] via-[#222E5C] to-[#1B2347] border border-[#FFE144]/30 rounded-xl p-3.5 sm:p-4 mb-5 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE144]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFE144] flex items-center justify-center text-[#121832] shrink-0 font-bold shadow-sm mt-0.5 sm:mt-0">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFE144]/20 text-[#FFE144] px-2 py-0.5 rounded border border-[#FFE144]/30">
                  Concept Prototype
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Prepared for Bauer Media Group
                </span>
              </div>
              <p className="text-sm text-slate-100 font-medium mt-1 leading-snug">
                &ldquo;Bauer&rsquo;s interactive puzzles page has been retired — here&rsquo;s a quick concept for what one could look like.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={onShuffle}
              className="text-xs font-semibold text-slate-200 bg-[#161F3E] hover:bg-slate-700 border border-slate-600 transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Shuffle among existing puzzles in the pool"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Shuffle</span>
            </button>
            <div className="relative">
              <button
                onClick={() => handleSelectRenew()}
                className="text-xs font-bold text-[#121832] bg-[#FFE144] hover:bg-[#FACC15] transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Generate an entirely brand new puzzle on demand"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Renew Puzzle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Title & Editorial Masthead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold tracking-[0.2em] text-[#FFE144] uppercase">
              PUZZLE STUDIO
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400">Interactive Editorial Sample</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
            60-Second <span className="text-[#FFE144] underline decoration-[#FFE144]/40 decoration-2 underline-offset-4">Puzzle Fix</span>
            <span className="inline-flex items-center justify-center text-xs font-bold text-[#121832] bg-[#FFE144] rounded-full w-6 h-6 ml-1 shadow-sm">
              ⚡
            </span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Bite-sized daily brain teasers: wordsearches, cryptograms, logic snippets & arithmetic. One at a time, timed or relaxed.
          </p>
        </div>

        {/* Small pool indicator & Renew button */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#1A2244]/80 px-3 py-2 rounded-lg border border-slate-700">
            <Sparkles className="w-4 h-4 text-[#FFE144]" />
            <span>Pool: <strong className="text-white font-semibold">{puzzleCount} Available</strong></span>
            {renewedCount > 0 && (
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                +{renewedCount} Renewed
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowRenewMenu(!showRenewMenu)}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#1F2B56] hover:bg-[#283870] text-[#FFE144] border border-[#FFE144]/40 px-3 py-2 rounded-lg shadow-sm transition-all active:scale-95"
              title="Choose a specific puzzle type to generate fresh"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Renew New</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown for specific category renewal */}
            {showRenewMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#161F3F] border-2 border-slate-600 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn text-xs">
                <div className="px-3 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-700/60 mb-1">
                  Generate Fresh:
                </div>
                <button
                  onClick={() => handleSelectRenew()}
                  className="w-full text-left px-3 py-1.5 text-white hover:bg-[#FFE144] hover:text-[#121832] font-semibold transition-colors flex items-center justify-between"
                >
                  <span>⚡ Any Random Type</span>
                  <span className="text-[10px] text-amber-400">Fresh</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectRenew(c.id)}
                    className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-[#FFE144] hover:text-[#121832] transition-colors font-medium"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
