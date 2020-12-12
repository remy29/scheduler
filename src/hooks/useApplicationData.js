import axios from "axios";
import { useReducer, useEffect } from "react";



export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {

      case SET_DAY: {
        state.day = action.day
        return {...state}
      }

      case SET_APPLICATION_DATA: {
        state.days = action.days
        state.appointments = action.appointments
        state.interviewers = action.interviewers
        return {...state}
      }

      case SET_INTERVIEW: {
        const weekdayId = updateSpots(action.id)

      
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        const day = {
          ...state.days[`${weekdayId}`],
          spots: state.days[`${weekdayId}`].spots - 1
        }

        const days = [
          ...state.days,
        ]

        days[`${weekdayId}`] = day

        if (!action.interview) {
          appointment.interview = null;
          day.spots = state.days[`${weekdayId}`].spots + 1;
        }

       

        return {
          ...state,
          appointments,
          days,
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    })

  }, [])

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

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointments[`${id}`]).then(() => {
      console.log(`id::: ${id}`)
      console.log(interview)
      console.log(appointments[`${id}`])
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
  };

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  };

  const setDay = day => dispatch({ type: SET_DAY, day });



  return { state, setDay, cancelInterview, bookInterview }

}


