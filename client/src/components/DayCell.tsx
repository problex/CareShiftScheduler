import { Card } from "@/components/ui/card";
import ShiftCard from "./ShiftCard";
import { Plus } from "lucide-react";

interface Shift {
  id: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
}

interface DayCellProps {
  dayName: string;
  date: number;
  shifts: Shift[];
  isToday?: boolean;
  isPast?: boolean;
  onAddShift: () => void;
  onDeleteShift: (shiftId: string) => void;
}

export default function DayCell({
  dayName,
  date,
  shifts,
  isToday = false,
  isPast = false,
  onAddShift,
  onDeleteShift,
}: DayCellProps) {
  return (
    <Card
      className={`p-2 min-h-32 hover-elevate active-elevate-2 cursor-pointer ${
        isPast ? "opacity-60" : ""
      } ${isToday ? "ring-2 ring-primary" : ""}`}
      onClick={onAddShift}
      data-testid={`card-day-${date}`}
    >
      <div className="mb-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide" data-testid={`text-day-${dayName}`}>
          {dayName}
        </div>
        <div className="text-2xl font-semibold" data-testid={`text-date-${date}`}>
          {date}
        </div>
      </div>
      
      <div className="space-y-2">
        {shifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-xs">Tap to add</span>
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
                onDelete={() => {
                  onDeleteShift(shift.id);
                }}
              />
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
