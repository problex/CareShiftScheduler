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
    <div className="flex items-center justify-between gap-4 p-4 bg-card border-b sticky top-0 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={onPreviousMonth}
        data-testid="button-previous-month"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 flex-1 justify-center">
        <h2 className="text-lg font-semibold text-foreground" data-testid="text-month-year">
          {monthYear}
        </h2>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onNextMonth}
        data-testid="button-next-month"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        onClick={onToday}
        className="ml-2"
        data-testid="button-today"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Today
      </Button>
    </div>
  );
}
