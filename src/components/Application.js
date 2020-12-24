import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  //destructures  object returned by useApplicationData custom hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  // Gets array of interviewers available for the day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  // gets day's current appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          interviewers={dailyInterviewers}
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
        />
      );
    }
  );
  // Renders main application layout
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
