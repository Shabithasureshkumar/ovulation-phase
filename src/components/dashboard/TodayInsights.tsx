import React from 'react';
import type { CyclePhase } from '../../types/periodTracker';

interface TodayInsightsProps {
  phase?: CyclePhase;
  insights?: string[];
}

const PHASE_INSIGHTS: Record<CyclePhase, string[]> = {
  Ovulation: [
    'Estrogen and LH peak supports ovulation window.',
    'Egg-white cervical fluid enhances sperm motility.',
    'Natural energy, mood, and libido tend to peak.',
    'Stay hydrated and track basal body temperature.',
  ],
  'Fertile Window': [
    'You are in your fertile window leading to ovulation.',
    'Cervical fluid becomes increasingly clear and watery.',
    'Good time for high-energy workouts and creative focus.',
    'Track morning temperature for thermal shift detection.',
  ],
  'Luteal Phase': [
    'Progesterone is active, elevating baseline temperature.',
    'Calm energy; focus on restorative sleep and nutrition.',
    'Magnesium and hydration help soothe premenstrual symptoms.',
    'Gentle exercise like yoga and walking is beneficial.',
  ],
  Menstruation: [
    'You are on your period cycle phase.',
    "It's normal to experience lower physical energy.",
    'Stay hydrated, warm, and prioritize quality rest.',
    'Light exercise like walking may help alleviate cramps.',
  ],
};

export const TodayInsights: React.FC<TodayInsightsProps> = ({
  phase = 'Ovulation',
  insights,
}) => {
  const activeInsights = insights ?? PHASE_INSIGHTS[phase] ?? PHASE_INSIGHTS.Ovulation;

  return (
    <div className="w-full pt-4">
      {/* Header */}
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Today's Insights
      </h3>

      {/* Bullet List matching Figma 234:1337 */}
      <div className="space-y-2.5">
        {activeInsights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            {/* Purple Bullet Indicator */}
            <div className="w-[7.2px] h-[7.2px] rounded-full bg-[#A855F7] mt-1.5 flex-shrink-0" />
            <p className="text-[13.2px] text-[#4B5563] leading-[19.8px]">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
