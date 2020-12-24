import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

// simple test to see if Appointment component renders
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
