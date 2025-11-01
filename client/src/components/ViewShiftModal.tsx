import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sun, Moon } from "lucide-react";
import { format } from "date-fns";

interface ViewShiftModalProps {
  open: boolean;
  onClose: () => void;
  shift: {
    id: string;
    date: string;
    timeSlot: string;
    shiftName?: string;
    category: "pe-home" | "paul";
    pay?: string;
    notes?: string;
  } | null;
  onDelete?: (shiftId: string) => void;
}

export default function ViewShiftModal({
  open,
  onClose,
  shift,
  onDelete,
}: ViewShiftModalProps) {
  if (!shift) return null;

  const categoryColors = {
    "pe-home": {
      bg: "bg-category-pe-home-light dark:bg-category-pe-home-dark",
      text: "text-category-pe-home dark:text-category-pe-home-light",
    },
    "paul": {
      bg: "bg-category-paul-light dark:bg-category-paul-dark",
      text: "text-category-paul dark:text-category-paul-light",
    },
  };

  const colors = categoryColors[shift.category];
  const categoryLabel = shift.category === "pe-home" ? "PE Home" : "Paul";
  
  const getShiftType = () => {
    const daySlots = ["6am-7am", "7am-3pm"];
    const eveningSlots = ["3pm-11pm", "11pm-12am"];
    
    if (daySlots.includes(shift.timeSlot)) {
      return { label: "Day", icon: Sun };
    } else if (eveningSlots.includes(shift.timeSlot)) {
      return { label: "Evening", icon: Moon };
    }
    // Return custom shift name if available
    if (shift.shiftName) {
      return { label: shift.shiftName, icon: null };
    }
    return null;
  };
  
  const shiftType = getShiftType();

  const formattedDate = format(new Date(shift.date), 'EEEE, MMMM d, yyyy');

  const handleDelete = () => {
    if (onDelete) {
      onDelete(shift.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-view-shift">
        <DialogHeader>
          <DialogTitle data-testid="text-shift-details">Shift Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className={`p-4 rounded-md ${colors.bg}`}>
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {shiftType && (
                    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground uppercase">
                      {shiftType.icon && <shiftType.icon className="h-3 w-3" />}
                      {shiftType.label}
                    </div>
                  )}
                  <div className="text-2xl font-semibold mt-1" data-testid="text-view-time">
                    {shift.timeSlot}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${colors.text} no-default-hover-elevate no-default-active-elevate`}
                  data-testid="badge-view-category"
                >
                  {categoryLabel}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground pt-2" data-testid="text-view-date">
                {formattedDate}
              </div>
            </div>
          </div>

          {shift.pay && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Pay Amount</h3>
              <div 
                className="p-3 rounded-md bg-muted text-lg font-semibold"
                data-testid="text-view-pay"
              >
                ${parseFloat(shift.pay).toFixed(2)}
              </div>
            </div>
          )}

          {shift.notes && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Notes</h3>
              <div 
                className="p-3 rounded-md bg-muted text-sm whitespace-pre-wrap"
                data-testid="text-view-notes"
              >
                {shift.notes}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-testid="button-close"
            >
              Close
            </Button>
            {onDelete && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
                data-testid="button-delete-shift"
              >
                <X className="h-4 w-4 mr-2" />
                Delete Shift
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
