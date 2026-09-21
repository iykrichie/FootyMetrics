/**
 * Date and Weekly Horizon Calculation Utilities for SoccerMatrix AI
 * 
 * Strict Monday – Sunday Weekly Prediction Windows:
 * - Every week runs Monday (D0) through Sunday (D7)
 * - Every Monday rolls in a new set of predictions for the week
 * - Monday = D0 (Kickoff of weekly prediction cycle)
 * - Tuesday = D1
 * - Wednesday = D2
 * - Thursday = D3
 * - Friday = D4
 * - Saturday = D5
 * - Sunday = D7 ("monday being d0, sunday being d7")
 */

export interface DayForecastChip {
  offset: number; // 0 for Monday (D0), 1 for Tue (D1), ..., 6/7 for Sun (D7)
  dateStr: string; // YYYY-MM-DD
  dayCode: string; // 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D7'
  shortDay: string; // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  formattedDate: string; // 'Sep 21', 'Sep 22', etc.
  fullLabel: string; // 'Monday (D0) • Sep 21', 'Sunday (D7) • Sep 27'
  isToday: boolean;
  isTomorrow: boolean;
  isMonday: boolean;
  isSunday: boolean;
  isD7: boolean;
  // UI aliases
  key: string;
  dayBadge: string;
  dayName: string;
}

/**
 * Returns a YYYY-MM-DD string with day offset relative to baseDate
 */
export function getRelativeDateStr(offsetDays: number, baseDate?: Date): string {
  const d = baseDate ? new Date(baseDate) : new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string into a safe Date object in local timezone
 */
export function parseDateString(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/**
 * Returns the Monday (D0) of the specified week (or current week).
 * In Monday–Sunday cycle:
 * Monday = 0 days from start
 * Sunday = end of cycle (D7)
 */
export function getMondayOfWeek(baseDate?: Date): Date {
  const d = baseDate ? new Date(baseDate) : new Date();
  const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday, ... 6 is Saturday
  // If Sunday (0), it belongs to the week that started 6 days ago on Monday
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Returns the Sunday (D7) of the specified week.
 */
export function getSundayOfWeek(baseDate?: Date): Date {
  const mon = getMondayOfWeek(baseDate);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  sun.setHours(23, 59, 59, 999);
  return sun;
}

/**
 * Today's date string in YYYY-MM-DD
 */
export const SYSTEM_TODAY: string = getRelativeDateStr(0);

/**
 * Analyzes a match kickoff date against the Monday–Sunday cycle:
 * - Identifies whether it is Monday (D0), Sunday (D7), or mid-week
 * - Computes the relative offset from the week's Monday
 */
export function formatRelativeDateLabel(dateStr: string, baseDate?: Date): {
  dayLabel: string;
  dayBadge: string;
  shortDate: string;
  offsetDays: number;
  isToday: boolean;
  isTomorrow: boolean;
  isMonday: boolean;
  isSunday: boolean;
  isD7: boolean;
  isWithinD7: boolean;
} {
  const now = baseDate ? new Date(baseDate) : new Date();
  const targetDate = parseDateString(dateStr);
  const todayStr = getRelativeDateStr(0, now);
  const isToday = dateStr === todayStr;

  const currentMonday = getMondayOfWeek(now);
  const diffTime = targetDate.getTime() - currentMonday.getTime();
  const offsetDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const dayOfWeek = targetDate.getDay(); // 0 is Sun, 1 is Mon, etc.
  const isMonday = dayOfWeek === 1;
  const isSunday = dayOfWeek === 0;
  const isD7 = isSunday || offsetDays === 6 || offsetDays === 7;

  const shortDate = targetDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  let dayLabel = 'Matchday';
  let dayBadge = 'MATCHDAY';

  if (isMonday) {
    dayLabel = isToday ? 'Today (Monday D0)' : 'Monday (D0)';
    dayBadge = isToday ? '⚡ TODAY • MON D0' : 'MON • D0';
  } else if (isSunday) {
    dayLabel = isToday ? 'Today (Sunday D7)' : 'Sunday (D7)';
    dayBadge = isToday ? '⚡ TODAY • SUN D7' : 'SUN • D7';
  } else if (dayOfWeek === 2) {
    dayLabel = isToday ? 'Today (Tuesday D1)' : 'Tuesday (D1)';
    dayBadge = isToday ? '⚡ TODAY • TUE D1' : 'TUE • D1';
  } else if (dayOfWeek === 3) {
    dayLabel = isToday ? 'Today (Wednesday D2)' : 'Wednesday (D2)';
    dayBadge = isToday ? '⚡ TODAY • WED D2' : 'WED • D2';
  } else if (dayOfWeek === 4) {
    dayLabel = isToday ? 'Today (Thursday D3)' : 'Thursday (D3)';
    dayBadge = isToday ? '⚡ TODAY • THU D3' : 'THU • D3';
  } else if (dayOfWeek === 5) {
    dayLabel = isToday ? 'Today (Friday D4)' : 'Friday (D4)';
    dayBadge = isToday ? '⚡ TODAY • FRI D4' : 'FRI • D4';
  } else if (dayOfWeek === 6) {
    dayLabel = isToday ? 'Today (Saturday D5)' : 'Saturday (D5)';
    dayBadge = isToday ? '⚡ TODAY • SAT D5' : 'SAT • D5';
  }

  return {
    dayLabel,
    dayBadge,
    shortDate,
    offsetDays,
    isToday,
    isTomorrow: offsetDays === 1,
    isMonday,
    isSunday,
    isD7,
    isWithinD7: offsetDays >= 0 && offsetDays <= 7
  };
}

/**
 * Returns the 7 day chips for the Monday–Sunday week:
 * Monday (D0) -> Tuesday (D1) -> Wednesday (D2) -> Thursday (D3) -> Friday (D4) -> Saturday (D5) -> Sunday (D7)
 */
export function getD7DaysList(weekOffset: number = 0, baseDate?: Date): DayForecastChip[] {
  const now = baseDate ? new Date(baseDate) : new Date();
  const monday = getMondayOfWeek(now);
  monday.setDate(monday.getDate() + weekOffset * 7);

  const todayStr = getRelativeDateStr(0, now);
  const list: DayForecastChip[] = [];

  // Monday to Sunday + Next Monday (8 days covering full matchweek cycle)
  const dayConfigs = [
    { offset: 0, code: 'D0', badge: 'MON • D0', dayName: 'Monday', short: 'Mon', isMon: true, isSun: false, isD7: false, key: 'monday' },
    { offset: 1, code: 'D1', badge: 'TUE • D1', dayName: 'Tuesday', short: 'Tue', isMon: false, isSun: false, isD7: false, key: 'tuesday' },
    { offset: 2, code: 'D2', badge: 'WED • D2', dayName: 'Wednesday', short: 'Wed', isMon: false, isSun: false, isD7: false, key: 'wednesday' },
    { offset: 3, code: 'D3', badge: 'THU • D3', dayName: 'Thursday', short: 'Thu', isMon: false, isSun: false, isD7: false, key: 'thursday' },
    { offset: 4, code: 'D4', badge: 'FRI • D4', dayName: 'Friday', short: 'Fri', isMon: false, isSun: false, isD7: false, key: 'friday' },
    { offset: 5, code: 'D5', badge: 'SAT • D5', dayName: 'Saturday', short: 'Sat', isMon: false, isSun: false, isD7: false, key: 'saturday' },
    { offset: 6, code: 'D7', badge: 'SUN • D7', dayName: 'Sunday', short: 'Sun', isMon: false, isSun: true, isD7: true, key: 'sunday' },
    { offset: 7, code: 'D8', badge: 'MON • D8', dayName: 'Monday', short: 'Mon', isMon: true, isSun: false, isD7: false, key: 'monday_next' }
  ];

  for (const cfg of dayConfigs) {
    const d = new Date(monday);
    d.setDate(d.getDate() + cfg.offset);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const isToday = dateStr === todayStr;

    let fullLabel = `${cfg.dayName} (${cfg.code}) • ${formattedDate}`;
    if (cfg.offset === 0) fullLabel = `Monday (D0) • ${formattedDate}`;
    if (cfg.offset === 6) fullLabel = `Sunday (D7) • ${formattedDate}`;
    if (cfg.offset === 7) fullLabel = `Next Monday • ${formattedDate}`;
    if (isToday) fullLabel += ' (Today)';

    list.push({
      offset: cfg.code === 'D7' ? 7 : cfg.offset,
      dateStr,
      dayCode: cfg.code,
      shortDay: cfg.short,
      formattedDate,
      fullLabel,
      isToday,
      isTomorrow: false,
      isMonday: cfg.isMon,
      isSunday: cfg.isSun,
      isD7: cfg.isD7,
      key: cfg.key,
      dayBadge: cfg.badge,
      dayName: cfg.dayName
    });
  }

  return list;
}

/**
 * Formats Monday to Monday ranges for weekly navigation:
 * - Week 1: Current Week (Monday D0 – Next Monday D8)
 * - Week 2: Next Week (Monday D0 – Next Monday D8)
 * - Week 3: Week +2 (Monday D0 – Next Monday D8)
 */
export function getWeeklyForecastRanges(baseDate?: Date) {
  const now = baseDate ? new Date(baseDate) : new Date();
  const mon1 = getMondayOfWeek(now);

  const getWeekData = (weekIndex: number, label: string) => {
    const m = new Date(mon1);
    m.setDate(m.getDate() + (weekIndex - 1) * 7);
    const s = new Date(m);
    s.setDate(s.getDate() + 7); // Covers through next Monday

    const sStr = m.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const eStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const rangeText = `${sStr} – ${eStr}`;

    const formatYMD = (date: Date) => {
      const y = date.getFullYear();
      const mo = String(date.getMonth() + 1).padStart(2, '0');
      const da = String(date.getDate()).padStart(2, '0');
      return `${y}-${mo}-${da}`;
    };

    return {
      id: weekIndex,
      name: label,
      horizonCode: 'Mon D0 – Mon D8',
      shortLabel: `${label} (${sStr}–${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
      rangeText,
      shortRange: rangeText,
      title: `${label} (Mon D0 – Mon D8: ${rangeText})`,
      subtitle: `Monday (D0) to next Monday (D8) match slate • ${rangeText}`,
      startDate: formatYMD(m),
      endDate: formatYMD(s),
      mondayDate: formatYMD(m),
      sundayDate: formatYMD(s)
    };
  };

  return {
    1: getWeekData(1, 'Current Week'),
    2: getWeekData(2, 'Next Week'),
    3: getWeekData(3, 'Week +2')
  };
}
