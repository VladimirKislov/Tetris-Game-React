import { useState, useEffect } from "react";

const points = [20, 50, 100, 300];

export const useProgress = (rowsCleared) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + points[rowsCleared - 1]);
    }
  }, [rowsCleared]);

  useEffect(() => {
    if (score > 1000 * level) {
      setLevel((prev) => prev + 1);
    }
  }, [score, level]);

  return [level, score, setLevel, setScore];
};
