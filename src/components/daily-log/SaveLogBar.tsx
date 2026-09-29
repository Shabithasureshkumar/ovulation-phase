import React from 'react';

interface SaveLogBarProps {
  onSave: () => void;
}

export const SaveLogBar: React.FC<SaveLogBarProps> = ({ onSave }) => {
  return (
    <div className="w-full flex items-center justify-end">
      <button
        type="button"
        onClick={onSave}
        className="h-12 lg:h-[51px] px-8 lg:px-10 bg-gradient-to-r from-[#F2449A] to-[#FB5FA8] hover:from-[#DE2E86] hover:to-[#F04B99] text-white text-base lg:text-[16px] font-bold rounded-full shadow-[0px_8px_22px_rgba(242,68,154,0.35)] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
      >
        Save log
      </button>
    </div>
  );
};
