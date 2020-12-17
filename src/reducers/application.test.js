import reducer, { updateSpots } from "reducers/application";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 1 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

describe("Application Reducer", () => {
  it("thows an error with an empty state", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });

  it("thows an error with an unsupported type", () => {
    expect(() => reducer({ ...state }, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});

describe("updateSpots Functions", () => {
  it("Returns 0 when called with an ID of 5 or less", () => {
    expect(updateSpots(5)).toBe(0);
    expect(updateSpots(10)).toBe(1);
    expect(updateSpots(15)).toBe(2);
    expect(updateSpots(20)).toBe(3);
    expect(updateSpots(25)).toBe(4);
  });
});
