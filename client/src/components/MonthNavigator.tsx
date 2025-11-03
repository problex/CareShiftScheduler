import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface MonthNavigatorProps {
  monthYear: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function MonthNavigator({
  monthYear,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-4 bg-card border-b sticky top-0 z-50">
      <Button
        variant="outline"
        onClick={onPreviousMonth}
        data-testid="button-previous-month"
        className="h-11 w-11 p-0"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <div className="flex items-center gap-2 flex-1 justify-center">
        <h2 className="text-sm sm:text-lg font-semibold text-foreground" data-testid="text-month-year">
          {monthYear}
        </h2>
      </div>

      <Button
        variant="outline"
        onClick={onNextMonth}
        data-testid="button-next-month"
        className="h-11 w-11 p-0"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button
        variant="outline"
        onClick={onToday}
        className="ml-1 sm:ml-2 min-h-11"
        data-testid="button-today"
      >
        <Calendar className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Today</span>
      </Button>
    </div>
  );
}
