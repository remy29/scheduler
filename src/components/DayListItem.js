import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";
// Renders individual day list items
export default function DayListItem(props) {
  // Returns formated spots available blurb
  const formatSpots = function(props) {
    switch (props.spots) {
    case 0:
      return "no spots";
    case 1:
      return "1 spot";
    default:
      return `${props.spots} spots`;
    }
  };
  // assigns class bases on props
  const listItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      data-testid="day"
      className={listItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)} remaining</h3>
    </li>
  );
}
