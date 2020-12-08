import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Empty onAdd={action("onAdd")} />}
    </article>
  )
};