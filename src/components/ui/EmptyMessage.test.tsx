import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyMessage', () => {
  it('renders the provided message', () => {
    const message = 'No data available';
    render(<EmptyState message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
