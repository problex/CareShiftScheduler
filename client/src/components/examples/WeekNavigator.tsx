import WeekNavigator from '../WeekNavigator';

export default function WeekNavigatorExample() {
  return (
    <WeekNavigator
      weekRange="Dec 18 - Dec 24, 2024"
      onPreviousWeek={() => console.log('Previous week')}
      onNextWeek={() => console.log('Next week')}
      onToday={() => console.log('Go to today')}
    />
  );
}
