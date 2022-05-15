import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Autosave from './Autosave';

type TestProps = {
  onSave: (data: any) => Promise<any>;
};
function TestComponent({ onSave }: TestProps) {
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
      <Autosave data={data} interval={1} onSave={onSave} />
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
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

  it('Does not try and save new data onChange', () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls the save function when given time', () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId('input'), 'Some new content');
      vi.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  it('Calls the save function when being unmounted', async () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    await act(async () => {
      await userEvent.type(screen.getByTestId('input'), 'Some new content');
      vi.runAllTimers();
      userEvent.click(screen.getByTestId('unmount'));
    });
    expect(saveFunction).toHaveBeenCalledTimes(2);
  });
});
