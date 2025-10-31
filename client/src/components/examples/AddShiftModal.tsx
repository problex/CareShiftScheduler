import { useState } from 'react';
import AddShiftModal from '../AddShiftModal';
import { Button } from '@/components/ui/button';

export default function AddShiftModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Add Shift Modal</Button>
      <AddShiftModal
        open={open}
        onClose={() => setOpen(false)}
        onAddShift={(timeSlot, shiftName, category) => {
          console.log('Add shift:', timeSlot, shiftName, category);
          setOpen(false);
        }}
        selectedDate="Mon, Dec 18"
      />
    </div>
  );
}
