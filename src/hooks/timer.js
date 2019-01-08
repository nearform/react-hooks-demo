import { useState, useEffect } from "react";

export function useClock() {
  // set up our time state variable, mutator and initialize
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0]);

  // timer callback handler
  function tick() {
    setTime(new Date().toTimeString().split(" ")[0]);
  }

  useEffect(
    // same as componentDidMount and componentDidUpdate
    () => {
      // set up timer to callback to tick, setting to 50ms to call
      // multiple times between renders
      const timer = setInterval(tick, 50);
      return () => clearInterval(timer); // same as componentWillUnmount
    },
    [time] // only re-render if time changed (prevent unnecessary re-renders)
  );

  return time;
}
