import MonthNavigator from '../MonthNavigator';

export default function MonthNavigatorExample() {
  return (
    <MonthNavigator
      monthYear="December 2024"
      onPreviousMonth={() => console.log('Previous month')}
      onNextMonth={() => console.log('Next month')}
      onToday={() => console.log('Go to today')}
    />
  );
}
