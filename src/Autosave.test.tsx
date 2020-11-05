import { cleanup, render, screen } from "@testing-library/react";

import Autosave from "./Autosave";
import React from "react";
import userEvent from "@testing-library/user-event";

jest.useFakeTimers();

type TestProps = {
  onSave: (data: any) => Promise<any>;
  interval?: number;
  onError?: Function;
  onSuccess?: Function;
};
const TestComponent = ({ onSave, interval, onError, onSuccess }: TestProps) => {
  const [data, setdata] = React.useState("hello world");
  return (
    <div>
      <input
        type="text"
        data-testid="input"
        value={data}
        onChange={(e) => setdata(e.target.value)}
      />
      <Autosave
        data={data}
        interval={1}
        onSave={onSave}
        onError={onError}
        onSuccess={onSuccess}
      />
    </div>
  );
};

describe("<Autosave />", () => {
  it("Renders without crashing", () => {
    render(<Autosave data="examplestring" onSave={jest.fn()} />);
  });

  it("Is generic", () => {
    interface CustomInterface {
      something: "complicated" | "simple";
    }
    const testCustomInterface = (
      <Autosave<CustomInterface, number>
        data={{} as CustomInterface}
        onSave={jest.fn()}
      />
    );
    render(testCustomInterface);
  });

  it("Does not try and save new data onChange", () => {
    const saveFunction = jest.fn();
    render(<TestComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId("input"), "Some new content");
    expect(saveFunction).not.toHaveBeenCalled();
  });

  it("Calls the save function when given time", () => {
    const saveFunction = jest.fn();
    render(<TestComponent onSave={saveFunction} />);
    userEvent.type(screen.getByTestId("input"), "Some new content");
    jest.runOnlyPendingTimers();
    expect(saveFunction).toHaveBeenCalledTimes(1);
  });

  afterEach(cleanup);
});

