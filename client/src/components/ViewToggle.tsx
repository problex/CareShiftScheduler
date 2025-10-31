import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from "lucide-react";

interface ViewToggleProps {
  view: "week" | "month";
  onViewChange: (view: "week" | "month") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-1 bg-muted p-1 rounded-md">
      <Button
        variant={view === "week" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("week")}
        className="flex-1"
        data-testid="button-view-week"
      >
        <CalendarDays className="h-4 w-4 mr-2" />
        Week
      </Button>
      <Button
        variant={view === "month" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("month")}
        className="flex-1"
        data-testid="button-view-month"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Month
      </Button>
    </div>
  );
}
