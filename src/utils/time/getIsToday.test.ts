import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getIsToday } from './getIsToday';

describe('getIsToday', () => {
  const date = new Date(2023, 0, 31, 13);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true when day of week does not match current date', () => {
    expect(getIsToday('tuesday')).toBe(true);
  });

  it('should return false when day of week does not match current date', () => {
    expect(getIsToday('sunday')).toBe(false);
  });
});
