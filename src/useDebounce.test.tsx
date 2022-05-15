import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useDebounce from './useDebounce';

function DebounceComponent() {
  const [data, setdata] = React.useState('hello world');
  const value = useDebounce(data, 1);
  return (
    <div>
      <input
        type="text"
        data-testid="input"
        value={data}
        onChange={(e) => setdata(e.target.value)}
      />
      <h1>{value}</h1>
    </div>
  );
}

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('Debounces data being updated', () => {
    render(<DebounceComponent />);
    userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(screen.queryAllByText('hello world Some new content').length).toBe(
      0,
    );
  });

  it('Updates after debounce', () => {
    render(<DebounceComponent />);
    userEvent.type(screen.getByTestId('input'), ' Some new content');
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryAllByText('hello world Some new content').length).toBe(
      1,
    );
  });
});
