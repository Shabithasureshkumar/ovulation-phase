import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CycleStatusCard } from '../components/overview/CycleStatusCard';
import { PhaseInfoCard } from '../components/overview/PhaseInfoCard';
import { OvulationReadiness } from '../components/overview/OvulationReadiness';
import { AIRecommendation } from '../components/overview/AIRecommendation';
import { FertilityInsight } from '../components/overview/FertilityInsight';
import { MedicationHistory } from '../components/overview/MedicationHistory';
import { AIAssistantModal } from '../components/modals/AIAssistantModal';
import { TipsModal } from '../components/modals/TipsModal';
import { LogPeriodModal } from '../components/modals/LogPeriodModal';
import { Toast } from '../components/layout/Toast';
import { useToast } from '../hooks/useToast';
import { TODAY_CYCLE_DAY } from '../data/cycleData';
import { getMedicationHistory, loadSavedLogs } from '../data/logStorage';

export const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [isAvaOpen, setIsAvaOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isLogPeriodOpen, setIsLogPeriodOpen] = useState(false);
  const { toastMessage, showToast } = useToast();
  // Read once per visit so medication logged in Daily Log shows up here
  const medications = useMemo(() => getMedicationHistory(loadSavedLogs(), 4), []);

  return (
    <div className="w-full space-y-[clamp(1rem,1.8vw,1.375rem)]">
      {/* Top Row: Cycle status card + Phase information card */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] xl:grid-cols-[367px_minmax(0,1fr)] gap-[clamp(1rem,1.8vw,1.375rem)]">
        <CycleStatusCard cycleDay={TODAY_CYCLE_DAY} phase="Ovulation Phase" status="Healthy" />
        <PhaseInfoCard onViewTips={() => setIsTipsOpen(true)} onLogPeriod={() => setIsLogPeriodOpen(true)} />
      </div>

      {/* Everything below sits inside one outer card, as in the design */}
      <div className="bg-white rounded-[22px] lg:rounded-[26px] border border-[#F3EFF3] shadow-[0px_4px_24px_-12px_rgba(38,33,78,0.1)] px-[clamp(0.75rem,1.2vw,0.875rem)] pt-[clamp(1rem,2.4vw,2.25rem)] pb-[clamp(0.75rem,1.6vw,1.75rem)] space-y-[clamp(0.875rem,1.4vw,1.125rem)]">
        <OvulationReadiness />
        <AIRecommendation onOpenAva={() => setIsAvaOpen(true)} />
        <FertilityInsight />
        <MedicationHistory medications={medications} onViewAll={() => navigate('/daily-log')} />
      </div>

      <AIAssistantModal
        isOpen={isAvaOpen}
        onClose={() => setIsAvaOpen(false)}
        currentPhase="Ovulation"
        cycleDay={TODAY_CYCLE_DAY}
      />

      <TipsModal isOpen={isTipsOpen} onClose={() => setIsTipsOpen(false)} phase="Ovulation" />

      <LogPeriodModal
        isOpen={isLogPeriodOpen}
        onClose={() => setIsLogPeriodOpen(false)}
        onSaved={(entry) => {
          setIsLogPeriodOpen(false);
          showToast(`Period logged for today · ${entry.flow} flow`);
        }}
      />

      <Toast message={toastMessage} />
    </div>
  );
};
