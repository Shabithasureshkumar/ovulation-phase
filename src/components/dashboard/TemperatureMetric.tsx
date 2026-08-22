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
    <div className="flex-1 bg-gradient-to-b from-white/75 to-white/55 backdrop-blur-md rounded-[32px] p-5 sm:p-7 border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_20px_60px_-20px_rgba(183,110,199,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left Info Column */}
      <div className="flex-1 flex flex-col justify-between h-full gap-3 w-full">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-[#008E3E]/15 rounded-full px-3 py-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008E3E]" />
          <span className="text-[12px] font-semibold text-[#006836] leading-none">
            {tempStatus}
          </span>
        </div>

        {/* Narrative Description Card */}
        <div className="bg-gradient-to-b from-white/65 to-[#FFF5FA]/45 rounded-[22px] p-3.5 border border-white/60">
          <p className="text-[14px] leading-[22.75px] text-[#716D8D]">
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
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <span className="block text-[12px] text-[#716D8D] leading-4">
              Time Measured
            </span>
            <span className="text-[16px] font-semibold text-[#26214E] leading-6">
              {measuredTime}
            </span>
          </div>
          <div>
            <span className="block text-[12px] text-[#716D8D] leading-4">
              Device
            </span>
            <span className="text-[16px] font-semibold text-[#26214E] leading-6 truncate block" title={device}>
              {device}
            </span>
          </div>
        </div>
      </div>

      {/* Right Circular Temperature Gauge Display matching Figma 234:913 */}
      <div className="flex-shrink-0 relative flex items-center justify-center p-3">
        {/* Outer Glow Ring */}
        <div className="w-[190px] h-[190px] sm:w-[213px] sm:h-[213px] rounded-full bg-white border-[10px] sm:border-[11px] border-[#FFD9EE] shadow-[0px_1px_31px_rgba(215,6,142,0.4),inset_0px_2px_4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 via-transparent to-purple-100/30 pointer-events-none" />

          {/* Thermometer Icon Container */}
          <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#F5489C] mb-1 z-10">
            <Thermometer size={17} strokeWidth={2.5} />
          </div>

          {/* Large Temperature Value */}
          <div className="text-[32px] sm:text-[36px] font-bold text-[#26214E] tracking-[-0.9px] leading-tight z-10 font-sans">
            {temperatureF.toFixed(2)}°F
          </div>

          {/* Sub Value Rise */}
          <div className="text-[13.5px] sm:text-[14px] font-semibold text-[#F5489C] leading-tight mt-0.5 z-10">
            {formattedTempRise}
          </div>

          {/* Above Baseline Label */}
          <div className="text-[11.5px] sm:text-[12px] text-[#716D8D] leading-tight mt-0.5 z-10">
            {tempStatus}
          </div>
        </div>
      </div>
    </div>
  );
};
