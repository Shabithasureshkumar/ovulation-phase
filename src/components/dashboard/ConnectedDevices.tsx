import React from 'react';
import { Watch, Thermometer, Scale, Check } from 'lucide-react';
import { ConnectedDevice } from '../../types/periodTracker';

interface ConnectedDevicesProps {
  devices: ConnectedDevice[];
}

export const ConnectedDevices: React.FC<ConnectedDevicesProps> = ({ devices }) => {
  const getIcon = (type: ConnectedDevice['iconType']) => {
    switch (type) {
      case 'watch':
        return <Watch size={17} className="text-[#A855F7]" />;
      case 'thermometer':
        return <Thermometer size={17} className="text-[#A855F7]" />;
      case 'scale':
        return <Scale size={17} className="text-[#A855F7]" />;
      default:
        return <Watch size={17} className="text-[#A855F7]" />;
    }
  };

  return (
    <div className="w-full pt-4">
      {/* Title */}
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Connected Devices
      </h3>

      {/* Devices List matching Figma 234:1388 */}
      <div className="space-y-2.5">
        {devices.map((device) => (
          <div
            key={device.id}
            className="w-full bg-[#F9FAFB] rounded-[14.4px] p-3 border border-[#F3F4F6] flex items-center justify-between transition hover:border-pink-200/60 hover:bg-white"
          >
            {/* Left Device Name & Icon */}
            <div className="flex items-center gap-2.5">
              <div className="w-[33.4px] h-[33.6px] rounded-full bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                {getIcon(device.iconType)}
              </div>
              <span className="text-[14.4px] font-medium text-[#374151] leading-tight">
                {device.name}
              </span>
            </div>

            {/* Right Status Badge */}
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#16A34A] leading-tight">
                {device.syncStatus}
              </span>
              <div className="w-[16.8px] h-[16.8px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
                <Check size={11} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
