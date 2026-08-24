import React, { useState, useEffect, useCallback } from 'react';
import { X, Thermometer, Droplet, Moon, Smile, Waves, Footprints, Scale, Heart, Sparkles, Check, Activity } from 'lucide-react';
import type { DayLogEntry } from '../../types/periodTracker';

interface EditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayLog: DayLogEntry;
  onSave: (updated: Partial<DayLogEntry>) => void;
  defaultTab?: string;
}

const MOODS: DayLogEntry['mood'][] = ['Good', 'Happy', 'Calm', 'Sensitive', 'Fatigued', 'Irritable'];
const CERVICAL_MUCUS_OPTIONS = [
  'Dry',
  'Sticky / Thick',
  'Creamy',
  'Watery',
  'Egg-white Consistency',
  'Menstrual Flow',
];
const SEX_OPTIONS: DayLogEntry['sexActivity'][] = ['Not Logged', 'Protected', 'Unprotected', 'High Drive'];

const COMMON_SYMPTOMS = [
  'Mild Pelvic Twinges (Mittelschmerz)',
  'High Energy & Focus',
  'Increased Libido',
  'Tender Breasts',
  'Bloating',
  'Heightened Senses',
  'Mild Cramping',
  'Light Spotting',
  'Backache',
  'Clear Skin',
];

export const EditLogModal: React.FC<EditLogModalProps> = ({
  isOpen,
  onClose,
  dayLog,
  onSave,
}) => {
  const [temperatureF, setTemperatureF] = useState(dayLog.temperatureF);
  const [cervicalMucus, setCervicalMucus] = useState(dayLog.cervicalMucusType);
  const [sleepHours, setSleepHours] = useState(dayLog.sleepHours);
  const [mood, setMood] = useState<DayLogEntry['mood']>(dayLog.mood);
  const [waterL, setWaterL] = useState(dayLog.waterL);
  const [steps, setSteps] = useState(dayLog.steps);
  const [weightKg, setWeightKg] = useState(dayLog.weightKg);
  const [sexActivity, setSexActivity] = useState<DayLogEntry['sexActivity']>(dayLog.sexActivity);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(dayLog.symptoms ?? []);

  // Sync state whenever selected date's dayLog changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTemperatureF(dayLog.temperatureF);
      setCervicalMucus(dayLog.cervicalMucusType);
      setSleepHours(dayLog.sleepHours);
      setMood(dayLog.mood);
      setWaterL(dayLog.waterL);
      setSteps(dayLog.steps);
      setWeightKg(dayLog.weightKg);
      setSexActivity(dayLog.sexActivity);
      setSelectedSymptoms(dayLog.symptoms ?? []);
    }
  }, [isOpen, dayLog]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    // Calculate difference from baseline (baseline assumed ~98.06 F or 36.7 C)
    const baselineF = 98.06;
    const clampedTemp = Math.max(95.0, Math.min(105.0, Number(temperatureF) || 98.0));
    const diffF = clampedTemp - baselineF;
    const diffC = Number(((diffF * 5) / 9).toFixed(2));
    const clampedWeight = Math.max(30.0, Math.min(300.0, Number(weightKg) || 58.0));
    const clampedSleep = Math.max(0.0, Math.min(24.0, Number(sleepHours) || 0.0));
    const clampedWater = Math.max(0.0, Math.min(10.0, Number(waterL) || 0.0));
    const clampedSteps = Math.max(0, Math.min(100000, Number(steps) || 0));

    onSave({
      temperatureF: clampedTemp,
      tempAboveBaselineC: diffC,
      tempStatus: diffC > 0.2 ? 'Above Baseline' : diffC < -0.2 ? 'Below Baseline' : 'Baseline',
      cervicalMucusType: cervicalMucus,
      sleepHours: clampedSleep,
      mood,
      waterL: clampedWater,
      steps: clampedSteps,
      weightKg: clampedWeight,
      sexActivity,
      symptoms: selectedSymptoms,
      isLogged: true,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-log-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-pink-100 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-pink-50 via-purple-50 to-white border-b border-pink-100/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EF4486] flex items-center justify-center text-white shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 id="edit-log-modal-title" className="font-bold text-gray-900 text-base">
                Edit Daily Log & Biomarkers
              </h3>
              <p className="text-xs text-gray-500">{dayLog.displayDate}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5 flex-1">
          {/* Symptoms Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/70 via-purple-50/40 to-white border border-pink-100">
            <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-2.5">
              <Activity size={16} className="text-pink-600" />
              <span>Symptoms & Body Sensations</span>
              <span className="text-[11px] font-normal text-pink-500 ml-auto">
                {selectedSymptoms.length} selected
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-sm font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                    <span>{symptom}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temperature & Weight Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Basal Body Temp */}
            <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
              <label htmlFor="temp-input" className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                <Thermometer size={15} className="text-pink-500" />
                <span>Body Temperature (°F)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="temp-input"
                  type="number"
                  step="0.01"
                  min="95"
                  max="105"
                  value={temperatureF}
                  onChange={(e) => setTemperatureF(parseFloat(e.target.value) || 98.0)}
                  className="w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-gray-900 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span className="text-xs font-medium text-pink-600">°F</span>
              </div>
            </div>

            {/* Weight */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
              <label htmlFor="weight-input" className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
                <Scale size={15} className="text-purple-500" />
                <span>Weight (kg)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="weight-input"
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 58.0)}
                  className="w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-gray-900 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span className="text-xs font-medium text-purple-600">kg</span>
              </div>
            </div>
          </div>

          {/* Cervical Mucus Consistency */}
          <div>
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <Droplet size={15} className="text-pink-500" />
              <span>Cervical Mucus Consistency</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CERVICAL_MUCUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCervicalMucus(opt)}
                  className={`text-xs py-2 px-3 rounded-xl border text-left transition ${
                    cervicalMucus === opt
                      ? 'bg-pink-500 text-white border-pink-500 font-semibold shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selector */}
          <div>
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <Smile size={15} className="text-amber-500" />
              <span>Mood</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition ${
                    mood === m
                      ? 'bg-amber-500 text-white border-amber-500 font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Sleep, Water, Steps row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Sleep */}
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
              <label htmlFor="sleep-input" className="text-[11px] font-semibold text-gray-600 flex items-center gap-1 mb-1">
                <Moon size={13} className="text-indigo-500" />
                <span>Sleep (hrs)</span>
              </label>
              <input
                id="sleep-input"
                type="number"
                step="0.1"
                min="0"
                max="24"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseFloat(e.target.value) || 0)}
                className="w-full bg-white rounded-lg px-2 py-1 text-sm font-bold text-gray-900 border border-gray-200"
              />
            </div>

            {/* Water */}
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
              <label htmlFor="water-input" className="text-[11px] font-semibold text-gray-600 flex items-center gap-1 mb-1">
                <Waves size={13} className="text-blue-500" />
                <span>Water (L)</span>
              </label>
              <input
                id="water-input"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={waterL}
                onChange={(e) => setWaterL(parseFloat(e.target.value) || 0)}
                className="w-full bg-white rounded-lg px-2 py-1 text-sm font-bold text-gray-900 border border-gray-200"
              />
            </div>

            {/* Steps */}
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
              <label htmlFor="steps-input" className="text-[11px] font-semibold text-gray-600 flex items-center gap-1 mb-1">
                <Footprints size={13} className="text-emerald-500" />
                <span>Steps</span>
              </label>
              <input
                id="steps-input"
                type="number"
                step="100"
                min="0"
                value={steps}
                onChange={(e) => setSteps(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white rounded-lg px-2 py-1 text-sm font-bold text-gray-900 border border-gray-200"
              />
            </div>
          </div>

          {/* Sexual Activity */}
          <div>
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
              <Heart size={15} className="text-rose-500" />
              <span>Sexual Activity</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SEX_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSexActivity(opt)}
                  className={`text-xs py-2 px-2 rounded-xl border text-center transition ${
                    sexActivity === opt
                      ? 'bg-rose-500 text-white border-rose-500 font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/60 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#EF4486] to-[#FF24AF] hover:from-[#D7068E] hover:to-[#EA33A1] text-white shadow-md active:scale-95 transition flex items-center gap-1.5"
          >
            <Check size={16} />
            <span>Update Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};
