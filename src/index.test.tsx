import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Autosave from './Autosave';
import useDebounce from './useDebounce';
import useAutosave from './useAutosave';

jest.useFakeTimers();

const DebounceComponent = () => {
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
};

describe('useDebounce', () => {
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
      jest.runAllTimers();
    });
    expect(screen.queryAllByText('hello world Some new content').length).toBe(
      1,
    );
  });

  afterEach(cleanup);
});

const UseAutosaveComponent = ({ onSave }: { onSave: () => any }) => {
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
};

describe('useAutosave', () => {
  it('Does not try and save new data onChange', () => {
    const saveFunction = jest.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls a save function when given time', () => {
    const saveFunction = jest.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId('input'), 'Some new content');
      jest.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  afterEach(cleanup);
});

type TestProps = {
  onSave: (data: any) => Promise<any>;
};
const TestComponent = ({ onSave }: TestProps) => {
  const [data, setdata] = React.useState('hello world');
  return (
    <div>
      <input
        type="text"
        data-testid="input"
        value={data}
        onChange={(e) => setdata(e.target.value)}
      />
      <Autosave data={data} interval={1} onSave={onSave} />
    </div>
  );
};

describe('<Autosave />', () => {
  it('Renders without crashing', () => {
    render(<Autosave data="examplestring" onSave={jest.fn()} />);
  });

  it('Is generic', () => {
    interface CustomInterface {
      something: 'complicated' | 'simple';
    }
    const testCustomInterface = (
      <Autosave<CustomInterface, number>
        data={{} as CustomInterface}
        onSave={jest.fn()}
      />
    );
    render(testCustomInterface);
  });

  it('Does not try and save new data onChange', () => {
    const saveFunction = jest.fn();
    render(<TestComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId('input'), 'Some new content');
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it('Calls the save function when given time', () => {
    const saveFunction = jest.fn();
    render(<TestComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId('input'), 'Some new content');
      jest.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  afterEach(cleanup);
});
