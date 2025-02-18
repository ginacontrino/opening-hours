import { DayOfWeek, OpeningHours, OpeningHoursApiResponse, TimePeriodEvent } from '../../types';

import { daysOfWeek } from '../../constants';

// Function to get the next weekday
const getNextDay = (day: DayOfWeek): DayOfWeek => daysOfWeek[(daysOfWeek.indexOf(day) + 1) % 7];

// Main function to pair open and close times in the schedule
export function pairOpenCloseTimes(schedule: OpeningHoursApiResponse): OpeningHours {
  return (Object.entries(schedule) as Array<[DayOfWeek, TimePeriodEvent[]]>).reduce(
    (acc: OpeningHours, [day, times]) => {
      const closings = times.filter((time) => time.type === 'close');
      const openings = times.filter(({ type }) => type === 'open');

      const pairs = openings.map(({ value: openSeconds }, index) => {
        const close = closings.find(({ value: closeSeconds }) => closeSeconds > openSeconds);
        const nextOpen = openings[index + 1];
        // unmatched open case
        if (nextOpen && close && nextOpen.value < close.value) {
          return [];
        }
        if (close) {
          return [openSeconds, close.value];
        }
        const nextDay = getNextDay(day as DayOfWeek);
        const nextTimes = schedule[nextDay];
        const closingTime = nextTimes?.find(({ type }) => type === 'close');
        if (closingTime) {
          return [openSeconds, closingTime.value];
        }
        return [];
      });
      acc[day] = pairs.filter((v) => v.length === 2) as [number, number][];
      return acc;
    },
    {} as OpeningHours,
  );
}
