import React from 'react';
import { Sparkles, Thermometer, Droplet, ArrowRight, Equal, Info, Heart } from 'lucide-react';

const Biomarker: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white rounded-full pl-2 pr-5 py-2 shadow-[0px_4px_14px_-4px_rgba(236,72,153,0.25)] min-w-0 w-full lg:w-auto">
    <span className="w-9 h-9 rounded-full bg-[#FDF2F8] text-[#EC4899] flex items-center justify-center flex-shrink-0" aria-hidden="true">
      {icon}
    </span>
    <span className="min-w-0">
      <span className="block text-[9px] font-medium text-gray-700 uppercase tracking-[0.14em]">{label}</span>
      <span className="block text-[12.5px] font-semibold text-[#EC4899] mt-0.5">{value}</span>
    </span>
  </div>
);

const Connector: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex lg:flex-col items-center gap-1.5 flex-shrink-0 text-gray-500" aria-hidden="true">
    <span className="w-5 h-5 rounded-full bg-[#FDF2F8] text-[#EC4899] flex items-center justify-center">{icon}</span>
    <span className="text-[9px] font-medium uppercase tracking-[0.14em] whitespace-nowrap">{label}</span>
  </div>
);

export const FertilityInsight: React.FC = () => {
  return (
    <>
      <section
        aria-labelledby="fertility-insight-title"
        className="w-full bg-white rounded-[22px] border border-[#F3EFF3] shadow-[0px_8px_28px_-14px_rgba(236,72,153,0.3)] px-[clamp(1rem,2.4vw,1.75rem)] pt-6 pb-7"
      >
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#EC4899]" aria-hidden="true" />
          <h3 id="fertility-insight-title" className="text-[12.5px] font-semibold text-gray-900">
            Fertility Insight
          </h3>
        </div>

        <p className="text-[clamp(0.9375rem,0.85rem+0.3vw,1rem)] font-semibold text-gray-900 leading-snug mt-3">
          You are likely ovulating or within the next 24–48 hours of your ovulation window.
        </p>
        <p className="text-[12px] text-gray-500 leading-[1.65] mt-4">
          Your body temperature is approximately 0.36°C above baseline, and your cervical mucus has an egg-white consistency. Together these findings suggest that you are in your fertile window.
        </p>

        {/* Biomarker correlation */}
        <div className="mt-5 rounded-[20px] border-2 border-[#FCE7F1] px-[clamp(0.75rem,1.6vw,1.25rem)] pt-4 pb-5">
          <span className="block text-[10px] font-medium text-gray-600 uppercase tracking-[0.16em]">Biomarker correlation</span>
          <div
            className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-3"
            aria-label="Body temperature plus 1.0 degrees, observed with egg-white cervical mucus, correlates to a high fertility window of 24 to 48 hours"
          >
            <Biomarker icon={<Thermometer size={16} />} label="Body temperature" value="+1.0°C" />
            <Connector icon={<ArrowRight size={11} className="rotate-90 lg:rotate-0" />} label="Observed with" />
            <Biomarker icon={<Droplet size={16} className="fill-current" />} label="Cervical mucus" value="Egg-white" />
            <Connector icon={<Equal size={11} />} label="Correlates to" />
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#EC4899] to-[#F07BC0] rounded-full pl-2 pr-6 py-2 shadow-[0px_6px_18px_-4px_rgba(236,72,153,0.45)] text-white w-full lg:w-auto">
              <span className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Heart size={16} className="fill-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-medium text-white/85 uppercase tracking-[0.14em]">High fertility window</span>
                <span className="block text-[14px] font-bold mt-0.5">24–48 hrs</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What this means */}
      <section
        aria-labelledby="what-this-means-title"
        className="w-full bg-[#FDF1F6] rounded-[16px] px-[clamp(0.75rem,1.2vw,0.875rem)] py-3.5 flex items-start gap-3.5"
      >
        <span className="w-8 h-8 rounded-full bg-[#F7A8C8] text-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <Info size={16} />
        </span>
        <div className="min-w-0">
          <h4 id="what-this-means-title" className="text-[12px] font-semibold text-gray-900">
            What this means
          </h4>
          <p className="text-[12px] text-gray-600 leading-[1.6] mt-1">
            The rise in body temperature together with egg-white cervical mucus strongly indicates that ovulation is likely occurring or will occur within the next 24–48 hours.
          </p>
        </div>
      </section>
    </>
  );
};
