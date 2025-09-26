import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { formatRelativeTime } from './formatRelativeTime';

const mockDate = new Date('2025-09-24T12:00:00Z');

describe('formatRelativeTime', () => {
  beforeAll(() => {
    vi.setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return relative date when given Date as argument', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    const expectedResult = '2 years ago';

    const result = formatRelativeTime(date);

    expect(result).toBe(expectedResult);
  });

  it('should return relative date when given string as argument', () => {
    const date = '2023-09-24T09:15:30.123Z';
    const expectedResult = '2 years ago';

    const result = formatRelativeTime(date);

    expect(result).toBe(expectedResult);
  });

  it('should return relative date in the future', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 2);
    const expectedResult = 'in 2 years';

    const result = formatRelativeTime(date);

    expect(result).toBe(expectedResult);
  });
});
