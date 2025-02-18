import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest';
import { App } from './App';
import * as hooks from './hooks/useOpeningHours';

vi.mock('./hooks/useOpeningHours');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    (hooks.useOpeningHours as Mock).mockReturnValue({
      hours: null,
      error: null,
      loading: true,
    });

    render(<App />);
    expect(screen.getByText('This is a loader')).toBeInTheDocument();
  });

  it('should display error message when there is an error', async () => {
    (hooks.useOpeningHours as Mock).mockReturnValue({
      hours: null,
      error: 'Error fetching data',
      loading: false,
    });

    render(<App />);
    expect(await screen.findByText('Error fetching data')).toBeInTheDocument();
  });

  it('should display empty state when no hours are available', async () => {
    (hooks.useOpeningHours as Mock).mockReturnValue({
      hours: null,
      error: null,
      loading: false,
    });

    render(<App />);
    expect(await screen.findByText('No opening hours available')).toBeInTheDocument();
  });

  it('should display opening hours when data is available', async () => {
    const mockHours = {
      monday: { times: [[28800, 39600]] },
      tuesday: { times: [[43200, 57600]] },
    };
    (hooks.useOpeningHours as Mock).mockReturnValue({
      hours: mockHours,
      error: null,
      loading: false,
    });

    render(<App />);
    expect(await screen.findByText('Opening hours')).toBeInTheDocument();
    expect(screen.getByText('monday')).toBeInTheDocument();
    expect(screen.getByText('8 AM - 11 AM')).toBeInTheDocument();
  });
});
