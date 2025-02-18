import { describe, expect, it } from 'vitest';

import { OpeningHours } from './OpeningHours';
import { screen, render } from '@testing-library/react';
import { OpeningHoursByDay } from '../../types';

describe('OpeningHoursCard', () => {
  const emptyOpeningHours: OpeningHoursByDay = {
    monday: { times: [] },
    tuesday: { times: [] },
    wednesday: { times: [] },
    thursday: { times: [] },
    friday: { times: [] },
    saturday: { times: [] },
    sunday: { times: [] },
  };

  const fullOpeningHours: OpeningHoursByDay = {
    monday: { times: [[28800, 39600]], holiday: 'New Year' },
    tuesday: { times: [[43200, 57600]], isExceptional: true },
    wednesday: { times: [] },
    thursday: { times: [[64800, 82800]] },
    friday: { times: [[28800, 82800]] },
    saturday: { times: [] },
    sunday: { times: [[43200, 82800]], holiday: 'Christmas' },
  };

  it('should render Closed for empty hours', () => {
    render(<OpeningHours hours={emptyOpeningHours} />);
    expect(screen.queryAllByText('Closed').length).toBe(7);
  });

  it('should render open and close time for day', () => {
    render(
      <OpeningHours
        hours={{
          ...emptyOpeningHours,
          monday: { times: [[64800, 82800]] },
        }}
      />,
    );
    expect(screen.getByText('6 PM - 11 PM')).toBeInTheDocument();
  });

  it('should render multiple open and close times for day', () => {
    render(
      <OpeningHours
        hours={{
          ...emptyOpeningHours,
          monday: {
            times: [
              [28800, 39600],
              [43200, 57600],
              [64800, 82800],
            ],
          },
        }}
      />,
    );

    expect(screen.getByText('8 AM - 11 AM')).toBeInTheDocument();
    expect(screen.getByText('12 PM - 4 PM')).toBeInTheDocument();
    expect(screen.getByText('6 PM - 11 PM')).toBeInTheDocument();
  });

  it('should render holiday for day', () => {
    render(
      <OpeningHours
        hours={{
          ...emptyOpeningHours,
          monday: {
            times: [[28800, 39600]],
            holiday: 'Christmas',
          },
        }}
      />,
    );

    expect(screen.getByText('Holiday hours (Christmas)')).toBeInTheDocument();
    expect(screen.queryAllByText('Special hours').length).toBe(0);
  });

  it('should render special hours for day', () => {
    render(
      <OpeningHours
        hours={{
          ...emptyOpeningHours,
          monday: {
            times: [[28800, 39600]],
            isExceptional: true,
          },
        }}
      />,
    );

    expect(screen.getByText('Special hours')).toBeInTheDocument();
  });

  it('should render opening hours for all days', () => {
    render(<OpeningHours hours={fullOpeningHours} />);
    expect(screen.getByText('monday')).toBeInTheDocument();
    expect(screen.getByText('tuesday')).toBeInTheDocument();
    expect(screen.getByText('wednesday')).toBeInTheDocument();
    expect(screen.getByText('thursday')).toBeInTheDocument();
    expect(screen.getByText('friday')).toBeInTheDocument();
    expect(screen.getByText('saturday')).toBeInTheDocument();
    expect(screen.getByText('sunday')).toBeInTheDocument();

    expect(screen.getByText('8 AM - 11 AM')).toBeInTheDocument();
    expect(screen.getByText('12 PM - 4 PM')).toBeInTheDocument();
    expect(screen.getByText('6 PM - 11 PM')).toBeInTheDocument();
    expect(screen.getByText('8 AM - 11 AM')).toBeInTheDocument();
    expect(screen.getByText('12 PM - 11 PM')).toBeInTheDocument();
    expect(screen.queryAllByText('Closed').length).toBe(2);
  });
});
