import React from 'react';
import { X, Sparkles, Heart, Apple, Moon, Droplets } from 'lucide-react';
import type { CyclePhase } from '../../types/cycle';
import { getPhaseLabel } from '../../data/cycleData';
import { useDialog } from '../../hooks/useDialog';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase: CyclePhase;
}

export const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose, phase }) => {
  const dialogRef = useDialog<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  const tips = [
    {
      icon: <Droplets size={18} className="text-blue-500" />,
      title: 'Hydrate Consistently',
      desc: 'Drink at least 2.5L of water daily to support optimal cervical mucus hydration and cellular electrolyte balance.',
    },
    {
      icon: <Apple size={18} className="text-emerald-500" />,
      title: 'Nutrient-Dense Foods',
      desc: 'Incorporate leafy greens, avocados, berries, and omega-3 fatty acids to help metabolize estrogen effectively.',
    },
    {
      icon: <Heart size={18} className="text-rose-500" />,
      title: 'Gentle Aerobic Movement',
      desc: 'Capitalize on peak follicular and ovulatory energy with brisk walking, pilates, or light strength workouts.',
    },
    {
      icon: <Moon size={18} className="text-indigo-500" />,
      title: 'Restorative Sleep',
      desc: 'Aim for 8 hours in a cool, dark room to maintain a regular circadian rhythm and precise morning BBT readings.',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tips-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[28px] shadow-2xl border border-pink-100 w-full max-w-md overflow-hidden flex flex-col max-h-[90dvh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-pink-50 via-purple-50 to-white border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EF4486] text-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} aria-hidden="true" />
            </div>
            <div>
              <h3 id="tips-modal-title" className="font-extrabold text-gray-900 text-base">
                {getPhaseLabel(phase)} Wellness Tips
              </h3>
              <p className="text-xs text-gray-500">Expert recommendations for your cycle</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wellness tips"
            className="touch-target w-9 h-9 rounded-full hover:bg-white text-gray-500 hover:text-gray-700 flex items-center justify-center transition flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3.5 overflow-y-auto custom-scrollbar">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FFF8FA] border border-pink-100/80"
            >
              <div aria-hidden="true" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                  {tip.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="touch-target px-6 py-2.5 bg-[#EF4486] text-white text-xs font-bold rounded-full hover:bg-[#D92662] transition active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
