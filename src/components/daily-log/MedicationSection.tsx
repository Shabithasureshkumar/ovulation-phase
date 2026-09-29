import React from 'react';
import { Pill, Plus } from 'lucide-react';
import type { MedicationEntry, MedicationStatus } from '../../types/cycle';

interface MedicationSectionProps {
  medications: MedicationEntry[];
  onToggleStatus: (id: string, status: MedicationStatus) => void;
  onOpenAddModal: () => void;
}

const STATUSES: Exclude<MedicationStatus, 'Pending'>[] = ['Taken', 'Skipped'];

// src/assets/med_*.png are mis-cropped (the pill sits off the bottom edge), so the row uses this capsule icon.
const CapsuleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 lg:w-7 lg:h-7 -rotate-[20deg]" aria-hidden="true">
    <rect x="2" y="8" width="20" height="8" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="0.75" />
    <path d="M6 8h6v8H6a4 4 0 0 1 0-8Z" fill="#F43F6B" />
    <rect x="4" y="9.5" width="6" height="1.4" rx="0.7" fill="#fff" opacity="0.55" />
  </svg>
);

export const MedicationSection: React.FC<MedicationSectionProps> = ({
  medications,
  onToggleStatus,
  onOpenAddModal,
}) => {
  return (
    <section
      aria-labelledby="medication-title"
      className="w-full bg-white rounded-[18px] lg:rounded-[17px] p-4 lg:p-[15px] border border-[#F1EEF3] shadow-[0px_4px_18px_-8px_rgba(38,33,78,0.08)] flex flex-col gap-3.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#FDECF3] text-[#EF4486] flex items-center justify-center flex-shrink-0">
            <Pill size={18} className="-rotate-45" aria-hidden="true" />
          </div>
          <h3 id="medication-title" className="text-lg lg:text-[18px] font-semibold text-gray-900 leading-tight truncate">
            Medication
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          aria-label="Log medication"
          aria-haspopup="dialog"
          className="touch-target inline-flex items-center gap-1 h-9 lg:h-[36px] px-4 lg:px-5 flex-shrink-0 bg-[#F4375F] hover:bg-[#E0224C] text-white text-sm lg:text-[13.5px] font-medium rounded-full shadow-[0px_4px_12px_rgba(244,55,95,0.3)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
        >
          <Plus size={17} aria-hidden="true" />
          <span>Log</span>
        </button>
      </div>

      {/* Medication List */}
      <ul className="space-y-3 lg:space-y-3.5">
        {medications.length === 0 ? (
          <li className="text-center py-6 text-xs text-gray-500">
            No medications logged for this date. Click + Log to add.
          </li>
        ) : (
          medications.map((med) => (
            <li
              key={med.id}
              className="bg-white rounded-[26px] pl-2.5 pr-3 py-2.5 border border-[#EFE9EE] shadow-[0px_2px_10px_-4px_rgba(38,33,78,0.08)] flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-11 h-11 lg:w-[42px] lg:h-[42px] rounded-full bg-[#F7F5F8] flex items-center justify-center flex-shrink-0">
                  <CapsuleIcon />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm lg:text-[13px] font-semibold text-gray-900 break-words leading-tight">
                    {med.name}
                  </h4>
                  <p className="text-[11px] lg:text-[10.5px] text-gray-500 break-words mt-0.5">
                    {med.dosage} · {med.type}
                  </p>
                </div>
              </div>

              {/* Status Toggle Buttons */}
              <div className="flex flex-col gap-1.5 flex-shrink-0" role="group" aria-label={`${med.name} status`}>
                {STATUSES.map((status) => {
                  const isActive = med.status === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => onToggleStatus(med.id, status)}
                      aria-pressed={isActive}
                      className={`w-[68px] lg:w-[65px] h-6 lg:h-7 text-[11px] lg:text-xs font-medium rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                        isActive
                          ? 'bg-[#FDECF3] border-[#F9B4D0] text-[#E0337A]'
                          : 'bg-white border-[#ECE7EC] text-gray-700 hover:border-pink-200 hover:text-[#E0337A]'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
