import { daysOfWeek } from './constants';

export type DayOfWeek = (typeof daysOfWeek)[number];
export type TimePeriod = [number, number];

export type TimePeriodEvent = {
  type: 'open' | 'close';
  value: number;
};

export type OpeningHoursApiResponse = Partial<Record<DayOfWeek, TimePeriodEvent[]>>;
export type ExceptionalOpeningHoursApiResponse = ExceptionalOpeningHoursData
export type ExceptionalOpeningHoursData = {
  hours: Partial<Record<DayOfWeek, TimePeriodEvent[]>>;
  changes: Change[];
  holidays: Holiday[];
};

export type OpeningHours = Partial<Record<DayOfWeek, TimePeriod[] | []>>;
export type TimePeriodDetails = {
  times: TimePeriod[];
};

export type RegularOpeningHours = TimePeriodDetails; 
export type ExceptionalOpeningHours = TimePeriodDetails & {
  holiday?: string;
  isExceptional?: boolean;
};

export type OpeningHoursTypes = ExceptionalOpeningHours;
export type OpeningHoursByDay = {
  [key in DayOfWeek]: OpeningHoursTypes
};

export type Change = {
  day: DayOfWeek;
  kind: HoursChangeType;
};

export type Holiday = {
  day: DayOfWeek;
  name: string;
};

export type HoursChangeType = 'replace' | 'merge';
export interface OpeningHoursChange {
  replace: 'replace'
  merge: 'merge';
}

export type OpeningHoursType = 'regular' | 'exceptional'; 
export interface OpeningHoursConfig {
  regular: 'regular';
  exceptional: 'exceptional';
}
