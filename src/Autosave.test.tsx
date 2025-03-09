import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React, { act } from 'react';
import Autosave from './Autosave';

type TestProps = {
  onSave: (data: any) => Promise<any>;
  saveOnUnmount?: boolean;
};
function TestComponent({ onSave, saveOnUnmount = true }: TestProps) {
  const [data, setdata] = React.useState('hello world');
  const [showForm, setShowForm] = React.useState(true);
  return showForm ? (
    <div>
      <input
        type="text"
        data-testid="input"
        value={data}
        onChange={(e) => setdata(e.target.value)}
      />
      <Autosave data={data} onSave={onSave} saveOnUnmount={saveOnUnmount} />
      <button
        type="button"
        data-testid="unmount"
        onClick={() => {
          setShowForm(false);
        }}
      >
        Unmount
      </button>
    </div>
  ) : (
    <div data-testid="newpage">A new page!</div>
  );
}

describe('<Autosave />', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders without crashing', () => {
    render(<Autosave data="examplestring" onSave={vi.fn()} />);
  });

  it('Is generic', () => {
    interface CustomInterface {
      something: 'complicated' | 'simple';
    }
    const testCustomInterface = (
      <Autosave<CustomInterface, number>
        data={{} as CustomInterface}
        onSave={vi.fn()}
      />
    );
    render(testCustomInterface);
  });

  it('Does not try and save new data onChange', async () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    await userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls the save function when given time', async () => {
    const saveFunction = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (time) => vi.advanceTimersByTime(time),
    });
    render(<TestComponent onSave={saveFunction} />);

    await user.type(screen.getByTestId('input'), 'Some new content');
    act(() => {
      vi.runAllTimers();
    });

    expect(saveFunction).toHaveBeenCalledTimes(1);
    vi.clearAllMocks();
  });

  it('Does not call save function if data is fresh', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (time) => vi.advanceTimersByTime(time),
    });
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);

    await user.click(screen.getByTestId('unmount'));

    expect(saveFunction).toHaveBeenCalledTimes(0);
    vi.clearAllMocks();
  });

  it('Calls the save function when being unmounted', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (time) => vi.advanceTimersByTime(time),
    });
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);

    await user.type(screen.getByTestId('input'), 'Some new content');
    await user.click(screen.getByTestId('unmount'));

    expect(saveFunction).toHaveBeenCalledTimes(1);
    vi.clearAllMocks();
  });

  it('Can toggle off saving when unmounted', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (time) => vi.advanceTimersByTime(time),
    });
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} saveOnUnmount={false} />);

    await user.type(screen.getByTestId('input'), 'Some new content');
    await user.click(screen.getByTestId('unmount'));

    expect(saveFunction).toHaveBeenCalledTimes(0);
    vi.clearAllMocks();
  });
});
