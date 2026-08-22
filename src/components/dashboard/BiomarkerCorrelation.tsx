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
    <div className="w-full bg-white rounded-[23.1px] p-4 sm:p-5 border-[4px] sm:border-[5.68px] border-[#FFE6F4] shadow-[0px_1px_33.6px_rgba(253,83,156,0.2)]">
      {/* Header Label */}
      <div className="text-[11.5px] font-semibold text-[#736278] tracking-[1.16px] uppercase mb-3 sm:mb-4">
        Biomarker Correlation
      </div>

      {/* Flow Cards Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-2">
        {/* Node 1: Body Temperature */}
        <div className="w-full lg:w-[200px] bg-white rounded-[31.5px] p-3 sm:p-3.5 border border-pink-100/60 shadow-[0px_2px_6px_rgba(248,75,159,0.06),0px_4px_21px_rgba(248,75,159,0.12)] flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[27px] bg-[#FFF5FA] flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <Thermometer size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10.5px] font-medium text-[#736278] uppercase tracking-[1px] leading-tight">
              Body Temperature
            </span>
            <span className="text-[14.7px] font-bold text-[#F84B9F] leading-tight mt-0.5">
              {tempRise}
            </span>
          </div>
        </div>

        {/* Connector 1 */}
        <div className="flex items-center gap-2 text-[#736278] py-1 lg:py-0">
          <div className="w-7 h-7 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <ArrowRight size={14} className="rotate-90 lg:rotate-0" />
          </div>
          <span className="text-[10.5px] uppercase tracking-[1px] font-medium">
            observed with
          </span>
        </div>

        {/* Node 2: Cervical Mucus */}
        <div className="w-full lg:w-[200px] bg-white rounded-[31.5px] p-3 sm:p-3.5 border border-pink-100/60 shadow-[0px_2px_6px_rgba(248,75,159,0.06),0px_4px_21px_rgba(248,75,159,0.12)] flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[27px] bg-[#FFF5FA] flex items-center justify-center text-[#B84DEB] flex-shrink-0">
            <Droplet size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10.5px] font-medium text-[#736278] uppercase tracking-[1px] leading-tight">
              Cervical Mucus
            </span>
            <span className="text-[14.7px] font-bold text-[#B84DEB] leading-tight mt-0.5">
              {mucusType}
            </span>
          </div>
        </div>

        {/* Connector 2 */}
        <div className="flex items-center gap-2 text-[#736278] py-1 lg:py-0">
          <div className="w-7 h-7 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-[#F84B9F] flex-shrink-0">
            <Equal size={14} />
          </div>
          <span className="text-[10.5px] uppercase tracking-[1px] font-medium">
            correlates to
          </span>
        </div>

        {/* Node 3: High Fertility Window */}
        <div className="w-full lg:w-[232px] bg-gradient-to-r from-[#FF5DA8] to-[#C78BFF] rounded-[32px] p-3 sm:p-3.5 shadow-[0px_2px_6px_rgba(248,75,159,0.08),0px_4px_21px_rgba(248,75,159,0.2)] flex items-center gap-2.5 sm:gap-3 text-white">
          <div className="w-[42px] h-[42px] rounded-[27px] bg-white/20 flex items-center justify-center text-white flex-shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10.5px] font-medium text-white/90 uppercase tracking-[1px] leading-tight">
              High Fertility Window
            </span>
            <span className="text-[15px] font-bold text-white leading-tight mt-0.5">
              {fertilityWindowHours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
