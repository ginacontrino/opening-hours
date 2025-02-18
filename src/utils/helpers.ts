// Compares two arrays of number tuples for deep equality by stringifying them
// (Usually using e.g. lodash would be a good option, but for this scope and purpose I choose to compare this way)
export const deepEquals = (arr1: [number, number][], arr2: [number, number][]): boolean => JSON.stringify(arr1) === JSON.stringify(arr2);
