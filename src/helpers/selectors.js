/* const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 1 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
}; */



export function getAppointmentsForDay(state, day) {
  const resultArr = [];
  const [appointmentIdsForDay] = state.days.filter(currentDay => currentDay.name === day);
  if (appointmentIdsForDay) {
    for (const appointmentId of appointmentIdsForDay.appointments) {
      for (const appointment in state.appointments) {
        if (appointmentId === state.appointments[appointment.toString()].id) {
          resultArr.push(state.appointments[appointment.toString()])
        }
      }
    }
  }
  return resultArr;
};

export function getInterview(state, interview) {
  const resultObj = { student: null, interviewer: null };
  if (interview) {
    resultObj.student = interview.student
    for (const interviewer in state.interviewers) {
      if (state.interviewers[`${interviewer}`].id === interview.interviewer) {
        resultObj.interviewer = state.interviewers[`${interviewer}`]
      }
    }
  }
  if (resultObj.student) {
    return resultObj
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  const resultArr = [];
  const [interviewerIdsForDay] = state.days.filter(currentDay => currentDay.name === day);
  if (interviewerIdsForDay) {
    for (const interviewerId of interviewerIdsForDay.interviewers) {
      for (const interviewer in state.interviewers) {
        if (interviewerId === state.interviewers[interviewer.toString()].id) {
          resultArr.push(state.interviewers[interviewer.toString()])
        }
      }
    }
  }
  return resultArr;
};



