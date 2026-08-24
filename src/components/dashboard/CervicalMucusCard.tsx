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
    <div className="w-full min-[920px]:w-[270px] lg:w-[290px] xl:w-[310px] 2xl:w-[325px] flex flex-col gap-3.5 sm:gap-4 flex-shrink-0 min-w-0">
      {/* Top Cervical Mucus Card matching Figma 234:936 */}
      <div className="bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 lg:p-6 border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_20px_60px_-20px_rgba(183,110,199,0.25)] flex flex-col justify-between flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#716D8D] leading-5">
          Cervical Mucus
        </h3>

        {/* Content Row */}
        <div className="flex items-center gap-3 sm:gap-4 mt-2.5 sm:mt-3 min-w-0">
          {/* Gradient Circle with Droplet Icon */}
          <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#FF6EB4] to-[#BD4BD6] flex items-center justify-center text-white shadow-[0px_10px_25px_-6px_rgba(255,62,166,0.45)] flex-shrink-0">
            <Droplet size={22} className="fill-white/30" />
          </div>

          {/* Description & Badge */}
          <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0">
            <div className="bg-[#FFEFF6] text-[#F5489C] text-[11px] sm:text-[12px] font-semibold px-2.5 sm:px-3 py-1 rounded-full w-fit max-w-full truncate">
              {mucusType}
            </div>
            <p className="text-[11.5px] sm:text-[12px] text-[#716D8D] leading-snug sm:leading-[18px] break-words">
              {mucusDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom High Fertility Window Card matching Figma 234:953 */}
      <div className="bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-4 lg:p-5 border border-white/70 shadow-[0px_1.8px_7.2px_-1.8px_rgba(183,110,199,0.1),0px_18px_54px_-18px_rgba(183,110,199,0.25)] flex items-center justify-center min-w-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full bg-gradient-to-br from-[#FF6EB4] to-[#BD4BD6] flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Sparkles size={18} />
          </div>
          <span className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] font-bold text-[#26214E] leading-snug truncate">
            {fertilityWindowText}
          </span>
        </div>
      </div>
    </div>
  );
};
