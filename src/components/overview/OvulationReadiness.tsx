import React from 'react';
import { Thermometer, Droplet, Heart, FlaskConical, TrendingUp } from 'lucide-react';
import mucusFingers from '../../assets/cervical_mucus_fingers.png';
import lhTestDevice from '../../assets/lh_test_device.png';
import libidoHeart from '../../assets/libido_heart.png';

/** Inner readiness card: white with the soft pink halo used throughout the design. */
const readinessCard =
  'relative bg-white rounded-[22px] border border-[#F6ECF1] shadow-[0px_0px_0px_5px_#FDF6F9,0px_10px_28px_-14px_rgba(236,72,153,0.3)] overflow-hidden';

const CardTitle: React.FC<{ icon: React.ReactNode; iconClass: string; label: string; small?: boolean }> = ({
  icon,
  iconClass,
  label,
  small,
}) => (
  <div className="flex items-center gap-2.5 min-w-0">
    <span className={`w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 ${iconClass}`} aria-hidden="true">
      {icon}
    </span>
    <h3 className={`${small ? 'text-[12.5px] font-semibold' : 'text-[14.5px] font-medium'} text-gray-900 leading-tight`}>{label}</h3>
  </div>
);

const MUCUS_CHIPS = ['Dry', 'Sticky', 'Creamy', 'Watery'];
const FERTILITY_SIGNALS = [
  { label: 'LH Surge', value: 'Detected', color: 'text-[#4F46E5]' },
  { label: 'Estrogen', value: 'Peak', color: 'text-[#EC4899]' },
  { label: 'Cervix', value: 'Open', color: 'text-[#10B981]' },
];
const CHART_DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FERTILITY_SCORE = 92;
// Visual fill of the fertility bar as drawn in the reference design.
const FERTILITY_BAR_FILL = 40;

export const OvulationReadiness: React.FC = () => {
  return (
    <section aria-labelledby="readiness-title" className="w-full">
      <div className="px-1">
        <h2 id="readiness-title" className="text-[clamp(1.125rem,1rem+0.4vw,1.25rem)] font-semibold text-gray-900 leading-tight">
          Ovulation readiness
        </h2>
        <p className="text-[14px] text-gray-600 mt-1.5">Multi-signal fertility intelligence, updated live</p>
      </div>

      <div className="mt-[clamp(1.25rem,2.4vw,2rem)] space-y-[clamp(1rem,1.8vw,1.375rem)] px-1">
        {/* Row 1: BBT + Cervical mucus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,1.8vw,1.375rem)]">
          {/* Basal body temp */}
          <div className={`${readinessCard} px-[clamp(1rem,2.6vw,2.1rem)] pt-5 pb-4`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 pt-4">
                <CardTitle icon={<Thermometer size={15} />} iconClass="bg-[#EEF2FF] text-[#6366F1]" label="Basal body temp" />

                <div className="flex items-center gap-2 mt-5">
                  <span className="text-[30px] font-semibold text-gray-900 leading-none tracking-tight">0.36°</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#16A34A]">
                    <TrendingUp size={13} aria-hidden="true" />
                    Rising
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 leading-[1.5] mt-3 max-w-[270px]">
                  Your body temperature is <strong className="font-semibold text-gray-900">0.36°C above</strong> your baseline. This rise supports that ovulation may be near.
                </p>
              </div>

              {/* Temperature ring */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-[#16A34A] bg-[#E9F9EF] rounded-full px-2.5 py-0.5">Above baseline</span>
                <div className="relative mt-2 w-[clamp(6rem,8.5vw,7.5rem)] aspect-square rounded-full bg-gradient-to-br from-[#FBCFE8] via-[#FDF2F8] to-[#F9A8D4] p-[7px] shadow-[0px_0px_18px_rgba(244,114,182,0.35)]">
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center">
                    <Thermometer size={11} className="text-[#F472B6]" aria-hidden="true" />
                    <span className="text-[clamp(0.9375rem,0.8rem+0.4vw,1.0625rem)] font-bold text-gray-900 leading-tight mt-0.5">98.42°F</span>
                    <span className="text-[8px] font-semibold text-[#EC4899] leading-tight">+0.36°C</span>
                    <span className="text-[7px] text-gray-400 leading-tight">Above Baseline</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trend chart */}
            <div className="mt-2" aria-hidden="true">
              <svg className="w-full h-12" viewBox="0 0 460 48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bbtTrendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B7CF6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#8B7CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,38 C60,30 110,30 160,36 S260,28 320,24 S420,14 460,6 L460,48 L200,48 Z" fill="url(#bbtTrendFill)" />
                <path d="M0,38 C60,30 110,30 160,36 S260,28 320,24 S420,14 460,6" fill="none" stroke="#7C6FF0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                {CHART_DAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Cervical mucus */}
          <div className={`${readinessCard} pl-[clamp(1rem,1.8vw,1.4rem)] pr-2 pt-9 pb-6 flex`}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3 pr-5">
                <CardTitle icon={<Droplet size={15} />} iconClass="bg-[#FDF2F8] text-[#EC4899]" label="Cervical mucus" />
                <span className="text-[10px] font-bold text-white bg-[#F472B6] rounded-full px-2.5 py-1 flex-shrink-0">Peak fertility</span>
              </div>

              <div>
                <div className="min-w-0 relative z-10">
                  <h4 className="text-[21px] font-semibold text-gray-900 leading-tight mt-6">Egg white</h4>
                  <p className="text-[13.5px] text-gray-500 mt-1">Stretchy, clear consistency</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4 max-w-[190px]" aria-label="Consistency scale, egg white selected">
                    {MUCUS_CHIPS.map((chip) => (
                      <span key={chip} className="text-[14px] font-medium text-gray-700 bg-[#F3F4F6] rounded-[6px] px-2.5 h-[26px] leading-[26px]">
                        {chip}
                      </span>
                    ))}
                    <span className="text-[14px] font-medium text-white bg-[#F472B6] rounded-[6px] px-2.5 h-[26px] leading-[26px]">EW</span>
                  </div>
                </div>

<img
                  src={mucusFingers}
                  alt=""
                  className="hidden min-[420px]:block absolute right-0 bottom-0 w-[clamp(6.5rem,14vw,11.5rem)] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Fertility level, LH test, Libido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(1rem,2vw,1.75rem)]">
          {/* Fertility level */}
          <div className={`${readinessCard} sm:col-span-2 lg:col-span-1 px-[clamp(1rem,2.2vw,1.75rem)] pt-6 pb-5`}>
            <div className="flex items-center justify-between gap-3">
              <CardTitle icon={<Heart size={15} />} iconClass="bg-[#F1EDFE] text-[#8B5CF6]" label="Fertility level" />
              <span className="text-[10px] font-bold text-[#8B5CF6] tracking-wide">HIGH</span>
            </div>

            <div className="flex items-baseline justify-between gap-3 mt-5">
              <p className="flex items-baseline gap-1.5">
                <span className="text-[30px] font-semibold text-gray-900 leading-none">{FERTILITY_SCORE}</span>
                <span className="text-[14px] text-gray-500">/ 100</span>
              </p>
              <span className="text-[11.5px] text-gray-500 pr-[20%]">peaks in 2d</span>
            </div>
            {/* Fill length follows the design; the score itself is the "92 / 100" text above */}
            <div className="w-full h-[9px] bg-[#EEEEF6] rounded-full overflow-hidden mt-4" aria-hidden="true">
              <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#A78BFA] rounded-full" style={{ width: `${FERTILITY_BAR_FILL}%` }} />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              {FERTILITY_SIGNALS.map((s) => (
                <div key={s.label} className="bg-[#F8F7FB] rounded-full py-1.5 text-center min-w-0">
                  <p className="text-[9.5px] text-gray-500 uppercase tracking-[0.1em] truncate">{s.label}</p>
                  <p className={`text-[11.5px] font-semibold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LH Ovulation Test */}
          <div className={`${readinessCard} min-h-[190px] px-5 pt-6 pb-5`}>
            <CardTitle icon={<FlaskConical size={14} />} iconClass="bg-[#EAF6FE] text-[#38A5E8]" label="LH Ovulation Test" small />
            <h4 className="text-[21px] font-semibold text-gray-900 leading-tight mt-5 relative z-10">Negative</h4>
            <p className="text-[14px] text-gray-500 mt-1 relative z-10">Low LH level</p>
            <div aria-hidden="true" className="relative z-10 mt-3 w-[123px] h-10 bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm flex items-center px-8">
              <span className="w-2.5 h-[26px] rounded-[3px] bg-[#EC4899]" />
            </div>
            <img
              src={lhTestDevice}
              alt=""
              className="absolute right-1 bottom-0 h-[clamp(7rem,10vw,9.5rem)] w-auto object-contain"
            />
          </div>

          {/* Libido */}
          <div className={`${readinessCard} min-h-[190px] px-5 pt-6 pb-5`}>
            <CardTitle icon={<Heart size={14} className="fill-current" />} iconClass="bg-[#FDECF3] text-[#EC4899]" label="Libido" small />
            <h4 className="text-[21px] font-semibold text-gray-900 leading-tight mt-5 relative z-10">Moderate</h4>
            <p className="text-[14px] text-gray-500 mt-1 relative z-10">Normal for this phase</p>
            <img
              src={libidoHeart}
              alt=""
              className="absolute -right-2 -bottom-1 w-[clamp(6.5rem,9.5vw,8.5rem)] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
