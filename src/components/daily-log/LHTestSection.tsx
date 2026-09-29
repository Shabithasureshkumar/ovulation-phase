import React from 'react';
import { TestTube, Info } from 'lucide-react';
import type { LHResultType } from '../../types/cycle';

interface LHTestSectionProps {
  selectedResult: LHResultType | null;
  onSelectResult: (result: LHResultType) => void;
}

interface LHTestOption {
  type: LHResultType;
  threshold: string;
  testIntensity: number; // 0 to 1
}

const LH_OPTIONS: LHTestOption[] = [
  {
    type: 'Negative',
    threshold: '< 10 mIU',
    testIntensity: 0,
  },
  {
    type: 'Low',
    threshold: '10–25 mIU',
    testIntensity: 0.35,
  },
  {
    type: 'High',
    threshold: '25–40 mIU',
    testIntensity: 0.7,
  },
  {
    type: 'Peak',
    threshold: '≥ 40 mIU',
    testIntensity: 1.0,
  },
];

export const LHTestSection: React.FC<LHTestSectionProps> = ({
  selectedResult,
  onSelectResult,
}) => {
  return (
    <section aria-labelledby="lh-title" className="w-full bg-white rounded-[22px] lg:rounded-[26px] p-[clamp(1rem,2.2vw,2rem)] border border-[#F4F1F5] shadow-[0px_8px_30px_-12px_rgba(38,33,78,0.12)] flex-1 min-w-0 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] bg-[#FDECF3] text-[#EF4486] flex items-center justify-center flex-shrink-0">
            <TestTube size={18} aria-hidden="true" />
          </div>
          <h3 id="lh-title" className="text-lg lg:text-[18px] font-semibold text-gray-900 leading-tight">
            LH / Ovulation Test
          </h3>
        </div>
        <span className="text-sm lg:text-[14px] text-gray-500">OPK Strip Tracker</span>
      </div>
      <p className="text-sm lg:text-[14px] text-gray-600 mt-4 lg:mt-6">
        Log your daily ovulation predictor kit test line intensity:
      </p>

      {/* 4 Strip Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:gap-3 mt-4 lg:mt-5" role="group" aria-label="LH test result">
        {LH_OPTIONS.map((opt) => {
          const isSelected = selectedResult === opt.type;

          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => onSelectResult(opt.type)}
              aria-pressed={isSelected}
              className={`min-w-0 flex flex-col items-center gap-3 px-2 pt-3 pb-3 lg:pt-3.5 lg:h-[114px] rounded-[14px] lg:rounded-[14px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                isSelected ? 'border-2 border-[#F0529C] bg-gradient-to-b from-[#FFF4F8] to-[#FDEAF2] shadow-[0px_6px_16px_-6px_rgba(240,82,156,0.35)]' : 'border border-[#EEEAEE] bg-white shadow-[0px_4px_12px_-8px_rgba(38,33,78,0.15)] hover:border-pink-200'
              }`}
            >
              {/* Visual Strip Indicator */}
              <div aria-hidden="true" className="w-14 lg:w-[53px] h-5 bg-white border border-[#EDE4EA] rounded-[4px] px-2 flex items-center justify-around">
                <div className="w-[3px] h-3 bg-[#EF4486] rounded-sm" />
                <div className="w-[3px] h-3 bg-[#EF4486] rounded-sm" style={{ opacity: opt.testIntensity }} />
              </div>

              <span className="mt-auto flex flex-col items-center">
                <span className={`text-sm sm:text-base xl:text-[15.5px] font-semibold ${isSelected ? 'text-[#EF4486]' : 'text-gray-900'}`}>
                  {opt.type}
                </span>
                <span className="text-xs xl:text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">{opt.threshold}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="flex items-start gap-2 mt-5 lg:mt-6 text-xs lg:text-[13px] text-gray-600">
        <Info size={16} className="text-[#F472B6] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Peak LH stimulates egg release within 24 to 36 hours.</span>
      </div>
    </section>
  );
};
