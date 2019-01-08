import { useState, useEffect } from "react";

export function useSize() {
  const [state, setState] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  function handleResize(e) {
    setState({ height: e.target.innerHeight, width: e.target.innerWidth });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  });

  return state;
}

export function useScroll() {
  const [state, setState] = useState({
    top: window.scrollY,
    left: window.scrollX
  });

  function handleScroll() {
    setState({ top: window.scrollY, left: window.scrollX });
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return state;
}
