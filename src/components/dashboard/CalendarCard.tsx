import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import type { DayLogEntry } from '../../types/periodTracker';

interface CalendarCardProps {
  days: DayLogEntry[];
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onSelectToday: () => void;
}

const LEGEND_ITEMS = [
  { label: 'Menstruation', color: 'bg-[#F87171]' },
  { label: 'Fertile Window', color: 'bg-[#93C5FD]' },
  { label: 'Ovulation', color: 'bg-[#4ADE80]' },
  { label: 'Luteal Phase', color: 'bg-[#C084FC]' },
  { label: 'Logged', color: 'bg-[#D1D5DB]' },
];

export const CalendarCard: React.FC<CalendarCardProps> = ({
  days,
  selectedDateStr,
  onSelectDate,
  onPrevDay,
  onNextDay,
  onSelectToday,
}) => {
  return (
    <section className="w-full">
      {/* Daily Log Header */}
      <h1 className="text-[24px] sm:text-[28px] lg:text-[28.8px] font-bold text-[#111827] leading-[38.4px] mb-2.5">
        Daily Log
      </h1>

      {/* Calendar Card Container */}
      <div className="bg-white rounded-[19.2px] border border-[#F3F4F6] shadow-[0px_1.2px_2.4px_rgba(0,0,0,0.05)] p-3.5 sm:p-5">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-gray-100/80">
          {/* Calendar title with pink bullet badge */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#EF4486] flex items-center justify-center shadow-sm flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                <CalendarIcon size={8} className="text-[#EF4486]" />
              </div>
            </div>
            <span className="text-[15px] sm:text-[16.8px] font-bold text-[#1F2937] leading-[25.2px]">
              Calendar
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={onPrevDay}
              aria-label="Previous day"
              title="Previous Day"
              className="w-[33.6px] h-[33.6px] rounded-[9.6px] bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-pink-600 border border-gray-100 flex items-center justify-center transition active:scale-95 shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={onSelectToday}
              aria-label="Select today"
              className="px-3 sm:px-3.5 py-1.5 rounded-[18px] bg-[#FAF5FF] hover:bg-[#F3E8FF] border border-pink-100 transition shadow-sm active:scale-95 flex items-center justify-center"
            >
              <span className="text-[13px] sm:text-[14.4px] font-semibold bg-gradient-to-b from-[#F475C1] to-[#FF24AF] bg-clip-text text-transparent leading-[21.6px]">
                Today
              </span>
            </button>

            <button
              type="button"
              onClick={onNextDay}
              aria-label="Next day"
              title="Next Day"
              className="w-[33.6px] h-[33.6px] rounded-[9.6px] bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-pink-600 border border-gray-100 flex items-center justify-center transition active:scale-95 shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Date Strip Cards with smooth touch panning and zero horizontal page bleed */}
        <div className="pt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 touch-pan-x overscroll-x-contain">
          {days.map((day) => {
            const isSelected = day.dateStr === selectedDateStr;

            // Phase indicator dot styling
            let indicator = null;
            if (day.dateStr === '2026-06-20') {
              indicator = (
                <div className="w-[16.8px] h-[16.8px] rounded-full border-[2.4px] border-[#93C5FD] mt-1" />
              );
            } else if (day.dateStr === '2026-06-21') {
              indicator = (
                <div className="w-[16.8px] h-[16.8px] rounded-full bg-gradient-to-tr from-[#EF4486] to-[#F475C1] mt-1 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              );
            } else if (day.isLogged) {
              indicator = (
                <div className="w-[16.8px] h-[16.8px] rounded-full bg-[#E5E7EB] mt-1" />
              );
            } else {
              indicator = <div className="h-[16.8px] mt-1" />;
            }

            return (
              <button
                key={day.dateStr}
                type="button"
                aria-label={`${day.monthShort} ${day.dayNumber}, Cycle Day ${day.cycleDay}, ${day.phase}`}
                onClick={() => onSelectDate(day.dateStr)}
                className={`flex-1 min-w-[68px] sm:min-w-[84px] md:min-w-[95px] h-[105.7px] rounded-[14.4px] p-2 sm:p-2.5 flex flex-col items-center justify-between transition-all duration-200 cursor-pointer flex-shrink-0 sm:flex-shrink ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FD69B3]/10 to-[#EA06A6]/10 border border-[#D7068E] shadow-[0px_2.4px_4.8px_-2.4px_rgba(0,0,0,0.1),0px_4.8px_7.2px_-1.2px_rgba(215,6,142,0.15)] scale-[1.02]'
                    : 'bg-white hover:bg-pink-50/40 border border-transparent hover:border-pink-200/50'
                }`}
              >
                <span
                  className={`text-[12px] sm:text-[13.2px] font-medium leading-[19.8px] ${
                    isSelected ? 'text-[#D43869] font-semibold' : 'text-[#9CA3AF]'
                  }`}
                >
                  {day.monthShort}
                </span>

                <span
                  className={`text-[16px] sm:text-[18px] font-bold leading-[27px] ${
                    isSelected ? 'text-[#D7068E]' : 'text-[#374151]'
                  }`}
                >
                  {day.dayNumber}
                </span>

                <span
                  className={`text-[11px] sm:text-[12px] leading-[18px] ${
                    isSelected ? 'text-[#D7068E] font-medium' : 'text-[#9CA3AF]'
                  }`}
                >
                  CD {day.cycleDay}
                </span>

                {indicator}
              </button>
            );
          })}
        </div>

        {/* Legend Row */}
        <div className="pt-3.5 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] sm:text-[12px] text-[#6B7280]">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
              <span className="leading-[18px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
