import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalHeader } from './components/layout/GlobalHeader';
import { CycleTrackerHeader } from './components/layout/CycleTrackerHeader';
import { TabNavigation } from './components/layout/TabNavigation';
import { Overview } from './pages/Overview';
import { DailyLog } from './pages/DailyLog';
import { Calendar } from './pages/Calendar';
import { Insights } from './pages/Insights';
import { Settings } from './pages/Settings';
import { DEFAULT_PATIENT } from './data/cycleData';

export const App: React.FC = () => {
  const patient = DEFAULT_PATIENT;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#1F2937] font-sans antialiased flex flex-col selection:bg-pink-100 selection:text-[#EF4486]">
        {/* 1. Global Navigation Bar */}
        <GlobalHeader patient={patient} />

        {/* 2. Main Cycle Tracker Workspace Container */}
        <main className="w-full px-[clamp(1rem,3.1vw,3rem)] pt-[clamp(0.75rem,1.4vw,1.25rem)] pb-[clamp(2rem,4vw,3.5rem)] space-y-[clamp(0.75rem,1.4vw,1.25rem)] flex-1">
          {/* Cycle Tracker Title Block + Large Pink Patient Card */}
          <CycleTrackerHeader patient={patient} />

          {/* Functional White-Pill Tab Navigation */}
          <TabNavigation />

          {/* Routed Views */}
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/daily-log" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/daily-log" element={<DailyLog />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/daily-log" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
