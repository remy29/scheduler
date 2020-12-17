export function getAppointmentsForDay(state, day) {
  const resultArr = [];
  const [appointmentIdsForDay] = state.days.filter(
    (currentDay) => currentDay.name === day
  );
  if (appointmentIdsForDay) {
    for (const appointmentId of appointmentIdsForDay.appointments) {
      for (const appointment in state.appointments) {
        if (appointmentId === state.appointments[appointment.toString()].id) {
          resultArr.push(state.appointments[appointment.toString()]);
        }
      }
    }
  }
  return resultArr;
}

export function getInterview(state, interview) {
  const resultObj = { student: null, interviewer: null };
  if (interview) {
    resultObj.student = interview.student;
    for (const interviewer in state.interviewers) {
      if (state.interviewers[`${interviewer}`].id === interview.interviewer) {
        resultObj.interviewer = state.interviewers[`${interviewer}`];
      }
    }
  }
  if (resultObj.student) {
    return resultObj;
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const resultArr = [];
  const [interviewerIdsForDay] = state.days.filter(
    (currentDay) => currentDay.name === day
  );
  if (interviewerIdsForDay) {
    for (const interviewerId of interviewerIdsForDay.interviewers) {
      for (const interviewer in state.interviewers) {
        if (interviewerId === state.interviewers[interviewer.toString()].id) {
          resultArr.push(state.interviewers[interviewer.toString()]);
        }
      }
    }
  }
  return resultArr;
}
