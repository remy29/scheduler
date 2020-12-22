import React, {useEffect} from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // destructures returned object from useVisual mode custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);

  // Saves appointment to server
  function save(name, interviewer) {
    // makes interview object from arguments
    const interview = {
      student: name,
      interviewer,
    };
    // calls transition function with new mode
    transition(SAVE);

    props
      .bookInterview(props.id, interview) // see application component
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // Deletes appointment from server on confirm
  function confirm() {
    transition(DELETE, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  // Displays appropriate sub-component depending on current mode
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVE && <Status message={"Saving..."} />}
      {mode === DELETE && <Status message={"Deleting..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure?"}
          onCancel={back}
          onConfirm={confirm}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          name={props.interview.student}
          value={props.interview.interviewer}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message={"Something went wrong! Couldn't save the appointment"}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message={"Something went wrong! Couldn't delete the appointment"}
        />
      )}
    </article>
  );
}
