import Autosave from "./Autosave";
import React from "react";
import { render } from "@testing-library/react";

describe("<Autosave />", () => {
  it("Renders without crashing", () => {
    render(<Autosave data="hi" onSave={jest.fn()} />);
  });
});
