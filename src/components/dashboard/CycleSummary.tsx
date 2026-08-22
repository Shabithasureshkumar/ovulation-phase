import React from 'react';
import { Droplet, Sparkles, Calendar, Moon } from 'lucide-react';
import { CycleSummaryInfo } from '../../types/periodTracker';

interface CycleSummaryProps {
  summary: CycleSummaryInfo;
}

export const CycleSummary: React.FC<CycleSummaryProps> = ({ summary }) => {
  return (
    <div className="w-full pt-4">
      {/* Title */}
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Cycle Summary
      </h3>

      <div className="space-y-2.5">
        {/* Current Phase Card */}
        <div className="bg-[#FEF2F2] rounded-[14.4px] p-3 border border-[#FEE2E2] flex items-center justify-between transition hover:shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#EF4444]">
              <Droplet size={17} className="fill-[#EF4444]" />
            </div>
            <div>
              <span className="block text-[12px] text-[#6B7280] leading-none mb-1">
                Current Phase
              </span>
              <span className="text-[14.4px] font-bold text-[#EF4444] leading-tight">
                {summary.currentPhase}
              </span>
            </div>
          </div>
        </div>

        {/* Ovulation Prediction Card */}
        <div className="bg-[#F9FAFB] rounded-[14.4px] p-3 border border-[#F3F4F6] flex items-center gap-2.5 transition hover:shadow-sm">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#22C55E] flex-shrink-0">
            <Sparkles size={17} />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#6B7280] leading-none mb-1">
              Ovulation
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-tight">
              Predicted on
            </span>
            <span className="text-[12px] text-[#6B7280] leading-tight mt-0.5">
              {summary.ovulationDate}
            </span>
          </div>
        </div>

        {/* Fertile Window Card */}
        <div className="bg-[#F9FAFB] rounded-[14.4px] p-3 border border-[#F3F4F6] flex items-center gap-2.5 transition hover:shadow-sm">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#3B82F6] flex-shrink-0">
            <Calendar size={17} />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#6B7280] leading-none mb-1">
              Fertile Window
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-tight">
              {summary.fertileWindow}
            </span>
          </div>
        </div>

        {/* Luteal Phase Card */}
        <div className="bg-[#F9FAFB] rounded-[14.4px] p-3 border border-[#F3F4F6] flex items-center gap-2.5 transition hover:shadow-sm">
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#A855F7] flex-shrink-0">
            <Moon size={17} />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#6B7280] leading-none mb-1">
              Luteal Phase
            </span>
            <span className="text-[13.2px] font-semibold text-[#374151] leading-tight">
              {summary.lutealPhase}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
