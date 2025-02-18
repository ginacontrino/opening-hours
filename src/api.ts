import { EXCEPTIONAL_OPENING_HOURS_API_URL, OPENING_HOURS_API_URL } from './constants';
import { OpeningHoursApiResponse, ExceptionalOpeningHoursApiResponse } from './types';

export const fetchOpeningHoursData = (): Promise<OpeningHoursApiResponse> =>
  fetch(OPENING_HOURS_API_URL).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch opening hours data');
    }
    return res.json();
  });

export const fetchExceptionalOpeningHoursData = (): Promise<ExceptionalOpeningHoursApiResponse> =>
  fetch(EXCEPTIONAL_OPENING_HOURS_API_URL).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch exceptional opening hours data');
    }
    return res.json();
  });
