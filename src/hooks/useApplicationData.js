import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData(props) {
  const [state, setState] = useState({
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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })

  },[])

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
  
  if (state.days[0]) {

  }
  function bookInterview(id, interview) {

    const weekdayId = updateSpots(id)
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = {
      ...state.days[`${weekdayId}`],
      spots: state.days[`${weekdayId}`].spots - 1
    }

    const days = [
      ...state.days, 
    ]

    days[`${weekdayId}`] = day

    return axios.put(`/api/appointments/${id}`, appointments[`${id}`]).then(() => {
      if (!state.appointments[id].interview) {
        setState({
          ...state,
          appointments,
          days,
        })
      } 
      else { 
        setState({
          ...state,
          appointments,
        })
      }
    })
  };
  
  function cancelInterview(id) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = {
      ...state.days[`${updateSpots(id)}`],
      spots: state.days[`${updateSpots(id)}`].spots + 1
    }

    const days = [
      ...state.days, 
    ]

    days[`${updateSpots(id)}`] = day
  
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  };
  
  const setDay = day => setState({ ...state, day });


  return {state, setDay, cancelInterview, bookInterview}

}


