import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Search, Settings, Bell } from 'lucide-react';
import type { Patient } from '../../types/cycle';

interface GlobalHeaderProps {
  patient: Patient;
}

// Sections of the wider clinic dashboard; they have no route in the Cycle Tracker, so they render disabled.
const NAV_ITEMS = ['Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];
const UNAVAILABLE_HINT = 'Not available in the Cycle Tracker';

const iconButton =
  'touch-target w-10 h-10 rounded-full text-[#6B7280] flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF]';

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ patient }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white pt-[clamp(0.75rem,2vw,2rem)] px-[clamp(1rem,3.1vw,3rem)]">
      <div className="w-full flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Navigation Group */}
        <div className="flex items-center gap-[clamp(0.75rem,2.4vw,2.4rem)] min-w-0 overflow-x-auto no-scrollbar rounded-full border border-gray-100 p-0.5 pr-[clamp(0.75rem,2.4vw,2.4rem)]">
          {/* Dashboard Active Pill Button */}
          <button
            type="button"
            aria-current="page"
            onClick={() => navigate('/overview')}
            className="touch-target flex items-center gap-2.5 bg-gradient-to-r from-[#5B5BEF] to-[#7B7BF7] hover:from-[#4F4FE0] hover:to-[#6D6DEF] text-white h-10 px-3.5 lg:pl-4 lg:pr-7 rounded-full font-semibold text-xs sm:text-sm lg:text-[13px] shadow-[0px_4px_12px_rgba(91,91,239,0.3)] transition active:scale-95 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635BFF] focus-visible:ring-offset-2"
          >
            <LayoutGrid size={20} className="fill-white/90" aria-hidden="true" />
            <span className="sr-only min-[400px]:not-sr-only">Dashboard</span>
          </button>

          {/* Header Nav Links */}
          <nav aria-label="Main" className="flex items-center gap-[clamp(0.75rem,2.4vw,2.4rem)] text-xs sm:text-sm lg:text-[13px] font-semibold text-gray-900 whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <button key={item} type="button" disabled title={UNAVAILABLE_HINT} className="py-2 rounded cursor-default">
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Controls & Patient Profile */}
        <div className="flex items-center gap-1 sm:gap-3 lg:gap-4 flex-shrink-0">
          <button
            type="button"
            aria-label="Search"
            disabled
            title={UNAVAILABLE_HINT}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E5E7EB] text-gray-900 flex items-center justify-center cursor-default"
          >
            <Search size={20} strokeWidth={2.25} aria-hidden="true" />
          </button>

          <button type="button" aria-label="Settings" onClick={() => navigate('/settings')} className={`${iconButton} hover:text-gray-900 hover:bg-gray-100 active:scale-95`}>
            <Settings size={24} className="fill-[#6B7280] text-white" strokeWidth={1.5} aria-hidden="true" />
          </button>

          <button type="button" aria-label="Notifications" disabled title={UNAVAILABLE_HINT} className={`${iconButton} cursor-default`}>
            <Bell size={24} className="fill-[#6B7280]" aria-hidden="true" />
          </button>

          {/* Patient Profile */}
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[39px] lg:h-[39px] rounded-full overflow-hidden flex-shrink-0 bg-pink-100 ring-1 ring-gray-100">
              <img
                src={patient.avatarUrl}
                alt={`${patient.name}, ${patient.patientId}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                {patient.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
                {patient.patientId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
