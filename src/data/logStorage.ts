import type {
  CervicalMucusType,
  CrampsLevel,
  CyclePhase,
  DailyLogData,
  EnergyLevelType,
  FlowLevel,
  LHResultType,
  LibidoLevelType,
  MedicationEntry,
  MedicationStatus,
  MoodType,
  PeriodLog,
} from '../types/cycle';
import { INITIAL_MEDICATIONS_HISTORY } from './cycleData';

const STORAGE_KEY = 'cycle_tracker_daily_logs_v1';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const PHASES: readonly CyclePhase[] = ['Menstruation', 'Fertile Window', 'Ovulation', 'Luteal Phase'];
const MED_STATUSES: readonly MedicationStatus[] = ['Taken', 'Skipped', 'Pending'];
const MUCUS: readonly CervicalMucusType[] = ['Dry', 'Sticky', 'Creamy', 'Watery', 'Egg White'];
const MOODS: readonly MoodType[] = ['Happy', 'Calm', 'Neutral', 'Irritable', 'Sad'];
const ENERGY: readonly EnergyLevelType[] = ['Low', 'Moderate', 'High'];
const LH_RESULTS: readonly LHResultType[] = ['Negative', 'Low', 'High', 'Peak'];
const LIBIDO: readonly LibidoLevelType[] = ['Low', 'Medium', 'High'];
const FLOWS: readonly FlowLevel[] = ['Spotting', 'Light', 'Medium', 'Heavy'];
const CRAMPS: readonly CrampsLevel[] = ['None', 'Mild', 'Moderate', 'Severe'];

type Json = Record<string, unknown>;

const isRecord = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const isString = (v: unknown): v is string => typeof v === 'string';
const oneOf = <T extends string>(list: readonly T[], v: unknown): v is T => isString(v) && (list as readonly string[]).includes(v);
const optionalOneOf = <T extends string>(list: readonly T[], v: unknown): v is T | null => v === null || oneOf(list, v);

function isMedication(v: unknown): v is MedicationEntry {
  return (
    isRecord(v) &&
    ['id', 'name', 'dosage', 'type', 'time', 'date'].every((k) => isString(v[k])) &&
    oneOf(PHASES, v.phase) &&
    oneOf(MED_STATUSES, v.status)
  );
}

function isDailyLog(v: unknown): v is DailyLogData {
  return (
    isRecord(v) &&
    ['dateStr', 'bbtTimeMeasured', 'bbtDevice', 'bbtManualEntry'].every((k) => isString(v[k])) &&
    Number.isFinite(v.cycleDay) &&
    Number.isFinite(v.bbtReading) &&
    oneOf(PHASES, v.phase) &&
    Array.isArray(v.medications) &&
    v.medications.every(isMedication) &&
    optionalOneOf(MUCUS, v.cervicalMucus) &&
    optionalOneOf(MOODS, v.mood) &&
    optionalOneOf(ENERGY, v.energyLevel) &&
    optionalOneOf(LH_RESULTS, v.lhResult) &&
    optionalOneOf(LIBIDO, v.libidoLevel)
  );
}

function isPeriodLog(v: unknown): v is PeriodLog {
  return (
    isRecord(v) &&
    isString(v.dateStr) &&
    oneOf(FLOWS, v.flow) &&
    optionalOneOf(CRAMPS, v.cramps) &&
    typeof v.clots === 'boolean' &&
    isString(v.notes)
  );
}

/**
 * Reads a date-keyed map from storage, keeping only well-formed entries so a
 * corrupted or outdated record can never crash the page.
 */
function readDateMap<T extends { dateStr: string }>(key: string, isValid: (v: unknown) => v is T): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    const result: Record<string, T> = {};
    for (const [date, value] of Object.entries(parsed)) {
      if (ISO_DATE.test(date) && isValid(value) && value.dateStr === date) result[date] = value;
    }
    return result;
  } catch {
    // Unreadable storage (private mode, blocked, or invalid JSON): start empty.
    return {};
  }
}

/** Saved daily logs keyed by ISO date ("2026-06-21"). */
export type LogsMap = Record<string, DailyLogData>;

export function loadSavedLogs(): LogsMap {
  return readDateMap(STORAGE_KEY, isDailyLog);
}

export function persistSavedLogs(logs: LogsMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // Storage unavailable (private mode / quota): keep the in-memory copy.
  }
}

/** Minutes since midnight for "08:00 AM"-style times; unknown formats sort first. */
function timeToMinutes(time: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) return -1;
  const hours = (Number(match[1]) % 12) + (match[3].toUpperCase() === 'PM' ? 12 : 0);
  return hours * 60 + Number(match[2]);
}

/**
 * Medications logged in Daily Log (newest date and time first), followed by the
 * seeded history, so Overview always reflects what the patient has saved.
 */
export function getMedicationHistory(logs: LogsMap, limit: number): MedicationEntry[] {
  const logged = Object.keys(logs)
    .sort((a, b) => b.localeCompare(a))
    .flatMap((iso) =>
      [...logs[iso].medications].sort((a, b) => timeToMinutes(b.time) - timeToMinutes(a.time))
    );
  return [...logged, ...INITIAL_MEDICATIONS_HISTORY].slice(0, limit);
}

const PERIOD_STORAGE_KEY = 'cycle_tracker_period_logs_v1';

/** Saved "Log Period" entries keyed by ISO date. */
type PeriodLogsMap = Record<string, PeriodLog>;

export function loadPeriodLogs(): PeriodLogsMap {
  return readDateMap(PERIOD_STORAGE_KEY, isPeriodLog);
}

export function savePeriodLog(entry: PeriodLog) {
  try {
    localStorage.setItem(PERIOD_STORAGE_KEY, JSON.stringify({ ...loadPeriodLogs(), [entry.dateStr]: entry }));
  } catch {
    // Storage unavailable (private mode / quota): nothing to persist to.
  }
}
