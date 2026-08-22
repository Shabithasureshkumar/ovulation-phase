import React from 'react';
import { Droplet, Sparkles } from 'lucide-react';

interface CervicalMucusCardProps {
  mucusType: string;
  mucusDesc: string;
  fertilityWindowText: string;
}

export const CervicalMucusCard: React.FC<CervicalMucusCardProps> = ({
  mucusType,
  mucusDesc,
  fertilityWindowText,
}) => {
  return (
    <div className="w-full lg:w-[325px] flex flex-col gap-4">
      {/* Top Cervical Mucus Card matching Figma 234:936 */}
      <div className="bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[28px] p-5 sm:p-6 border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_20px_60px_-20px_rgba(183,110,199,0.25)] flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-[14px] font-semibold text-[#716D8D] leading-5">
          Cervical Mucus
        </h3>

        {/* Content Row */}
        <div className="flex items-center gap-4 mt-3">
          {/* Gradient Circle with Droplet Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FF6EB4] to-[#BD4BD6] flex items-center justify-center text-white shadow-[0px_10px_25px_-6px_rgba(255,62,166,0.45)] flex-shrink-0">
            <Droplet size={26} className="fill-white/30" />
          </div>

          {/* Description & Badge */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="bg-[#FFEFF6] text-[#F5489C] text-[12px] font-semibold px-3 py-1 rounded-full w-fit">
              {mucusType}
            </div>
            <p className="text-[12px] text-[#716D8D] leading-[18px]">
              {mucusDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom High Fertility Window Card matching Figma 234:953 */}
      <div className="bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[25px] p-4 sm:p-5 border border-white/70 shadow-[0px_1.8px_7.2px_-1.8px_rgba(183,110,199,0.1),0px_18px_54px_-18px_rgba(183,110,199,0.25)] flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF6EB4] to-[#BD4BD6] flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Sparkles size={22} />
          </div>
          <span className="text-[13px] sm:text-[14px] font-bold text-[#26214E] leading-snug">
            {fertilityWindowText}
          </span>
        </div>
      </div>
    </div>
  );
};
