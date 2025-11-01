import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { timeSlots, categories } from "@shared/schema";

interface AddShiftModalProps {
  open: boolean;
  onClose: () => void;
  onAddShift: (timeSlot: string, shiftName: string, category: string, notes?: string) => void;
  selectedDate: string;
}

export default function AddShiftModal({
  open,
  onClose,
  onAddShift,
  selectedDate,
}: AddShiftModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("pe-home");
  const [notes, setNotes] = useState<string>("");

  const getCategoryForTimeSlot = (timeSlot: string): string => {
    if (timeSlot === "7am-3pm" || timeSlot === "3pm-11pm") {
      return "pe-home";
    }
    if (timeSlot === "6am-7am" || timeSlot === "11pm-12am") {
      return "paul";
    }
    return "pe-home";
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedCategory(getCategoryForTimeSlot(timeSlot));
  };

  const handleAddShift = () => {
    if (selectedTimeSlot) {
      const slot = timeSlots.find(s => s.value === selectedTimeSlot);
      const shiftName = slot?.name || "";
      onAddShift(selectedTimeSlot, shiftName, selectedCategory, notes);
      setSelectedTimeSlot(null);
      setSelectedCategory("pe-home");
      setNotes("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-add-shift">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">Add Shift - {selectedDate}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">Select Time Slot</h3>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedTimeSlot === slot.value ? "default" : "outline"}
                  className="h-14 text-sm font-medium flex flex-col items-center justify-center gap-0.5"
                  onClick={() => handleTimeSlotSelect(slot.value)}
                  data-testid={`button-timeslot-${slot.value}`}
                >
                  <span className="text-xs opacity-80">{slot.name}</span>
                  <span>{slot.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">Category</h3>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className="flex-1 h-12"
                  onClick={() => setSelectedCategory(cat.value)}
                  data-testid={`button-category-${cat.value}`}
                  disabled={true}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Category is automatically selected based on shift time
            </p>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-semibold">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this shift..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 resize-none"
              rows={3}
              data-testid="input-notes"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleAddShift}
              disabled={!selectedTimeSlot}
              data-testid="button-confirm-add"
            >
              Add Shift
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
