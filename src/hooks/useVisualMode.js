import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {  
    console.log(history)
    if (replace) {
      console.log("replace true")
      history.pop();
    } 
    
    setHistory(history => ([...history, newMode]));
    setMode(newMode);
  };

  function back(double) { 
    if (history.length < 2) {
      return;
    }
    history.pop();
    if (double) {
      history.pop()
    }
    setMode(history[history.length -1]);
  }
  console.log(history)
  return { mode, transition, back };
};