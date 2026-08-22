import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { BiomarkerCorrelation } from './BiomarkerCorrelation';

interface FertilityInsightProps {
  headline: string;
  description: string;
  whatThisMeans: string;
  biomarkerTemp: string;
  biomarkerMucus: string;
  biomarkerWindow: string;
}

export const FertilityInsight: React.FC<FertilityInsightProps> = ({
  headline,
  description,
  whatThisMeans,
  biomarkerTemp,
  biomarkerMucus,
  biomarkerWindow,
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-white/80 via-white/70 to-white/60 backdrop-blur-md rounded-[32px] p-5 sm:p-7 border border-white/80 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_20px_60px_-20px_rgba(183,110,199,0.25)] flex flex-col gap-4 sm:gap-5">
      {/* Title with Sparkles */}
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-[#F5489C]" />
        <span className="text-[14px] font-semibold text-[#26214E] leading-5">
          Fertility Insight
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="text-[17px] sm:text-[18px] font-semibold text-[#26214E] leading-[25px]">
        {headline}
      </h2>

      {/* Supporting Description */}
      <p className="text-[13.5px] sm:text-[14px] text-[#716D8D] leading-[22.75px]">
        {description}
      </p>

      {/* Biomarker Correlation Flow */}
      <div className="w-full pt-1">
        <BiomarkerCorrelation
          tempRise={biomarkerTemp}
          mucusType={biomarkerMucus}
          fertilityWindowHours={biomarkerWindow}
        />
      </div>

      {/* "What this means" Notice Card matching Figma 234:1035 */}
      <div className="w-full bg-gradient-to-r from-[#FBF6F7] to-[#FFF4FC] rounded-[18px] p-4 border border-white/80 flex items-start gap-3.5 shadow-sm">
        {/* Info Icon Badge */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFA3AB] to-[#E79BCE] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <Info size={19} strokeWidth={2.2} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-0.5">
          <h4 className="text-[14px] font-semibold text-[#322235]">
            What this means
          </h4>
          <p className="text-[13px] sm:text-[14px] text-[#716474] leading-[22px]">
            {whatThisMeans}
          </p>
        </div>
      </div>
    </div>
  );
};
