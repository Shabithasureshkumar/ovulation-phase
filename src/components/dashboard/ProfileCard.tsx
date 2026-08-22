import React, { useState } from 'react';
import type { UserProfile } from '../../types/periodTracker';

interface ProfileCardProps {
  profile: UserProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-[#E5469D] to-[#FF81B3] rounded-[33.8px] p-5 sm:p-6 text-white shadow-[0px_10px_25px_-5px_rgba(229,70,157,0.35)] relative overflow-hidden flex items-center justify-between">
      {/* Ambient background decoration circles */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-lg pointer-events-none" />

      {/* Left Info Column */}
      <div className="flex flex-col justify-center z-10">
        <h3 className="text-[20px] sm:text-[21.6px] font-extrabold text-white leading-tight">
          {profile.name}
        </h3>
        <p className="text-[15px] sm:text-[16.75px] font-semibold text-white/95 mt-1.5 leading-snug">
          Gender:{profile.gender}
        </p>
        <p className="text-[15px] sm:text-[16.75px] font-normal text-white/90 leading-snug">
          Age:{profile.age}
        </p>
      </div>

      {/* Right Avatar Image with Fallback */}
      <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden border-2 border-white/80 shadow-md flex-shrink-0 z-10 bg-pink-400 flex items-center justify-center">
        {!imageError && profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-white uppercase">
            {profile.name.charAt(0)}
          </span>
        )}
      </div>
    </div>
  );
};
