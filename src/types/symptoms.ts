import type { DayLogEntry, SymptomIntensity } from './periodTracker';

export type FlowLevel = NonNullable<DayLogEntry['flowLevel']>;
export type MoodValue = DayLogEntry['mood'];

export const FLOW_LEVELS: FlowLevel[] = ['None', 'Spotting', 'Light', 'Medium', 'Heavy'];

/** Dot colours for the flow chips, matching the dashboard's pink ramp. */
export const FLOW_DOT_COLORS: Record<FlowLevel, string> = {
  None: '#D1D5DB',
  Spotting: '#FBCFE8',
  Light: '#F9A8D4',
  Medium: '#EF4486',
  Heavy: '#BE185D',
};

export const MOOD_OPTIONS: { value: MoodValue; emoji: string }[] = [
  { value: 'Good', emoji: '🙂' },
  { value: 'Happy', emoji: '😊' },
  { value: 'Calm', emoji: '😌' },
  { value: 'Sensitive', emoji: '🥺' },
  { value: 'Fatigued', emoji: '😴' },
  { value: 'Irritable', emoji: '😣' },
];

export interface PhysicalSymptom {
  label: string;
  /** Discomfort-type symptoms ask for an intensity once selected. */
  hasIntensity: boolean;
}

/**
 * Same vocabulary the Edit Daily Log modal writes, so symptoms logged from
 * either place stay interchangeable on `DayLogEntry.symptoms`.
 */
export const PHYSICAL_SYMPTOMS: PhysicalSymptom[] = [
  { label: 'Mild Cramping', hasIntensity: true },
  { label: 'Bloating', hasIntensity: true },
  { label: 'Tender Breasts', hasIntensity: true },
  { label: 'Backache', hasIntensity: true },
  { label: 'Mild Pelvic Twinges (Mittelschmerz)', hasIntensity: true },
  { label: 'Light Spotting', hasIntensity: false },
  { label: 'High Energy & Focus', hasIntensity: false },
  { label: 'Increased Libido', hasIntensity: false },
  { label: 'Heightened Senses', hasIntensity: false },
  { label: 'Clear Skin', hasIntensity: false },
];

export const SYMPTOM_INTENSITIES: SymptomIntensity[] = ['Mild', 'Moderate', 'Severe'];

export const INTENSITY_STYLES: Record<SymptomIntensity, string> = {
  Mild: 'bg-pink-100 text-pink-700 border-pink-200',
  Moderate: 'bg-pink-400 text-white border-pink-400',
  Severe: 'bg-[#D7068E] text-white border-[#D7068E]',
};

export function symptomSupportsIntensity(label: string): boolean {
  return PHYSICAL_SYMPTOMS.some((symptom) => symptom.label === label && symptom.hasIntensity);
}
