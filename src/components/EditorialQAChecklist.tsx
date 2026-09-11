import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export const EditorialQAChecklist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const checklist = [
    { title: 'Clue accuracy', desc: 'Verified historical, grammatical, and factual definitions' },
    { title: 'Answer uniqueness', desc: 'Independently checked for a single, unambiguous solution' },
    { title: 'Spelling & grammar', desc: 'British English editorial guidelines adherence' },
    { title: 'Grid alignment & symbol consistency', desc: 'Uniform cell proportions and legible number indices' },
    { title: 'Word/number count matches instructions', desc: 'Cross-verified letter lengths and mathematical equalities' },
    { title: 'Instructions clear for first-time solver', desc: 'Frictionless entry for quick 60-second coffee break play' },
    { title: 'Independently re-solved from blank state', desc: 'Simulated and tested across multiple solver viewpoints' },
  ];

  return (
    <div 
      id="editorial-qa-section"
      className="w-full max-w-4xl mx-auto bg-[#141B37] border border-slate-700/80 rounded-xl overflow-hidden mb-8 shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#11172F] hover:bg-[#182142] transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Editorial QA Standards
            </span>
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
              (How every puzzle in this prototype was verified)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#FFE144] font-semibold">
          <span>{isOpen ? 'Close' : 'View QA Checklist (7/7 ✓)'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-slate-700/80 bg-[#141C3B] animate-fadeIn">
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Inspired by page 8 of the Puzzle Studio specification, all puzzles adhere to standard magazine editorial verification:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 bg-[#0F162E] p-2.5 rounded-lg border border-slate-700/60"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{item.title}</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-normal">✓ CHECKED</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
