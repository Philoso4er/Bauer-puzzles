import React from 'react';
import { Flame, Trophy, Zap, Award } from 'lucide-react';
import { GameStats } from '../types';

interface ScoreStreakBarProps {
  stats: GameStats;
}

export const ScoreStreakBar: React.FC<ScoreStreakBarProps> = ({ stats }) => {
  // Purely cosmetic title based on streak / count
  const getCosmeticRank = (streak: number, count: number) => {
    const total = streak * 2 + count;
    if (total >= 10) return { title: 'Master Puzzler', color: 'text-amber-300' };
    if (total >= 5) return { title: 'Sharp Mind', color: 'text-[#FFE144]' };
    if (total >= 2) return { title: 'Keen Eye', color: 'text-emerald-300' };
    return { title: 'Coffee Break Solver', color: 'text-slate-300' };
  };

  const rank = getCosmeticRank(stats.streak, stats.solvedCount);

  return (
    <div 
      id="score-streak-bar"
      className="w-full bg-[#161E3D] border border-slate-700/80 rounded-xl p-3 sm:p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-sm shadow-sm"
    >
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${stats.streak > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
            <Flame className={`w-4 h-4 ${stats.streak > 0 ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Daily Streak
            </div>
            <div className="text-base font-extrabold text-white leading-tight">
              {stats.streak} <span className="text-xs font-normal text-slate-400">in a row</span>
            </div>
          </div>
        </div>

        {/* Puzzles Solved */}
        <div className="flex items-center gap-2 border-l border-slate-700/70 pl-4 sm:pl-6">
          <div className="p-1.5 rounded-lg bg-[#FFE144]/15 text-[#FFE144]">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Puzzles Solved
            </div>
            <div className="text-base font-extrabold text-white leading-tight">
              {stats.solvedCount}
            </div>
          </div>
        </div>

        {/* Best Time */}
        {stats.bestTimeSeconds !== null && (
          <div className="flex items-center gap-2 border-l border-slate-700/70 pl-4 sm:pl-6">
            <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                Best Blitz
              </div>
              <div className="text-base font-extrabold text-white leading-tight font-mono">
                {stats.bestTimeSeconds}s
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cosmetic Rank Badge */}
      <div className="flex items-center gap-1.5 bg-[#1B2347] border border-slate-700 px-3 py-1.5 rounded-full text-xs font-medium ml-auto sm:ml-0">
        <Award className="w-3.5 h-3.5 text-[#FFE144]" />
        <span className="text-slate-400">Rank:</span>
        <span className={`font-bold ${rank.color}`}>{rank.title}</span>
      </div>
    </div>
  );
};
