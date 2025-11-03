import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShiftCardProps {
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
  pay?: string;
  onDelete?: () => void;
  onView?: () => void;
}

export default function ShiftCard({ timeSlot, shiftName, category, pay, onDelete, onView }: ShiftCardProps) {
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
  const getShiftTypeInfo = () => {
    const daySlots = ["6am-7am", "7am-3pm"];
    const eveningSlots = ["3pm-11pm", "11pm-12am"];
    
    if (daySlots.includes(timeSlot)) {
      return { label: "Day", icon: Sun };
    } else if (eveningSlots.includes(timeSlot)) {
      return { label: "Evening", icon: Moon };
    }
    return { label: shiftName || "", icon: null };
  };
  
  const shiftTypeInfo = getShiftTypeInfo();
  const Icon = shiftTypeInfo.icon;

  return (
    <Card
      className={`p-1.5 sm:p-2 border-l-4 ${colors.border} ${colors.bg} ${onView ? 'hover-elevate active-elevate-2 cursor-pointer' : 'hover-elevate'} group relative`}
      data-testid={`card-shift-${timeSlot}-${category}`}
      onClick={onView}
    >
      <div className="flex items-start justify-between gap-1 sm:gap-2">
        <div className="flex-1 min-w-0">
          {shiftTypeInfo.label && (
            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide" data-testid={`text-shift-name-${shiftTypeInfo.label}`}>
              {Icon && <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
              {shiftTypeInfo.label}
            </div>
          )}
          <div className="font-semibold text-xs sm:text-sm text-foreground" data-testid={`text-time-${timeSlot}`}>
            {timeSlot}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
            <Badge
              variant="secondary"
              className={`text-[10px] sm:text-xs ${colors.text} no-default-hover-elevate no-default-active-elevate`}
              data-testid={`badge-category-${category}`}
            >
              {categoryLabel}
            </Badge>
            {pay && (
              <span className="text-[10px] sm:text-xs font-semibold text-foreground" data-testid={`text-pay-${pay}`}>
                ${parseFloat(pay).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            className="h-11 w-11 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            data-testid={`button-delete-shift-${timeSlot}`}
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
