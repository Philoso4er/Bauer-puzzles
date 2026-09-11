import React from 'react';
import { CryptogramPuzzle } from '../../types';
import { KeyRound } from 'lucide-react';

interface CodeCrackViewProps {
  puzzle: CryptogramPuzzle;
  isSolved: boolean;
}

export const CodeCrackView: React.FC<CodeCrackViewProps> = ({
  puzzle,
  isSolved,
}) => {
  return (
    <div className="flex flex-col items-center w-full" id="codecrack-view">
      {/* Given Keys Bar - inspired by page 3 of the PDF */}
      <div className="w-full bg-[#161F3B] border border-slate-700/80 rounded-xl p-3 mb-5">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#FFE144] uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5" />
          <span>GIVEN LETTER KEYS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {Object.entries(puzzle.givenKey).map(([num, letter]) => (
            <div
              key={num}
              className="flex items-center bg-[#0F162E] border border-[#FFE144]/40 rounded-lg px-2.5 py-1 text-xs font-mono font-bold shadow-sm"
            >
              <span className="text-[#FFE144]">{num}</span>
              <span className="mx-1 text-slate-500">=</span>
              <span className="text-white font-extrabold text-sm">{letter}</span>
            </div>
          ))}
          <div className="text-xs text-slate-400 italic ml-auto hidden sm:block">
            Spot patterns to crack the remaining numbers
          </div>
        </div>
      </div>

      {/* The Word / Letter Boxes (mimicking page 3 of PDF) */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-2">
        {puzzle.words.map((wordObj, wIdx) => (
          <div key={wIdx} className="flex items-center gap-1 sm:gap-1.5">
            {wordObj.letters.map((item, lIdx) => {
              const showLetter = item.given || isSolved;

              return (
                <div
                  key={lIdx}
                  className="flex flex-col items-center"
                >
                  {/* Number label above the cell */}
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-400 mb-1">
                    {item.num}
                  </span>

                  {/* Letter box */}
                  <div
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-lg flex items-center justify-center font-mono text-lg sm:text-xl font-black transition-all border-2 ${
                      showLetter
                        ? item.given
                          ? 'bg-[#182346] text-white border-slate-600 shadow-sm'
                          : 'bg-[#FFE144] text-[#121832] border-[#FFE144] scale-105 shadow-md shadow-[#FFE144]/20'
                        : 'bg-[#0F162E] text-slate-500 border-dashed border-slate-600'
                    }`}
                  >
                    {showLetter ? item.letter : '?'}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-400 text-center">
        Type the decoded phrase or missing words into the answer box below.
      </div>
    </div>
  );
};
