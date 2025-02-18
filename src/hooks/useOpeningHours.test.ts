import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest';
import { useOpeningHours } from './useOpeningHours';
import * as api from '../api';

vi.mock('../api');

describe('useOpeningHours', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const emptyData = {
        monday: { times: [] },
        tuesday: { times: [] },
        wednesday: { times: [] },
        thursday: { times: [] },
        friday: { times: [] },
        saturday: { times: [] },
        sunday: { times: [] },
    };

    it('should return loading state initially', () => {
        const { result } = renderHook(() => useOpeningHours());
        expect(result.current.loading).toBe(true);
        expect(result.current.hours).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should fetch regular opening hours', async () => {
        const mockData = { monday: [{ type: 'open', value: 3400 }, { type: 'close', value: 6000 }], };
        (api.fetchOpeningHoursData as Mock).mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useOpeningHours());
        await waitFor(() => {
            const excpetedData = { ...emptyData, monday: { times: [[3400, 6000]] } };
            expect(result.current.loading).toBe(false);
            expect(result.current.hours).toEqual(excpetedData);
            expect(result.current.error).toBeNull();
        })
    });

    it('should not fetch exceptional opening hours without flag "exceptional"', async () => {
        const mockRegularData = { monday: [{ type: 'open', value: 3400 }, { type: 'close', value: 6000 }], };
        (api.fetchOpeningHoursData as Mock).mockResolvedValueOnce(mockRegularData);

        const mockExceptionalData = {
            hours: { tuesday: [{ type: 'open', value: 3600 }, { type: 'close', value: 7200 }] },
            changes: [{ day: "tuesday", kind: "replace" }]
        };
        (api.fetchExceptionalOpeningHoursData as Mock).mockResolvedValueOnce(mockExceptionalData);

        const { result } = renderHook(() => useOpeningHours());
        await waitFor(() => {
            const expectedData = { ...emptyData, monday: { times: [[3400, 6000]] }, tuesday: { times: [] } };
            expect(result.current.loading).toBe(false);
            expect(result.current.hours).toEqual(expectedData);
            expect(result.current.error).toBeNull();
        });
    });

    it('should handle errors gracefully', async () => {
        (api.fetchOpeningHoursData as Mock).mockRejectedValueOnce(new Error('Fetch error'));

        const { result } = renderHook(() => useOpeningHours());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.hours).toBeNull();
            expect(result.current.error).toBe('An Error occured loading opening hours');
        })
    });
});