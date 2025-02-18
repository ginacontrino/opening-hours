import { describe, expect, it } from 'vitest';
import { deepEquals } from './helpers';

describe('deepEquals', () => {
  it('should return true for identical arrays', () => {
    const arr1: [number, number][] = [[1, 2], [3, 4]];
    const arr2 : [number, number][]= [[1, 2], [3, 4]];
    expect(deepEquals(arr1, arr2)).toBe(true);
  });

  it('should return false for different arrays', () => {
    const arr1: [number, number][] = [[1, 2], [3, 4]];
    const arr2: [number, number][] = [[1, 2], [4, 3]];
    expect(deepEquals(arr1, arr2)).toBe(false);
  });

  it('should return false for arrays of different lengths', () => {
    const arr1: [number, number][] = [[1, 2]];
    const arr2: [number, number][] = [[1, 2], [3, 4]];
    expect(deepEquals(arr1, arr2)).toBe(false);
  });

  it('should return true for empty arrays', () => {
    const arr1: [number, number][] = [];
    const arr2: [number, number][] = [];
    expect(deepEquals(arr1, arr2)).toBe(true);
  });
});