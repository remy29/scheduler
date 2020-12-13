import { useState } from "react";

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  })

  function transition(newMode, replace = false) {  
    if (replace) {
      state.history.pop();
    } 
    state.history.push(newMode)
    setState({...state, mode: newMode});
  };

  function back() { 
    if (state.history.length < 2) {
      return;
    }
    state.history.pop();
    setState({...state, mode: state.history[state.history.length -1]});
  }
  
  return { mode: state.mode, transition, back };
};