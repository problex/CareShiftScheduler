import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShiftCardProps {
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
  onDelete?: () => void;
}

export default function ShiftCard({ timeSlot, shiftName, category, onDelete }: ShiftCardProps) {
  const categoryColors = {
    "pe-home": {
      border: "border-l-category-pe-home",
      bg: "bg-category-pe-home-light dark:bg-category-pe-home-dark",
      text: "text-category-pe-home dark:text-category-pe-home-light",
    },
    "paul": {
      border: "border-l-category-paul",
      bg: "bg-category-paul-light dark:bg-category-paul-dark",
      text: "text-category-paul dark:text-category-paul-light",
    },
  };

  const colors = categoryColors[category];
  const categoryLabel = category === "pe-home" ? "PE Home" : "Paul";
  
  // Determine shift type based on time slot
  const getShiftTypeLabel = () => {
    const daySlots = ["6am-7am", "7am-3pm"];
    const eveningSlots = ["3pm-11pm", "11pm-12am"];
    
    if (daySlots.includes(timeSlot)) {
      return "☀️ Day";
    } else if (eveningSlots.includes(timeSlot)) {
      return "🌙 Evening";
    }
    return shiftName || "";
  };
  
  const shiftTypeLabel = getShiftTypeLabel();

  return (
    <Card
      className={`p-2 border-l-4 ${colors.border} ${colors.bg} hover-elevate group relative`}
      data-testid={`card-shift-${timeSlot}-${category}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {shiftTypeLabel && (
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide" data-testid={`text-shift-name-${shiftTypeLabel}`}>
              {shiftTypeLabel}
            </div>
          )}
          <div className="font-semibold text-sm text-foreground" data-testid={`text-time-${timeSlot}`}>
            {timeSlot}
          </div>
          <Badge
            variant="secondary"
            className={`mt-1 text-xs ${colors.text} no-default-hover-elevate no-default-active-elevate`}
            data-testid={`badge-category-${category}`}
          >
            {categoryLabel}
          </Badge>
        </div>
        {onDelete && (
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onDelete}
            data-testid={`button-delete-shift-${timeSlot}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </Card>
  );
}
