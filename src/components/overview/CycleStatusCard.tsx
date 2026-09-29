import React from 'react';
import { Sparkles } from 'lucide-react';
import { DEFAULT_PATIENT } from '../../data/cycleData';

interface CycleStatusCardProps {
  cycleDay: number;
  phase: string;
  status: string;
}

// Phase lengths (days) for the ring segments: menstruation, fertile window, ovulation, luteal.
const PHASE_SEGMENTS = [5, 8, 8, 7];
const SEGMENT_STARTS = PHASE_SEGMENTS.map((_, i) => PHASE_SEGMENTS.slice(0, i).reduce((sum, d) => sum + d, 0));
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 7; // arc length left empty between segments

export const CycleStatusCard: React.FC<CycleStatusCardProps> = ({ cycleDay, phase, status }) => {
  const cycleLength = DEFAULT_PATIENT.cycleLengthDays;

  return (
    <div className="w-full bg-white rounded-[22px] lg:rounded-[24px] px-[clamp(1rem,1.8vw,1.375rem)] py-5 border border-[#F3EFF3] shadow-[0px_6px_24px_-12px_rgba(38,33,78,0.12)] flex items-center gap-[clamp(1rem,2vw,1.5rem)]">
      {/* Segmented cycle ring: completed phases in deep pink, upcoming ones light */}
      <div className="relative w-[clamp(6.25rem,9vw,7.5rem)] aspect-square flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          {PHASE_SEGMENTS.map((days, i) => {
            const start = SEGMENT_STARTS[i];
            const length = (days / cycleLength) * CIRCUMFERENCE - GAP;
            const isReached = cycleDay > start;
            return (
              <circle
                key={start}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                stroke={isReached ? '#EC4899' : '#FBCFE8'}
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={-((start / cycleLength) * CIRCUMFERENCE + GAP / 2)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[clamp(1.25rem,1rem+0.6vw,1.375rem)] font-bold text-gray-900 leading-none">{cycleDay}</span>
          <span className="text-[10px] font-medium text-gray-500 tracking-[0.08em] mt-1.5">CYCLE DAY</span>
        </div>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.12em]">Status</span>
        <h3 className="text-[clamp(1rem,0.9rem+0.3vw,1.0625rem)] font-semibold text-gray-900 leading-tight mt-2">{phase}</h3>
        <span className="text-[clamp(1rem,0.9rem+0.3vw,1.0625rem)] font-semibold text-[#F0529C] leading-tight mt-1.5">{status}</span>
        <span className="inline-flex items-center gap-1 mt-3 h-6 px-2.5 bg-[#FDEFF5] rounded-full text-[11px] font-medium text-[#EF4486] w-fit">
          <Sparkles size={11} className="text-[#F5B83D]" aria-hidden="true" />
          AI Summary Ready
        </span>
      </div>
    </div>
  );
};
