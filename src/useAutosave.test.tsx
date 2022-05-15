import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useAutosave from './useAutosave';

function UseAutosaveComponent({ onSave }: { onSave: () => any }) {
  const [text, setText] = React.useState('hello world');
  useAutosave({ data: text, onSave, interval: 1 });
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
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Does not try and save new data onChange', () => {
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls a save function when given time', async () => {
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId('input'), 'Some new content');
      vi.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });
});
