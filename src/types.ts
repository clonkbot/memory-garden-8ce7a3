export interface JournalEntry {
  content: string;
  date: string;
  plantType: string;
}

export interface DayData {
  dayIndex: number;
  hasEntry: boolean;
  plantType?: string;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}
