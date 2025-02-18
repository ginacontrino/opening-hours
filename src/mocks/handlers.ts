import { http, HttpResponse, passthrough } from 'msw';
import { EXCEPTIONAL_OPENING_HOURS_API_URL, OPENING_HOURS_API_URL, FONTS_URL } from '../constants';

import openingHoursJson from '../../fixtures/opening-hours.json';
import exceptionalOpeningHoursJson from '../../fixtures/exceptional-opening-hours.json';

export const handlers = [
  http.get(OPENING_HOURS_API_URL, () => {
    if (!openingHoursJson) {
      return HttpResponse.json({ error: 'Opening hours data not found' });
    }
    return HttpResponse.json(openingHoursJson);
  }),
  http.get(EXCEPTIONAL_OPENING_HOURS_API_URL, () => {
    if (!openingHoursJson) {
      return HttpResponse.json({ error: 'Exceptonal opening hours data not found' });
    }
    return HttpResponse.json(exceptionalOpeningHoursJson);
  }),
  http.get(FONTS_URL, () => {
    return passthrough()
  }),
];
