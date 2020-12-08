import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';

export default function InterviewerListItem(props) {

  const InterviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
  <li onClick={props.setInterviewer} className={InterviewerListItemClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li> )
};