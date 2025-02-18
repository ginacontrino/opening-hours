import { ExceptionalOpeningHoursData, OpeningHoursChange, OpeningHoursByDay, } from '../../types';
import { pairOpenCloseTimes } from './pairOpenCloseTimes';
import { mergeIntervals } from './mergeIntervals';
import { deepEquals } from '../helpers';

const changeKind: OpeningHoursChange = {
  replace: 'replace',
  merge: 'merge',
};

/**
 * Reconciles opening hours with exceptional hours and holidays.
 *
 * @param {OpeningHoursByDay} openingHours - Regular opening hours by day.
 * @param {ExceptionalOpeningHoursData} exceptionalOpeningHours - Exceptional hours and changes data.
 * @returns {OpeningHoursByDay} - Reconciled hours with possible exceptions and holiday information.
 */
export function applyExceptionalToRegularHours(openingHours: OpeningHoursByDay, exceptionalOpeningHours: ExceptionalOpeningHoursData): OpeningHoursByDay {
  const { hours: exceptionalHours, changes, holidays } = exceptionalOpeningHours;
  const pairedExceptionalHours = pairOpenCloseTimes(exceptionalHours);

  const reconciledHours = (Object.entries(openingHours)).reduce<OpeningHoursByDay>(
    (acc, [day]) => {
      const dayKey = day as keyof OpeningHoursByDay;
      const change = changes.find((change) => change.day === day);
      const holiday = holidays.find((holiday) => holiday.day === day);

      const exceptionalTimes = pairedExceptionalHours[dayKey] || [];
      const regularTimes = openingHours[dayKey]?.times || [];

      // merge or replace based on change
      if (change) {
        if (change.kind === changeKind.replace) {
          acc[dayKey] = {
            times: exceptionalTimes,
            // explicitely check if change is present after replacement
            isExceptional: !deepEquals(exceptionalTimes, regularTimes)
          };
        }

        if (change.kind === changeKind.merge) {
          const mergedTimes = mergeIntervals(regularTimes, exceptionalTimes);

          acc[dayKey] = {
            times: mergedTimes,
            // explicitely check if change is present after merging
            isExceptional: !deepEquals(mergedTimes, regularTimes)
          };
        }
      }

      // add holiday if present
      if (holiday) {
        acc[dayKey].holiday = holiday.name
      }

      return acc;
    }, { ...openingHours } as OpeningHoursByDay);

  return reconciledHours;
}
