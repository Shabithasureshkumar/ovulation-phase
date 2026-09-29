import React from 'react';
import { Droplets, Sparkles } from 'lucide-react';
import type { CervicalMucusType } from '../../types/cycle';
import mucusDry from '../../assets/mucus_dry.png';
import mucusSticky from '../../assets/mucus_sticky.png';
import mucusCreamy from '../../assets/mucus_creamy.png';
import mucusWatery from '../../assets/mucus_watery.png';
import mucusEggWhite from '../../assets/mucus_eggwhite.png';

interface CervicalMucusSectionProps {
  selectedMucus: CervicalMucusType | null;
  onSelectMucus: (type: CervicalMucusType) => void;
}

interface MucusOption {
  type: CervicalMucusType;
  subtitle: string;
  /** Cycle stage this consistency typically signals. */
  stage: string;
  badgeText: string;
  badgeStyle: string;
  image: string;
}

const MUCUS_OPTIONS: MucusOption[] = [
  {
    type: 'Dry',
    image: mucusDry,
    stage: 'Early Follicular Phase',
    subtitle: 'Minimal moisture',
    badgeText: 'Low fertility',
    badgeStyle: 'bg-[#F3F4F6] text-gray-700',
  },
  {
    type: 'Sticky',
    image: mucusSticky,
    stage: 'Follicular Phase',
    subtitle: 'Adhesive / Tacky',
    badgeText: 'Low fertility',
    badgeStyle: 'bg-[#FEF6E7] text-[#C2780A]',
  },
  {
    type: 'Creamy',
    image: mucusCreamy,
    stage: 'Follicular Phase',
    subtitle: 'Lotion-like',
    badgeText: 'Transitional',
    badgeStyle: 'bg-[#EF4486] text-white',
  },
  {
    type: 'Watery',
    image: mucusWatery,
    stage: 'Fertile Window',
    subtitle: 'Clear & fluid',
    badgeText: 'High fertility',
    badgeStyle: 'bg-[#EEF4FF] text-[#2F6FE4]',
  },
  {
    type: 'Egg White',
    image: mucusEggWhite,
    stage: 'Ovulation Phase',
    subtitle: 'Stretchy & clear',
    badgeText: 'Peak fertility',
    badgeStyle: 'bg-[#FBEFFB] text-[#C026D3]',
  },
];

export const CervicalMucusSection: React.FC<CervicalMucusSectionProps> = ({
  selectedMucus,
  onSelectMucus,
}) => {
  const selectedOption = MUCUS_OPTIONS.find((opt) => opt.type === selectedMucus);

  return (
    <section aria-labelledby="mucus-title" className="w-full bg-white rounded-[22px] lg:rounded-[26px] p-[clamp(1rem,2.4vw,2.2rem)] border border-[#F4F1F5] shadow-[0px_8px_30px_-12px_rgba(38,33,78,0.12)]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3 lg:gap-3.5 min-w-0">
          <div className="w-9 h-9 lg:w-[39px] lg:h-[39px] rounded-full bg-[#FDECF3] text-[#EF4486] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Droplets size={20} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 id="mucus-title" className="text-lg sm:text-xl lg:text-[18.5px] font-semibold text-gray-900 leading-tight">
              Cervical Mucus &amp; Discharge
            </h3>
            <p className="text-sm lg:text-[14.5px] text-gray-600 mt-1">
              Key indicator of natural fertility and estrogen progression
            </p>
          </div>
        </div>

        {/* Stage pill reflects the logged consistency */}
        {selectedOption && (
          <div className="inline-flex items-center gap-2 h-9 lg:h-10 px-3 lg:px-4 bg-[#FBF5FF] border border-[#E9D5FF] rounded-full text-sm lg:text-[13px] font-medium text-[#9333EA]">
            <Sparkles size={16} aria-hidden="true" />
            <span>
              {selectedOption.stage}: {selectedOption.badgeText}
            </span>
          </div>
        )}
      </div>

      {/* 5 Option Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-[15px] mt-5 lg:mt-6" role="group" aria-label="Cervical mucus consistency">
        {MUCUS_OPTIONS.map((opt) => {
          const isSelected = selectedMucus === opt.type;

          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => onSelectMucus(opt.type)}
              aria-pressed={isSelected}
              className={`relative rounded-[16px] lg:rounded-[15px] px-2 pt-4 pb-4 lg:pt-5 lg:pb-5 min-h-[180px] xl:min-h-[184px] flex flex-col items-center text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FFF4F8] to-[#FDEAF2] border-2 border-[#F0529C] shadow-[0px_8px_22px_-6px_rgba(240,82,156,0.35)]'
                  : 'bg-gradient-to-b from-white to-[#FDFAFC] border border-[#F2EEF2] shadow-[0px_4px_14px_-8px_rgba(38,33,78,0.12)] hover:border-pink-200'
              }`}
            >
              {isSelected && (
                <span aria-hidden="true" className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#EF4486]" />
              )}

              <img src={opt.image} alt="" className="w-14 h-14 lg:w-[60px] lg:h-[60px] object-contain" />

              <h4 className={`text-base xl:text-[15.5px] font-bold mt-2.5 lg:mt-3 ${isSelected ? 'text-[#EF4486]' : 'text-gray-900'}`}>
                {opt.type}
              </h4>
              <p className="text-xs sm:text-sm xl:text-[13.5px] text-gray-500 mt-0.5 lg:mt-1 mb-3">
                {opt.subtitle}
              </p>

              <span className={`text-xs lg:text-[12px] font-semibold px-2.5 lg:px-3 py-1 rounded-[6px] mt-auto ${opt.badgeStyle}`}>
                {opt.badgeText}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
