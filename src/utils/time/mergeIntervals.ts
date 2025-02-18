import { TimePeriod } from "../../types";

const SECONDS_IN_A_DAY = 86400;

/**
 * Merges two sets of time intervals, handling cases where intervals may overlap
 * or wrap around midnight.
 * 
 * @param originalIntervals - An array of original time intervals, represented as a tuple of two numbers [start, end].
 * @param exceptionalIntervals - An array of exceptional time intervals, represented
 *                               in the same format as originalIntervals.
 *
 * @returns An array of merged time intervals
 */
export const mergeIntervals = (
    originalIntervals: TimePeriod[],
    exceptionalIntervals: TimePeriod[]
): TimePeriod[] => {
    if (originalIntervals.length === 0) return exceptionalIntervals;
    if (exceptionalIntervals.length === 0) return originalIntervals;

    // Combine, adjust for wrap-around, and sort intervals
    const mergedIntervals = [...originalIntervals, ...exceptionalIntervals]
        .map(normalizeForMidnight)
        .sort((a, b) => a[0] - b[0]);

    const result: TimePeriod[] = [];
    let previous = mergedIntervals[0];

    for (let i = 1; i < mergedIntervals.length; i++) {
        const current = mergedIntervals[i];

        // Check if intervals overlap
        if (previous[1] >= current[0]) {
            previous = mergeTwoIntervals(previous, current);
        } else {
            result.push(previous);
            previous = current;
        }
    }

    // Push the last merged interval
    result.push(previous);

    // Adjust intervals back for wrap-around times
    return result.map(([start, end]) => [start, end >= SECONDS_IN_A_DAY ? end - SECONDS_IN_A_DAY : end]) as TimePeriod[];
};

// Adds SECONDS_IN_A_DAY for cases after midnight 
const normalizeForMidnight = (interval: TimePeriod): TimePeriod => {
    const [start, end] = interval;
    return start > end ? [start, end + SECONDS_IN_A_DAY] : interval;
};

// Merges two intervals
const mergeTwoIntervals = (previous: TimePeriod, current: TimePeriod): TimePeriod => {
    return [previous[0], Math.max(previous[1], current[1])];
};
