import DayCell from "./DayCell";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  category: "pe-home" | "paul";
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
}

export default function WeekCalendar({
  days,
  shifts,
  onAddShift,
  onDeleteShift,
}: WeekCalendarProps) {
  const getShiftsForDate = (date: string) => {
    return shifts.filter((shift) => shift.date === date);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
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
          />
        ))}
      </div>
    </div>
  );
}
