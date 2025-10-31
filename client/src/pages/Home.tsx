import { useState } from "react";
import WeekNavigator from "@/components/WeekNavigator";
import WeekCalendar from "@/components/WeekCalendar";
import AddShiftModal from "@/components/AddShiftModal";
import { format, startOfWeek, addDays, addWeeks, subWeeks, isToday, isBefore, startOfDay } from "date-fns";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  category: "pe-home" | "paul";
}

export default function Home() {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [shifts, setShifts] = useState<Shift[]>([
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), timeSlot: '7am - 3pm', category: 'pe-home' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const getDaysOfWeek = () => {
    const days = [];
    const today = startOfDay(new Date());
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      days.push({
        dayName: format(day, 'EEE'),
        date: parseInt(format(day, 'd')),
        fullDate: format(day, 'yyyy-MM-dd'),
        isToday: isToday(day),
        isPast: isBefore(day, today),
      });
    }
    return days;
  };

  const getWeekRange = () => {
    const end = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const handleAddShift = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleConfirmAddShift = (timeSlot: string, category: string) => {
    const newShift: Shift = {
      id: Date.now().toString(),
      date: selectedDate,
      timeSlot,
      category: category as "pe-home" | "paul",
    };
    setShifts([...shifts, newShift]);
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter((shift) => shift.id !== shiftId));
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const date = new Date(selectedDate);
    return format(date, 'EEE, MMM d');
  };

  return (
    <div className="min-h-screen bg-background">
      <WeekNavigator
        weekRange={getWeekRange()}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      
      <WeekCalendar
        days={getDaysOfWeek()}
        shifts={shifts}
        onAddShift={handleAddShift}
        onDeleteShift={handleDeleteShift}
      />

      <AddShiftModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddShift={handleConfirmAddShift}
        selectedDate={formatSelectedDate()}
      />
    </div>
  );
}
