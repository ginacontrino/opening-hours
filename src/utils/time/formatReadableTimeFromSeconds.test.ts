import { describe, expect, it } from 'vitest';

import { formatReadableTimeFromSeconds } from './formatReadableTimeFromSeconds';

describe('formatReadableTimeFromSeconds', () => {
  it('should format as AM/PM abbreviated to hours when exact', () => {
    expect(formatReadableTimeFromSeconds(7200)).toBe('2\u202fAM');
    expect(formatReadableTimeFromSeconds(43200)).toBe('12\u202fPM');
  });

  it('should convert seconds to 12AM', () => {
    expect(formatReadableTimeFromSeconds(0)).toBe('12\u202fAM');
  });

  it('should include minutes when not exact hour', () => {
    expect(formatReadableTimeFromSeconds(5400)).toBe('1:30\u202fAM');
  });

  it('should drop seconds', () => {
    expect(formatReadableTimeFromSeconds(5430)).toBe('1:30\u202fAM');
  });
});
