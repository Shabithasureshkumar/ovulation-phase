import React from 'react';
import { Brain } from 'lucide-react';
import type { CyclePhase } from '../../types/cycle';
import { getPhaseLabel } from '../../data/cycleData';

interface AIInsightsProps {
  phase: CyclePhase;
  formattedDate: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ phase, formattedDate }) => {
  const getInsightsText = (p: CyclePhase): string => {
    switch (p) {
      case 'Ovulation':
        return 'You are in your ovulation phase, which is a great time to focus on your overall wellness. Your energy levels may be higher, and you may feel more motivated. Make the most of this phase with healthy habits!';
      case 'Fertile Window':
        return 'You are in your fertile window leading up to ovulation. Estrogen is rising, and you may experience heightened creativity and physical energy.';
      case 'Luteal Phase':
        return 'You are in your luteal phase. Progesterone is dominant, supporting relaxation and restorative sleep. Prioritize gentle movement and balanced nutrition.';
      case 'Menstruation':
        return 'You are on your period. Rest, hydration, and soothing warmth can help relieve cramping and promote cellular restoration.';
    }
  };

  return (
    <div className="w-full">
      {/* Phase Heading */}
      <div>
        <h2 className="text-[clamp(1.25rem,1rem+0.6vw,1.375rem)] font-bold text-gray-900 leading-tight">
          {getPhaseLabel(phase)}
        </h2>
        <p className="text-sm lg:text-[14px] text-gray-600 mt-1">
          {formattedDate}
        </p>
      </div>

      {/* AI Insights Card */}
      <section
        aria-label="AI Insights"
        className="mt-[clamp(1.25rem,3.2vw,2.75rem)] bg-gradient-to-r from-[#F8EEFB] via-[#FBF1F8] to-[#FCEFF6] rounded-[20px] lg:rounded-[22px] px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(1rem,1.8vw,1.5rem)] flex items-start gap-3 sm:gap-5 shadow-[0px_6px_20px_-6px_rgba(168,85,247,0.18)]"
      >
        <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-white/80 text-[#8B5CF6] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Brain size={22} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg lg:text-[18px] font-bold text-gray-900 leading-tight">
            AI Insights
          </h3>
          <p className="text-sm sm:text-base lg:text-[15.5px] text-gray-600 leading-relaxed lg:leading-[1.5] mt-1.5 max-w-[960px]">
            {getInsightsText(phase)}
          </p>
        </div>
      </section>
    </div>
  );
};
