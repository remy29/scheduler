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
};

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

  if (JSON.stringify(state) === "{}") {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }

  const newState = {
    day: state.day,
    days: [...state.days],
    appointments: { ...state.appointments },
    interviewers: { ...state.interviewers },
  };

  switch (action.type) {
    case SET_DAY: {
      newState.day = action.day;
      return newState;
    }

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
        spots: state.days[`${weekdayId}`].spots - 1,
      };

      const days = [...state.days];

      days[`${weekdayId}`] = day;

      if (state.appointments[action.id].interview) {
        day.spots = state.days[`${weekdayId}`].spots;
      }

      if (!action.interview) {
        appointment.interview = null;
        day.spots = state.days[`${weekdayId}`].spots + 1;
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
};

export {SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY, updateSpots}
