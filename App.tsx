
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Coffee
} from 'lucide-react';
import { format, getISOWeek } from 'date-fns';
import { ShiftType } from './types';
import { SHIFT_DETAILS, MONTHS, DAYS_SHORT } from './constants';
import { generateCalendarDays } from './utils/dateUtils';

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getFullYear() === 2026 ? new Date().getMonth() : 0);
  const startShift = ShiftType.MORNING;
  const year = 2026;

  const calendarDays = useMemo(() => {
    return generateCalendarDays(currentMonth, year, startShift);
  }, [currentMonth, startShift]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => (prev < 11 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-8 font-sans">
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-sm">
              <CalendarIcon size={18} />
            </div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight">Vardiya 2026</h1>
          </div>
          <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
            Haftalık Dönüşüm
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-2 pt-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <button 
            onClick={handlePrevMonth}
            className="p-3 bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-400 active:bg-slate-50 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter leading-none">
              {MONTHS[currentMonth]}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] mt-1">{year}</p>
          </div>
          <button 
            onClick={handleNextMonth}
            className="p-3 bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-400 active:bg-slate-50 active:scale-95 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="bg-slate-200/50 rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden p-1.5">
          <div className="grid grid-cols-7 mb-1.5">
            {DAYS_SHORT.map(day => (
              <div key={day} className={`py-3 text-center text-[9px] font-black uppercase tracking-widest ${day === 'Paz' ? 'text-rose-500' : 'text-slate-500'}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, idx) => {
              const holiday = day.holiday;
              const isFullHoliday = holiday && !holiday.isHalfDay;
              const isHalfDay = holiday && holiday.isHalfDay;
              const shiftInfo = SHIFT_DETAILS[day.shift];
              const isOff = day.shift === ShiftType.OFF;
              
              // Haftaya göre arka plan (Haftalık kutucuk renklendirme)
              const weekNum = getISOWeek(day.date);
              const weekBgClass = weekNum % 2 === 0 ? 'bg-slate-50/50' : 'bg-transparent';
              
              return (
                <div 
                  key={idx} 
                  className={`
                    min-h-[105px] sm:min-h-[135px] rounded-2xl flex flex-col items-center transition-all relative border-2
                    ${!day.isCurrentMonth ? 'opacity-20 pointer-events-none' : 'bg-white'}
                    ${isOff || isFullHoliday ? 'border-slate-200 shadow-inner' : `shadow-sm ${shiftInfo.color}`}
                    ${day.isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                    ${weekBgClass}
                  `}
                >
                  <span className={`
                    text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl mt-1.5
                    ${day.isToday ? 'bg-indigo-600 text-white shadow-md' : (isFullHoliday ? 'text-rose-500' : 'text-slate-500')}
                  `}>
                    {format(day.date, 'd')}
                  </span>

                  {day.isCurrentMonth && (
                    <div className="w-full flex flex-col gap-1 mt-auto p-1.5">
                      {holiday ? (
                        <div className={`
                          text-[7px] leading-[1.1] text-center font-black uppercase px-1 py-1.5 rounded-lg border italic
                          ${isFullHoliday 
                            ? 'text-rose-600 bg-rose-50 border-rose-100' 
                            : 'text-amber-600 bg-amber-50 border-amber-100'}
                        `}>
                          {holiday.name}
                        </div>
                      ) : (
                        <>
                          {isOff ? (
                            <div className="flex flex-col items-center justify-center py-2 text-slate-300">
                              <Coffee size={14} />
                              <span className="text-[8px] font-black mt-0.5">TATİL</span>
                            </div>
                          ) : (
                            <div className={`
                              text-[8px] font-black py-2 px-1 rounded-lg text-center uppercase tracking-tighter leading-none
                              ${day.shift === ShiftType.MORNING ? 'text-amber-700' : 'text-indigo-700'}
                            `}>
                              {shiftInfo.type}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-around p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-[9px] font-black text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md border-2 border-amber-400 bg-white shadow-sm"></div>
            <span>Sabah</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md border-2 border-indigo-400 bg-white shadow-sm"></div>
            <span>Öğlen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md border-2 border-slate-200 bg-slate-50 shadow-sm"></div>
            <span>Tatil</span>
          </div>
        </div>
      </main>

      <footer className="text-center mt-8 px-4">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">2026 Vardiya Sistemi</p>
      </footer>
    </div>
  );
};

export default App;
