import React from 'react';
import type { Patient } from '../../types/cycle';
import headerCalendar from '../../assets/header_calendar.png';

interface CycleTrackerHeaderProps {
  patient: Patient;
}

export const CycleTrackerHeader: React.FC<CycleTrackerHeaderProps> = ({ patient }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-start justify-between gap-4 sm:gap-6">
      {/* Left Title & 3D Calendar Illustration */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0 md:pt-2">
        {/* 3D Calendar Asset */}
        <img
          src={headerCalendar}
          alt=""
          className="w-16 sm:w-20 lg:w-[96px] h-auto flex-shrink-0 object-contain"
        />

        {/* Title & Subtitle */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[12px] sm:text-[15px] lg:text-[14.5px] font-bold uppercase tracking-[0.18em] text-[#EF4486] leading-none">
              PERIOD
            </span>
            <span aria-hidden="true" className="h-[2px] w-12 sm:w-24 lg:w-[98px] bg-[#EF4486] rounded-full inline-block" />
          </div>

          <h1 className="text-[clamp(1.75rem,1rem+1.8vw,2.25rem)] font-bold tracking-tight text-gray-900 leading-[1.15] mt-2 lg:mt-3">
            Cycle <span className="text-[#EF4486]">Tracker</span>
          </h1>

          <p className="text-[12px] sm:text-base lg:text-[15.5px] text-gray-600 mt-1 lg:mt-2">
            Understand your body, one day at a time.
          </p>
        </div>
      </div>

      {/* Right Large Pink Patient Card */}
      <div className="w-full md:w-[310px] min-h-[98px] md:min-h-[115px] bg-gradient-to-r from-[#E43DA0] via-[#F04FA6] to-[#FB78B5] rounded-[22px] lg:rounded-[22px] text-white shadow-[0px_10px_28px_-8px_rgba(229,70,157,0.45)] relative overflow-hidden flex-shrink-0">
        {/* Decorative arc behind the portrait */}
        <div aria-hidden="true" className="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-white/15 pointer-events-none" />

        {/* Patient Photo, bleeding to the card edge */}
        <div className="absolute right-0 bottom-0 top-2 w-[38%] pointer-events-none">
          <img
            src={patient.avatarUrl}
            alt={patient.name}
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Patient Details */}
        <div className="relative z-10 min-h-[98px] md:min-h-[115px] flex flex-col justify-center pl-4 md:pl-[18px] pr-2 py-2.5 md:py-3 max-w-[70%]">
          <h2 className="text-[15px] md:text-lg lg:text-[18px] font-bold text-white leading-tight truncate">
            {patient.name}
          </h2>

          <div className="mt-1 md:mt-1.5 space-y-[1px] text-[11px] md:text-[12px] lg:text-[11px] text-white/90 font-semibold md:font-normal leading-snug">
            <p>Age: {patient.age} • {patient.gender}</p>
            <p>Height: {patient.heightCm} cm • Weight: {patient.weightKg} kg</p>
            <p>Cycle Length: {patient.cycleLengthDays} days (avg)</p>
            <p>BMI : {patient.bmi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
