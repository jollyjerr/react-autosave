import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React, { act } from 'react';
import useDebounce from './useDebounce';

function DebounceComponent() {
  const [data, setdata] = React.useState('hello world');
  const value = useDebounce(data, 2000);
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
  afterEach(() => {
    cleanup();
  });

  it('Debounces data being updated', async () => {
    render(<DebounceComponent />);
    await userEvent.type(screen.getByTestId('input'), ' Some new content');
    expect(screen.queryAllByText('hello world Some new content').length).toBe(
      0,
    );
  });

  it('Updates after debounce', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (time) => vi.advanceTimersByTime(time),
    });
    render(<DebounceComponent />);

    await user.type(screen.getByTestId('input'), ' Some new content');
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryAllByText('hello world Some new content').length).toBe(
      1,
    );
    vi.clearAllMocks();
  });
});
