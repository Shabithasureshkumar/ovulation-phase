import React from 'react';
import { Zap, Info } from 'lucide-react';
import type { EnergyLevelType } from '../../types/cycle';

interface EnergySectionProps {
  selectedEnergy: EnergyLevelType | null;
  onSelectEnergy: (energy: EnergyLevelType) => void;
}

interface EnergyOption {
  level: EnergyLevelType;
  /** Tailwind classes for the bolt's stroke and fill. */
  boltClass: string;
}

const ENERGY_OPTIONS: EnergyOption[] = [
  { level: 'Low', boltClass: 'text-[#F9A8CB] fill-[#FBCFE0]' },
  { level: 'Moderate', boltClass: 'text-[#E5A400] fill-[#FACC15]' },
  { level: 'High', boltClass: 'text-[#F2555A] fill-[#F87171]' },
];

export const EnergySection: React.FC<EnergySectionProps> = ({
  selectedEnergy,
  onSelectEnergy,
}) => {
  return (
    <section aria-labelledby="energy-title" className="w-full bg-gradient-to-b from-white to-[#FDF3F8] rounded-[20px] lg:rounded-[20px] p-4 lg:p-5 lg:pb-12 border border-[#F8E7EF] shadow-[0px_6px_20px_-10px_rgba(239,68,134,0.2)] flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full bg-[#FDECF3] flex items-center justify-center flex-shrink-0">
          <Zap size={34} strokeWidth={1.5} className="w-7 h-7 lg:w-8 lg:h-8 text-[#F472B6] fill-[#F9A8CB]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 id="energy-title" className="text-lg lg:text-[18px] font-semibold text-gray-900 leading-tight">
            Energy Level
          </h3>
          <p className="text-sm lg:text-[14px] text-gray-500 mt-1">How is your energy today?</p>
        </div>
        <span title="Rate your physical energy right now" className="text-gray-400 self-center ml-1 lg:ml-3">
          <Info size={18} aria-hidden="true" />
        </span>
      </div>

      {/* 3 Energy Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 lg:mt-5" role="group" aria-label="Energy level">
        {ENERGY_OPTIONS.map((opt) => {
          const isSelected = selectedEnergy === opt.level;

          return (
            <button
              key={opt.level}
              type="button"
              onClick={() => onSelectEnergy(opt.level)}
              aria-pressed={isSelected}
              className={`min-w-0 flex flex-col items-center justify-center px-2 py-4 lg:h-[116px] rounded-[12px] lg:rounded-[12px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-2 border-[#F0529C] bg-gradient-to-b from-[#FFF4F8] to-[#FDEAF2] shadow-[0px_6px_16px_-6px_rgba(240,82,156,0.35)]'
                  : 'border border-[#EEEAEE] bg-white hover:border-pink-200'
              }`}
            >
              <Zap size={44} strokeWidth={1.25} className={`w-9 h-9 lg:w-10 lg:h-10 ${opt.boltClass}`} aria-hidden="true" />
              <span
                className={`text-xs sm:text-sm lg:text-[14px] mt-2 lg:mt-3 ${
                  isSelected ? 'text-[#EF4486] font-medium' : 'text-gray-500'
                }`}
              >
                {opt.level}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
