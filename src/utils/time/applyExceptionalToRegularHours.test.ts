import { describe, expect, it } from 'vitest';
import { applyExceptionalToRegularHours } from './applyExceptionalToRegularHours';
import { ExceptionalOpeningHoursData, OpeningHoursByDay } from '../../types';

describe('applyExceptionalToRegularHours', () => {

    const emptyOpeningHours: OpeningHoursByDay = {
        monday: { times: [] },
        tuesday: { times: [] },
        wednesday: { times: [] },
        thursday: { times: [] },
        friday: { times: [] },
        saturday: { times: [] },
        sunday: { times: [] },
    };

    const exampleOpeningHours: OpeningHoursByDay = {
        ...emptyOpeningHours,
        monday: { times: [[3600, 7200]] },
    };

    it('should handle empty opening hours', () => {

        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {},
            changes: [],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(emptyOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual(emptyOpeningHours);
    });

    it('should return regular hours when no exceptional hours are provided', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {},
            changes: [],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual(exampleOpeningHours);
    });

    it('should replace regular hours with exceptional hours', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                monday: [
                    { type: 'open', value: 36000 },
                    { type: 'close', value: 64800 },
                ]
            },
            changes: [{ day: "monday", kind: "replace" }],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[36000, 64800]], isExceptional: true },
        });
    });

    it('should handle exceptional hours with no corresponding regular hours', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                tuesday: [
                    { type: 'open', value: 36000 },
                    { type: 'close', value: 64800 },
                ],
            },
            changes: [{ day: "tuesday", kind: "replace" }],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[3600, 7200]] },
            tuesday: { times: [[36000, 64800]], isExceptional: true },
        });
    });

    it('should handle exceptional hours that are identical to regular hours', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                monday: [
                    { type: 'open', value: 3600 },
                    { type: 'close', value: 7200 },
                ],
            },
            changes: [{ day: "monday", kind: "replace" }],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[3600, 7200]], isExceptional: false },
        });
    });

    it('should merge regular hours with exceptional hours', () => {
        const openingHours: OpeningHoursByDay = {
            ...emptyOpeningHours,
            monday: { times: [[3600, 7200], [79200, 86400]] },
        };

        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                monday: [
                    { type: 'open', value: 43200 },
                    { type: 'close', value: 64800 },
                ],
            },
            changes: [{ day: "monday", kind: "merge" }],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(openingHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...openingHours,
            monday: { times: [[3600, 7200], [43200, 64800], [79200, 0]], isExceptional: true },
        });
    });

    it('should add holiday information', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {},
            changes: [],
            holidays: [{ day: 'monday', name: "New Year's Day" }],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[3600, 7200]], holiday: "New Year's Day" },
        });
    });

    it('should handle multiple holidays', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {},
            changes: [],
            holidays: [
                { day: 'monday', name: "New Year's Day" },
                { day: 'tuesday', name: "Valentine's Day" },
            ],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[3600, 7200]], holiday: "New Year's Day" },
            tuesday: { times: [], holiday: "Valentine's Day" },
        });
    });

    it('should handle multiple changes for the same day', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                monday: [
                    { type: 'open', value: 36000 },
                    { type: 'close', value: 64800 },
                ],
            },
            changes: [
                { day: "monday", kind: "replace" },
                { day: "monday", kind: "merge" }, // This should be ignored as replace takes precedence
            ],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual({
            ...exampleOpeningHours,
            monday: { times: [[36000, 64800]], isExceptional: true }
        });
    });

    it('should not make change when changes array is empty', () => {
        const exceptionalOpeningHours: ExceptionalOpeningHoursData = {
            hours: {
                monday: [
                    { type: 'open', value: 36000 },
                    { type: 'close', value: 64800 },
                ],
            },
            changes: [],
            holidays: [],
        };

        const result = applyExceptionalToRegularHours(exampleOpeningHours, exceptionalOpeningHours);
        expect(result).toEqual(exampleOpeningHours);
    });
})
