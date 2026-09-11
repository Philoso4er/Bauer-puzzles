import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto pt-6 pb-12 border-t border-slate-700/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div>
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="font-extrabold text-[#FFE144] tracking-wider uppercase">
            PUZZLE STUDIO
          </span>
          <span>|</span>
          <span className="text-slate-300 font-medium">
            Portfolio concept — Bauer Media application
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Designed by Chidera Ikenna Obi • Content Creator — Puzzle & Digital Content
        </p>
      </div>

      <div className="text-[11px] text-slate-400 font-mono bg-[#0F162E] px-3 py-1.5 rounded-lg border border-slate-700/70">
        Bauer Interactive Concept • 60-Second Puzzle Fix
      </div>
    </footer>
  );
};
