import MonthCalendar from '../MonthCalendar';

export default function MonthCalendarExample() {
  const days = Array.from({ length: 35 }, (_, i) => {
    const date = i - 2;
    const currentDate = date < 1 ? 28 + date : date > 31 ? date - 31 : date;
    return {
      date: currentDate,
      fullDate: `2024-12-${currentDate.toString().padStart(2, '0')}`,
      isToday: currentDate === 20,
      isPast: currentDate < 20,
      isCurrentMonth: date >= 1 && date <= 31,
    };
  });

  const shifts = [
    { id: '1', date: '2024-12-18', timeSlot: '7am - 3pm', shiftName: 'Day', category: 'pe-home' as const },
    { id: '2', date: '2024-12-18', timeSlot: '3pm - 11pm', shiftName: 'Evening', category: 'paul' as const },
    { id: '3', date: '2024-12-20', timeSlot: '6am - 7am', shiftName: 'Day', category: 'pe-home' as const },
    { id: '4', date: '2024-12-22', timeSlot: '11pm - 12am', shiftName: 'Evening', category: 'paul' as const },
  ];

  return (
    <MonthCalendar
      days={days}
      shifts={shifts}
      onAddShift={(date) => console.log('Add shift for:', date)}
      onDeleteShift={(id) => console.log('Delete shift:', id)}
    />
  );
}
