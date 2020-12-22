import React from "react";

import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async() => {
    //Renders app
    const { getByText } = render(<Application />);
    // uses Async/Await to wait for element with text monday to appear
    await waitForElement(() => getByText("Monday"));
    // clicks element with text "Tuesday"
    fireEvent.click(getByText("Tuesday"));
    // Checks that page change was successful 
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });  

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the save button is shown.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Buck Jones" },
    });

    // 5. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check new appointment is under new name.
    await waitForElement(() => getByText(appointment, "Buck Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  // test follows same patterns as other tests in file
  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() =>
      getByText(
        appointment,
        "Something went wrong! Couldn't save the appointment"
      )
    );

    fireEvent.click(queryByAltText(appointment, "Close"));

    // Check that the save button is shown meaning it went back to form
    expect(getByText(appointment, "Save")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    await waitForElement(() =>
      getByText(
        appointment,
        "Something went wrong! Couldn't delete the appointment"
      )
    );

    fireEvent.click(queryByAltText(appointment, "Close"));

    // 6. Check that the save button is shown meaning it went back to form
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});