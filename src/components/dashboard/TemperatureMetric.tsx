import React from 'react';
import { Thermometer } from 'lucide-react';

interface TemperatureMetricProps {
  temperatureF: number;
  tempAboveBaselineC: number;
  tempStatus: string;
  measuredTime: string;
  device: string;
  description?: string;
}

export const TemperatureMetric: React.FC<TemperatureMetricProps> = ({
  temperatureF,
  tempAboveBaselineC,
  tempStatus,
  measuredTime,
  device,
  description,
}) => {
  const isPositive = tempAboveBaselineC >= 0;
  const formattedTempRise = `${isPositive ? '+' : ''}${tempAboveBaselineC.toFixed(2)}°C`;

  return (
    <div className="flex-1 bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[26px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_20px_60px_-20px_rgba(183,110,199,0.25)] flex flex-col min-[520px]:flex-row items-center justify-between gap-4 sm:gap-6 min-w-0">
      {/* Left Info / Narrative Column */}
      <div className="flex-1 flex flex-col justify-between gap-3 w-full min-w-0">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-[#008E3E]/15 rounded-full px-3 py-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008E3E]" />
          <span className="text-[12px] font-semibold text-[#006836] leading-none">
            {tempStatus}
          </span>
        </div>

        {/* Narrative Description Card */}
        <div className="bg-gradient-to-b from-white/65 to-[#FFF5FA]/45 rounded-[20px] p-3 sm:p-3.5 border border-white/60 min-w-0">
          <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#716D8D] break-words">
            {description ? (
              description
            ) : (
              <>
                Your body temperature is{' '}
                <strong className="text-[#26214E] font-semibold">
                  {Math.abs(tempAboveBaselineC).toFixed(2)}°C {tempAboveBaselineC >= 0 ? 'above' : 'below'}
                </strong>{' '}
                your baseline. This rise supports that ovulation may be near.
              </>
            )}
          </p>
        </div>

        {/* Measurement Metadata */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-0.5 min-w-0">
          <div className="min-w-0">
            <span className="block text-[11px] sm:text-[12px] text-[#716D8D] leading-4">
              Time Measured
            </span>
            <span className="text-[13.5px] sm:text-[15px] font-semibold text-[#26214E] leading-tight truncate block mt-0.5">
              {measuredTime}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] sm:text-[12px] text-[#716D8D] leading-4">
              Device
            </span>
            <span
              className="text-[13.5px] sm:text-[15px] font-semibold text-[#26214E] leading-tight truncate block mt-0.5"
              title={device}
            >
              {device}
            </span>
          </div>
        </div>
      </div>

      {/* Right Circular Temperature Gauge Display matching Figma 234:913 */}
      <div className="flex-shrink-0 relative flex items-center justify-center p-1 sm:p-2">
        {/* Outer Glow Ring with fluid responsive scaling */}
        <div className="w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] lg:w-[195px] lg:h-[195px] xl:w-[205px] xl:h-[205px] rounded-full bg-white border-[7px] sm:border-[9px] lg:border-[10px] border-[#FFD9EE] shadow-[0px_1px_28px_rgba(215,6,142,0.35),inset_0px_2px_4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 via-transparent to-purple-100/30 pointer-events-none" />

          {/* Thermometer Icon Container */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F5489C] mb-0.5 z-10">
            <Thermometer size={14} strokeWidth={2.5} />
          </div>

          {/* Large Temperature Value */}
          <div className="text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[34px] font-bold text-[#26214E] tracking-tight leading-tight z-10 font-sans">
            {temperatureF.toFixed(2)}°F
          </div>

          {/* Sub Value Rise */}
          <div className="text-[12px] sm:text-[13px] font-semibold text-[#F5489C] leading-tight mt-0.5 z-10">
            {formattedTempRise}
          </div>

          {/* Above Baseline Label */}
          <div className="text-[10.5px] sm:text-[11.5px] text-[#716D8D] leading-tight mt-0.5 z-10">
            {tempStatus}
          </div>
        </div>
      </div>
    </div>
  );
};
