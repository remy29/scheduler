import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';

export default function InterviewerListItem(props) {

  const InterviewerlistItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
  <li onClick={() => props.setInterviewer(props.name)} className={InterviewerlistItemClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected ? props.name: null}
  </li> )
};