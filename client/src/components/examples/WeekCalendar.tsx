import WeekCalendar from '../WeekCalendar';

export default function WeekCalendarExample() {
  const days = [
    { dayName: 'Mon', date: 18, fullDate: '2024-12-18', isToday: false, isPast: true },
    { dayName: 'Tue', date: 19, fullDate: '2024-12-19', isToday: false, isPast: true },
    { dayName: 'Wed', date: 20, fullDate: '2024-12-20', isToday: true, isPast: false },
    { dayName: 'Thu', date: 21, fullDate: '2024-12-21', isToday: false, isPast: false },
    { dayName: 'Fri', date: 22, fullDate: '2024-12-22', isToday: false, isPast: false },
    { dayName: 'Sat', date: 23, fullDate: '2024-12-23', isToday: false, isPast: false },
    { dayName: 'Sun', date: 24, fullDate: '2024-12-24', isToday: false, isPast: false },
  ];

  const shifts = [
    { id: '1', date: '2024-12-18', timeSlot: '7am - 3pm', category: 'pe-home' as const },
    { id: '2', date: '2024-12-18', timeSlot: '3pm - 11pm', category: 'paul' as const },
    { id: '3', date: '2024-12-20', timeSlot: '6am - 7am', category: 'pe-home' as const },
    { id: '4', date: '2024-12-22', timeSlot: '11pm - 12am', category: 'paul' as const },
  ];

  return (
    <WeekCalendar
      days={days}
      shifts={shifts}
      onAddShift={(date) => console.log('Add shift for:', date)}
      onDeleteShift={(id) => console.log('Delete shift:', id)}
    />
  );
}
