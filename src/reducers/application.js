// Reduces appointment id to day id to know which day to assign it to
function updateSpots(id) {
  if (id <= 5) {
    return 0;
  }
  if (id <= 10) {
    return 1;
  }
  if (id <= 15) {
    return 2;
  }
  if (id <= 20) {
    return 3;
  }
  if (id <= 25) {
    return 4;
  }
}
// Reducer argumetns
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  // error catch
  if (JSON.stringify(state) === "{}") {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
  // deep object copy of newState
  const newState = {
    day: state.day,
    days: [...state.days],
    appointments: { ...state.appointments },
    interviewers: { ...state.interviewers },
  };

  switch (action.type) {
  // Sets day in state
  case SET_DAY: {
    newState.day = action.day;
    return newState;
  }
  // sets state variables to render page 
  case SET_APPLICATION_DATA: {
    newState.days = action.days;
    newState.appointments = action.appointments;
    newState.interviewers = action.interviewers;
    return newState;
  }

  case SET_INTERVIEW: {
    const weekdayId = updateSpots(action.id);

    const appointment = {
      ...state.appointments[action.id],
      interview: { ...action.interview },
    };

    const appointments = {
      ...state.appointments,
      [action.id]: appointment,
    };

    const day = {
      ...state.days[`${weekdayId}`],
      spots: state.days[`${weekdayId}`].spots - 1, // reduces available spots when appointment is booked
    };

    const days = [...state.days];

    days[`${weekdayId}`] = day;

    if (state.appointments[action.id].interview) {
      day.spots = state.days[`${weekdayId}`].spots; // makes sure spots availble stays the same after edit 
    }

    if (!action.interview) {
      appointment.interview = null;
      day.spots = state.days[`${weekdayId}`].spots + 1; // increases spots availble after cancel
    }

    return {
      ...newState,
      appointments,
      days,
    };
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

export { SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY, updateSpots };
