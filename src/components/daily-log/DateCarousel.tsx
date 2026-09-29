import React from 'react';
import { ChevronLeft, ChevronRight, Droplets } from 'lucide-react';
import type { CyclePhase } from '../../types/cycle';
import {
  TODAY,
  MONTH_NAMES,
  DAY_NAMES,
  addDays,
  isSameDay,
  formatDateToIso,
  getCycleDayForDate,
  getPhaseForCycleDay,
} from '../../data/cycleData';

interface DateCarouselProps {
  windowStart: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

const PHASE_DOT_COLOR: Record<CyclePhase, string> = {
  Menstruation: 'bg-[#EF4444]',
  'Fertile Window': 'bg-[#3B82F6]',
  Ovulation: 'bg-[#10B981]',
  'Luteal Phase': 'bg-[#8B5CF6]',
};

const PHASE_RING_COLOR: Record<Exclude<CyclePhase, 'Menstruation'>, string> = {
  'Fertile Window': 'border-[#3B82F6]',
  Ovulation: 'border-[#10B981]',
  'Luteal Phase': 'border-[#8B5CF6]',
};

const LEGEND: CyclePhase[] = ['Menstruation', 'Fertile Window', 'Ovulation', 'Luteal Phase'];

const navButton =
  'touch-target w-8 h-8 rounded-full text-gray-400 hover:text-[#EF4486] hover:bg-pink-50 flex items-center justify-center transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400';

/** Phase marker under each date; dates after today are predictions and stay grey. */
const DayIndicator: React.FC<{ phase: CyclePhase; isSelected: boolean; isFuture: boolean }> = ({
  phase,
  isSelected,
  isFuture,
}) => {
  if (isSelected) return <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C2185B]/70" />;
  if (isFuture) return <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#D9DBE1]" />;
  if (phase === 'Menstruation') {
    return <Droplets size={15} strokeWidth={2} className="text-[#F97352]" />;
  }
  return <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] ${PHASE_RING_COLOR[phase]}`} />;
};

export const DateCarousel: React.FC<DateCarouselProps> = ({
  windowStart,
  selectedDate,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToday,
}) => {
  const days = Array.from({ length: 7 }, (_, i) => addDays(windowStart, i));

  const selectedIso = formatDateToIso(selectedDate);
  const selectedCycleDay = getCycleDayForDate(selectedDate);
  const selectedPhase = getPhaseForCycleDay(selectedCycleDay);
  const isToday = isSameDay(selectedDate, TODAY);

  const subheader = [
    isToday ? 'Today' : null,
    `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`,
    selectedPhase,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      aria-label="Cycle day selector"
      className="w-full bg-white rounded-[20px] lg:rounded-[20px] px-[clamp(0.875rem,1.6vw,1.25rem)] pt-[clamp(1rem,1.6vw,1.5rem)] pb-[clamp(1rem,1.6vw,1.5rem)] border border-[#F1EEF3] shadow-[0px_2px_14px_rgba(38,33,78,0.04)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1.25rem,1rem+0.6vw,1.375rem)] font-bold text-gray-900 leading-tight">
            Cycle Day <span className="text-[#F472B6]">{selectedCycleDay}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1" aria-live="polite">
            {subheader}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrevWeek} aria-label="Previous 7 days" className={navButton}>
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onToday}
            aria-pressed={isToday}
            className="touch-target px-4 h-9 lg:h-10 text-sm font-semibold text-[#EF4486] bg-[#FDF0F5] hover:bg-[#FCE2EC] rounded-full transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            Today
          </button>
          <button type="button" onClick={onNextWeek} aria-label="Next 7 days" className={navButton}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 7-day strip */}
      <div className="flex items-center justify-between gap-1 sm:gap-3 mt-3 lg:mt-4">
        <button
          type="button"
          onClick={onPrevWeek}
          aria-label="Previous 7 days"
          className="touch-target hidden sm:flex text-gray-400 hover:text-gray-700 p-1 flex-shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 grid grid-cols-7 gap-0.5 sm:gap-2 text-center min-w-0">
          {days.map((d) => {
            const iso = formatDateToIso(d);
            const isSelected = iso === selectedIso;
            const cd = getCycleDayForDate(d);
            const ph = getPhaseForCycleDay(cd);
            const monthShort = MONTH_NAMES[d.getMonth()].slice(0, 3);
            const isFuture = d.getTime() > TODAY.getTime();

            return (
              <button
                key={iso}
                type="button"
                onClick={() => onSelectDate(d)}
                aria-pressed={isSelected}
                aria-current={isSameDay(d, TODAY) ? 'date' : undefined}
                aria-label={`${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, cycle day ${cd}, ${isFuture ? `predicted ${ph}` : ph}`}
                className={`mx-auto w-full max-w-[3.25rem] sm:max-w-none sm:w-[clamp(4.5rem,7vw,6rem)] sm:aspect-square min-w-0 flex flex-col items-center justify-center gap-[1px] py-2.5 sm:py-0 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#F64FA9] to-[#EC2F86] text-white shadow-[0px_8px_20px_rgba(236,47,134,0.35)]'
                    : 'bg-transparent text-gray-900 hover:bg-pink-50/70'
                }`}
              >
                <span className={`text-[10px] sm:text-xs ${isSelected ? 'text-white font-semibold' : 'text-gray-500'}`}>
                  {monthShort}
                </span>
                <span className="text-base sm:text-lg lg:text-[16px] font-bold leading-tight">{d.getDate()}</span>
                <span
                  className={`text-[8px] min-[360px]:text-[9px] sm:text-[11px] whitespace-nowrap ${
                    isSelected ? 'text-white/90' : 'text-gray-400'
                  }`}
                >
                  CD<span className="hidden sm:inline"> </span>{cd}
                </span>
                <span aria-hidden="true" className="h-4 flex items-center justify-center mt-0.5 sm:mt-1">
                  <DayIndicator phase={ph} isSelected={isSelected} isFuture={isFuture} />
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNextWeek}
          aria-label="Next 7 days"
          className="touch-target hidden sm:flex text-gray-400 hover:text-gray-700 p-1 flex-shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 mt-3 lg:mt-4 text-[11px] sm:text-xs text-gray-600">
        {LEGEND.map((ph) => (
          <li key={ph} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={`w-2 h-2 rounded-full ${PHASE_DOT_COLOR[ph]}`} />
            <span>{ph}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
