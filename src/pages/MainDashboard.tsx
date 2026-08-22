import React, { useState } from 'react';
import { usePeriodTracker } from '../hooks/usePeriodTracker';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
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
import type { QuickLogType, NavigationTab } from '../types/dashboard';

export const MainDashboard: React.FC = () => {
  const {
    profile,
    days,
    selectedDateStr,
    selectedDay,
    activeNavTab,
    setActiveNavTab,
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectNavTab = (tab: NavigationTab) => {
    setActiveNavTab(tab);
    if (tab !== 'Dashboard') {
      showToast(`Switched view to ${tab} portal`);
    }
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
      setIsEditModalOpen(true);
      showToast('Opening Biomarkers & Symptoms logger ✨');
    } else {
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-[#1F2937] font-sans antialiased pb-12">
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

      {/* Top Navigation */}
      <DashboardHeader
        activeTab={activeNavTab}
        onSelectTab={handleSelectNavTab}
        userName={profile.name}
        userRole={profile.roleTitle}
        userAvatar={profile.avatarUrl}
        onOpenSetup={() => setIsSetupModalOpen(true)}
      />

      {/* Non-dashboard placeholder info bar if a secondary tab is clicked */}
      {activeNavTab !== 'Dashboard' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 my-2">
          <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-purple-900">
            <span>
              Viewing <strong>{activeNavTab}</strong> section. Cycle tracking and dashboard analytics remain active below.
            </span>
            <button
              onClick={() => setActiveNavTab('Dashboard')}
              className="font-bold underline text-purple-700 hover:text-purple-900"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Main Container matching Figma layout (Frame 2147227178) */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* LEFT MAIN CONTENT AREA (~1039px on desktop) */}
          <div className="w-full lg:flex-1 flex flex-col gap-6 max-w-full">
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

          {/* RIGHT SIDEBAR (~341px on desktop) matching Figma Sidebar (234:1253) */}
          <aside className="w-full lg:w-[341px] flex-shrink-0 bg-white rounded-[24px] lg:rounded-[32px] border border-[#F3F4F6] p-5 sm:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] space-y-6">
            {/* Profile Card */}
            <ProfileCard profile={profile} />

            {/* Cycle Summary */}
            <CycleSummary summary={cycleSummary} />

            {/* Today's Insights */}
            <TodayInsights phase={selectedDay.phase} />

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
          </aside>
        </div>
      </main>

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
