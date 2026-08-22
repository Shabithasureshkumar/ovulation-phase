import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Shield, Target, CheckCircle2, ChevronRight, ChevronLeft, HeartHandshake, X } from 'lucide-react';
import { SetupFormData } from '../../types/periodTracker';

interface SetupFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SetupFormData;
  onComplete: (data: SetupFormData) => void;
}

const STEPS = [
  'Welcome',
  'Last Period Date',
  'Cycle Length',
  'Period Duration',
  'Birth Control',
  'Fertility Goals',
  'Review Summary',
  'Completion',
];

export const SetupFlowModal: React.FC<SetupFlowModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SetupFormData>(initialData);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...formData, hasCompletedSetup: true });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl border border-pink-100 w-full max-w-xl overflow-hidden flex flex-col min-h-[520px]">
        {/* Header & Step progress */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-pink-50/70 via-purple-50/50 to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EF4486] to-[#FF24AF] flex items-center justify-center text-white shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-600">
                Setup Wizard • Step {currentStep + 1} of {STEPS.length}
              </span>
              <h3 className="text-sm font-bold text-gray-900">{STEPS[currentStep]}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-1">
          <div
            className="bg-gradient-to-r from-[#EF4486] to-[#FF24AF] h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
          {/* 1. Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-pink-50 border border-pink-100 text-pink-500 mx-auto flex items-center justify-center shadow-inner">
                <HeartHandshake size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to Your Cycle Dashboard
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Let's calibrate your ovulation window, baseline basal body temperature, and cycle phases with a few quick questions.
              </p>
            </div>
          )}

          {/* 2. Last Period Date */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">When did your last period start?</h3>
                  <p className="text-xs text-gray-500">Day 1 of your most recent menstrual cycle.</p>
                </div>
              </div>
              <input
                type="date"
                value={formData.lastPeriodDate}
                onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-base font-semibold text-gray-900 focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
              />
            </div>
          )}

          {/* 3. Cycle Length */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">How long is your average cycle?</h3>
                  <p className="text-xs text-gray-500">Typical range is 24 to 35 days (average 28 days).</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value, 10) })}
                  className="w-full accent-pink-500 h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <span className="text-xl font-bold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl min-w-[90px] text-center">
                  {formData.cycleLength} days
                </span>
              </div>
            </div>
          )}

          {/* 4. Period Duration */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">How many days does your period last?</h3>
                  <p className="text-xs text-gray-500">Usually ranges from 3 to 7 days.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={formData.periodDuration}
                  onChange={(e) => setFormData({ ...formData, periodDuration: parseInt(e.target.value, 10) })}
                  className="w-full accent-pink-500 h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <span className="text-xl font-bold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl min-w-[90px] text-center">
                  {formData.periodDuration} days
                </span>
              </div>
            </div>
          )}

          {/* 5. Birth Control */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Are you using birth control?</h3>
                  <p className="text-xs text-gray-500">Helps calibrate temperature and biomarker patterns.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {['None (Natural tracking)', 'Oral Contraceptives', 'Hormonal IUD', 'Copper IUD / Barrier'].map((bc) => (
                  <button
                    key={bc}
                    type="button"
                    onClick={() => setFormData({ ...formData, birthControl: bc })}
                    className={`p-3 rounded-2xl border text-xs font-semibold text-left transition ${
                      formData.birthControl === bc
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {bc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. Fertility Goals */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">What is your primary goal?</h3>
                  <p className="text-xs text-gray-500">We will tailor your daily insights and predictions.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {(['Track Cycle', 'Try to Conceive', 'Avoid Pregnancy', 'Monitor Health'] as SetupFormData['fertilityGoal'][]).map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setFormData({ ...formData, fertilityGoal: goal })}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition ${
                      formData.fertilityGoal === goal
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7. Review Summary */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Review Your Cycle Settings</h3>
                  <p className="text-xs text-gray-500">Everything looks great! Review before finalizing.</p>
                </div>
              </div>
              <div className="bg-pink-50/40 rounded-2xl p-4 border border-pink-100 space-y-2 text-xs text-gray-700">
                <div className="flex justify-between py-1 border-b border-pink-100/60">
                  <span className="text-gray-500">Last Period Date:</span>
                  <span className="font-semibold">{formData.lastPeriodDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-pink-100/60">
                  <span className="text-gray-500">Cycle Length:</span>
                  <span className="font-semibold">{formData.cycleLength} days</span>
                </div>
                <div className="flex justify-between py-1 border-b border-pink-100/60">
                  <span className="text-gray-500">Period Duration:</span>
                  <span className="font-semibold">{formData.periodDuration} days</span>
                </div>
                <div className="flex justify-between py-1 border-b border-pink-100/60">
                  <span className="text-gray-500">Birth Control:</span>
                  <span className="font-semibold">{formData.birthControl}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Fertility Goal:</span>
                  <span className="font-semibold text-pink-600">{formData.fertilityGoal}</span>
                </div>
              </div>
            </div>
          )}

          {/* 8. Completion Screen */}
          {currentStep === 7 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Setup Complete!
              </h2>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                Your ovulation timeline and wellness dashboard have been generated. Click below to enter your personalized dashboard.
              </p>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
              currentStep === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-gray-600 hover:bg-gray-200/60'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EF4486] to-[#FF24AF] hover:from-[#D7068E] hover:to-[#EA33A1] text-white shadow-md active:scale-95 transition flex items-center gap-1.5"
          >
            <span>{currentStep === STEPS.length - 1 ? 'Go to Main Dashboard' : 'Continue'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
