import { useState, useMemo, useCallback } from 'react';
import type { DayLogEntry, UserProfile, ConnectedDevice, CycleSummaryInfo, SetupFormData } from '../types/periodTracker';

const initialProfile: UserProfile = {
  name: 'Jimmy Alexa',
  age: 38,
  gender: 'Female',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  roleTitle: 'General Physician',
};

const initialDevices: ConnectedDevice[] = [
  {
    id: '1',
    name: 'Smart Watch',
    iconType: 'watch',
    syncStatus: 'Synced · 2m ago',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Thermometer',
    iconType: 'thermometer',
    syncStatus: 'Synced · 2m ago',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Scale',
    iconType: 'scale',
    syncStatus: 'Synced · 2m ago',
    isOnline: true,
  },
];

// Physiologically consistent 7-day cycle window centered around Ovulation (CD 14 on June 21, 2026)
const initialDays: DayLogEntry[] = [
  {
    dateStr: '2026-06-18',
    displayDate: 'Thursday, 18 June 2026',
    shortDate: 'Jun 18',
    dayNumber: 18,
    monthShort: 'Jun',
    cycleDay: 11,
    phase: 'Fertile Window',
    isLogged: false,
    temperatureF: 97.95,
    tempAboveBaselineC: -0.06,
    tempMeasuredTime: '07:15 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Baseline',
    tempDescription: 'Your body temperature is steady at follicular baseline before the pre-ovulatory surge.',
    cervicalMucusType: 'Creamy Consistency',
    cervicalMucusDesc: 'Cervical fluid is turning creamy and moist as estrogen levels rise.',
    flowLevel: 'None',
    fertilityWindow: 'Entering Fertile Window',
    fertilityStatus: 'Moderate',
    fertilityPrediction: '3–4 days to peak',
    insightHeadline: 'You are entering your fertile window as follicular estrogen increases.',
    insightDescription: 'Follicular growth is accelerating toward the luteinizing hormone surge.',
    whatThisMeans: 'Conception probability increases as cervical mucus creates a sperm-friendly environment.',
    biomarkerTemp: '+0.0°C',
    biomarkerMucus: 'Creamy',
    biomarkerWindow: '3–4 days',
    sleepHours: 7.0,
    mood: 'Good',
    waterL: 2.0,
    waterTargetL: 2.5,
    steps: 6420,
    weightKg: 58.6,
    sexActivity: 'Not Logged',
    personalNotes: '',
  },
  {
    dateStr: '2026-06-19',
    displayDate: 'Friday, 19 June 2026',
    shortDate: 'Jun 19',
    dayNumber: 19,
    monthShort: 'Jun',
    cycleDay: 12,
    phase: 'Fertile Window',
    isLogged: false,
    temperatureF: 98.05,
    tempAboveBaselineC: 0.05,
    tempMeasuredTime: '07:20 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Baseline',
    tempDescription: 'Basal temperature remains baseline with subtle upward follicular movement.',
    cervicalMucusType: 'Watery Consistency',
    cervicalMucusDesc: 'Mucus is clear, watery, and stretchy, indicating high estrogen.',
    flowLevel: 'None',
    fertilityWindow: 'High Fertility Window',
    fertilityStatus: 'High',
    fertilityPrediction: '48–72 hrs',
    insightHeadline: 'Approaching peak fertility. Estrogen levels are reaching their maximum.',
    insightDescription: 'Cervical mucus has shifted to an optimal consistency for conception.',
    whatThisMeans: 'High chance of conception if intercourse occurs over the next 48 hours.',
    biomarkerTemp: '+0.1°C',
    biomarkerMucus: 'Watery',
    biomarkerWindow: '48–72 hrs',
    sleepHours: 7.3,
    mood: 'Happy',
    waterL: 2.2,
    waterTargetL: 2.5,
    steps: 7200,
    weightKg: 58.5,
    sexActivity: 'Protected',
    personalNotes: '',
  },
  {
    dateStr: '2026-06-20',
    displayDate: 'Saturday, 20 June 2026',
    shortDate: 'Jun 20',
    dayNumber: 20,
    monthShort: 'Jun',
    cycleDay: 13,
    phase: 'Fertile Window',
    isLogged: true,
    temperatureF: 98.18,
    tempAboveBaselineC: 0.15,
    tempMeasuredTime: '07:45 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Above Baseline',
    tempDescription: 'Temperature is beginning its upward inflection near the LH surge.',
    cervicalMucusType: 'Egg-white Consistency',
    cervicalMucusDesc: 'Abundant egg-white cervical fluid observed, characteristic of peak fertility.',
    flowLevel: 'None',
    fertilityWindow: 'Peak Fertility Window',
    fertilityStatus: 'Peak',
    fertilityPrediction: '24–36 hrs',
    insightHeadline: 'LH surge detected. Ovulation predicted within 24 to 36 hours.',
    insightDescription: 'Peak fertility window confirmed by biomarker correlation and basal temperature trend.',
    whatThisMeans: 'Optimal timing window if trying to conceive or track peak fertile days.',
    biomarkerTemp: '+0.3°C',
    biomarkerMucus: 'Egg-white',
    biomarkerWindow: '24–36 hrs',
    sleepHours: 7.6,
    mood: 'Good',
    waterL: 2.4,
    waterTargetL: 2.5,
    steps: 8100,
    weightKg: 58.4,
    sexActivity: 'Not Logged',
    personalNotes: 'Felt slight mild twinges on the right side.',
  },
  {
    // The primary reference Ovulation day
    dateStr: '2026-06-21',
    displayDate: 'Today, 21 June 2026',
    shortDate: 'Jun 21',
    dayNumber: 21,
    monthShort: 'Jun',
    cycleDay: 14,
    phase: 'Ovulation',
    isLogged: true,
    temperatureF: 98.42,
    tempAboveBaselineC: 0.36,
    tempMeasuredTime: '07:30 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Above Baseline',
    tempDescription: 'Your body temperature is 0.36°C above your baseline. This rise supports that ovulation may be near.',
    cervicalMucusType: 'Egg-white Consistency',
    cervicalMucusDesc: 'Egg-white cervical mucus is commonly seen around ovulation.',
    flowLevel: 'None',
    fertilityWindow: 'High Fertility Window',
    fertilityStatus: 'High',
    fertilityPrediction: '24–48 hrs',
    insightHeadline: 'You are likely ovulating or within the next 24–48 hours of your ovulation window.',
    insightDescription: 'Your body temperature is approximately 0.36°C above baseline, and your cervical mucus has an egg-white consistency. Together these findings suggest that you are in your fertile window.',
    whatThisMeans: 'The rise in body temperature together with egg-white cervical mucus strongly indicates that ovulation is likely occurring or will occur within the next 24–48 hours.',
    biomarkerTemp: '+1.0°C',
    biomarkerMucus: 'Egg-white',
    biomarkerWindow: '24–48 hrs',
    sleepHours: 7.2,
    mood: 'Good',
    waterL: 2.1,
    waterTargetL: 2.5,
    steps: 6245,
    weightKg: 58.5,
    sexActivity: 'Not Logged',
    personalNotes: '',
  },
  {
    dateStr: '2026-06-22',
    displayDate: 'Monday, 22 June 2026',
    shortDate: 'Jun 22',
    dayNumber: 22,
    monthShort: 'Jun',
    cycleDay: 15,
    phase: 'Ovulation',
    isLogged: true,
    temperatureF: 98.48,
    tempAboveBaselineC: 0.40,
    tempMeasuredTime: '07:10 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Above Baseline',
    tempDescription: 'Thermal shift confirmed by sustained elevated temperature post-ovulation.',
    cervicalMucusType: 'Transitional Mucus',
    cervicalMucusDesc: 'Mucus is beginning to thicken as progesterone production initiates.',
    flowLevel: 'None',
    fertilityWindow: 'Closing Fertile Window',
    fertilityStatus: 'Moderate',
    fertilityPrediction: 'Window closing',
    insightHeadline: 'Post-ovulatory thermal shift is sustained. Progesterone rising.',
    insightDescription: 'Corpus luteum formation is initiating the luteal phase transition.',
    whatThisMeans: 'Fertility window is coming to an end for this cycle.',
    biomarkerTemp: '+0.4°C',
    biomarkerMucus: 'Transitional',
    biomarkerWindow: 'Closing',
    sleepHours: 7.4,
    mood: 'Calm',
    waterL: 2.3,
    waterTargetL: 2.5,
    steps: 6700,
    weightKg: 58.5,
    sexActivity: 'Not Logged',
    personalNotes: '',
  },
  {
    dateStr: '2026-06-23',
    displayDate: 'Tuesday, 23 June 2026',
    shortDate: 'Jun 23',
    dayNumber: 23,
    monthShort: 'Jun',
    cycleDay: 16,
    phase: 'Luteal Phase',
    isLogged: true,
    temperatureF: 98.40,
    tempAboveBaselineC: 0.34,
    tempMeasuredTime: '07:25 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Above Baseline',
    tempDescription: 'Elevated luteal plateau temperatures maintained by active progesterone.',
    cervicalMucusType: 'Sticky / Dry',
    cervicalMucusDesc: 'Cervical fluid becomes sticky and minimal under progesterone influence.',
    flowLevel: 'None',
    fertilityWindow: 'Low Fertility Window',
    fertilityStatus: 'Low',
    fertilityPrediction: 'Low probability',
    insightHeadline: 'Luteal phase established. Progesterone supports endometrial health.',
    insightDescription: 'Basal body temperature remains stably elevated above baseline.',
    whatThisMeans: 'Good time for balanced hydration, adequate sleep, and gentle fitness.',
    biomarkerTemp: '+0.3°C',
    biomarkerMucus: 'Sticky',
    biomarkerWindow: 'Low risk',
    sleepHours: 7.1,
    mood: 'Good',
    waterL: 2.2,
    waterTargetL: 2.5,
    steps: 6890,
    weightKg: 58.4,
    sexActivity: 'Not Logged',
    personalNotes: '',
  },
  {
    dateStr: '2026-06-24',
    displayDate: 'Wednesday, 24 June 2026',
    shortDate: 'Jun 24',
    dayNumber: 24,
    monthShort: 'Jun',
    cycleDay: 17,
    phase: 'Luteal Phase',
    isLogged: true,
    temperatureF: 98.38,
    tempAboveBaselineC: 0.32,
    tempMeasuredTime: '07:30 AM',
    tempDevice: 'Connected Thermometer',
    tempStatus: 'Above Baseline',
    tempDescription: 'Consistent luteal temperature plateau.',
    cervicalMucusType: 'Dry Consistency',
    cervicalMucusDesc: 'Dry or minimal cervical mucus expected during mid-luteal progression.',
    flowLevel: 'None',
    fertilityWindow: 'Low Fertility Window',
    fertilityStatus: 'Low',
    fertilityPrediction: 'Low probability',
    insightHeadline: 'Mid-luteal phase stability. Progesterone plateau active.',
    insightDescription: 'Rest and balanced nutrition support sustained energy levels.',
    whatThisMeans: 'Focus on magnesium-rich foods and regular recovery.',
    biomarkerTemp: '+0.3°C',
    biomarkerMucus: 'Dry',
    biomarkerWindow: 'Low risk',
    sleepHours: 7.5,
    mood: 'Happy',
    waterL: 2.5,
    waterTargetL: 2.5,
    steps: 7500,
    weightKg: 58.3,
    sexActivity: 'Not Logged',
    personalNotes: '',
  },
];

export function usePeriodTracker() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [days, setDays] = useState<DayLogEntry[]>(initialDays);
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-06-21');
  const [devices] = useState<ConnectedDevice[]>(initialDevices);
  
  // Setup flow state
  const [setupData, setSetupData] = useState<SetupFormData>({
    lastPeriodDate: '2026-06-08',
    cycleLength: 28,
    periodDuration: 5,
    birthControl: 'None (Natural tracking)',
    fertilityGoal: 'Track Cycle',
    hasCompletedSetup: true,
  });

  // Selected day log entry with safe fallback
  const selectedDay = useMemo(() => {
    return days.find((d) => d.dateStr === selectedDateStr) ?? days[3] ?? days[0];
  }, [days, selectedDateStr]);

  // Selected date index with safe fallback
  const selectedDayIndex = useMemo(() => {
    const idx = days.findIndex((d) => d.dateStr === selectedDateStr);
    return idx >= 0 ? idx : 3;
  }, [days, selectedDateStr]);

  // Dynamic cycle summary matching 2026 timeline and selected phase
  const cycleSummary = useMemo<CycleSummaryInfo>(() => {
    return {
      currentPhase: selectedDay?.phase ?? 'Ovulation',
      ovulationDate: 'Jun 21, 2026',
      fertileWindow: 'Jun 18 – Jun 22, 2026',
      lutealPhase: 'Jun 23 – Jul 5, 2026',
    };
  }, [selectedDay]);

  // Calendar Navigation Handlers with boundary protection
  const handlePrevDay = useCallback(() => {
    if (selectedDayIndex > 0 && selectedDayIndex < days.length) {
      setSelectedDateStr(days[selectedDayIndex - 1].dateStr);
    }
  }, [days, selectedDayIndex]);

  const handleNextDay = useCallback(() => {
    if (selectedDayIndex >= 0 && selectedDayIndex < days.length - 1) {
      setSelectedDateStr(days[selectedDayIndex + 1].dateStr);
    }
  }, [days, selectedDayIndex]);

  const handleSelectToday = useCallback(() => {
    setSelectedDateStr('2026-06-21');
  }, []);

  const handleSelectDate = useCallback((dateStr: string) => {
    setSelectedDateStr(dateStr);
  }, []);

  // Update notes immutably
  const handleSaveNote = useCallback((noteText: string) => {
    setDays((prev) =>
      prev.map((d) =>
        d.dateStr === selectedDateStr ? { ...d, personalNotes: noteText, isLogged: true } : d
      )
    );
  }, [selectedDateStr]);

  // Batch update day log entry immutably without destroying phase
  const handleUpdateDayLog = useCallback((updatedFields: Partial<DayLogEntry>) => {
    setDays((prev) =>
      prev.map((d) =>
        d.dateStr === selectedDateStr ? { ...d, ...updatedFields, isLogged: true } : d
      )
    );
  }, [selectedDateStr]);

  // Safe Quick Log actions - does NOT mutate unrelated cycle phase
  const handleQuickLog = useCallback((category: string, value: string | number) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.dateStr !== selectedDateStr) return d;
        const updated = { ...d, isLogged: true };
        if (category === 'flow') {
          // Store flow logging in cervical mucus observation without destroying cycle phase
          updated.cervicalMucusType = String(value);
          updated.flowLevel = 'None';
        } else if (category === 'mood') {
          updated.mood = value as DayLogEntry['mood'];
        } else if (category === 'water') {
          const increment = typeof value === 'number' ? value : 0.25;
          updated.waterL = Math.min(5.0, Number((updated.waterL + increment).toFixed(2)));
        } else if (category === 'weight') {
          const newWeight = Number(value);
          if (!isNaN(newWeight) && newWeight > 0) {
            updated.weightKg = newWeight;
          }
        } else if (category === 'sleep') {
          const newSleep = Number(value);
          if (!isNaN(newSleep) && newSleep > 0) {
            updated.sleepHours = newSleep;
          }
        }
        return updated;
      })
    );
  }, [selectedDateStr]);

  return {
    profile,
    setProfile,
    days,
    selectedDateStr,
    selectedDay,
    selectedDayIndex,
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
  };
}
