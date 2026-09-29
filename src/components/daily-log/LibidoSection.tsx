import React from 'react';
import { Flame, Heart, Sparkles } from 'lucide-react';
import type { LibidoLevelType } from '../../types/cycle';

interface LibidoSectionProps {
  selectedLibido: LibidoLevelType | null;
  onSelectLibido: (libido: LibidoLevelType) => void;
}

interface LibidoOption {
  level: LibidoLevelType;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}

const OPTIONS: LibidoOption[] = [
  {
    level: 'Low',
    subtitle: 'Calm & resting',
    icon: <Heart size={20} className="text-[#C06BE0]" />,
    iconBg: 'bg-white',
  },
  {
    level: 'Medium',
    subtitle: 'Moderate desire',
    icon: <Sparkles size={20} className="text-[#EF4486]" />,
    iconBg: 'bg-[#FDE3EE]',
  },
  {
    level: 'High',
    subtitle: 'Surging drive',
    icon: <Flame size={20} className="text-[#F43F5E] fill-[#F43F5E]" />,
    iconBg: 'bg-[#FFE4E6]',
  },
];

export const LibidoSection: React.FC<LibidoSectionProps> = ({
  selectedLibido,
  onSelectLibido,
}) => {
  return (
    <section aria-labelledby="libido-title" className="w-full bg-white rounded-[22px] lg:rounded-[26px] p-[clamp(1rem,2.2vw,2rem)] border border-[#F4F1F5] shadow-[0px_8px_30px_-12px_rgba(38,33,78,0.12)] flex-1 min-w-0 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] bg-[#FDECF3] text-[#F43F5E] flex items-center justify-center flex-shrink-0">
            <Flame size={18} className="fill-[#F43F5E]" aria-hidden="true" />
          </div>
          <h3 id="libido-title" className="text-lg lg:text-[18px] font-semibold text-gray-900 leading-tight">
            Libido &amp; Desire Level
          </h3>
        </div>
        <span className="text-sm lg:text-[14px] text-gray-500">Estrogen Peak Metric</span>
      </div>
      <p className="text-sm lg:text-[14px] text-gray-600 mt-4 lg:mt-6">
        Track your natural sex drive and vitality throughout the cycle:
      </p>

      {/* 3 Libido Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5 mt-4 lg:mt-5" role="group" aria-label="Libido level">
        {OPTIONS.map((opt) => {
          const isSelected = selectedLibido === opt.level;

          return (
            <button
              key={opt.level}
              type="button"
              onClick={() => onSelectLibido(opt.level)}
              aria-pressed={isSelected}
              className={`min-w-0 flex flex-col items-center gap-3 px-1.5 pt-3 pb-3 lg:pt-3.5 lg:h-[114px] rounded-[14px] lg:rounded-[14px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                isSelected ? 'border-2 border-[#F0529C] bg-gradient-to-b from-[#FFF4F8] to-[#FDEAF2] shadow-[0px_6px_16px_-6px_rgba(240,82,156,0.35)]' : 'border border-[#EEEAEE] bg-white shadow-[0px_4px_12px_-8px_rgba(38,33,78,0.15)] hover:border-pink-200'
              }`}
            >
              <div aria-hidden="true" className={`w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] flex items-center justify-center ${opt.iconBg}`}>
                {opt.icon}
              </div>
              <span className="mt-auto flex flex-col items-center max-w-full">
                <span className={`text-sm sm:text-base xl:text-[15.5px] font-semibold ${isSelected ? 'text-[#EF4486]' : 'text-gray-900'}`}>
                  {opt.level}
                </span>
                <span className="text-[11px] sm:text-xs xl:text-[13px] text-gray-500 mt-0.5 max-w-full text-center leading-tight">{opt.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="flex items-start gap-2 mt-5 lg:mt-6 text-xs lg:text-[13px] text-gray-600">
        <Sparkles size={16} className="text-[#F472B6] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Libido naturally surges as estrogen rises towards ovulation.</span>
      </div>
    </section>
  );
};
