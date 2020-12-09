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

