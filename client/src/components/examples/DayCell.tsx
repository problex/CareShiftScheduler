import DayCell from '../DayCell';

export default function DayCellExample() {
  const shifts = [
    { id: '1', timeSlot: '7am - 3pm', category: 'pe-home' as const },
    { id: '2', timeSlot: '3pm - 11pm', category: 'paul' as const },
  ];

  return (
    <div className="p-4 grid grid-cols-2 gap-4 max-w-2xl">
      <DayCell
        dayName="Mon"
        date={18}
        shifts={shifts}
        isToday={true}
        onAddShift={() => console.log('Add shift clicked')}
        onDeleteShift={(id) => console.log('Delete shift:', id)}
      />
      <DayCell
        dayName="Tue"
        date={19}
        shifts={[]}
        onAddShift={() => console.log('Add shift clicked')}
        onDeleteShift={(id) => console.log('Delete shift:', id)}
      />
    </div>
  );
}
