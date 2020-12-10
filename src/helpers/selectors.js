export function getAppointmentsForDay(state, day) {
  const resultArr = [];
  const appointmentsClone = {...state.appointments}
  const [appointmentIdsForDay] = state.days.filter(currentDay => currentDay.name === day);
  if (appointmentIdsForDay) {
    for (const appointmentId of appointmentIdsForDay.appointments) {
      for (const appointment in appointmentsClone) {
        if (appointmentId === appointmentsClone[appointment.toString()].id) {
          resultArr.push(appointmentsClone[appointment.toString()])
        }
      }
    }
  }
  return resultArr;
};

export function getInterview(state, interview) {
  const resultObj = { student: null, interviewer: null };
  const interviewersClone = {...state.interviewers};
  if (interview) {
    resultObj.student = interview.student
    for (const interviewer in interviewersClone) {
      if (interviewersClone[`${interviewer}`].id === interview.interviewer) {
        resultObj.interviewer = interviewersClone[`${interviewer}`]
      }
    }
  }
  if (resultObj.student) {
    return resultObj
  }
  return null;
};

