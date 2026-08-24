import React from 'react';
import { Thermometer, Droplet, ArrowRight, Equal, Sparkles } from 'lucide-react';

interface BiomarkerCorrelationProps {
  tempRise: string;
  mucusType: string;
  fertilityWindowHours: string;
}

export const BiomarkerCorrelation: React.FC<BiomarkerCorrelationProps> = ({
  tempRise = '+1.0°C',
  mucusType = 'Egg-white',
  fertilityWindowHours = '24–48 hrs',
}) => {
  return (
    <div className="w-full bg-white rounded-[20px] sm:rounded-[23.1px] p-3.5 sm:p-5 border-[3px] sm:border-[5.68px] border-[#FFE6F4] shadow-[0px_1px_33.6px_rgba(253,83,156,0.2)] min-w-0">
      {/* Header Label */}
      <div className="text-[11px] sm:text-[11.5px] font-semibold text-[#736278] tracking-[1.16px] uppercase mb-3 sm:mb-4">
        Biomarker Correlation
      </div>

      {/* Flow Cards Container */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-2.5 sm:gap-3 min-w-0">
        {/* Node 1: Body Temperature */}
        <div className="w-full xl:flex-1 bg-white rounded-[26px] sm:rounded-[31.5px] p-2.5 sm:p-3.5 border border-pink-100/60 shadow-[0px_2px_6px_rgba(248,75,159,0.06),0px_4px_21px_rgba(248,75,159,0.12)] flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[24px] bg-[#FFF5FA] flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <Thermometer size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] sm:text-[10.5px] font-medium text-[#736278] uppercase tracking-[0.8px] sm:tracking-[1px] leading-tight truncate">
              Body Temperature
            </span>
            <span className="text-[13.5px] sm:text-[14.7px] font-bold text-[#F84B9F] leading-tight mt-0.5">
              {tempRise}
            </span>
          </div>
        </div>

        {/* Connector 1 */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#736278] py-0.5 xl:py-0 flex-shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <ArrowRight size={13} className="rotate-90 xl:rotate-0" />
          </div>
          <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.8px] sm:tracking-[1px] font-medium whitespace-nowrap">
            observed with
          </span>
        </div>

        {/* Node 2: Cervical Mucus */}
        <div className="w-full xl:flex-1 bg-white rounded-[26px] sm:rounded-[31.5px] p-2.5 sm:p-3.5 border border-pink-100/60 shadow-[0px_2px_6px_rgba(248,75,159,0.06),0px_4px_21px_rgba(248,75,159,0.12)] flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[24px] bg-[#FFF5FA] flex items-center justify-center text-[#B84DEB] flex-shrink-0">
            <Droplet size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] sm:text-[10.5px] font-medium text-[#736278] uppercase tracking-[0.8px] sm:tracking-[1px] leading-tight truncate">
              Cervical Mucus
            </span>
            <span className="text-[13.5px] sm:text-[14.7px] font-bold text-[#B84DEB] leading-tight mt-0.5 truncate">
              {mucusType}
            </span>
          </div>
        </div>

        {/* Connector 2 */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#736278] py-0.5 xl:py-0 flex-shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <Equal size={13} />
          </div>
          <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.8px] sm:tracking-[1px] font-medium whitespace-nowrap">
            correlates to
          </span>
        </div>

        {/* Node 3: High Fertility Window */}
        <div className="w-full xl:flex-1 bg-gradient-to-r from-[#FF5DA8] to-[#C78BFF] rounded-[26px] sm:rounded-[32px] p-2.5 sm:p-3.5 shadow-[0px_2px_6px_rgba(248,75,159,0.08),0px_4px_21px_rgba(248,75,159,0.2)] flex items-center gap-2.5 sm:gap-3 text-white min-w-0">
          <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[24px] bg-white/20 flex items-center justify-center text-white flex-shrink-0">
            <Sparkles size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] sm:text-[10.5px] font-medium text-white/90 uppercase tracking-[0.8px] sm:tracking-[1px] leading-tight truncate">
              High Fertility Window
            </span>
            <span className="text-[13.5px] sm:text-[15px] font-bold text-white leading-tight mt-0.5 truncate">
              {fertilityWindowHours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
