import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
}

interface DayData {
  date: number;
  fullDate: string;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
}

interface MonthCalendarProps {
  days: DayData[];
  shifts: Shift[];
  onAddShift: (date: string) => void;
  onDeleteShift: (shiftId: string) => void;
}

export default function MonthCalendar({
  days,
  shifts,
  onAddShift,
}: MonthCalendarProps) {
  const getShiftsForDate = (date: string) => {
    return shifts.filter((shift) => shift.date === date);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayShifts = getShiftsForDate(day.fullDate);
          
          return (
            <Card
              key={day.fullDate}
              className={`min-h-24 p-2 hover-elevate active-elevate-2 cursor-pointer ${
                day.isPast ? "opacity-60" : ""
              } ${day.isToday ? "ring-2 ring-primary" : ""} ${
                !day.isCurrentMonth ? "bg-muted/30" : ""
              }`}
              onClick={() => onAddShift(day.fullDate)}
              data-testid={`card-day-${day.fullDate}`}
            >
              <div
                className={`text-sm font-semibold mb-1 ${
                  !day.isCurrentMonth ? "text-muted-foreground" : "text-foreground"
                }`}
                data-testid={`text-date-${day.date}`}
              >
                {day.date}
              </div>

              <div className="space-y-1">
                {dayShifts.slice(0, 3).map((shift) => {
                  const categoryColors = {
                    "pe-home": "bg-category-pe-home text-white",
                    "paul": "bg-category-paul text-white",
                  };

                  // Determine shift type label with emoji
                  const getShiftTypeLabel = () => {
                    const daySlots = ["6am-7am", "7am-3pm"];
                    const eveningSlots = ["3pm-11pm", "11pm-12am"];
                    
                    if (daySlots.includes(shift.timeSlot)) {
                      return "☀️ Day";
                    } else if (eveningSlots.includes(shift.timeSlot)) {
                      return "🌙 Evening";
                    }
                    return shift.shiftName || shift.timeSlot;
                  };

                  return (
                    <Badge
                      key={shift.id}
                      className={`w-full text-xs justify-start px-1 py-0 h-5 ${categoryColors[shift.category]} no-default-hover-elevate no-default-active-elevate`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      data-testid={`badge-shift-${shift.id}`}
                    >
                      <span className="truncate text-xs">
                        {getShiftTypeLabel()}
                      </span>
                    </Badge>
                  );
                })}
                {dayShifts.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayShifts.length - 3} more
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
