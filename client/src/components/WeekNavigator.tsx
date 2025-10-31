import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface WeekNavigatorProps {
  weekRange: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export default function WeekNavigator({
  weekRange,
  onPreviousWeek,
  onNextWeek,
  onToday,
}: WeekNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border-b sticky top-0 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={onPreviousWeek}
        data-testid="button-previous-week"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 flex-1 justify-center">
        <h2 className="text-lg font-semibold text-foreground" data-testid="text-week-range">
          {weekRange}
        </h2>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onNextWeek}
        data-testid="button-next-week"
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
