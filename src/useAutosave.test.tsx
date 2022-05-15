import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useAutosave from './useAutosave';

function UseAutosaveComponent({ onSave }: { onSave: () => any }) {
  const [text, setText] = React.useState('hello world');
  useAutosave({ data: text, onSave });
  return (
    <div>
      <input
        type="text"
        data-testid="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

describe('useAutosave', () => {
  afterEach(() => {
    cleanup();
  });

  it('Does not try and save new data onChange', async () => {
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    await userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls a save function when given time', async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({advanceTimers: (time) => vi.advanceTimersByTime(time)});
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);

    await user.type(screen.getByTestId('input'), 'Some new content');
    act(() => {
      vi.runAllTimers();
    });

    expect(saveFunction).toHaveBeenCalledTimes(1);
    vi.clearAllMocks();
  });
});
