import React from 'react';
import meditation from '../../assets/meditation.png';

interface PhaseInfoCardProps {
  onViewTips: () => void;
  onLogPeriod: () => void;
}

export const PhaseInfoCard: React.FC<PhaseInfoCardProps> = ({ onViewTips, onLogPeriod }) => {
  return (
    <div className="w-full bg-white rounded-[22px] lg:rounded-[24px] pl-[clamp(1rem,1.8vw,1.375rem)] pr-3 py-5 border border-[#F3EFF3] shadow-[0px_6px_24px_-12px_rgba(38,33,78,0.12)] flex items-center justify-between gap-4 overflow-hidden">
      <div className="min-w-0 max-w-[400px]">
        <h2 className="text-[clamp(0.9375rem,0.85rem+0.3vw,1rem)] font-semibold text-gray-900 leading-tight">
          You&apos;re in your ovulation phase
        </h2>
        <p className="text-[12.5px] text-gray-500 leading-[1.6] mt-3">
          Your body is at its most fertile right now. Estrogen is high, and you may notice clearer cervical mucus, a rise in basal body temperature and increased energy.
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            type="button"
            onClick={onViewTips}
            aria-haspopup="dialog"
            className="touch-target h-[34px] px-4 bg-gradient-to-r from-[#EC4899] to-[#F472B6] hover:from-[#DB2777] hover:to-[#EC4899] text-white text-[13px] font-medium rounded-full shadow-[0px_4px_12px_rgba(236,72,153,0.3)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            View Tips
          </button>
          <button
            type="button"
            onClick={onLogPeriod}
            className="touch-target h-[34px] px-4 bg-[#FDEBF3] hover:bg-[#FBDDEA] text-[#EC4899] text-[13px] font-medium rounded-full transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            Log period
          </button>
        </div>
      </div>

      <img
        src={meditation}
        alt=""
        className="w-[clamp(4.5rem,10vw,8.5rem)] h-auto object-contain flex-shrink-0 asset-blend"
      />
    </div>
  );
};
