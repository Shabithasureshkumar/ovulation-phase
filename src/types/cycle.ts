export type CyclePhase = 'Menstruation' | 'Fertile Window' | 'Ovulation' | 'Luteal Phase';

export type CervicalMucusType = 'Dry' | 'Sticky' | 'Creamy' | 'Watery' | 'Egg White';

export type MoodType = 'Happy' | 'Calm' | 'Neutral' | 'Irritable' | 'Sad';

export type EnergyLevelType = 'Low' | 'Moderate' | 'High';

export type LHResultType = 'Negative' | 'Low' | 'High' | 'Peak';

export type LibidoLevelType = 'Low' | 'Medium' | 'High';

export type MedicationStatus = 'Taken' | 'Skipped' | 'Pending';

export interface Patient {
  name: string;
  patientId: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  cycleLengthDays: number;
  bmi: number;
  avatarUrl: string;
}

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  type: string; // 'Capsule' | 'Tablet' | 'Liquid' | etc.
  time: string; // e.g. "08:00 AM"
  date: string; // "Sep 3, 2026"
  phase: CyclePhase;
  status: MedicationStatus;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  reminder?: boolean;
}

export interface DailyLogData {
  dateStr: string;
  cycleDay: number;
  phase: CyclePhase;

  // BBT
  bbtReading: number; // 36.40
  bbtTimeMeasured: string; // "07:30 AM"
  bbtDevice: string; // "Connected Thermometer"
  bbtManualEntry: string;

  // Medication
  medications: MedicationEntry[];

  // Selections are null until the user logs them for that date
  cervicalMucus: CervicalMucusType | null;
  mood: MoodType | null;
  energyLevel: EnergyLevelType | null;
  lhResult: LHResultType | null;
  libidoLevel: LibidoLevelType | null;
}

export type FlowLevel = 'Spotting' | 'Light' | 'Medium' | 'Heavy';

export type CrampsLevel = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface PeriodLog {
  dateStr: string; // ISO date the entry belongs to
  flow: FlowLevel;
  cramps: CrampsLevel | null;
  clots: boolean;
  notes: string;
}
