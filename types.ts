
export enum ShiftType {
  MORNING = 'SABAH',
  EVENING = 'ÖĞLEN',
  OFF = 'TATİL'
}

export interface ShiftInfo {
  type: ShiftType;
  hours: string;
  color: string;
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  isHalfDay?: boolean;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  shift: ShiftType;
  holiday?: Holiday;
}
