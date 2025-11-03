import DayCell from "./DayCell";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
  pay?: string;
  notes?: string;
}

interface DayData {
  dayName: string;
  date: number;
  fullDate: string;
  isToday: boolean;
  isPast: boolean;
}

interface WeekCalendarProps {
  days: DayData[];
  shifts: Shift[];
  onAddShift: (date: string) => void;
  onDeleteShift: (shiftId: string) => void;
  onViewShift?: (shift: Shift) => void;
}

export default function WeekCalendar({
  days,
  shifts,
  onAddShift,
  onDeleteShift,
  onViewShift,
}: WeekCalendarProps) {
  const getShiftsForDate = (date: string) => {
    return shifts.filter((shift) => shift.date === date);
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-4">
        {days.map((day) => (
          <DayCell
            key={day.fullDate}
            dayName={day.dayName}
            date={day.date}
            shifts={getShiftsForDate(day.fullDate)}
            isToday={day.isToday}
            isPast={day.isPast}
            onAddShift={() => onAddShift(day.fullDate)}
            onDeleteShift={onDeleteShift}
            onViewShift={onViewShift}
          />
        ))}
      </div>
    </div>
  );
}
