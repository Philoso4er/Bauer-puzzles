import React from 'react';
import { ChainPuzzle } from '../../types';
import { Link2, ArrowDown } from 'lucide-react';

interface TheChainViewProps {
  puzzle: ChainPuzzle;
  isSolved: boolean;
}

export const TheChainView: React.FC<TheChainViewProps> = ({
  puzzle,
  isSolved,
}) => {
  return (
    <div className="flex flex-col w-full" id="the-chain-view">
      <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-[#FFE144]" />
        <span>Each word ends with the letter that begins the next:</span>
      </div>

      <div className="space-y-3">
        {puzzle.steps.map((step, idx) => {
          const isTarget = idx === puzzle.targetStepIndex;
          const showAnswer = step.revealed || isSolved;

          return (
            <React.Fragment key={step.step}>
              <div
                className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                  isTarget
                    ? isSolved
                      ? 'bg-[#1D2A54] border-[#FFE144] shadow-md ring-1 ring-[#FFE144]'
                      : 'bg-[#161F3D] border-[#FFE144]/60 shadow-md ring-1 ring-[#FFE144]/40'
                    : 'bg-[#0F162E] border-slate-700/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isTarget
                          ? 'bg-[#FFE144] text-[#121832]'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {step.clue}
                      </p>
                      {isTarget && !isSolved && (
                        <span className="text-[11px] text-[#FFE144] font-bold uppercase tracking-wider">
                          ★ SOLVE THIS STEP ({step.letterCount} letters)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Word slot */}
                  <div className="font-mono font-black tracking-widest text-base sm:text-lg sm:text-right pl-7 sm:pl-0">
                    {showAnswer ? (
                      <span className="bg-[#192447] text-white px-3 py-1 rounded-lg border border-slate-600 inline-block shadow-sm">
                        <span className="text-[#FFE144]">{step.word.slice(0, 1)}</span>
                        <span>{step.word.slice(1, -1)}</span>
                        <span className="text-[#FFE144]">{step.word.slice(-1)}</span>
                      </span>
                    ) : (
                      <span className="bg-[#121830] text-[#FFE144] px-3 py-1 rounded-lg border border-dashed border-[#FFE144] inline-block font-mono tracking-wider">
                        E _ _ _ W
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {idx < puzzle.steps.length - 1 && (
                <div className="flex justify-center -my-1 text-slate-500">
                  <ArrowDown className="w-3.5 h-3.5 text-[#FFE144]/70" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
