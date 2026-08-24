import React, { useState } from 'react';
import { usePeriodTracker } from '../hooks/usePeriodTracker';
import { CalendarCard } from '../components/dashboard/CalendarCard';
import { CyclePhaseCard } from '../components/dashboard/CyclePhaseCard';
import { WellnessMetrics } from '../components/dashboard/WellnessMetrics';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { CycleSummary } from '../components/dashboard/CycleSummary';
import { TodayInsights } from '../components/dashboard/TodayInsights';
import { PersonalNotes } from '../components/dashboard/PersonalNotes';
import { ConnectedDevices } from '../components/dashboard/ConnectedDevices';
import { QuickLog } from '../components/dashboard/QuickLog';
import { EditLogModal } from '../components/dashboard/EditLogModal';
import { SetupFlowModal } from '../components/setup/SetupFlowModal';
import { LogSymptomsPage } from './LogSymptomsPage';
import type { QuickLogType } from '../types/dashboard';

export const MainDashboard: React.FC = () => {
  const {
    profile,
    days,
    selectedDateStr,
    selectedDay,
    devices,
    cycleSummary,
    setupData,
    setSetupData,
    handlePrevDay,
    handleNextDay,
    handleSelectToday,
    handleSelectDate,
    handleSaveNote,
    handleUpdateDayLog,
    handleQuickLog,
  } = usePeriodTracker();

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isLoggingSymptoms, setIsLoggingSymptoms] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickLogAction = (type: QuickLogType) => {
    if (type === 'flow') {
      handleQuickLog('flow', 'Egg-white Consistency');
      showToast('Logged peak fertile cervical fluid for today 💧');
    } else if (type === 'mood') {
      handleQuickLog('mood', 'Happy');
      showToast('Logged mood as Happy 😊');
    } else if (type === 'water') {
      handleQuickLog('water', 0.25);
      showToast('Added +250ml water hydration 💧');
    } else if (type === 'weight') {
      setIsEditModalOpen(true);
    } else if (type === 'sleep') {
      handleQuickLog('sleep', 7.5);
      showToast('Logged 7.5 hrs sleep 🌙');
    } else if (type === 'symptoms') {
      setIsLoggingSymptoms(true);
    } else {
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-[#1F2937] font-sans antialiased">
      {/* Toast notification banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
        >
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Log Symptoms page — full page view */}
      {isLoggingSymptoms ? (
        <LogSymptomsPage
          dayLog={selectedDay}
          onBack={() => setIsLoggingSymptoms(false)}
          onSave={(updated) => {
            handleUpdateDayLog(updated);
            setIsLoggingSymptoms(false);
            showToast('Symptoms logged for the selected date');
          }}
        />
      ) : (
        /* Main Ovulation Dashboard Container */
        <main className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8 min-w-0">
          <div className="flex flex-col xl:flex-row items-start gap-6 xl:gap-8 min-w-0">
            {/* LEFT MAIN CONTENT AREA (Full width on <1280px, ~1039px on desktop) */}
            <div className="w-full xl:flex-1 flex flex-col gap-6 min-w-0">
              {/* 1. Daily Log & Calendar Strip */}
              <CalendarCard
                days={days}
                selectedDateStr={selectedDateStr}
                onSelectDate={handleSelectDate}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
                onSelectToday={handleSelectToday}
              />

              {/* 2. Large Primary Cycle Phase Card */}
              <CyclePhaseCard
                dayLog={selectedDay}
                onEditLog={() => setIsEditModalOpen(true)}
                onSelectToday={handleSelectToday}
              />

              {/* 3. Wellness Metrics Section */}
              <WellnessMetrics
                dayLog={selectedDay}
                onEditLog={() => setIsEditModalOpen(true)}
                onQuickEditMetric={() => setIsEditModalOpen(true)}
              />
            </div>

            {/* RIGHT SIDEBAR (2-column balanced grid on tablet/laptop, 341px vertical column on desktop) */}
            <aside className="w-full xl:w-[341px] 2xl:w-[360px] flex-shrink-0 bg-white rounded-[24px] lg:rounded-[32px] border border-[#F3F4F6] p-4 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                {/* Column 1 on tablet */}
                <div className="space-y-6 min-w-0">
                  {/* Profile Card with Settings flow trigger */}
                  <ProfileCard
                    profile={profile}
                    onOpenSetup={() => setIsSetupModalOpen(true)}
                  />

                  {/* Cycle Summary */}
                  <CycleSummary summary={cycleSummary} />

                  {/* Today's Insights */}
                  <TodayInsights phase={selectedDay.phase} />
                </div>

                {/* Column 2 on tablet */}
                <div className="space-y-6 min-w-0">
                  {/* Personal Notes */}
                  <PersonalNotes
                    initialNote={selectedDay.personalNotes}
                    onSaveNote={(note) => {
                      handleSaveNote(note);
                      showToast('Personal note updated for selected date');
                    }}
                  />

                  {/* Connected Devices */}
                  <ConnectedDevices devices={devices} />

                  {/* Quick Log Grid */}
                  <QuickLog onSelectAction={handleQuickLogAction} />
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}

      {/* Edit Log Modal */}
      <EditLogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        dayLog={selectedDay}
        onSave={(updated) => {
          handleUpdateDayLog(updated);
          showToast('Daily log updated successfully');
        }}
      />

      {/* Setup Flow Onboarding Modal */}
      <SetupFlowModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        initialData={setupData}
        onComplete={(newSetup) => {
          setSetupData(newSetup);
          showToast('Cycle preferences updated successfully');
        }}
      />
    </div>
  );
};
