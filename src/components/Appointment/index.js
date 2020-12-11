import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVE = "SAVE"
const DELETE = "DELETE"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
  }

  function cancel() {
    transition(CONFIRM)
  }

  function confirm () {
    transition(DELETE)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    })
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVE && (
        <Status message={"Saving..."}/>
      )}
      {mode === DELETE && (
        <Status message={"Deleting..."}/>
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure?"}
          onCancel={() => back()}
          onConfirm={confirm}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          name={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )
};