
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameDay, 
  isSameMonth, 
  differenceInWeeks,
  startOfISOWeek,
  getDay
} from 'date-fns';
import { ShiftType, Holiday, CalendarDay } from '../types';
import { TURKEY_HOLIDAYS_2026 } from '../constants';

/**
 * Calculates the shift for a given date based on a reference.
 * Weekly rotation logic.
 */
export const getShiftForDate = (
  targetDate: Date, 
  userStartShift2026: ShiftType
): ShiftType => {
  // If it's Sunday, it's a holiday
  if (getDay(targetDate) === 0) {
    return ShiftType.OFF;
  }

  const referenceDate = startOfISOWeek(new Date(2026, 0, 1));
  const targetWeekStart = startOfISOWeek(targetDate);
  const weeksDiff = Math.abs(differenceInWeeks(targetWeekStart, referenceDate));
  
  if (weeksDiff % 2 === 0) {
    return userStartShift2026;
  } else {
    return userStartShift2026 === ShiftType.MORNING ? ShiftType.EVENING : ShiftType.MORNING;
  }
};

export const getHolidayForDate = (date: Date): Holiday | undefined => {
  const dateStr = format(date, 'yyyy-MM-dd');
  return TURKEY_HOLIDAYS_2026.find(h => h.date === dateStr);
};

export const generateCalendarDays = (month: number, year: number, userStartShift: ShiftType): CalendarDay[] => {
  const currentMonthDate = new Date(year, month, 1);
  const firstDayOfMonth = startOfMonth(currentMonthDate);
  const lastDayOfMonth = endOfMonth(currentMonthDate);
  
  const calendarStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  return days.map(date => {
    const shift = getShiftForDate(date, userStartShift);
    return {
      date,
      isCurrentMonth: isSameMonth(date, currentMonthDate),
      isToday: isSameDay(date, new Date()),
      shift,
      holiday: getHolidayForDate(date)
    };
  });
};
