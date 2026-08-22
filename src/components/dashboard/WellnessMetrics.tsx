import React from 'react';
import { Moon, Smile, Waves, Footprints, Scale, Heart, PenLine } from 'lucide-react';
import { DayLogEntry } from '../../types/periodTracker';
import { WellnessMetricCard } from './WellnessMetricCard';

interface WellnessMetricsProps {
  dayLog: DayLogEntry;
  onEditLog: () => void;
  onQuickEditMetric?: (metricName: string) => void;
}

export const WellnessMetrics: React.FC<WellnessMetricsProps> = ({
  dayLog,
  onEditLog,
  onQuickEditMetric,
}) => {
  return (
    <section className="w-full bg-white rounded-[19.2px] border border-[#F3F4F6] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] p-4 sm:p-5">
      {/* Header Row matching Figma 234:1047 */}
      <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-gray-100/80">
        <div>
          <h3 className="text-[16.8px] font-bold text-[#1F2937] leading-[25.2px]">
            Wellness Metrics
          </h3>
          <p className="text-[13.2px] text-[#9CA3AF] leading-[19.8px] mt-0.5">
            {dayLog.displayDate.includes('Today')
              ? `Today, ${dayLog.shortDate.replace(' ', '/')} – Cycle Day ${dayLog.cycleDay}`
              : `${dayLog.shortDate} – Cycle Day ${dayLog.cycleDay}`}
          </p>
        </div>

        {/* Edit Log Button with gradient text and pen icon */}
        <button
          onClick={onEditLog}
          className="px-3.5 py-1.5 rounded-[9.6px] border border-[#E9D5FF] bg-white hover:bg-pink-50/50 flex items-center gap-1.5 transition active:scale-95 shadow-sm group"
        >
          <PenLine size={14} className="text-[#F5489C] group-hover:rotate-12 transition-transform" />
          <span className="text-[13.2px] font-medium bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent leading-[19.8px]">
            Edit Log
          </span>
        </button>
      </div>

      {/* Grid of 6 Cards matching Figma frames 2147227174 & 2147227175 */}
      <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {/* Sleep */}
        <WellnessMetricCard
          label="Sleep"
          value={`${dayLog.sleepHours} hrs`}
          icon={Moon}
          iconBgColor="bg-[#FAF5FF]"
          iconColor="text-[#A855F7]"
          onClick={() => onQuickEditMetric?.('sleep')}
        />

        {/* Mood */}
        <WellnessMetricCard
          label="Mood"
          value={dayLog.mood}
          icon={Smile}
          iconBgColor="bg-[#FFF7ED]"
          iconColor="text-[#F97316]"
          onClick={() => onQuickEditMetric?.('mood')}
        />

        {/* Water */}
        <WellnessMetricCard
          label="Water"
          value={`${dayLog.waterL} / ${dayLog.waterTargetL} L`}
          icon={Waves}
          iconBgColor="bg-[#EFF6FF]"
          iconColor="text-[#3B82F6]"
          onClick={() => onQuickEditMetric?.('water')}
        />

        {/* Steps */}
        <WellnessMetricCard
          label="Steps"
          value={dayLog.steps.toLocaleString()}
          icon={Footprints}
          iconBgColor="bg-[#F0FDF4]"
          iconColor="text-[#22C55E]"
          onClick={() => onQuickEditMetric?.('steps')}
        />

        {/* Weight */}
        <WellnessMetricCard
          label="Weight"
          value={`${dayLog.weightKg} kg`}
          icon={Scale}
          iconBgColor="bg-[#FAF5FF]"
          iconColor="text-[#F755AE]"
          onClick={() => onQuickEditMetric?.('weight')}
        />

        {/* Sex Activity */}
        <WellnessMetricCard
          label="Sex Activity"
          value={dayLog.sexActivity}
          icon={Heart}
          iconBgColor="bg-[#FEF2F2]"
          iconColor="text-[#EF4444]"
          onClick={() => onQuickEditMetric?.('sexActivity')}
        />
      </div>
    </section>
  );
};
