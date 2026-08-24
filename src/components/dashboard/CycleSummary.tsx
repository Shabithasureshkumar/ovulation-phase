import React from 'react';
import { Droplet, Sparkles, Calendar, Moon } from 'lucide-react';
import type { CycleSummaryInfo, CyclePhase } from '../../types/periodTracker';

interface CycleSummaryProps {
  summary: CycleSummaryInfo;
}

const PHASE_THEMES: Record<
  CyclePhase,
  {
    bg: string;
    border: string;
    textColor: string;
    iconBg: string;
    icon: React.ReactNode;
  }
> = {
  Ovulation: {
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#DCFCE7]',
    textColor: 'text-[#16A34A]',
    iconBg: 'bg-[#DCFCE7]',
    icon: <Sparkles size={17} className="text-[#16A34A]" />,
  },
  'Fertile Window': {
    bg: 'bg-[#EFF6FF]',
    border: 'border-[#DBEAFE]',
    textColor: 'text-[#2563EB]',
    iconBg: 'bg-[#DBEAFE]',
    icon: <Calendar size={17} className="text-[#2563EB]" />,
  },
  'Luteal Phase': {
    bg: 'bg-[#FAF5FF]',
    border: 'border-[#F3E8FF]',
    textColor: 'text-[#9333EA]',
    iconBg: 'bg-[#F3E8FF]',
    icon: <Moon size={17} className="text-[#9333EA]" />,
  },
  Menstruation: {
    bg: 'bg-[#FEF2F2]',
    border: 'border-[#FEE2E2]',
    textColor: 'text-[#EF4444]',
    iconBg: 'bg-[#FEE2E2]',
    icon: <Droplet size={17} className="fill-[#EF4444] text-[#EF4444]" />,
  },
};

export const CycleSummary: React.FC<CycleSummaryProps> = ({ summary }) => {
  const currentTheme = PHASE_THEMES[summary.currentPhase] ?? PHASE_THEMES.Ovulation;

  return (
    <div className="w-full pt-4 min-w-0">
      {/* Title */}
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Cycle Summary
      </h3>

      <div className="space-y-2.5 min-w-0">
        {/* Dynamic Current Phase Card */}
        <div
          className={`${currentTheme.bg} rounded-[14.4px] p-3 border ${currentTheme.border} flex items-center justify-between transition hover:shadow-sm`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-[33.6px] h-[33.6px] rounded-full ${currentTheme.iconBg} flex items-center justify-center flex-shrink-0`}
            >
              {currentTheme.icon}
            </div>
            <div className="min-w-0">
              <span className="block text-[12px] text-[#6B7280] leading-none mb-1">
                Current Phase
              </span>
              <span className={`text-[14.4px] font-bold ${currentTheme.textColor} leading-tight block truncate`}>
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
          <div className="flex flex-col min-w-0">
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
          <div className="flex flex-col min-w-0">
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
          <div className="flex flex-col min-w-0">
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
