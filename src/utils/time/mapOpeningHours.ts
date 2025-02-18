import { daysOfWeek } from "../../constants";
import { OpeningHours, OpeningHoursByDay, TimePeriod } from "../../types";

export const mapOpeningHours = (hours: OpeningHours): OpeningHoursByDay => {
    return daysOfWeek.reduce<OpeningHoursByDay>((acc, day) => {
      const dayKey = day as keyof OpeningHoursByDay;
      const dayTimes = hours[dayKey] || [];
      
      acc[dayKey] = { times: dayTimes as TimePeriod[] };
      
      return acc;
    }, {} as OpeningHoursByDay);
  };
  