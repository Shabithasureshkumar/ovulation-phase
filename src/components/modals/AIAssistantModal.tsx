import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';
import type { CyclePhase } from '../../types/cycle';
import { getPhaseLabel } from '../../data/cycleData';
import { useDialog } from '../../hooks/useDialog';
import avaRobot from '../../assets/ai_robot.png';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhase: CyclePhase;
  cycleDay: number;
}

interface ChatMessage {
  id: string;
  sender: 'ava' | 'user';
  text: string;
  time: string;
}

const timeNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/** Phase-specific guidance for the questions whose answer depends on where the patient is in her cycle. */
const PHASE_GUIDANCE: Record<CyclePhase, { fertility: string; mood: string; libido: string }> = {
  Menstruation: {
    fertility: 'your fertility is at its lowest while the uterine lining sheds. Your next fertile window typically opens about a week after your period ends.',
    mood: 'estrogen and progesterone are both low, so tiredness and lower mood are common. Gentle movement, iron-rich foods and extra rest help.',
    libido: 'libido is often lower while hormones are at their lowest point; this is normal and usually lifts as estrogen rises after your period.',
  },
  'Fertile Window': {
    fertility: 'rising estrogen is preparing a follicle to release an egg, so your chance of conception is climbing toward its peak.',
    mood: 'rising estrogen often brings better focus, confidence and energy, a good time for more demanding workouts.',
    libido: 'libido usually climbs as estrogen and testosterone rise toward ovulation.',
  },
  Ovulation: {
    fertility: 'estrogen peaks to trigger the LH surge and release an egg. Your fertile window is highest within the 24–48 hours surrounding this shift!',
    mood: 'high estrogen often boosts mental clarity, confidence and physical energy. Staying hydrated and getting 8 hours of sleep helps sustain this peak.',
    libido: 'a surge in estrogen and testosterone naturally heightens libido, vitality and social energy, your body’s signal of peak fertility.',
  },
  'Luteal Phase': {
    fertility: 'ovulation has passed and progesterone is dominant, so conception this cycle is unlikely unless an egg was fertilised in the last day or two.',
    mood: 'progesterone rises and can bring calmer but lower energy, and sometimes PMS-related irritability late in the phase. Prioritise sleep and balanced meals.',
    libido: 'libido often tapers as progesterone becomes dominant after ovulation.',
  },
};

/** Mounted only while open, so every open starts a fresh conversation. */
const AIAssistantDialog: React.FC<Omit<AIAssistantModalProps, 'isOpen'>> = ({ onClose, currentPhase, cycleDay }) => {
  const phaseLabel = getPhaseLabel(currentPhase);
  const guidance = PHASE_GUIDANCE[currentPhase];
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-1',
      sender: 'ava',
      text: `Hi Jimmy! I'm Ava, your cycle health companion. You are currently on Cycle Day ${cycleDay} in your ${phaseLabel}. How can I help with your biomarkers, fertility signals, or symptoms today?`,
      time: timeNow(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | undefined>(undefined);
  const dialogRef = useDialog<HTMLDivElement>(true, onClose);

  // Drop any reply still pending when the dialog closes
  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  // Keep the newest message in view
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getPhaseAwareResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Specific signals first, so "How does BBT confirm ovulation?" answers about BBT
    if (q.includes('bbt') || q.includes('temp') || q.includes('temperature') || q.includes('thermal')) {
      return `Basal Body Temperature (BBT) typically stays in the pre-ovulatory range (36.20°C – 36.50°C) before ovulation and shifts upward by 0.3°C – 0.5°C immediately after ovulation due to progesterone production.`;
    }

    if (q.includes('mucus') || q.includes('discharge') || q.includes('cervical') || q.includes('fluid')) {
      return `Around ovulation, cervical mucus transitions to an egg-white, stretchy, clear consistency (EW). This creates an optimal alkaline environment that protects sperm and aids motility.`;
    }

    if (q.includes('libido') || q.includes('desire') || q.includes('sex') || q.includes('drive')) {
      return `In your ${phaseLabel}, ${guidance.libido}`;
    }

    if (q.includes('mood') || q.includes('energy') || q.includes('feel')) {
      return `In your ${phaseLabel}, ${guidance.mood}`;
    }

    if (q.includes('medication') || q.includes('vitamin') || q.includes('supplement')) {
      return `Regular supplements like Vitamin D, Folic Acid, and CoQ10 support cellular vitality and ovarian health throughout your cycle. Log them daily to see correlation patterns!`;
    }

    if (q.includes('ovulation') || q.includes('fertile') || q.includes('conception') || q.includes('conceive')) {
      return `During your ${phaseLabel} (Cycle Day ${cycleDay}), ${guidance.fertility}`;
    }

    return `That's a great question about your ${phaseLabel} on Cycle Day ${cycleDay}. Maintaining consistent BBT logs, tracking cervical fluid changes, and logging your wellness signals will provide the most accurate personal cycle predictions.`;
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: timeNow(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Rule-based reply keyed on the question's topic
    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const avaMsg: ChatMessage = {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: getPhaseAwareResponse(text),
        time: timeNow(),
      };
      setMessages((prev) => [...prev, avaMsg]);
    }, 450);
  };

  const suggestions = [
    'Tell me about my ovulation window',
    'How does BBT confirm ovulation?',
    'What does egg-white mucus mean?',
    'Why is libido higher now?',
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ava-assistant-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[28px] shadow-2xl border border-pink-100 w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[90dvh]"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-purple-50 via-pink-50 to-white border-b border-pink-100 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 shadow-sm flex-shrink-0 bg-white">
              <img
                src={avaRobot}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 id="ava-assistant-title" className="font-extrabold text-gray-900 text-base">
                  Ava Health Assistant
                </h3>
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              </div>
              <p className="text-xs font-semibold text-[#EF4486]">
                {phaseLabel} · Day {cycleDay}
              </p>
              <p className="text-[10px] text-gray-500">Rule-based cycle guidance · not medical advice</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ava assistant"
            className="touch-target w-9 h-9 rounded-full hover:bg-white text-gray-500 hover:text-gray-700 flex items-center justify-center transition flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Message List */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto custom-scrollbar space-y-3.5 bg-[#FAF9FD]" aria-live="polite">
          {messages.map((msg) => {
            const isAva = msg.sender === 'ava';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isAva ? 'justify-start' : 'justify-end'}`}
              >
                {isAva && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-pink-200 flex-shrink-0 bg-white shadow-sm">
                    <img
                      src={avaRobot}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isAva
                      ? 'bg-white text-gray-800 border border-pink-100 shadow-sm'
                      : 'bg-gradient-to-r from-[#EF4486] to-[#FF4B9B] text-white shadow-md font-medium'
                  }`}
                >
                  <p>
                    <span className="sr-only">{isAva ? 'Ava: ' : 'You: '}</span>
                    {msg.text}
                  </p>
                  <span
                    className={`text-[9px] block text-right mt-1 ${
                      isAva ? 'text-gray-400' : 'text-white/80'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {!isAva && (
                  <div aria-hidden="true" className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    <User size={14} />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompt Chips */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {suggestions.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => handleSend(sug)}
              className="touch-target text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-pink-50 hover:text-[#EF4486] border border-gray-200 hover:border-pink-200 px-3 py-1.5 rounded-full whitespace-nowrap transition active:scale-95 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3.5 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0"
        >
          <input
            type="text"
            data-autofocus
            aria-label="Ask Ava a question"
            placeholder="Ask Ava anything about your cycle or biomarkers..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-w-0 flex-1 bg-[#FAFAFD] rounded-full px-4 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#EF4486] hover:bg-[#D92662] disabled:opacity-50 text-white flex items-center justify-center transition shadow-sm active:scale-95 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
};

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, ...props }) =>
  isOpen ? <AIAssistantDialog {...props} /> : null;
