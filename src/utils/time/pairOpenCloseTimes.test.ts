import { describe, expect, it } from 'vitest';

import { pairOpenCloseTimes } from './pairOpenCloseTimes';

describe('pairOpenCloseTimes', () => {
  it('should return empty for the day', () => {
    expect(pairOpenCloseTimes({ monday: [] }).monday).toEqual([]);
  });

  it('should pair open and close times', () => {
    expect(
      pairOpenCloseTimes({
        monday: [
          { type: 'open', value: 36000 },
          { type: 'close', value: 64800 },
        ],
      }).monday,
    ).toEqual([[36000, 64800]]);
  });

  it('should pair multiple times in one day', () => {
    expect(
      pairOpenCloseTimes({
        monday: [
          {
            type: 'open',
            value: 28800,
          },
          {
            type: 'close',
            value: 39600,
          },
          {
            type: 'open',
            value: 43200,
          },
          {
            type: 'close',
            value: 57600,
          },
          {
            type: 'open',
            value: 64800,
          },
          {
            type: 'close',
            value: 82800,
          },
        ],
      }).monday,
    ).toEqual([
      [28800, 39600],
      [43200, 57600],
      [64800, 82800],
    ]);
  });

  it('should skip unmatched open times', () => {
    expect(
      pairOpenCloseTimes({
        monday: [
          {
            type: 'open',
            value: 28800,
          },
          {
            type: 'close',
            value: 39600,
          },
          {
            type: 'open',
            value: 43200,
          },
          {
            type: 'open',
            value: 64800,
          },
          {
            type: 'close',
            value: 82800,
          },
        ],
      }).monday,
    ).toEqual([
      [28800, 39600],
      [64800, 82800],
    ]);
  });

  it('should skip unmatched close times', () => {
    expect(
      pairOpenCloseTimes({
        monday: [
          {
            type: 'open',
            value: 28800,
          },
          {
            type: 'close',
            value: 39600,
          },
          {
            type: 'close',
            value: 43200,
          },
          {
            type: 'open',
            value: 64800,
          },
          {
            type: 'close',
            value: 82800,
          },
        ],
      }).monday,
    ).toEqual([
      [28800, 39600],
      [64800, 82800],
    ]);
  });

  it('should skip if close time not found in next day', () => {
    expect(
      pairOpenCloseTimes({
        tuesday: [
          {
            type: 'open',
            value: 64800,
          },
        ],
        wednesday: [],
      }),
    ).toEqual({ tuesday: [], wednesday: [] });
  });

  it('should find close time for Sunday on Monday', () => {
    expect(
      pairOpenCloseTimes({
        monday: [
          {
            type: 'close',
            value: 3600,
          },
        ],
        sunday: [
          {
            type: 'open',
            value: 64800,
          },
        ],
      }),
    ).toEqual({ monday: [], sunday: [[64800, 3600]] });
  });

  it('should skip if close time for Sunday not on Monday', () => {
    expect(
      pairOpenCloseTimes({
        monday: [],
        sunday: [
          {
            type: 'open',
            value: 64800,
          },
        ],
      }),
    ).toEqual({ monday: [], sunday: [] });
  });

  // TODO: address this case in pairOpenCloseTimes
  it.skip('should pair overlapping times', () => {
    expect(
      pairOpenCloseTimes({
        sunday: [
          { type: 'open', value: 3600 },
          { type: 'close', value: 7200 },
          { type: 'open', value: 5400 },
          { type: 'close', value: 10800 },
        ],
      }),
    ).toEqual({ sunday: [[3600, 7200], [5400, 10800]] });
  });

});
