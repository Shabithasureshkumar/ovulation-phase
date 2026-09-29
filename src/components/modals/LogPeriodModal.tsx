import React, { useState } from 'react';
import { X, CalendarDays } from 'lucide-react';
import type { CrampsLevel, FlowLevel, PeriodLog } from '../../types/cycle';
import { MONTH_NAMES, TODAY, formatDateToIso } from '../../data/cycleData';
import { loadPeriodLogs, savePeriodLog } from '../../data/logStorage';
import { useDialog } from '../../hooks/useDialog';

interface LogPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (entry: PeriodLog) => void;
}

const FLOW_OPTIONS: FlowLevel[] = ['Spotting', 'Light', 'Medium', 'Heavy'];
const CRAMPS_OPTIONS: CrampsLevel[] = ['None', 'Mild', 'Moderate', 'Severe'];

const optionClass = (isSelected: boolean) =>
  `h-10 rounded-full border text-[13px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
    isSelected
      ? 'border-[#F0359B] bg-[#FDEDF4] text-[#E0277F] font-medium'
      : 'border-[#E9E7EC] bg-white text-gray-900 hover:border-pink-200'
  }`;

const OptionGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T | null;
  onChange: (v: T) => void;
}) => (
  <fieldset>
    <legend className="text-[13px] font-semibold text-gray-900">{label}</legend>
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-3">
      {options.map((opt) => (
        <button key={opt} type="button" aria-pressed={value === opt} onClick={() => onChange(opt)} className={optionClass(value === opt)}>
          {opt}
        </button>
      ))}
    </div>
  </fieldset>
);

const LogPeriodForm: React.FC<Omit<LogPeriodModalProps, 'isOpen'>> = ({ onClose, onSaved }) => {
  const dialogRef = useDialog<HTMLDivElement>(true, onClose);
  const dateStr = formatDateToIso(TODAY);
  const [saved] = useState(() => loadPeriodLogs()[dateStr]);
  const [flow, setFlow] = useState<FlowLevel | null>(saved?.flow ?? null);
  const [cramps, setCramps] = useState<CrampsLevel | null>(saved?.cramps ?? null);
  const [clots, setClots] = useState(saved?.clots ?? false);
  const [notes, setNotes] = useState(saved?.notes ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flow) return;
    const entry: PeriodLog = { dateStr, flow, cramps, clots, notes: notes.trim() };
    savePeriodLog(entry);
    onSaved(entry);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-white/70 backdrop-blur-[2px]">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-period-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[24px] shadow-[0px_20px_60px_-20px_rgba(38,33,78,0.25)] w-full max-w-[545px] max-h-[92dvh] overflow-y-auto custom-scrollbar"
      >
        <form onSubmit={handleSubmit} className="px-[clamp(1.25rem,4vw,2.625rem)] pt-7 pb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="log-period-title" className="text-[clamp(1.125rem,1rem+0.4vw,1.25rem)] font-bold text-gray-900 leading-tight">
                Log Period
              </h2>
              <p className="text-[13px] text-gray-600 mt-2">Record your period details for today.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="touch-target w-[30px] h-[30px] rounded-full bg-[#FDEDF4] text-[#EC4899] hover:bg-[#FBDDEA] flex items-center justify-center flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <X size={15} strokeWidth={2.25} />
            </button>
          </div>

          <div className="mt-5 h-[50px] rounded-full bg-[#FDEDF4] flex items-center gap-3 px-2">
            <span className="w-[34px] h-[34px] rounded-full bg-white text-[#EC4899] flex items-center justify-center" aria-hidden="true">
              <CalendarDays size={16} />
            </span>
            <span className="text-[13.5px] font-semibold text-gray-900">
              Today · {TODAY.getDate()} {MONTH_NAMES[TODAY.getMonth()]} {TODAY.getFullYear()}
            </span>
          </div>

          <div className="mt-5 space-y-5">
            <OptionGroup label="How is your flow today?" options={FLOW_OPTIONS} value={flow} onChange={setFlow} />
            <OptionGroup label="Cramps Level" options={CRAMPS_OPTIONS} value={cramps} onChange={setCramps} />
          </div>

          <div className="mt-5 h-[52px] rounded-full border border-[#E9E7EC] flex items-center justify-between pl-5 pr-3">
            <span id="clots-label" className="text-[13px] font-semibold text-gray-900">
              Clots Present
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={clots}
              aria-labelledby="clots-label"
              onClick={() => setClots((c) => !c)}
              className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                clots ? 'bg-[#F0359B]' : 'bg-[#EEEDF2]'
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  clots ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <label htmlFor="period-notes" className="block text-[13px] font-semibold text-gray-900 mt-5">
            Notes
          </label>
          <textarea
            id="period-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            maxLength={500}
            className="mt-3 w-full h-20 resize-none rounded-[20px] border border-[#E9E7EC] px-4 py-3 text-[13px] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-pink-300"
          />

          <div className="grid grid-cols-2 gap-3 mt-3 items-center">
            <button
              type="submit"
              disabled={!flow}
              title={flow ? undefined : 'Choose your flow to save'}
              className="touch-target h-10 rounded-full bg-[#F0359B] hover:bg-[#DD2388] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
            >
              Save Log
            </button>
            <button
              type="button"
              onClick={onClose}
              className="touch-target h-10 rounded-full text-[13px] text-gray-600 hover:text-gray-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const LogPeriodModal: React.FC<LogPeriodModalProps> = ({ isOpen, ...props }) =>
  isOpen ? <LogPeriodForm {...props} /> : null;
