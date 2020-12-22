import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer, {
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAY,
} from "reducers/application";


export default function useApplicationData() {
  
  // insitializes State
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // Makes api calls to fetch data from database, sets the state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);
  // Makes api call to put route to book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointments[id])
  }
  // Makes api call to delete route to cancel an interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
  }
  // set day functions updates the day state
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8001", "protocol");
    webSocket.onopen = function () {
      webSocket.send("ping");
    }
    webSocket.onmessage = function (event) {
      if (JSON.parse(event.data) !== "pong") {
        dispatch({...JSON.parse(event.data)})
      }
    }
  }, []);

  return { state, setDay, cancelInterview, bookInterview };
}
