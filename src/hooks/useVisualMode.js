import { useState } from "react";
// use visual mode custom hook updates current mode when transition/back is called
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  // transitions to next mode
  function transition(newMode, replace = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace) { // makes sure current mode is replaced in history when replace is true
        newHistory.pop();
      }
      return [...newHistory, newMode];
    });
  }
  // returns to previous mode
  function back() {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  }

  const mode = history[history.length - 1];
  return { mode, transition, back };
}
