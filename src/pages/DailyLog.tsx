import React, { useState } from 'react';
import { DateCarousel } from '../components/daily-log/DateCarousel';
import { AIInsights } from '../components/daily-log/AIInsights';
import { BBTSection } from '../components/daily-log/BBTSection';
import { MedicationSection } from '../components/daily-log/MedicationSection';
import { CervicalMucusSection } from '../components/daily-log/CervicalMucusSection';
import { MoodSection } from '../components/daily-log/MoodSection';
import { EnergySection } from '../components/daily-log/EnergySection';
import { LHTestSection } from '../components/daily-log/LHTestSection';
import { LibidoSection } from '../components/daily-log/LibidoSection';
import { SaveLogBar } from '../components/daily-log/SaveLogBar';
import { AddMedicationModal } from '../components/modals/AddMedicationModal';
import { Toast } from '../components/layout/Toast';
import { useToast } from '../hooks/useToast';
import type { DailyLogData, MedicationEntry, MedicationStatus } from '../types/cycle';
import {
  TODAY,
  MONTH_NAMES,
  DAY_NAMES,
  addDays,
  isSameDay,
  formatDateToIso,
  getInitialDayLog,
} from '../data/cycleData';
import { loadSavedLogs, persistSavedLogs, type LogsMap } from '../data/logStorage';

const sameMedication = (a: MedicationEntry, b: MedicationEntry) =>
  a.name.toLowerCase() === b.name.toLowerCase() &&
  a.dosage.toLowerCase() === b.dosage.toLowerCase() &&
  a.time === b.time;

export const DailyLog: React.FC = () => {
  // The 7-day strip is centred on today (Jun 18 – Jun 24)
  const [windowStart, setWindowStart] = useState<Date>(() => addDays(TODAY, -3));
  const [selectedDate, setSelectedDate] = useState<Date>(TODAY);
  const [savedLogs, setSavedLogs] = useState<LogsMap>(loadSavedLogs);
  // Unsaved edits per date; committed by Save Log
  const [drafts, setDrafts] = useState<LogsMap>({});

  const [isAddMedOpen, setIsAddMedOpen] = useState(false);
  const { toastMessage, showToast } = useToast();

  const selectedIso = formatDateToIso(selectedDate);
  const baselineLog = savedLogs[selectedIso] ?? getInitialDayLog(selectedDate);
  const currentLog = drafts[selectedIso] ?? baselineLog;
  const { cycleDay, phase } = baselineLog;

  // Arrows move the strip a week and keep the same weekday selected
  const shiftWeek = (days: number) => {
    setWindowStart((prev) => addDays(prev, days));
    setSelectedDate((prev) => addDays(prev, days));
  };

  const handleToday = () => {
    setWindowStart(addDays(TODAY, -3));
    setSelectedDate(TODAY);
  };

  const updateCurrentLog = (partial: Partial<DailyLogData>) => {
    setDrafts((prev) => ({
      ...prev,
      [selectedIso]: { ...(prev[selectedIso] ?? baselineLog), ...partial },
    }));
  };

  const handleToggleMedStatus = (medId: string, status: MedicationStatus) => {
    updateCurrentLog({
      medications: currentLog.medications.map((m) => (m.id === medId ? { ...m, status } : m)),
    });
  };

  // A medication saved from the modal is persisted immediately for this date
  const handleSaveMedication = (newMed: MedicationEntry) => {
    if (currentLog.medications.some((m) => sameMedication(m, newMed))) {
      showToast(`${newMed.name} ${newMed.dosage} at ${newMed.time} is already logged for this date`);
      return;
    }
    const nextSaved: LogsMap = {
      ...savedLogs,
      [selectedIso]: { ...baselineLog, medications: [...baselineLog.medications, newMed] },
    };
    setSavedLogs(nextSaved);
    persistSavedLogs(nextSaved);
    setDrafts((prev) =>
      prev[selectedIso]
        ? {
            ...prev,
            [selectedIso]: {
              ...prev[selectedIso],
              medications: [...prev[selectedIso].medications, newMed],
            },
          }
        : prev
    );
    showToast(`Added ${newMed.name} to the log for ${newMed.date}`);
  };

  const handleSaveAll = () => {
    const draft = drafts[selectedIso];
    const hasChanges = draft !== undefined && JSON.stringify(draft) !== JSON.stringify(baselineLog);

    setDrafts((prev) => {
      const next = { ...prev };
      delete next[selectedIso];
      return next;
    });

    if (!hasChanges) {
      showToast('No changes to save for this date');
      return;
    }

    const nextSaved: LogsMap = { ...savedLogs, [selectedIso]: draft };
    setSavedLogs(nextSaved);
    persistSavedLogs(nextSaved);
    showToast(`Daily log saved for Cycle Day ${cycleDay}`);
  };

  const isToday = isSameDay(selectedDate, TODAY);
  const longDate = `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  const formattedBannerDate = `${isToday ? 'Today' : DAY_NAMES[selectedDate.getDay()]}, ${longDate}`;

  return (
    <div className="w-full space-y-[clamp(1rem,2vw,1.6rem)]">
      <Toast message={toastMessage} />

      <DateCarousel
        windowStart={windowStart}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onPrevWeek={() => shiftWeek(-7)}
        onNextWeek={() => shiftWeek(7)}
        onToday={handleToday}
      />

      <div className="pt-[clamp(0.5rem,2vw,1.6rem)]">
        <AIInsights phase={phase} formattedDate={formattedBannerDate} />
      </div>

      {/* BBT, device details & medication */}
      <BBTSection
        reading={currentLog.bbtReading}
        timeMeasured={currentLog.bbtTimeMeasured}
        device={currentLog.bbtDevice}
        manualEntry={currentLog.bbtManualEntry}
        onUpdateReading={(val) => updateCurrentLog({ bbtReading: val })}
        onUpdateTime={(val) => updateCurrentLog({ bbtTimeMeasured: val })}
        onUpdateDevice={(val) => updateCurrentLog({ bbtDevice: val })}
        onUpdateManualEntry={(val, reading) =>
          updateCurrentLog(reading === undefined ? { bbtManualEntry: val } : { bbtManualEntry: val, bbtReading: reading })
        }
        aside={
          <MedicationSection
            medications={currentLog.medications}
            onToggleStatus={handleToggleMedStatus}
            onOpenAddModal={() => setIsAddMedOpen(true)}
          />
        }
      />

      <CervicalMucusSection
        selectedMucus={currentLog.cervicalMucus}
        onSelectMucus={(mucus) => updateCurrentLog({ cervicalMucus: mucus })}
      />

      {/* Mood & Energy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7">
        <MoodSection
          selectedMood={currentLog.mood}
          onSelectMood={(mood) => updateCurrentLog({ mood })}
        />
        <EnergySection
          selectedEnergy={currentLog.energyLevel}
          onSelectEnergy={(energy) => updateCurrentLog({ energyLevel: energy })}
        />
      </div>

      {/* LH Test & Libido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[38px]">
        <LHTestSection
          selectedResult={currentLog.lhResult}
          onSelectResult={(res) => updateCurrentLog({ lhResult: res })}
        />
        <LibidoSection
          selectedLibido={currentLog.libidoLevel}
          onSelectLibido={(lib) => updateCurrentLog({ libidoLevel: lib })}
        />
      </div>

      <SaveLogBar onSave={handleSaveAll} />

      <AddMedicationModal
        isOpen={isAddMedOpen}
        onClose={() => setIsAddMedOpen(false)}
        onSave={handleSaveMedication}
        currentPhase={phase}
        selectedDate={selectedDate}
      />
    </div>
  );
};
