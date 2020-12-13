import { useState } from "react";

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: [initial]
  })

  function transition(newMode, replace = false) { 

    const newState = {...state}

    if (replace) {
      newState.history.pop();
    } 
    newState.history.push(newMode)
    setState({...newState, mode: newMode});
  };

  function back() { 
    const newState = {...state}

    if (newState.history.length < 2) {
      return;
    }
    
    newState.history.pop();
    setState({...newState, mode: newState.history[newState.history.length -1]});
  }
  
  return { mode: state.mode, transition, back };
};