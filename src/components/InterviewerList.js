import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";
// Maps InterviewerListItems components into list
export default function InterviewerList(props) {
  // Makes sure selected interviewer stays selected 
  const interviewerSelector = function(value) {
    if (props.value) {
      if (value.id === props.value.id) {
        props.onChange(value.id);
        return true;
      }
    }
    if (value.id === props.value) {
      props.onChange(value.id);
      return true;
    }
    return false;
  };

  const interviewerListItems = props.interviewers.map((value) => {
    return (
      <InterviewerListItem
        key={value.id}
        name={value.name}
        avatar={value.avatar}
        selected={interviewerSelector(value)}
        setInterviewer={() => props.onChange(value.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
