import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface WellnessMetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

export const WellnessMetricCard: React.FC<WellnessMetricCardProps> = ({
  label,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${value}`}
      className="bg-white rounded-[14.4px] p-3 sm:p-4 border border-[#F3F4F6] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 hover:border-pink-200/80 hover:shadow-md transition-all duration-200 cursor-pointer group w-full min-w-0"
    >
      {/* Icon Circle */}
      <div
        className={`w-[36px] h-[36px] sm:w-[38.4px] sm:h-[38.4px] rounded-full flex items-center justify-center ${iconBgColor} transition-transform group-hover:scale-110 flex-shrink-0`}
      >
        <Icon size={18} className={iconColor} strokeWidth={2.2} />
      </div>

      {/* Label */}
      <span className="text-[12px] sm:text-[13.2px] text-[#9CA3AF] leading-4 sm:leading-5 font-normal truncate max-w-full">
        {label}
      </span>

      {/* Value */}
      <span className="text-[14px] sm:text-[15.6px] font-bold text-[#1F2937] leading-tight sm:leading-6 truncate max-w-full">
        {value}
      </span>
    </button>
  );
};
