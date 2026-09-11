import React, { useState } from 'react';
import { WordsearchPuzzle } from '../../types';
import { Check, Info } from 'lucide-react';

interface WordsearchViewProps {
  puzzle: WordsearchPuzzle;
  isSolved: boolean;
  onSolveDirect: () => void;
}

export const WordsearchView: React.FC<WordsearchViewProps> = ({
  puzzle,
  isSolved,
  onSolveDirect,
}) => {
  const [selectedCells, setSelectedCells] = useState<string[]>([]);

  // Coordinate key helper
  const cellKey = (r: number, c: number) => `${r}-${c}`;

  const isCellSolution = (r: number, c: number) => {
    return puzzle.solutionCoords.some((coord) => coord.r === r && coord.c === c);
  };

  const isCellSelected = (r: number, c: number) => {
    return selectedCells.includes(cellKey(r, c));
  };

  const handleCellClick = (r: number, c: number) => {
    if (isSolved) return;
    const key = cellKey(r, c);
    let newSelected: string[];
    if (selectedCells.includes(key)) {
      newSelected = selectedCells.filter((k) => k !== key);
    } else {
      newSelected = [...selectedCells, key];
    }
    setSelectedCells(newSelected);

    // Check if all solution cells are selected
    const allSelected = puzzle.solutionCoords.every((coord) =>
      newSelected.includes(cellKey(coord.r, coord.c))
    );
    if (allSelected && newSelected.length === puzzle.solutionCoords.length) {
      onSolveDirect();
    }
  };

  const clearSelection = () => {
    setSelectedCells([]);
  };

  return (
    <div className="flex flex-col items-center w-full" id="wordsearch-view">
      {/* Target Clue & Instructions */}
      <div className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl p-3 mb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFE144] text-[#121832] font-black text-xs px-2.5 py-1 rounded">
            TARGET
          </span>
          <span className="text-sm font-semibold text-slate-100">
            {puzzle.targetClue}
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#FFE144]" />
          <span>Click letters in the grid or type the word below</span>
        </div>
      </div>

      {/* The Wordsearch Grid */}
      <div className="inline-block p-3 bg-[#0F162E] rounded-2xl border-2 border-slate-700/80 shadow-inner">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {puzzle.grid.map((row, rIdx) =>
            row.map((char, cIdx) => {
              const selected = isCellSelected(rIdx, cIdx);
              const solutionCell = isSolved && isCellSolution(rIdx, cIdx);

              return (
                <button
                  key={cellKey(rIdx, cIdx)}
                  type="button"
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg font-mono font-bold text-base sm:text-lg flex items-center justify-center transition-all duration-150 select-none ${
                    solutionCell
                      ? 'bg-[#FFE144] text-[#121832] scale-105 shadow-md shadow-[#FFE144]/30 ring-2 ring-white font-black'
                      : selected
                      ? 'bg-[#FFE144] text-[#121832] font-extrabold scale-105'
                      : 'bg-[#182142] text-slate-100 hover:bg-slate-700 border border-slate-700/60 hover:border-slate-500 active:scale-95'
                  }`}
                  aria-label={`Row ${rIdx + 1} Col ${cIdx + 1}: ${char}`}
                >
                  {char}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Selected word helper */}
      <div className="flex items-center justify-between w-full max-w-sm mt-3 px-1 text-xs text-slate-400">
        <span>Selected: {selectedCells.length} / {puzzle.solutionCoords.length} letters</span>
        {selectedCells.length > 0 && !isSolved && (
          <button
            type="button"
            onClick={clearSelection}
            className="text-amber-400 hover:underline"
          >
            Clear grid selection
          </button>
        )}
      </div>

      {isSolved && (
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 rounded-full">
          <Check className="w-4 h-4" />
          <span>Target Word Found: {puzzle.targetWord}!</span>
        </div>
      )}
    </div>
  );
};
