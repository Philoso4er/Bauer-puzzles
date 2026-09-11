import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';

interface TimerWidgetProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isSolved: boolean;
  totalSeconds?: number;
}

export const TimerWidget: React.FC<TimerWidgetProps> = ({
  timeLeft,
  setTimeLeft,
  isActive,
  setIsActive,
  isSolved,
  totalSeconds = 60,
}) => {
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0 && !isSolved) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isSolved, setTimeLeft, setIsActive]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalSeconds);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
  };

  const progressPercent = Math.min(100, Math.max(0, (timeLeft / totalSeconds) * 100));
  const isUrgent = timeLeft <= 15 && timeLeft > 0;

  return (
    <div 
      id="timer-widget"
      className="bg-[#182142] border border-slate-700/80 rounded-xl p-3.5 flex items-center justify-between gap-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
          {/* SVG Countdown Ring */}
          <svg className="w-11 h-11 -rotate-90 transform" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#26335E"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke={isSolved ? '#22c55e' : isUrgent ? '#F59E0B' : '#FFE144'}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Clock className={`w-4 h-4 ${isUrgent ? 'text-amber-400 animate-pulse' : 'text-[#FFE144]'}`} />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {isSolved ? 'Completed!' : timeLeft === 0 ? 'Time Up' : '60s Countdown'}
            </span>
            {isUrgent && !isSolved && (
              <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded animate-pulse">
                Final Seconds
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
            <span className={timeLeft === 0 && !isSolved ? 'text-rose-400' : isUrgent ? 'text-amber-300' : 'text-white'}>
              {timeLeft}
            </span>
            <span className="text-xs font-normal text-slate-400">sec</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTimer}
          disabled={isSolved}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
            isSolved
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : isActive
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600'
              : 'bg-[#FFE144] hover:bg-[#FACC15] text-[#121832] shadow-md shadow-[#FFE144]/10'
          }`}
          title={isActive ? 'Pause timer' : 'Start 60s timer'}
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{timeLeft === totalSeconds ? 'Start Timer' : 'Resume'}</span>
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
          title="Reset countdown to 60 seconds"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
