import React from 'react';
import { Plus, Droplets, Activity, Smile, Scale, Moon, Waves } from 'lucide-react';
import type { QuickLogType } from '../../types/dashboard';

interface QuickLogProps {
  onSelectAction: (type: QuickLogType) => void;
}

const QUICK_ACTIONS: {
  type: QuickLogType;
  label: string;
  gradient: string;
  icon: React.ReactNode;
}[] = [
  {
    type: 'flow',
    label: 'Flow',
    gradient: 'from-[#FB7185] to-[#F43F5E]',
    icon: <Droplets size={22} className="text-white" />,
  },
  {
    type: 'symptoms',
    label: 'Symptoms',
    gradient: 'from-[#FA8BCE] to-[#F65CBE]',
    icon: <Activity size={22} className="text-white" />,
  },
  {
    type: 'mood',
    label: 'Mood',
    gradient: 'from-[#FBBF24] to-[#FB923C]',
    icon: <Smile size={22} className="text-white" />,
  },
  {
    type: 'weight',
    label: 'Weight',
    gradient: 'from-[#60A5FA] to-[#3B82F6]',
    icon: <Scale size={22} className="text-white" />,
  },
  {
    type: 'sleep',
    label: 'Sleep',
    gradient: 'from-[#F881F0] to-[#F163C6]',
    icon: <Moon size={22} className="text-white" />,
  },
  {
    type: 'water',
    label: 'Water',
    gradient: 'from-[#22D3EE] to-[#06B6D4]',
    icon: <Waves size={22} className="text-white" />,
  },
];

export const QuickLog: React.FC<QuickLogProps> = ({ onSelectAction }) => {
  return (
    <div className="w-full pt-4 min-w-0">
      {/* Header with Plus Icon */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[16px] font-bold text-[#1F2937] leading-6">
          Quick Log
        </h3>
        <button
          type="button"
          onClick={() => onSelectAction('symptoms')}
          aria-label="Add Biomarkers & Symptoms"
          title="Add Quick Log"
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center text-gray-500 hover:text-pink-600 transition active:scale-95"
        >
          <Plus size={15} strokeWidth={2.4} />
        </button>
      </div>

      {/* 2x3 Grid matching Figma Frame 2147227254, 2147227255, 2147227256 */}
      <div className="grid grid-cols-2 gap-3 min-w-0">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            aria-label={`Quick Log ${action.label}`}
            onClick={() => onSelectAction(action.type)}
            className="w-full h-[102px] bg-white/85 hover:bg-white rounded-[16px] p-3 border border-white/90 shadow-[0px_1px_4px_rgba(0,0,0,0.04),0px_2px_16px_rgba(139,92,246,0.07)] flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 group min-w-0"
          >
            {/* Gradient Icon Badge */}
            <div
              className={`w-11 h-11 rounded-[16px] bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-[0px_2px_6px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform flex-shrink-0`}
            >
              {action.icon}
            </div>

            {/* Label */}
            <span className="text-[12px] font-semibold text-[#374151] group-hover:text-pink-600 transition leading-none truncate max-w-full">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
