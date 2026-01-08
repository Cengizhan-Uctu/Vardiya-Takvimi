
import { ShiftType, ShiftInfo, Holiday } from './types';

export const SHIFT_DETAILS: Record<ShiftType, ShiftInfo> = {
  [ShiftType.MORNING]: {
    type: ShiftType.MORNING,
    hours: '08:00 - 16:00',
    color: 'border-amber-400 text-amber-600'
  },
  [ShiftType.EVENING]: {
    type: ShiftType.EVENING,
    hours: '16:00 - 00:00',
    color: 'border-indigo-400 text-indigo-600'
  },
  [ShiftType.OFF]: {
    type: ShiftType.OFF,
    hours: 'Pazar Tatili',
    color: 'border-slate-200 text-slate-400'
  }
};

// 2026 Türkiye Resmi Tatilleri
export const TURKEY_HOLIDAYS_2026: Holiday[] = [
  { date: '2026-01-01', name: 'Yılbaşı' },
  { date: '2026-03-19', name: 'Ramazan Bayramı Arefesi', isHalfDay: true },
  { date: '2026-03-20', name: 'Ramazan Bayramı 1. Gün' },
  { date: '2026-03-21', name: 'Ramazan Bayramı 2. Gün' },
  { date: '2026-03-22', name: 'Ramazan Bayramı 3. Gün' },
  { date: '2026-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı' },
  { date: '2026-05-01', name: 'Emek ve Dayanışma Günü' },
  { date: '2026-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
  { date: '2026-05-26', name: 'Kurban Bayramı Arefesi', isHalfDay: true },
  { date: '2026-05-27', name: 'Kurban Bayramı 1. Gün' },
  { date: '2026-05-28', name: 'Kurban Bayramı 2. Gün' },
  { date: '2026-05-29', name: 'Kurban Bayramı 3. Gün' },
  { date: '2026-05-30', name: 'Kurban Bayramı 4. Gün' },
  { date: '2026-07-15', name: 'Demokrasi ve Milli Birlik Günü' },
  { date: '2026-08-30', name: 'Zafer Bayramı' },
  { date: '2026-10-28', name: 'Cumhuriyet Bayramı Arefesi', isHalfDay: true },
  { date: '2026-10-29', name: 'Cumhuriyet Bayramı' }
];

export const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export const DAYS_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
