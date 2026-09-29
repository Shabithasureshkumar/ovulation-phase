import React from 'react';
import { Info } from 'lucide-react';
import type { MoodType } from '../../types/cycle';
import moodHappy from '../../assets/mood_happy.png';
import moodCalm from '../../assets/mood_calm.png';
import moodNeutral from '../../assets/mood_neutral.png';
import moodIrritable from '../../assets/mood_irritable.png';
import moodSad from '../../assets/mood_sad.png';

interface MoodSectionProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

interface MoodOption {
  mood: MoodType;
  avatarUrl: string;
}

const MOODS: MoodOption[] = [
  { mood: 'Happy', avatarUrl: moodHappy },
  { mood: 'Calm', avatarUrl: moodCalm },
  { mood: 'Neutral', avatarUrl: moodNeutral },
  { mood: 'Irritable', avatarUrl: moodIrritable },
  { mood: 'Sad', avatarUrl: moodSad },
];

export const MoodSection: React.FC<MoodSectionProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  return (
    <section aria-labelledby="mood-title" className="w-full bg-gradient-to-b from-white to-[#FDF3F8] rounded-[20px] lg:rounded-[20px] p-4 lg:p-5 lg:pb-12 border border-[#F8E7EF] shadow-[0px_6px_20px_-10px_rgba(239,68,134,0.2)] flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full overflow-hidden flex-shrink-0">
          <img src={MOODS[0].avatarUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h3 id="mood-title" className="text-lg lg:text-[18px] font-semibold text-gray-900 leading-tight">
            Mood
          </h3>
          <p className="text-sm lg:text-[14px] text-gray-500 mt-1">Select how you feel today</p>
        </div>
        <span title="Pick the mood that best describes today" className="text-gray-400 self-center ml-1 lg:ml-3">
          <Info size={18} aria-hidden="true" />
        </span>
      </div>

      {/* 5 Mood Portraits */}
      <div className="grid grid-cols-3 min-[380px]:grid-cols-5 gap-1.5 sm:gap-2.5 mt-4 lg:mt-5" role="group" aria-label="Mood">
        {MOODS.map((item) => {
          const isSelected = selectedMood === item.mood;

          return (
            <button
              key={item.mood}
              type="button"
              onClick={() => onSelectMood(item.mood)}
              aria-pressed={isSelected}
              className={`min-w-0 flex flex-col items-center justify-center px-1 py-3 lg:h-[116px] rounded-[12px] lg:rounded-[12px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-2 border-[#F0529C] bg-gradient-to-b from-[#FFF4F8] to-[#FDEAF2] shadow-[0px_6px_16px_-6px_rgba(240,82,156,0.35)]'
                  : 'border border-[#EEEAEE] bg-white hover:border-pink-200'
              }`}
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-[56px] lg:h-[56px] rounded-full overflow-hidden">
                <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-xs sm:text-sm lg:text-[14px] mt-2 lg:mt-2.5 max-w-full truncate ${
                  isSelected ? 'text-[#EF4486] font-medium' : 'text-gray-500'
                }`}
              >
                {item.mood}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
