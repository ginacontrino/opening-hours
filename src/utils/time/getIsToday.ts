import { DayOfWeek } from '../../types';
import { daysOfWeek } from '../../constants';

export const getIsToday = (day: DayOfWeek) => {
  return new Date().getDay() === (daysOfWeek.indexOf(day) + 1) % daysOfWeek.length;
};
