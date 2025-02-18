import { useState, useEffect } from 'react';
import { fetchOpeningHoursData, fetchExceptionalOpeningHoursData } from '../api';
import { applyExceptionalToRegularHours } from '../utils/time/applyExceptionalToRegularHours';
import { pairOpenCloseTimes } from '../utils/time/pairOpenCloseTimes';
import { mapOpeningHours } from '../utils/time/mapOpeningHours';
import { OpeningHoursConfig, OpeningHoursByDay, OpeningHoursType } from '../types';

const openingHoursTypes: OpeningHoursConfig = {
  regular: 'regular',
  exceptional: 'exceptional',
};

/**
 * Custom hook to fetch and manage opening hours data.
 *
 * @param {OpeningHoursType} type - The type of opening hours to fetch (regular or exceptional).
 * @returns {Object} An object containing:
 *   - hours: Opening hours data by day or null if not loaded.
 *   - error: Error message or null if no error occurred.
 *   - loading: Boolean indicating if the data is still being loaded.
 */
export function useOpeningHours(type: OpeningHoursType = openingHoursTypes.regular): {
  hours: OpeningHoursByDay | null;
  error: string | null;
  loading: boolean;
} {
  const [hours, setHours] = useState<OpeningHoursByDay | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const openingData = await fetchOpeningHoursData();
        const pairedHours = pairOpenCloseTimes(openingData);
        // transform to a uniform structure that can possibly incorporate exceptional hours if needed
        const mappedHours = mapOpeningHours(pairedHours);

        let hoursData = mappedHours;

        // only fetch exceptional hours, if requested
        if (type === openingHoursTypes.exceptional) {
          const exceptionalData = await fetchExceptionalOpeningHoursData();
          // only apply eceptional hours if present
          if (Object.keys(exceptionalData).length > 0) {
            hoursData = applyExceptionalToRegularHours(mappedHours, exceptionalData);
          }
        }

        setHours(hoursData);
      } catch (e) {
        // Show a user-friendly message
        setError('An Error occured loading opening hours');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  return { hours, error, loading };
}
