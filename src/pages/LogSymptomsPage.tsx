import React, { useState } from 'react';
import { Activity, Check, ChevronLeft, Droplet, PenLine, Smile, Sparkles } from 'lucide-react';
import type { DayLogEntry, SymptomIntensity } from '../types/periodTracker';
import {
  FLOW_DOT_COLORS,
  FLOW_LEVELS,
  INTENSITY_STYLES,
  MOOD_OPTIONS,
  PHYSICAL_SYMPTOMS,
  SYMPTOM_INTENSITIES,
  symptomSupportsIntensity,
  type FlowLevel,
  type MoodValue,
} from '../types/symptoms';

interface LogSymptomsPageProps {
  dayLog: DayLogEntry;
  onBack: () => void;
  onSave: (updated: Partial<DayLogEntry>) => void;
}

export const LogSymptomsPage: React.FC<LogSymptomsPageProps> = ({ dayLog, onBack, onSave }) => {
  const [flowLevel, setFlowLevel] = useState<FlowLevel | undefined>(dayLog.flowLevel);
  const [mood, setMood] = useState<MoodValue>(dayLog.mood);
  const [symptoms, setSymptoms] = useState<string[]>(dayLog.symptoms ?? []);
  const [intensities, setIntensities] = useState<Partial<Record<string, SymptomIntensity>>>(
    dayLog.symptomIntensities ?? {}
  );
  const [notes, setNotes] = useState(dayLog.personalNotes ?? '');

  const toggleSymptom = (label: string) => {
    setSymptoms((prev) => {
      if (prev.includes(label)) {
        setIntensities((current) => {
          const next = { ...current };
          delete next[label];
          return next;
        });
        return prev.filter((item) => item !== label);
      }
      return [...prev, label];
    });
  };

  const intensityTargets = symptoms.filter(symptomSupportsIntensity);

  const handleSave = () => {
    onSave({
      flowLevel,
      mood,
      symptoms,
      symptomIntensities: intensities,
      personalNotes: notes,
    });
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8 min-w-0">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#F3F4F6] shadow-[0px_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-center text-gray-500 hover:text-pink-600 hover:border-pink-200 transition active:scale-95"
            aria-label="Back to dashboard"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-0">
            <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1F2937] leading-tight">
              Log Symptoms
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{dayLog.displayDate}</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-pink-700 bg-pink-50 border border-pink-100 rounded-full px-3 py-1.5">
          <Sparkles size={13} />
          Cycle Day {dayLog.cycleDay} · {dayLog.phase}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* LEFT: logging controls */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 max-w-full">
          {/* Flow */}
          <section className="bg-white rounded-[24px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-[16px] font-bold text-[#1F2937] leading-6 flex items-center gap-2">
              <Droplet size={17} className="text-pink-500" />
              Flow
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Choose one for this day.</p>

            <div role="radiogroup" aria-label="Flow level" className="flex flex-wrap gap-2 mt-4">
              {FLOW_LEVELS.map((level) => {
                const isSelected = flowLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setFlowLevel(isSelected ? undefined : level)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition flex items-center gap-2 ${
                      isSelected
                        ? 'bg-pink-500 text-white border-pink-500 font-semibold shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full ring-1 ring-black/5"
                      style={{ backgroundColor: FLOW_DOT_COLORS[level] }}
                      aria-hidden="true"
                    />
                    {level}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Mood */}
          <section className="bg-white rounded-[24px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-[16px] font-bold text-[#1F2937] leading-6 flex items-center gap-2">
              <Smile size={17} className="text-pink-500" />
              Mood
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Pick the one that fits best.</p>

            <div
              role="radiogroup"
              aria-label="Mood"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4"
            >
              {MOOD_OPTIONS.map((option) => {
                const isSelected = mood === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setMood(option.value)}
                    className={`h-[84px] rounded-[16px] border flex flex-col items-center justify-center gap-1.5 transition active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-300 shadow-[0px_2px_10px_rgba(248,75,159,0.15)]'
                        : 'bg-white border-gray-200 hover:border-pink-300 hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="text-[22px] leading-none" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span
                      className={`text-[12px] font-semibold ${
                        isSelected ? 'text-pink-600' : 'text-[#374151]'
                      }`}
                    >
                      {option.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Physical symptoms + intensity */}
          <section className="bg-white rounded-[24px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[16px] font-bold text-[#1F2937] leading-6 flex items-center gap-2">
                <Activity size={17} className="text-pink-500" />
                Physical Symptoms
              </h2>
              <span className="text-[11px] font-medium text-pink-500">
                {symptoms.length} selected
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Select everything you noticed today.</p>

            <div role="group" aria-label="Physical symptoms" className="flex flex-wrap gap-2 mt-4">
              {PHYSICAL_SYMPTOMS.map((symptom) => {
                const isSelected = symptoms.includes(symptom.label);
                return (
                  <button
                    key={symptom.label}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => toggleSymptom(symptom.label)}
                    className={`text-xs px-3 py-2 rounded-xl border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-sm font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                    <span>{symptom.label}</span>
                  </button>
                );
              })}
            </div>

            {intensityTargets.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-800">How strong were they?</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Optional — helps spot patterns across cycles.
                </p>

                <div className="mt-3 space-y-2">
                  {intensityTargets.map((label) => (
                    <div
                      key={label}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-pink-50/50 border border-pink-100 px-4 py-3"
                    >
                      <span className="text-xs font-semibold text-gray-800">{label}</span>
                      <div
                        role="radiogroup"
                        aria-label={`${label} intensity`}
                        className="flex items-center gap-1.5"
                      >
                        {SYMPTOM_INTENSITIES.map((level) => {
                          const isSelected = intensities[label] === level;
                          return (
                            <button
                              key={level}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() =>
                                setIntensities((current) => ({ ...current, [label]: level }))
                              }
                              className={`text-[11px] px-3 py-1.5 rounded-lg border font-semibold transition active:scale-95 ${
                                isSelected
                                  ? INTENSITY_STYLES[level]
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                              }`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Notes */}
          <section className="bg-white rounded-[24px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-[16px] font-bold text-[#1F2937] leading-6 flex items-center gap-2">
              <PenLine size={17} className="text-pink-500" />
              Notes
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Anything else worth remembering.</p>

            <label htmlFor="symptom-notes" className="sr-only">
              Notes for {dayLog.displayDate}
            </label>
            <textarea
              id="symptom-notes"
              value={notes}
              maxLength={300}
              rows={5}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="How are you feeling today?"
              className="mt-4 w-full resize-y rounded-2xl bg-white border border-pink-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 custom-scrollbar"
            />
            <p className="mt-1.5 text-right text-[11px] text-gray-400">{notes.length}/300</p>
          </section>
        </div>

        {/* RIGHT: summary + save, matching the dashboard sidebar */}
        <aside className="w-full lg:w-[341px] flex-shrink-0 bg-white rounded-[24px] lg:rounded-[32px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] space-y-5 lg:sticky lg:top-6">
          <div>
            <h2 className="text-[16px] font-bold text-[#1F2937] leading-6">Today&apos;s Summary</h2>
            <p className="text-xs text-gray-500 mt-0.5">{dayLog.shortDate}</p>
          </div>

          <dl className="space-y-3.5">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Flow
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-gray-800 flex items-center gap-2">
                {flowLevel ? (
                  <>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: FLOW_DOT_COLORS[flowLevel] }}
                      aria-hidden="true"
                    />
                    {flowLevel}
                  </>
                ) : (
                  <span className="font-normal text-gray-400">Not set</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Mood
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-gray-800">
                {MOOD_OPTIONS.find((option) => option.value === mood)?.emoji} {mood}
              </dd>
            </div>

            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Symptoms
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-gray-800 leading-relaxed">
                {symptoms.length > 0 ? (
                  symptoms
                    .map((label) => {
                      const level = intensities[label];
                      return level ? `${label} (${level})` : label;
                    })
                    .join(', ')
                ) : (
                  <span className="font-normal text-gray-400">None selected</span>
                )}
              </dd>
            </div>

            {notes.trim() && (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Notes
                </dt>
                <dd className="mt-0.5 text-xs text-gray-600 leading-relaxed line-clamp-4">
                  {notes}
                </dd>
              </div>
            )}
          </dl>

          <button
            type="button"
            onClick={handleSave}
            className="w-full px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#EF4486] to-[#FF24AF] hover:from-[#D7068E] hover:to-[#EA33A1] text-white shadow-md active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            <span>Save Symptoms</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </aside>
      </div>
    </main>
  );
};

export default LogSymptomsPage;
