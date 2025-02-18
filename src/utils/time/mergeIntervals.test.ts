import { describe, expect, it } from 'vitest';
import { mergeIntervals } from './mergeIntervals';

describe('mergeIntervals', () => {
  it('should merge empty arrays', () => {
    expect(mergeIntervals([], [])).toEqual([]);
  });

  it('should merge partially empty arrays', () => {
    expect(mergeIntervals([], [[3600, 7200]])).toEqual([[3600, 7200]]);
    expect(mergeIntervals([[3600, 7200]], [])).toEqual([[3600, 7200]]);
  });

  it('should merge overlapping intervals', () => {
    expect(mergeIntervals([[3600, 18000]], [[14400, 21600]])).toEqual([[3600, 21600]]);
  });

  it('should non merge overlapping intervals', () => {
    expect(mergeIntervals([[3600, 7200]], [[10800, 14400]])).toEqual([[3600, 7200], [10800, 14400]]);
  });

  it('should merge intervals after midnight', () => {
    expect(mergeIntervals([[79200, 86400]], [[86400, 7200]])).toEqual([[79200, 7200]]);
  });

  it('should merge identical intervals', () => {
    expect(mergeIntervals([[3600, 7200]], [[3600, 7200]])).toEqual([[3600, 7200]]);
  });

  it('should merge multiple intervals', () => {
    expect(mergeIntervals([[3600, 7200], [10800, 14400]], [[7200, 10800]])).toEqual([[3600, 14400]]);
  });

  it('should merge complex intervals', () => {
    expect(mergeIntervals([[3600, 7200], [10800, 14400]], [[7200, 10800], [14400, 18000]])).toEqual([[3600, 18000]]);

    expect(
      mergeIntervals([[36000, 64800], [82800, 3600]], [[32400, 64800], [72000, 79200], [84600, 7200]])
    ).toEqual(
      [[32400, 64800], [72000, 79200], [82800, 7200]]
    );
  });

  it('should merge adjacent intervals', () => {
    expect(mergeIntervals([[3600, 7200]], [[7200, 10800]])).toEqual([[3600, 10800]]);
  });
});
