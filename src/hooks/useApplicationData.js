import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer, {SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY} from "reducers/application"

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  }, []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointments[id]).then(() => {
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


