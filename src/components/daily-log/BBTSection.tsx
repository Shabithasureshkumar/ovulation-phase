import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BBTSectionProps {
  reading: number;
  timeMeasured: string;
  device: string;
  manualEntry: string;
  onUpdateReading: (val: number) => void;
  onUpdateTime: (val: string) => void;
  onUpdateDevice: (val: string) => void;
  /** `reading` is set when the manual entry parses to a valid temperature. */
  onUpdateManualEntry: (val: string, reading?: number) => void;
  /** Third column of the row (the medication card). */
  aside: React.ReactNode;
}

// Order follows the design.
const TEMP_PRESETS = [36.3, 36.5, 36.35, 36.4, 36.45];
const TIME_OPTIONS = ['06:30 AM', '06:45 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM'];
const DEVICE_OPTIONS = ['Connected Thermometer', 'Manual Oral Thermometer', 'Smart Watch Sensor'];
const MIN_BBT = 35;
const MAX_BBT = 38.5;

const clampReading = (val: number) => Math.min(MAX_BBT, Math.max(MIN_BBT, Number(val.toFixed(2))));

const fieldBox =
  'relative bg-gradient-to-b from-[#FEF7FA] to-[#FDF0F5] rounded-[16px] px-4 py-3 border border-[#FBE7EF] shadow-[0px_4px_14px_-6px_rgba(239,68,134,0.15)] focus-within:ring-2 focus-within:ring-pink-300';
const fieldLabel = 'text-[10px] lg:text-[9.5px] font-semibold text-gray-500 uppercase tracking-[0.08em] block';
const selectClass =
  'w-full appearance-none bg-transparent text-sm lg:text-[13px] font-semibold text-gray-900 mt-0.5 pr-7 focus:outline-none cursor-pointer';
const selectChevron = 'absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none';
const stepperButton =
  'w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white border border-[#FBE3EE] text-[#EF4486] hover:bg-pink-50 disabled:opacity-40 flex items-center justify-center transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400';

export const BBTSection: React.FC<BBTSectionProps> = ({
  reading,
  timeMeasured,
  device,
  manualEntry,
  onUpdateReading,
  onUpdateTime,
  onUpdateDevice,
  onUpdateManualEntry,
  aside,
}) => {
  const handleManualChange = (val: string) => {
    const parsed = Number.parseFloat(val.replace(',', '.'));
    const isTemperature = /^\s*\d{2}([.,]\d{1,2})?\s*(°?\s*c)?\s*$/i.test(val) && parsed >= MIN_BBT && parsed <= MAX_BBT;
    onUpdateManualEntry(val, isTemperature ? clampReading(parsed) : undefined);
  };

  const timeOptions = TIME_OPTIONS.includes(timeMeasured) ? TIME_OPTIONS : [timeMeasured, ...TIME_OPTIONS];

  return (
    <section aria-labelledby="bbt-title" className="w-full">
      <div className="px-1 sm:px-5">
        <h3 id="bbt-title" className="text-lg sm:text-xl lg:text-[18.5px] font-bold text-gray-900 leading-tight">
          Basal Body Temperature (BBT)
        </h3>
        <p className="text-sm lg:text-[14px] text-gray-600 mt-1">Measured on waking</p>
      </div>

      <div className="mt-4 lg:mt-[15px] grid grid-cols-1 md:grid-cols-2 min-[1140px]:grid-cols-[minmax(0,1.56fr)_minmax(0,1fr)_minmax(0,0.98fr)] gap-4">
        {/* Reading & presets */}
        <div className="bg-gradient-to-br from-[#FDF3F8] to-[#FBEAF2] rounded-[18px] lg:rounded-[17px] p-4 lg:p-[19px] border border-[#FBE3EE] flex flex-col shadow-[0px_6px_18px_-8px_rgba(239,68,134,0.2)]">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="text-[11px] lg:text-[11px] font-bold text-[#EF4486] uppercase tracking-[0.06em]">
              Today&apos;s BBT reading
            </span>
            <span className="text-[11px] lg:text-[10.5px] text-gray-500">Morning {timeMeasured}</span>
          </div>

          <div className="mt-3 lg:mt-4 bg-white rounded-[14px] lg:rounded-[14px] border border-[#FBE3EE] px-4 lg:px-5 py-3 lg:py-0 lg:h-[90px] flex items-center justify-between">
            <div className="flex items-baseline gap-2.5" aria-live="polite">
              <span className="text-[clamp(1.75rem,1.4rem+0.8vw,1.875rem)] font-bold text-gray-900 tracking-tight">
                {reading.toFixed(2)}
              </span>
              <span className="text-base lg:text-[14.5px] font-semibold text-[#EF4486]">°C</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => onUpdateReading(clampReading(reading + 0.01))}
                disabled={reading >= MAX_BBT}
                aria-label="Increase temperature by 0.01 degrees"
                className={stepperButton}
              >
                <ChevronUp size={15} />
              </button>
              <button
                type="button"
                onClick={() => onUpdateReading(clampReading(reading - 0.01))}
                disabled={reading <= MIN_BBT}
                aria-label="Decrease temperature by 0.01 degrees"
                className={stepperButton}
              >
                <ChevronDown size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-2.5 mt-3 lg:mt-3.5" role="group" aria-label="Quick temperature presets">
            {TEMP_PRESETS.map((temp) => {
              const isSelected = Math.abs(reading - temp) < 0.005;
              return (
                <button
                  key={temp}
                  type="button"
                  onClick={() => onUpdateReading(temp)}
                  aria-pressed={isSelected}
                  className={`text-xs lg:text-[11px] font-semibold h-8 px-3 rounded-[9px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                    isSelected
                      ? 'bg-[#EF4486] text-white shadow-[0px_3px_8px_rgba(239,68,134,0.35)]'
                      : 'bg-white text-gray-800 border border-[#F1E4EA] hover:bg-pink-50'
                  }`}
                >
                  {temp.toFixed(2)}°
                </button>
              );
            })}
          </div>

          <p className="text-[11px] lg:text-[10.5px] text-gray-500 leading-[1.6] mt-4 lg:mt-5 max-w-[420px]">
            <span className="font-bold text-[#B3154F]">Pre-ovulatory range:</span> Low &amp; steady (36.20°C – 36.50°C).
            A 0.3°C – 0.5°C thermal shift marks ovulation.
          </p>
        </div>

        {/* Time, device, manual entry */}
        <div className="flex flex-col gap-3 lg:gap-[11px]">
          <div className={fieldBox}>
            <label htmlFor="bbt-time" className={fieldLabel}>
              Time measured
            </label>
            <select id="bbt-time" value={timeMeasured} onChange={(e) => onUpdateTime(e.target.value)} className={selectClass}>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" className={selectChevron} />
          </div>

          <div className={fieldBox}>
            <label htmlFor="bbt-device" className={fieldLabel}>
              Device
            </label>
            <select id="bbt-device" value={device} onChange={(e) => onUpdateDevice(e.target.value)} className={selectClass}>
              {DEVICE_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" className={selectChevron} />
          </div>

          <div className={`${fieldBox} flex-1 flex flex-col !py-4`}>
            <label htmlFor="bbt-manual" className={fieldLabel}>
              Manual enter
            </label>
            <input
              id="bbt-manual"
              type="text"
              inputMode="decimal"
              title="Type a reading such as 36.45, or a note"
              value={manualEntry}
              onChange={(e) => handleManualChange(e.target.value)}
              className="w-full flex-1 min-h-[3.5rem] lg:min-h-[4rem] mt-2.5 bg-white rounded-[6px] border border-[#F3E6EC] px-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-pink-300"
            />
          </div>
        </div>

        <div className="md:col-span-2 min-[1140px]:col-span-1 min-w-0 flex">{aside}</div>
      </div>
    </section>
  );
};
