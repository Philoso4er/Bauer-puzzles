import React from 'react';
import { ArithmeticPuzzle } from '../../types';
import { Calculator } from 'lucide-react';

interface ArithmeticViewProps {
  puzzle: ArithmeticPuzzle;
  isSolved: boolean;
}

export const ArithmeticView: React.FC<ArithmeticViewProps> = ({
  puzzle,
  isSolved,
}) => {
  return (
    <div className="flex flex-col items-center w-full" id="arithmetic-view">
      {/* Mathematical Puzzle Card */}
      <div className="w-full bg-[#161F3D] border border-slate-700/80 rounded-2xl p-5 sm:p-6 text-center my-2 shadow-inner">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#FFE144] uppercase tracking-wider mb-4">
          <Calculator className="w-4 h-4" />
          <span>Mental Arithmetic Balance</span>
        </div>

        {/* Large Equation Display */}
        <div className="text-2xl sm:text-4xl font-mono font-black text-white tracking-wide flex items-center justify-center gap-2 sm:gap-3 flex-wrap py-3">
          {puzzle.equationOrPrompt.split('?').map((part, index, array) => (
            <React.Fragment key={index}>
              <span className="text-slate-100">{part}</span>
              {index < array.length - 1 && (
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-mono font-black text-xl sm:text-2xl transition-all shadow-md ${
                    isSolved
                      ? 'bg-[#FFE144] text-[#121832] ring-2 ring-white scale-110'
                      : 'bg-[#FFE144]/20 text-[#FFE144] border-2 border-dashed border-[#FFE144] animate-pulse'
                  }`}
                >
                  {isSolved ? puzzle.targetNumber : '?'}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-4 max-w-md mx-auto">
          Calculate the missing value replacing the &apos;?&apos; to satisfy the equality.
        </p>
      </div>
    </div>
  );
};
