import React, { useState } from 'react';
import { X, Pill, Clock, Calendar, Bell } from 'lucide-react';
import type { MedicationEntry, CyclePhase } from '../../types/cycle';
import { formatDateToIso, formatShortDate, getPhaseLabel } from '../../data/cycleData';
import { useDialog } from '../../hooks/useDialog';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medication: MedicationEntry) => void;
  currentPhase: CyclePhase;
  selectedDate: Date;
}

const TYPE_OPTIONS = ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Patch', 'Drops'];
const FREQUENCY_OPTIONS = ['Once daily', 'Twice daily', '3 times daily', 'As needed'];

const inputClass =
  'w-full bg-[#FAFAFD] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400';
const labelClass = 'text-xs font-bold text-gray-700 flex items-center gap-1 mb-1';

/** "08:00" -> "08:00 AM" */
function to12Hour(value: string): string {
  const [h, m] = value.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** Mounted only while open, so every open starts from a clean form for the selected date. */
const AddMedicationForm: React.FC<Omit<AddMedicationModalProps, 'isOpen'>> = ({
  onClose,
  onSave,
  currentPhase,
  selectedDate,
}) => {
  const selectedIso = formatDateToIso(selectedDate);
  const [name, setName] = useState('');
  const [type, setType] = useState('Tablet');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [time, setTime] = useState('08:00');
  const [startDate, setStartDate] = useState(selectedIso);
  const [endDate, setEndDate] = useState('');
  const [reminder, setReminder] = useState(true);
  const dialogRef = useDialog<HTMLDivElement>(true, onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim() || 'Standard dose',
      type,
      time: to12Hour(time),
      date: formatShortDate(selectedDate),
      phase: currentPhase,
      status: 'Pending',
      frequency,
      startDate,
      endDate: endDate || undefined,
      reminder,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-medication-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[28px] shadow-2xl border border-pink-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90dvh]"
      >
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-pink-50 via-purple-50 to-white border-b border-pink-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#EF4486] text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Pill size={16} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 id="add-medication-title" className="font-extrabold text-gray-900 text-base">
                Add Medication
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {formatShortDate(selectedDate)} · {getPhaseLabel(currentPhase)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add medication dialog"
            className="touch-target w-9 h-9 rounded-full hover:bg-white text-gray-500 hover:text-gray-700 flex items-center justify-center transition flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-4 flex-1">
          <div>
            <label htmlFor="med-name" className={labelClass}>
              Medication Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="med-name"
              data-autofocus
              type="text"
              required
              placeholder="e.g. Ibuprofen, Prenatal Vitamins, Folic Acid"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="med-type" className={labelClass}>
                Medication Type
              </label>
              <select id="med-type" value={type} onChange={(e) => setType(e.target.value)} className={`${inputClass} cursor-pointer`}>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="med-dosage" className={labelClass}>
                Dosage
              </label>
              <input
                id="med-dosage"
                type="text"
                placeholder="e.g. 200 mg, 1000 IU"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="med-frequency" className={labelClass}>
                Frequency
              </label>
              <select
                id="med-frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                {FREQUENCY_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="med-time" className={labelClass}>
                <Clock size={12} className="text-gray-500" aria-hidden="true" />
                <span>Time</span>
              </label>
              <input
                id="med-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`${inputClass} py-2`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="med-start-date" className={labelClass}>
                <Calendar size={12} className="text-gray-500" aria-hidden="true" />
                <span>Start Date</span>
              </label>
              <input
                id="med-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`${inputClass} py-2`}
              />
            </div>

            <div>
              <label htmlFor="med-end-date" className={labelClass}>
                <Calendar size={12} className="text-gray-500" aria-hidden="true" />
                <span>End Date (Optional)</span>
              </label>
              <input
                id="med-end-date"
                type="date"
                min={startDate || undefined}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`${inputClass} py-2`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 bg-pink-50/50 rounded-2xl border border-pink-100">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[#EF4486] flex-shrink-0" aria-hidden="true" />
              <span id="med-reminder-label" className="text-xs font-bold text-gray-800">
                Enable Daily Notification Reminder
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reminder}
              aria-labelledby="med-reminder-label"
              onClick={() => setReminder(!reminder)}
              className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 ${
                reminder ? 'bg-[#EF4486]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  reminder ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="touch-target px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="touch-target px-6 py-2.5 bg-[#EF4486] hover:bg-[#D92662] text-white text-xs font-bold rounded-full shadow-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
            >
              Save Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ isOpen, ...props }) =>
  isOpen ? <AddMedicationForm {...props} /> : null;
