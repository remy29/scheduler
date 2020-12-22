import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button.js";

export default function Form(props) {
  // sets name, interviewer, and error states, has defaults.
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  // clears name and interviewer state after cancel
  const reset = function() {
    setName("");
    setInterviewer(null);
  };
  // rests calls onCancel prop
  const cancel = function() {
    reset();
    props.onCancel();
  };

  // catches user input errors
  function validate() {
    if (!name) {
      setError("Student name cannot be blank");
      return;

    }
    if (!interviewer) {
      setError("Please pick an interviewer");
      return;

    }

    setError(""); //resets error state when there is not user error

    if (interviewer && interviewer.id) {
      props.onSave(name, interviewer.id)
    }
    else {
      props.onSave(name, interviewer);
    }
  }
  // returns Form Appointment sub-component
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
