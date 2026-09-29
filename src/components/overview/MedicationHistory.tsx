import React from 'react';
import { Pill, ArrowRight } from 'lucide-react';
import type { MedicationEntry } from '../../types/cycle';

interface MedicationHistoryProps {
  medications: MedicationEntry[];
  onViewAll: () => void;
}

export const MedicationHistory: React.FC<MedicationHistoryProps> = ({ medications, onViewAll }) => {
  return (
    <section
      aria-labelledby="medication-history-title"
      className="w-full bg-white rounded-[22px] lg:rounded-[24px] border-[1.5px] border-[#F8D7E6] px-[clamp(0.75rem,1.6vw,1.25rem)] pt-5 pb-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-full bg-[#FDECF3] text-[#EC4899] flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <Pill size={17} className="-rotate-45" />
          </span>
          <div className="min-w-0">
            <h3 id="medication-history-title" className="text-[14px] font-semibold text-gray-900 leading-tight">
              Medication History
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5">Medications you&apos;ve logged throughout your cycle</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="touch-target inline-flex items-center gap-2 min-h-8 px-1 text-[13.5px] font-medium text-[#EC4899] hover:text-[#DB2777] rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          View All History
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      <ul className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {medications.map((med) => (
          <li key={`${med.id}-${med.date}`} className="bg-white rounded-[18px] border border-[#EFEAF0] shadow-[0px_4px_14px_-10px_rgba(38,33,78,0.2)] px-4 pt-4 pb-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-full bg-[#FDECF3] text-[#EC4899] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Pill size={16} className="-rotate-45" />
              </span>
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-gray-900 truncate">{med.name}</h4>
                <p className="text-[10px] text-gray-500 truncate mt-0.5">
                  {med.dosage} · {med.type}
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 mt-4">
              <p className="text-[10.5px] text-gray-500 leading-[1.7]">
                {med.date}
                <br />
                {med.time}
              </p>
              <span className="text-[11px] font-semibold text-gray-900 pb-0.5">{med.phase}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
