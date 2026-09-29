import type { Patient, MedicationEntry, DailyLogData, CyclePhase } from '../types/cycle';
import patientAvatar from '../assets/avatar.png';

export const DEFAULT_PATIENT: Patient = {
  name: 'Jimmy Alexa',
  patientId: 'PT-000001',
  age: 38,
  gender: 'Female',
  heightCm: 165,
  weightKg: 58,
  cycleLengthDays: 28,
  bmi: 22,
  avatarUrl: patientAvatar,
};

// The tracker's "today": Cycle Day 21 (Ovulation) on 21 June 2026, as in the design.
export const TODAY = new Date(2026, 5, 21);
export const TODAY_CYCLE_DAY = 21;

const CYCLE_LENGTH = DEFAULT_PATIENT.cycleLengthDays;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const INITIAL_MEDICATIONS_HISTORY: MedicationEntry[] = [
  {
    id: 'med-1',
    name: 'Vitamin D',
    dosage: '1000 IU',
    type: 'Capsule',
    time: '08:00 AM',
    date: 'Sep 3, 2026',
    phase: 'Ovulation',
    status: 'Taken',
  },
  {
    id: 'med-2',
    name: 'Vitamin D',
    dosage: '1000 IU',
    type: 'Capsule',
    time: '08:00 AM',
    date: 'Sep 4, 2026',
    phase: 'Ovulation',
    status: 'Taken',
  },
  {
    id: 'med-3',
    name: 'Vitamin D',
    dosage: '1000 IU',
    type: 'Capsule',
    time: '08:00 AM',
    date: 'Sep 5, 2026',
    phase: 'Ovulation',
    status: 'Taken',
  },
  {
    id: 'med-4',
    name: 'Vitamin D',
    dosage: '1000 IU',
    type: 'Capsule',
    time: '08:00 AM',
    date: 'Sep 6, 2026',
    phase: 'Ovulation',
    status: 'Taken',
  },
];

const TODAY_MEDICATIONS: MedicationEntry[] = [
  {
    id: 'daily-med-1',
    name: 'Ibuprofen',
    dosage: '200 mg',
    type: 'Tablet',
    time: '08:00 AM',
    date: 'Jun 21, 2026',
    phase: 'Ovulation',
    status: 'Taken',
  },
  {
    id: 'daily-med-2',
    name: 'Mefenamic Acid',
    dosage: '500 mg',
    type: 'Tablet',
    time: '12:30 PM',
    date: 'Jun 21, 2026',
    phase: 'Ovulation',
    status: 'Skipped',
  },
];

export function getPhaseForCycleDay(cycleDay: number): CyclePhase {
  const cd = ((cycleDay - 1) % CYCLE_LENGTH) + 1;
  if (cd >= 1 && cd <= 5) return 'Menstruation';
  if (cd >= 6 && cd <= 13) return 'Fertile Window';
  if (cd >= 14 && cd <= 21) return 'Ovulation';
  return 'Luteal Phase';
}

export function getPhaseLabel(phase: CyclePhase): string {
  return phase.endsWith('Phase') ? phase : `${phase} Phase`;
}

export function getCycleDayForDate(date: Date): number {
  const diffDays = Math.round((date.getTime() - TODAY.getTime()) / MS_PER_DAY);
  const cd = (((TODAY_CYCLE_DAY - 1 + diffDays) % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
  return cd + 1;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return formatDateToIso(a) === formatDateToIso(b);
}

export function formatDateToIso(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** "Jun 21, 2026" — the date format used on medication entries. */
export function formatShortDate(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

// Typical waking BBT per phase, used before a reading is logged.
const PHASE_BASELINE_BBT: Record<CyclePhase, number> = {
  Menstruation: 36.3,
  'Fertile Window': 36.35,
  Ovulation: 36.4,
  'Luteal Phase': 36.7,
};

/** The log a date starts from before anything is saved for it. */
export function getInitialDayLog(date: Date): DailyLogData {
  const dateStr = formatDateToIso(date);
  const cycleDay = getCycleDayForDate(date);
  const phase = getPhaseForCycleDay(cycleDay);
  const base: DailyLogData = {
    dateStr,
    cycleDay,
    phase,
    bbtReading: PHASE_BASELINE_BBT[phase],
    bbtTimeMeasured: '07:30 AM',
    bbtDevice: 'Connected Thermometer',
    bbtManualEntry: '',
    medications: [],
    cervicalMucus: null,
    mood: null,
    energyLevel: null,
    lhResult: null,
    libidoLevel: null,
  };

  // Today ships with the example log shown in the design.
  if (isSameDay(date, TODAY)) {
    return {
      ...base,
      medications: TODAY_MEDICATIONS.map((m) => ({ ...m })),
      cervicalMucus: 'Creamy',
      mood: 'Irritable',
      energyLevel: 'Low',
      lhResult: 'Low',
      libidoLevel: 'Medium',
    };
  }
  return base;
}
