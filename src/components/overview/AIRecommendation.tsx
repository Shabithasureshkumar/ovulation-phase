import React from 'react';
import avaRobot from '../../assets/ai_robot.png';

interface AIRecommendationProps {
  onOpenAva: () => void;
}

const HABITS = ['Hydrate 💧', 'Gentle walk', 'Sleep 8h 😴'];

export const AIRecommendation: React.FC<AIRecommendationProps> = ({ onOpenAva }) => {
  return (
    <section
      aria-labelledby="ai-recommendation-title"
      className="w-full bg-white rounded-[20px] border border-[#F3EFF3] shadow-[0px_4px_18px_-10px_rgba(38,33,78,0.12)] px-[clamp(0.75rem,1.2vw,0.875rem)] pt-3 pb-3"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src={avaRobot} alt="" className="w-8 h-8 rounded-full object-contain bg-[#F3EEFB] flex-shrink-0" />
          <h3 id="ai-recommendation-title" className="text-[14px] font-semibold text-gray-900 leading-tight">
            AI Recommendation
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenAva}
          aria-haspopup="dialog"
          className="touch-target h-[30px] px-4 flex-shrink-0 bg-[#FBEFFA] hover:bg-[#F6E1F4] text-[#A855F7] rounded-full text-[12px] font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          Ask Ava
        </button>
      </div>

      <div className="mt-3 bg-gradient-to-r from-[#FBEFF7] via-[#F9F1FB] to-[#F6EEFC] rounded-[16px] px-3 sm:px-4 py-3 flex flex-col min-[520px]:flex-row items-start gap-3 sm:gap-5">
        <img src={avaRobot} alt="Ava, AI assistant" className="w-14 h-14 lg:w-[62px] lg:h-[62px] object-contain flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-[12px] text-gray-700 leading-[1.65]">
            You&apos;re doing great! Take rest, stay hydrated, and be kind to yourself. You are in your ovulation phase, which is a great time to focus on your overall wellness. Your energy levels may be higher, and you may feel more motivated. Make the most of this phase with healthy habits!
          </p>
          <ul className="flex flex-wrap gap-2 mt-2">
            {HABITS.map((habit) => (
              <li key={habit} className="text-[11px] font-medium text-[#8B5CF6] bg-[#EFE7FD] rounded-full px-3 h-5 leading-5 whitespace-nowrap">
                {habit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
