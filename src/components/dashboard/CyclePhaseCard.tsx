import React, { useState } from 'react';
import { Pencil, MoreHorizontal, Sparkles, RefreshCw, Calendar, FileText } from 'lucide-react';
import type { DayLogEntry } from '../../types/periodTracker';
import { TemperatureMetric } from './TemperatureMetric';
import { CervicalMucusCard } from './CervicalMucusCard';
import { FertilityInsight } from './FertilityInsight';

interface CyclePhaseCardProps {
  dayLog: DayLogEntry;
  onEditLog: () => void;
  onSelectToday?: () => void;
}

export const CyclePhaseCard: React.FC<CyclePhaseCardProps> = ({
  dayLog,
  onEditLog,
  onSelectToday,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="w-full bg-[#FF7FAF]/20 sm:bg-[hsla(341,100%,75%,0.25)] backdrop-blur-md rounded-[28px] sm:rounded-[36px] lg:rounded-[41px] p-4 sm:p-6 lg:p-7 border border-pink-200/40 shadow-[0px_10px_30px_-10px_rgba(239,68,134,0.15)] flex flex-col gap-5 sm:gap-6 min-w-0">
      {/* Card Header matching Figma 234:860 */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
        {/* Left Phase Title & Date */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Phase Icon Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[16px] sm:rounded-[18px] bg-white/75 backdrop-blur-md border border-white/70 shadow-[0px_10px_30px_-10px_rgba(183,110,199,0.25)] flex items-center justify-center text-[#EF4486] flex-shrink-0">
            <Sparkles size={20} className="fill-[#EF4486]/20" />
          </div>

          <div className="min-w-0">
            <h2 className="text-[19px] sm:text-[22px] lg:text-[24px] font-bold text-[#26214E] tracking-tight leading-tight truncate">
              {dayLog.phase === 'Ovulation' ? 'Ovulation Phase' : `${dayLog.phase} Phase`}
            </h2>
            <p className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] text-[#716D8D] leading-5 mt-0.5 truncate">
              {dayLog.displayDate}
            </p>
          </div>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 relative">
          {/* Edit Log Button */}
          <button
            type="button"
            onClick={onEditLog}
            aria-label="Edit Daily Log"
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 lg:py-3 rounded-[16px] sm:rounded-[18px] bg-gradient-to-b from-white/85 to-white/60 hover:from-white hover:to-white/80 backdrop-blur-md border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_10px_25px_-10px_rgba(183,110,199,0.25)] flex items-center gap-2 transition active:scale-95 group"
          >
            <Pencil size={15} className="text-[#F5489C] group-hover:rotate-12 transition-transform" />
            <span className="text-[13px] sm:text-[14px] font-medium text-[#26214E]">
              Edit Log
            </span>
          </button>

          {/* More Options Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              aria-label="More cycle phase options"
              title="More Options"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-[16px] sm:rounded-[18px] bg-gradient-to-b from-white/85 to-white/60 hover:from-white hover:to-white/80 backdrop-blur-md border border-white/70 shadow-[0px_2px_8px_-2px_rgba(183,110,199,0.1),0px_10px_25px_-10px_rgba(183,110,199,0.25)] flex items-center justify-center text-[#26214E] transition active:scale-95"
            >
              <MoreHorizontal size={19} />
            </button>

            {/* Options Dropdown */}
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(false);
                    onEditLog();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition flex items-center gap-2"
                >
                  <FileText size={14} />
                  <span>Log Biomarkers</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(false);
                    onSelectToday?.();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition flex items-center gap-2"
                >
                  <Calendar size={14} />
                  <span>Jump to Today</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  <span>Sync Thermometer</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cards Row: Temperature Metric + Cervical Mucus Column */}
      <div className="flex flex-col min-[920px]:flex-row items-stretch gap-4 sm:gap-5 min-w-0">
        <TemperatureMetric
          temperatureF={dayLog.temperatureF}
          tempAboveBaselineC={dayLog.tempAboveBaselineC}
          tempStatus={dayLog.tempStatus}
          measuredTime={dayLog.tempMeasuredTime}
          device={dayLog.tempDevice}
          description={dayLog.tempDescription}
        />

        <CervicalMucusCard
          mucusType={dayLog.cervicalMucusType}
          mucusDesc={dayLog.cervicalMucusDesc}
          fertilityWindowText={dayLog.fertilityWindow}
        />
      </div>

      {/* Middle & Bottom: Fertility Insight, Biomarker Correlation & Explanation */}
      <FertilityInsight
        headline={dayLog.insightHeadline}
        description={dayLog.insightDescription}
        whatThisMeans={dayLog.whatThisMeans}
        biomarkerTemp={dayLog.biomarkerTemp}
        biomarkerMucus={dayLog.biomarkerMucus}
        biomarkerWindow={dayLog.biomarkerWindow}
      />
    </div>
  );
};
