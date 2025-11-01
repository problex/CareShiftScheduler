import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import WeekCalendar from "@/components/WeekCalendar";
import MonthCalendar from "@/components/MonthCalendar";
import ViewToggle from "@/components/ViewToggle";
import WeekNavigator from "@/components/WeekNavigator";
import MonthNavigator from "@/components/MonthNavigator";
import { Card } from "@/components/ui/card";
import { AlertCircle, Calendar } from "lucide-react";
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

export default function SharedView() {
  const [, params] = useRoute("/share/:shareId");
  const shareId = params?.shareId;

  const [view, setView] = useState<"week" | "month">("week");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data, isLoading, error } = useQuery<{ shifts: Shift[], createdAt: Date }>({
    queryKey: ["/api/share", shareId],
    enabled: !!shareId,
  });

  const shifts: Shift[] = data?.shifts || [];

  const getDaysOfWeek = () => {
    const days = [];
    const today = startOfDay(new Date());

    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      days.push({
        dayName: format(day, "EEE"),
        date: parseInt(format(day, "d")),
        fullDate: format(day, "yyyy-MM-dd"),
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
    const adjustedStartDay = startDay;

    const calendarStart = addDays(monthStart, -adjustedStartDay);

    for (let i = 0; i < 35; i++) {
      const day = addDays(calendarStart, i);
      days.push({
        date: parseInt(format(day, "d")),
        fullDate: format(day, "yyyy-MM-dd"),
        isToday: isToday(day),
        isPast: isBefore(day, today),
        isCurrentMonth: isSameMonth(day, currentMonth),
      });
    }

    return days;
  };

  const getWeekRange = () => {
    const end = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  const getMonthYear = () => {
    return format(currentMonth, "MMMM yyyy");
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
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  const handleTodayMonth = () => {
    setCurrentMonth(new Date());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary animate-pulse" />
            <p className="text-lg">Loading shared calendar...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-destructive mt-1" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Calendar Not Found</h2>
              <p className="text-sm text-muted-foreground">
                This shared calendar link is invalid or has expired.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Shared Shift Schedule</h1>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
          <p className="text-xs text-muted-foreground">
            View-only calendar • Total shifts: {shifts.length}
          </p>
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
            onAddShift={() => {}}
            onDeleteShift={() => {}}
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
            onAddShift={() => {}}
            onDeleteShift={() => {}}
          />
        </>
      )}
    </div>
  );
}
