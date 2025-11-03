import { Card } from "@/components/ui/card";
import ShiftCard from "./ShiftCard";
import { Plus } from "lucide-react";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
  pay?: string;
  notes?: string;
}

interface DayCellProps {
  dayName: string;
  date: number;
  shifts: Shift[];
  isToday?: boolean;
  isPast?: boolean;
  onAddShift: () => void;
  onDeleteShift: (shiftId: string) => void;
  onViewShift?: (shift: Shift) => void;
}

export default function DayCell({
  dayName,
  date,
  shifts,
  isToday = false,
  isPast = false,
  onAddShift,
  onDeleteShift,
  onViewShift,
}: DayCellProps) {
  return (
    <Card
      className={`p-1.5 sm:p-2 min-h-28 sm:min-h-32 hover-elevate active-elevate-2 cursor-pointer ${
        isPast ? "opacity-60" : ""
      } ${isToday ? "ring-2 ring-primary" : ""}`}
      onClick={onAddShift}
      data-testid={`card-day-${date}`}
    >
      <div className="mb-1.5 sm:mb-2">
        <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide" data-testid={`text-day-${dayName}`}>
          {dayName}
        </div>
        <div className="text-xl sm:text-2xl font-semibold" data-testid={`text-date-${date}`}>
          {date}
        </div>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        {shifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2 sm:py-4 text-muted-foreground">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-[10px] sm:text-xs">Tap to add</span>
          </div>
        ) : (
          shifts.map((shift) => (
            <div
              key={shift.id}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ShiftCard
                timeSlot={shift.timeSlot}
                shiftName={shift.shiftName}
                category={shift.category}
                pay={shift.pay}
                onDelete={() => {
                  onDeleteShift(shift.id);
                }}
                onView={onViewShift ? () => onViewShift(shift) : undefined}
              />
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
