import { useState } from "react";
import WeekNavigator from "@/components/WeekNavigator";
import MonthNavigator from "@/components/MonthNavigator";
import WeekCalendar from "@/components/WeekCalendar";
import MonthCalendar from "@/components/MonthCalendar";
import AddShiftModal from "@/components/AddShiftModal";
import ShareModal from "@/components/ShareModal";
import ViewToggle from "@/components/ViewToggle";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  isSameMonth,
  getDay,
} from "date-fns";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
}

export default function Home() {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>([
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), timeSlot: '7am - 3pm', shiftName: 'Day', category: 'pe-home' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
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

  const getDaysOfMonth = () => {
    const days = [];
    const today = startOfDay(new Date());
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const startDay = getDay(monthStart);
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
    
    const calendarStart = addDays(monthStart, -adjustedStartDay);
    
    for (let i = 0; i < 35; i++) {
      const day = addDays(calendarStart, i);
      days.push({
        date: parseInt(format(day, 'd')),
        fullDate: format(day, 'yyyy-MM-dd'),
        isToday: isToday(day),
        isPast: isBefore(day, today),
        isCurrentMonth: isSameMonth(day, currentMonth),
      });
    }
    
    return days;
  };

  const getWeekRange = () => {
    const end = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const getMonthYear = () => {
    return format(currentMonth, 'MMMM yyyy');
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleTodayWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const handleTodayMonth = () => {
    setCurrentMonth(new Date());
  };

  const handleAddShift = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleConfirmAddShift = (timeSlot: string, shiftName: string, category: string) => {
    const newShift: Shift = {
      id: Date.now().toString(),
      date: selectedDate,
      timeSlot,
      shiftName,
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
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShareModalOpen(true)}
            data-testid="button-share"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex-1" />
        </div>
      </div>

      {view === "week" ? (
        <>
          <WeekNavigator
            weekRange={getWeekRange()}
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
            onToday={handleTodayWeek}
          />
          <WeekCalendar
            days={getDaysOfWeek()}
            shifts={shifts}
            onAddShift={handleAddShift}
            onDeleteShift={handleDeleteShift}
          />
        </>
      ) : (
        <>
          <MonthNavigator
            monthYear={getMonthYear()}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleTodayMonth}
          />
          <MonthCalendar
            days={getDaysOfMonth()}
            shifts={shifts}
            onAddShift={handleAddShift}
            onDeleteShift={handleDeleteShift}
          />
        </>
      )}

      <AddShiftModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddShift={handleConfirmAddShift}
        selectedDate={formatSelectedDate()}
      />

      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shifts={shifts}
      />
    </div>
  );
}
