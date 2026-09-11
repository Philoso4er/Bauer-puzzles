import React, { useState } from 'react';
import { LogicPuzzle } from '../../types';
import { CheckSquare, Square } from 'lucide-react';

interface LogicSnippetViewProps {
  puzzle: LogicPuzzle;
  isSolved: boolean;
  onSelectOption: (option: string) => void;
  selectedOption: string;
}

export const LogicSnippetView: React.FC<LogicSnippetViewProps> = ({
  puzzle,
  isSolved,
  onSelectOption,
  selectedOption,
}) => {
  // Interactive mini deduction grid matching PDF page 6
  // State: grid[friend][puzzle] = 'empty' | 'no' | 'yes'
  const [gridState, setGridState] = useState<Record<string, Record<string, 'empty' | 'no' | 'yes'>>>(
    () => {
      const initial: Record<string, Record<string, 'empty' | 'no' | 'yes'>> = {};
      puzzle.items.friends.forEach((f) => {
        initial[f] = {};
        puzzle.items.puzzles.forEach((p) => {
          initial[f][p] = 'empty';
        });
      });
      return initial;
    }
  );

  const toggleCell = (friend: string, puzzleName: string) => {
    if (isSolved) return;
    setGridState((prev) => {
      const current = prev[friend]?.[puzzleName] || 'empty';
      const next = current === 'empty' ? 'no' : current === 'no' ? 'yes' : 'empty';
      return {
        ...prev,
        [friend]: {
          ...prev[friend],
          [puzzleName]: next,
        },
      };
    });
  };

  return (
    <div className="flex flex-col w-full" id="logic-snippet-view">
      {/* Clues Card */}
      <div className="bg-[#151D3A] border border-slate-700/80 rounded-xl p-3.5 mb-4">
        <div className="text-xs font-bold text-[#FFE144] uppercase tracking-wider mb-2">
          {puzzle.scenario}
        </div>
        <ul className="space-y-2 text-sm text-slate-200">
          {puzzle.clues.map((clue) => (
            <li key={clue.id} className="flex items-start gap-2.5">
              <span className="font-mono font-bold text-xs bg-[#24305E] text-[#FFE144] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {clue.id}
              </span>
              <span className="leading-snug">{clue.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mini Deduction Grid (Page 6 PDF feature) */}
      <div className="mb-5 bg-[#0F162E] p-3 rounded-xl border border-slate-700/70 overflow-x-auto">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>OPTIONAL DEDUCTION GRID (Tap to toggle: ✕ / ✓)</span>
        </div>
        <table className="w-full text-xs text-left border-collapse min-w-[280px]">
          <thead>
            <tr>
              <th className="p-1.5 text-slate-400 font-semibold border-b border-slate-700">Friend</th>
              {puzzle.items.puzzles.map((p) => (
                <th key={p} className="p-1.5 text-center font-bold text-slate-300 border-b border-slate-700">
                  {p.slice(0, 4)}..
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {puzzle.items.friends.map((f) => (
              <tr key={f} className="border-b border-slate-800 hover:bg-slate-800/30">
                <td className="p-1.5 font-bold text-slate-200">{f}</td>
                {puzzle.items.puzzles.map((p) => {
                  const state = gridState[f]?.[p] || 'empty';
                  return (
                    <td key={p} className="p-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleCell(f, p)}
                        className={`w-6 h-6 rounded font-mono font-black text-xs inline-flex items-center justify-center transition-colors ${
                          state === 'yes'
                            ? 'bg-emerald-500 text-white'
                            : state === 'no'
                            ? 'bg-rose-950 text-rose-300'
                            : 'bg-slate-800/80 text-slate-600 hover:text-slate-400'
                        }`}
                        title={`${f} - ${p}`}
                      >
                        {state === 'yes' ? '✓' : state === 'no' ? '✕' : '·'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Question & Fast Selection Buttons */}
      <div className="bg-[#182346] border border-slate-700/80 rounded-xl p-3.5">
        <div className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
          <span className="text-[#FFE144]">QUESTION:</span>
          <span>{puzzle.question}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {puzzle.options.map((opt) => {
            const isSelected = selectedOption.trim().toLowerCase() === opt.toLowerCase();
            const isCorrect = isSolved && opt.toLowerCase() === puzzle.correctAnswer.toLowerCase();

            return (
              <button
                key={opt}
                type="button"
                onClick={() => onSelectOption(opt)}
                className={`py-2 px-3 rounded-lg font-bold text-sm transition-all text-center flex items-center justify-center gap-1.5 ${
                  isCorrect
                    ? 'bg-[#FFE144] text-[#121832] ring-2 ring-white shadow-md'
                    : isSelected
                    ? 'bg-indigo-600 text-white ring-2 ring-[#FFE144]'
                    : 'bg-[#0F162E] text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-[#FFE144]" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
