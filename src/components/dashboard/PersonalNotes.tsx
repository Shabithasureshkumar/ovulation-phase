import React, { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PersonalNotesProps {
  initialNote?: string;
  onSaveNote: (note: string) => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({
  initialNote = '',
  onSaveNote,
}) => {
  const [note, setNote] = useState(initialNote);
  const [isSaved, setIsSaved] = useState(false);
  const maxLength = 300;

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const handleSave = () => {
    onSaveNote(note);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full pt-4">
      {/* Header */}
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px]">
        Personal Notes
      </h3>
      <p className="text-[13.2px] text-[#9CA3AF] leading-[19.8px] mt-0.5 mb-2">
        Add your thoughts for today
      </p>

      {/* Text Area Card matching Figma 234:1379 */}
      <div className="relative">
        <textarea
          value={note}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setNote(e.target.value);
            }
          }}
          rows={3}
          placeholder="Example: Today I felt nauseous after eating lunch."
          className="w-full bg-[#F9FAFB] rounded-[14.4px] p-3 text-[13.2px] text-gray-800 placeholder-[#9CA3AF] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#EA33A1]/30 focus:border-[#EA33A1] transition resize-none leading-[19.8px]"
        />
      </div>

      {/* Character Counter Row */}
      <div className="flex items-center justify-between py-1 text-[12px] text-[#9CA3AF]">
        {isSaved ? (
          <span className="text-emerald-600 font-medium flex items-center gap-1">
            <Check size={13} />
            <span>Note saved successfully!</span>
          </span>
        ) : (
          <span className="text-gray-400 text-[11px] flex items-center gap-1">
            <Sparkles size={11} className="text-pink-400" />
            <span>Private & encrypted</span>
          </span>
        )}
        <span>
          {note.length} / {maxLength}
        </span>
      </div>

      {/* Save Note Button matching Figma 234:1383 */}
      <button
        onClick={handleSave}
        className="w-full h-[40.8px] rounded-[14.4px] bg-[#EA33A1] hover:bg-[#D7068E] text-white font-semibold text-[14.4px] flex items-center justify-center transition shadow-[0_4px_12px_rgba(234,51,161,0.25)] active:scale-[0.98]"
      >
        {isSaved ? 'Saved' : 'Save Note'}
      </button>
    </div>
  );
};
