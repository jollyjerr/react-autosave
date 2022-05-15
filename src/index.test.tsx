import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import { act } from "react-dom/test-utils";
import Autosave from "./Autosave";
import useDebounce from "./useDebounce";
import useAutosave from "./useAutosave";

vi.useFakeTimers();

const DebounceComponent = () => {
  const [data, setdata] = React.useState("hello world");
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

describe("useDebounce", () => {
  it("Debounces data being updated", () => {
    render(<DebounceComponent />);
    userEvent.type(screen.getByTestId("input"), "Some new content");
    expect(screen.queryAllByText("hello world Some new content").length).toBe(
      0
    );
  });

  it("Updates after debounce", () => {
    render(<DebounceComponent />);
    userEvent.type(screen.getByTestId("input"), " Some new content");
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryAllByText("hello world Some new content").length).toBe(
      1
    );
  });

  afterEach(cleanup);
});

const UseAutosaveComponent = ({ onSave }: { onSave: () => any }) => {
  const [text, setText] = React.useState("hello world");
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

describe("useAutosave", () => {
  it("Does not try and save new data onChange", () => {
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId("input"), "Some new content");
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it("Calls a save function when given time", () => {
    const saveFunction = vi.fn();
    render(<UseAutosaveComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId("input"), "Some new content");
      vi.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  afterEach(cleanup);
});

type TestProps = {
  onSave: (data: any) => Promise<any>;
};
const TestComponent = ({ onSave }: TestProps) => {
  const [data, setdata] = React.useState("hello world");
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
};

describe("<Autosave />", () => {
  it("Renders without crashing", () => {
    render(<Autosave data="examplestring" onSave={vi.fn()} />);
  });

  it("Is generic", () => {
    interface CustomInterface {
      something: "complicated" | "simple";
    }
    const testCustomInterface = (
      <Autosave<CustomInterface, number>
        data={{} as CustomInterface}
        onSave={vi.fn()}
      />
    );
    render(testCustomInterface);
  });

  it("Does not try and save new data onChange", () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId("input"), "Some new content");
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it("Calls the save function when given time", () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    act(() => {
      userEvent.type(screen.getByTestId("input"), "Some new content");
      vi.runAllTimers();
    });
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  it("Calls the save function when being unmounted", async () => {
    const saveFunction = vi.fn();
    render(<TestComponent onSave={saveFunction} />);
    await act(async () => {
      await userEvent.type(screen.getByTestId("input"), "Some new content");
      vi.runAllTimers();
      userEvent.click(screen.getByTestId("unmount"));
    });
    expect(saveFunction).toHaveBeenCalledTimes(2);
  });

  afterEach(cleanup);
});
