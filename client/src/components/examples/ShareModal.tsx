import { useState } from 'react';
import ShareModal from '../ShareModal';
import { Button } from '@/components/ui/button';

export default function ShareModalExample() {
  const [open, setOpen] = useState(false);

  const shifts = [
    { id: '1', date: '2024-12-18', timeSlot: '7am - 3pm', shiftName: 'Day', category: 'pe-home' as const },
    { id: '2', date: '2024-12-18', timeSlot: '3pm - 11pm', shiftName: 'Evening', category: 'pe-home' as const },
    { id: '3', date: '2024-12-20', timeSlot: '6am - 7am', shiftName: 'Day', category: 'paul' as const },
    { id: '4', date: '2024-12-22', timeSlot: '11pm - 12am', shiftName: 'Evening', category: 'paul' as const },
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Share Modal</Button>
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        shifts={shifts}
      />
    </div>
  );
}
