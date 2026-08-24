export type SymptomIntensity = 'Mild' | 'Moderate' | 'Severe';

export type CyclePhase = 'Menstruation' | 'Fertile Window' | 'Ovulation' | 'Luteal Phase';

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  avatarUrl: string;
  roleTitle?: string;
}

export interface DayLogEntry {
  dateStr: string; // "2026-06-21"
  displayDate: string; // "Today, 21 June 2026"
  shortDate: string; // "Jun 21"
  dayNumber: number; // 21
  monthShort: string; // "Jun"
  cycleDay: number; // 14
  phase: CyclePhase;
  isLogged: boolean;
  
  // Biomarkers & temperature
  temperatureF: number; // 98.42
  tempAboveBaselineC: number; // +0.36
  tempMeasuredTime: string; // "07:30 AM"
  tempDevice: string; // "Connected Thermometer"
  tempStatus: string; // "Above Baseline"
  tempDescription: string;
  
  // Cervical Mucus & Flow
  cervicalMucusType: string; // "Egg-white Consistency"
  cervicalMucusDesc: string; // "Egg-white cervical mucus is commonly seen around ovulation."
  flowLevel?: 'None' | 'Spotting' | 'Light' | 'Medium' | 'Heavy';
  symptoms?: string[];
  /** Per-symptom intensity, keyed by the symptom label in `symptoms`. */
  symptomIntensities?: Partial<Record<string, SymptomIntensity>>;
  
  // Fertility
  fertilityWindow: string; // "High Fertility Window"
  fertilityStatus: string; // "High"
  fertilityPrediction: string; // "24–48 hrs"
  insightHeadline: string; // "You are likely ovulating or within the next 24–48 hours of your ovulation window."
  insightDescription: string;
  whatThisMeans: string;
  
  // Biomarker Correlation
  biomarkerTemp: string; // "+1.0°C"
  biomarkerMucus: string; // "Egg-white"
  biomarkerWindow: string; // "24–48 hrs"
  
  // Wellness Metrics
  sleepHours: number; // 7.2
  mood: 'Good' | 'Happy' | 'Calm' | 'Sensitive' | 'Fatigued' | 'Irritable'; // Good
  waterL: number; // 2.1
  waterTargetL: number; // 2.5
  steps: number; // 6245
  weightKg: number; // 58.5
  sexActivity: 'Not Logged' | 'Protected' | 'Unprotected' | 'High Drive'; // Not Logged
  
  // Notes
  personalNotes: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  iconType: 'watch' | 'thermometer' | 'scale';
  syncStatus: string; // "Synced · 2m ago"
  isOnline: boolean;
}

export interface CycleSummaryInfo {
  currentPhase: CyclePhase;
  ovulationDate: string; // "Jun 21, 2026"
  fertileWindow: string; // "Jun 18 – Jun 22, 2026"
  lutealPhase: string; // "Jun 23 – Jul 5, 2026"
}

export interface SetupFormData {
  lastPeriodDate: string;
  cycleLength: number;
  periodDuration: number;
  birthControl: string;
  fertilityGoal: 'Track Cycle' | 'Try to Conceive' | 'Avoid Pregnancy' | 'Monitor Health';
  hasCompletedSetup: boolean;
}
